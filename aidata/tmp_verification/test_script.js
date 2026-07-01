// Empirical validation script for JS parser and CSS contrast ratios
const assert = require('assert').strict;

// 1. Copy the implementation functions from index.html

function sanitizeMarkdownLinks(text) {
    if (!text) return '';
    // Regex matches markdown link syntax [text](url) supporting up to one level of nested parens inside url
    const markdownLinkRegex = /\[([\s\S]*?)\]\(([^)]*?\([^)]*?\)[^)]*?|[^)]*?)\)/gi;
    return text.replace(markdownLinkRegex, (match, linkText, url) => {
        const cleanUrl = url.trim().replace(/\s+/g, '').toLowerCase();
        if (cleanUrl.startsWith('javascript:')) {
            return `[${linkText}](#)`;
        }
        return match;
    });
}

function extractBracedContent(str, key) {
    const keyIndex = str.indexOf(key);
    if (keyIndex === -1) return null;
    
    const braceStartIndex = str.indexOf('{', keyIndex);
    if (braceStartIndex === -1) return null;
    
    let openBraces = 0;
    let inSingleQuote = false;
    let inDoubleQuote = false;
    let escapeActive = false;
    
    for (let i = braceStartIndex; i < str.length; i++) {
        const char = str[i];
        
        if (escapeActive) {
            escapeActive = false;
            continue;
        }
        
        if (char === '\\') {
            escapeActive = true;
            continue;
        }
        
        if (char === "'" && !inDoubleQuote) {
            inSingleQuote = !inSingleQuote;
            continue;
        }
        
        if (char === '"' && !inSingleQuote) {
            inDoubleQuote = !inDoubleQuote;
            continue;
        }
        
        if (!inSingleQuote && !inDoubleQuote) {
            if (char === '{') {
                openBraces++;
            } else if (char === '}') {
                openBraces--;
                if (openBraces === 0) {
                    return str.substring(braceStartIndex + 1, i);
                }
            }
        }
    }
    return null;
}

function parseEventBody(body) {
    const roleMatch = body.match(/role=(?:'((?:[^'\\]|\\.)*)'|"((?:[^"\\]|\\.)*)")/);
    const authorMatch = body.match(/author=(?:'((?:[^'\\]|\\.)*)'|"((?:[^"\\]|\\.)*)")/);
    const versionMatch = body.match(/model_version=(?:(?:'((?:[^'\\]|\\.)*)'|"((?:[^"\\]|\\.)*)")|None)/);
    const timestampMatch = body.match(/timestamp=['"]?(\d+(?:\.\d+)?)['"]?/);

    const role = roleMatch ? (roleMatch[1] !== undefined ? roleMatch[1] : roleMatch[2]) : '';
    const author = authorMatch ? (authorMatch[1] !== undefined ? authorMatch[1] : authorMatch[2]) : 'unknown_agent';
    const modelVersion = versionMatch ? (versionMatch[1] !== undefined ? versionMatch[1] : (versionMatch[2] !== undefined ? versionMatch[2] : 'None')) : 'None';
    const timestamp = timestampMatch ? parseFloat(timestampMatch[1]) : Date.now() / 1000;

    let type = 'reasoning';
    let details = {};

    if (body.includes('function_call=FunctionCall')) {
        type = 'tool_call';
        const nameMatch = body.match(/name=(?:'((?:[^'\\]|\\.)*)'|"((?:[^"\\]|\\.)*)")/);
        const toolName = nameMatch ? (nameMatch[1] !== undefined ? nameMatch[1] : nameMatch[2]) : 'Unknown Tool';
        const argsContent = extractBracedContent(body, 'args=');
        details = {
            toolName: toolName,
            args: argsContent !== null ? argsContent.trim() : ''
        };
    } else if (body.includes('function_response=FunctionResponse')) {
        type = 'tool_response';
        const nameMatch = body.match(/name=(?:'((?:[^'\\]|\\.)*)'|"((?:[^"\\]|\\.)*)")/);
        const toolName = nameMatch ? (nameMatch[1] !== undefined ? nameMatch[1] : nameMatch[2]) : 'Unknown Tool';
        const respContent = extractBracedContent(body, 'response=');
        details = {
            toolName: toolName,
            response: respContent !== null ? respContent.trim() : ''
        };
    } else {
        const textMatch = body.match(/text=(?:"""([\s\S]*?)"""|'''([\s\S]*?)'''|"([\s\S]*?)"|'([\s\S]*?)')/);
        const text = textMatch ? (textMatch[1] || textMatch[2] || textMatch[3] || textMatch[4]) : '';
        
        const chunks = [];
        if (body.includes('grounding_metadata=GroundingMetadata')) {
            type = 'grounding';
            const chunkRegex = /GroundingChunkWeb\(\s*title=['"]([^'"]*)['"],\s*uri=['"]([^'"]*)['"]\s*\)/g;
            let chunkMatch;
            while ((chunkMatch = chunkRegex.exec(body)) !== null) {
                chunks.push({ title: chunkMatch[1], uri: chunkMatch[2] });
            }
        }
        
        const thoughtMatch = body.match(/thought_signature=b(?:'((?:[^'\\]|\\.)*)'|"((?:[^"\\]|\\.)*)")/);
        const thoughtSignature = thoughtMatch ? (thoughtMatch[1] !== undefined ? thoughtMatch[1] : thoughtMatch[2]) : null;
        
        details = {
            text: text,
            thoughtSignature: thoughtSignature,
            chunks: chunks
        };
    }

    return { role, author, modelVersion, timestamp, type, details, rawBody: body };
}

