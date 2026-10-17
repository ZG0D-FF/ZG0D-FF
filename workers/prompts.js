/**
 * ═══════════════════════════════════════
 * PROMPTS.JS (PHASE 5 OPTIMIZED)
 * ═══════════════════════════════════════
 * All static strings have been DELETED to free up Worker Memory.
 * Everything is now dynamically injected from Cloudflare KV or Supabase!
 */

export function buildDynamicPrompt(masterPromptMarkdown, kvNodeData, userProfile, audioTriggersMarkdown, chatHistory) {
    
    // 1. Start with the Master Prompt fetched from KV / Supabase
    let finalPrompt = masterPromptMarkdown || "ERROR: Master Prompt missing from KV/DB.";
    
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