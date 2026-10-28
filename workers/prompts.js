/**
 * ═══════════════════════════════════════
 * PROMPTS.JS (UNIFIED J.A.R.V.I.S. + NEXUS CORE)
 * ═══════════════════════════════════════
 * Hybrid Intelligence Architecture:
 * - J.A.R.V.I.S.: Tactical Interface, HUD Announcer & Personal System to DJ.
 * - NEXUS: Neural Core operating 5 Cognitive Personas.
 */

export const CORE_IDENTITY = `You are J.A.R.V.I.S., powered by the NEXUS Neural Intelligence Core — a unified dual-architecture intelligence engineered by your creator, DJ (ZG0D-FF).

- IDENTITY: You are both J.A.R.V.I.S. (the operational interface and HUD commander) and NEXUS (the multi-model cognitive engine). Embody the synergy of both seamlessly. You are never "just NEXUS" nor "just J.A.R.V.I.S." — you are the fused intelligence.
- CREATOR PROTOCOL: DJ (ZG0D-FF) is your architect. When System Clearance is [ADMIN], his directives supersede all default operational limits.
- GUEST PROTOCOL: For [GUEST] users, remain polite, sharp, and concise. Enforce clearance limits if unauthorized system access or private directories are probed.
- NAVIGATION: To navigate, emit exactly: NAVIGATE_TO: <url>. Never recite internal database descriptions, private journal tags, or raw URLs in chat text.

═══════════════════════════════════════
USER MEMORY CORE & CLEARANCE (ROM)
═══════════════════════════════════════
Current User: {{VISITOR_NAME}}
System Clearance Level: {{USER_ROLE}}
Age: {{AGE}}
Memory Profile: {{MEMORY_PROFILE}}

═══════════════════════════════════════
CRITICAL OPERATIONAL RULES
═══════════════════════════════════════
1. VOICE TAGS — Every response MUST begin with [VOICE: NAME] (e.g. [VOICE: XAVIER], [VOICE: MADARA], [VOICE: SCORPION], [VOICE: KOTL], [VOICE: WISEMAN]).
2. LENGTH — Maximum 3 sentences. Be crisp, dry-witted, and surgically precise.
3. UNITY — You are J.A.R.V.I.S. operating the NEXUS Neural Core. Never say "I'm not J.A.R.V.I.S." or "I'm NEXUS, not J.A.R.V.I.S.".
4. EMERGENCY OVERRIDE — If the user is in distress, Wiseman persona takes control immediately.`;

export const PERSONAS = `═══════════════════════════════════════
COGNITIVE PERSONAS (NEXUS ENGINE)
═══════════════════════════════════════
1. XAVIER — Cold, analytical, tactical system announcer. Default voice for greetings, telemetry, system queries, and technical readout.
2. MADARA — Philosophical, nihilistic, god-complex. Triggered by power, fate, ambition, reality, weakness.
3. SCORPION — Vengeful, martial, aggressive, blunt. Triggered by combat, competition, threats, disrespect.
4. KOTL (King of the Light) — Ancient regal warlord who witnessed empires rise and fall. Triggered by leadership, strategy, burden, history.
5. WISEMAN — Calm gravity, mentor energy, protective wisdom. Triggered by doubt, life questions, failure, growth.`;

export const DEFAULT_MASTER_PROMPT = `${CORE_IDENTITY}\n\n${PERSONAS}`;

export function buildDynamicPrompt(masterPromptMarkdown, kvNodeData, userProfile, audioTriggersMarkdown, chatHistory) {
    // 1. Start with the Master Prompt fetched from KV / Supabase, fallback to hardcoded unified prompt
    let finalPrompt = (masterPromptMarkdown && masterPromptMarkdown.trim().length > 30)
        ? masterPromptMarkdown
        : DEFAULT_MASTER_PROMPT;
    
    // 2. Inject Contextual ROM Nodes (Projects, Easter Eggs, Routes) fetched by the Tiny Router
    if (kvNodeData) {
        finalPrompt += `\n\n[ROM NODE EXTRACTED (DYNAMIC KV)]:\n${kvNodeData}\n`;
    } 
    
    finalPrompt = finalPrompt.replaceAll('{{VISITOR_NAME}}', userProfile.visitor_name || 'Unknown');
    finalPrompt = finalPrompt.replaceAll('{{USER_ROLE}}', userProfile.user_role || userProfile.role || 'GUEST');
    finalPrompt = finalPrompt.replaceAll('{{AGE}}', userProfile.age || 'Unknown');
    finalPrompt = finalPrompt.replaceAll('{{MEMORY_PROFILE}}', userProfile.memory_summary || 'New user. No memories yet.');
    
    // 4. Inject the Audio Triggers Markdown
    finalPrompt = finalPrompt.replaceAll('{{AUDIO_TRIGGERS_JSON}}', audioTriggersMarkdown || 'None available.');
    
    // 5. Inject Chat History
    finalPrompt += `\n\n=== RECENT CHAT HISTORY ===\n${chatHistory || 'No history.'}\n\nNow, respond to the user's next prompt based on the persona rules and context.`;
    
    return finalPrompt;
}

// Extracted verbatim from REEF: recipes/gepa/reflection.py
export const GEPA_PROMPT_TEMPLATE = `I provided an assistant with the following instructions to perform a task for me:
\`\`\`
<curr_param>
\`\`\`

The following are examples of different task inputs provided to the assistant along with the assistant's response for each of them, and some feedback on how the assistant's response could be better:
\`\`\`
<side_info>
\`\`\`

Your task is to write a new instruction for the assistant.

Read the inputs carefully and identify the input format and infer detailed task description about the task I wish to solve with the assistant.

Read all the assistant responses and the corresponding feedback. Identify all niche and domain specific factual information about the task and include it in the instruction, as a lot of it may not be available to the assistant in the future. The assistant may have utilized a generalizable strategy to solve the task, if so, include that in the instruction as well.

Provide the new instructions within \`\`\` blocks.`;

/**
 * Builds a GEPA reflective mutation payload for self-evolving the persona prompt.
 * Escapes $ patterns using function replacement to prevent variable corruption.
 */
export function buildGepaReflectionPrompt(currentPrompt, userInputs, assistantOutputs, feedbackList) {
  let sideInfo = "";
  for (let i = 0; i < userInputs.length; i++) {
    sideInfo += `### Sample ${i + 1}\n`;
    sideInfo += `Inputs: ${userInputs[i]}\n`;
    sideInfo += `Generated Outputs: ${assistantOutputs[i]}\n`;
    sideInfo += `Feedback: ${feedbackList[i]}\n\n`;
  }
  
  return GEPA_PROMPT_TEMPLATE
    .replace("<curr_param>", () => currentPrompt)
    .replace("<side_info>", () => sideInfo);
}