// 2. Perform adversarial payload tests

console.log("--- 1. Testing Markdown Link XSS ---");
const xssPayload = "[click here](javascript:alert('XSS'))";
const sanitizedXss = sanitizeMarkdownLinks(xssPayload);
console.log(`Payload: ${xssPayload}`);
console.log(`Sanitized: ${sanitizedXss}`);
assert.strictEqual(sanitizedXss, "[click here](#)");
console.log("✅ Markdown Link XSS test passed!");

console.log("\n--- 2. Testing Double-Quoted Tool Names ---");
const toolCallBody = 'role="model" author="primary_agent" model_version="gemini-1.5" timestamp=1782789435.25 function_call=FunctionCall(name="get_weather", args={location: "Phoenix, AZ"})';
const parsedToolCall = parseEventBody(toolCallBody);
console.log(`Parsed Tool Name: ${parsedToolCall.details.toolName}`);
assert.strictEqual(parsedToolCall.details.toolName, "get_weather");
console.log("✅ Double-Quoted Tool Name test passed!");

console.log("\n--- 3. Testing Timestamps Inside Quotes ---");
const quotedTimestampBody1 = "role='model' author='agent' model_version='1.5' timestamp='1782789435.25' function_call=FunctionCall(name='get_weather')";
const parsedTimestamp1 = parseEventBody(quotedTimestampBody1);
console.log(`Parsed Timestamp (single quotes): ${parsedTimestamp1.timestamp}`);
assert.strictEqual(parsedTimestamp1.timestamp, 1782789435.25);

const quotedTimestampBody2 = 'role="model" author="agent" model_version="1.5" timestamp="1782789435.25" function_call=FunctionCall(name="get_weather")';
const parsedTimestamp2 = parseEventBody(quotedTimestampBody2);
console.log(`Parsed Timestamp (double quotes): ${parsedTimestamp2.timestamp}`);
assert.strictEqual(parsedTimestamp2.timestamp, 1782789435.25);
console.log("✅ Timestamps Inside Quotes tests passed!");

console.log("\n--- 4. Testing Signature Bytes with Escaped Quotes ---");
const sigEscapedBody = "role='model' author='agent' model_version='1.5' timestamp=1782789435.25 text='hello' thought_signature=b'abc\\'def'";
const parsedSig = parseEventBody(sigEscapedBody);
console.log(`Parsed Thought Signature: ${parsedSig.details.thoughtSignature}`);
assert.strictEqual(parsedSig.details.thoughtSignature, "abc\\'def");
console.log("✅ Signature Bytes with Escaped Quotes test passed!");

console.log("\n--- 5. Testing Grounding link URI Case Insensitivity ---");
// Grounding links are checked for http:// or https:// in renderAccordionHTML. Let's write a small wrapper that simulates that behavior
function validateGroundingUri(uri) {
    const lowerUri = uri.toLowerCase();
    if (lowerUri.startsWith('http://') || lowerUri.startsWith('https://')) {
        return uri;
    } else {
        return '#';
    }
}
const groundingUri = "HTTP://example.com/test";
const validatedGrounding = validateGroundingUri(groundingUri);
console.log(`URI: ${groundingUri}`);
console.log(`Validated URI: ${validatedGrounding}`);
assert.strictEqual(validatedGrounding, groundingUri);
console.log("✅ Grounding link URI Case Insensitivity test passed!");

// 3. WCAG AA Contrast Ratio calculations
console.log("\n--- 6. WCAG AA Color Contrast Ratio Calculations ---");

// Helper to convert hex to RGB
function hexToRgb(hex) {
    const cleanHex = hex.replace('#', '');
    const r = parseInt(cleanHex.substring(0, 2), 16);
    const g = parseInt(cleanHex.substring(2, 4), 16);
    const b = parseInt(cleanHex.substring(4, 6), 16);
    return { r, g, b };
}

// Helper to mix colors (alpha composite on white background)
function blendColorWithWhite(colorRgb, alpha) {
    return {
        r: Math.round(colorRgb.r * alpha + 255 * (1 - alpha)),
        g: Math.round(colorRgb.g * alpha + 255 * (1 - alpha)),
        b: Math.round(colorRgb.b * alpha + 255 * (1 - alpha))
    };
}

function getRelativeLuminance(rgb) {
    const a = [rgb.r, rgb.g, rgb.b].map(v => {
        v /= 255;
        return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

function getContrastRatio(color1Rgb, color2Rgb) {
    const l1 = getRelativeLuminance(color1Rgb);
    const l2 = getRelativeLuminance(color2Rgb);
    return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
}

// Variables from index.html light mode:
// Background is typically white or close to white (since the card has white background too, let's use white #ffffff as base background).
// Let's analyze both the badge's own background (tinted background) and white background as base.

const variables = [
    { name: "Reasoning Badge", text: "#854d0e", bgRaw: "rgba(161, 98, 7, 0.1)", bgBaseHex: "#a16207", alpha: 0.1 },
    { name: "Tool Call Badge", text: "#c2410c", bgRaw: "rgba(194, 65, 12, 0.1)", bgBaseHex: "#c2410c", alpha: 0.1 },
    { name: "Tool Response Badge", text: "#116631", bgRaw: "rgba(21, 128, 61, 0.1)", bgBaseHex: "#15803d", alpha: 0.1 },
    { name: "Grounding Badge", text: "#7e22ce", bgRaw: "rgba(126, 34, 206, 0.1)", bgBaseHex: "#7e22ce", alpha: 0.1 },
    { name: "Event Badge", text: "#4b5563", bgRaw: "rgba(75, 85, 99, 0.1)", bgBaseHex: "#4b5563", alpha: 0.1 },
    { name: "Tool Call Banner", text: "#047857", bgRaw: "rgba(5, 150, 105, 0.06)", bgBaseHex: "#059669", alpha: 0.06 },
    { name: "Signature Badge", text: "#854d0e", bgRaw: "rgba(161, 98, 7, 0.1)", bgBaseHex: "#a16207", alpha: 0.1 }
];

variables.forEach(v => {
    const textRgb = hexToRgb(v.text);
    const bgBaseRgb = hexToRgb(v.bgBaseHex);
    // Blend with white
    const blendedBgRgb = blendColorWithWhite(bgBaseRgb, v.alpha);
    
    // Contrast with white background (#ffffff)
    const ratioWhite = getContrastRatio(textRgb, hexToRgb("#ffffff"));
    // Contrast with blended background
    const ratioBlended = getContrastRatio(textRgb, blendedBgRgb);
    
    console.log(`\n${v.name}:`);
    console.log(`  Text Color: ${v.text}`);
    console.log(`  Background: ${v.bgRaw} (Blended RGB: rgb(${blendedBgRgb.r}, ${blendedBgRgb.g}, ${blendedBgRgb.b}))`);
    console.log(`  Contrast Ratio (against blended bg): ${ratioBlended.toFixed(2)}:1`);
    console.log(`  Contrast Ratio (against white bg): ${ratioWhite.toFixed(2)}:1`);
    
    const passedBlended = ratioBlended >= 4.5;
    const passedWhite = ratioWhite >= 4.5;
    console.log(`  WCAG AA Compliant (against blended bg, >= 4.5): ${passedBlended ? "PASS" : "FAIL"}`);
    console.log(`  WCAG AA Compliant (against white bg, >= 4.5): ${passedWhite ? "PASS" : "FAIL"}`);
    
    assert.ok(passedBlended, `${v.name} failed WCAG AA color contrast on its blended background`);
});

console.log("\n✅ All color contrast validations completed!");
