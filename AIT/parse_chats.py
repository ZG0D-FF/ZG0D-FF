import os
import re
import json
import random

chat_dir = 'c:/Users/zgodm/Desktop/CV - Copy/AIT/WhatsApp_Chats'

sender_map = {
    'Kausal Dada MCA': 'Dada',
    'Sparsho Da MCA': 'Dada',
    'Shagufta Iem 🌸💐 DIDI': 'Didi',
    'SHYAMA DIDI MCA': 'Didi',
    'MR ZGOD': 'Me'
}

# Regex to match WhatsApp chat lines: e.g. 13/06/26, 9:57 am - MR ZGOD: Hello
pattern = re.compile(r'^\d{2}/\d{2}/\d{2}, \d{1,2}:\d{2}\u202f?[a|p]m - (.*?): (.*)', re.IGNORECASE)

all_messages = []
seen_texts = set()

for filename in os.listdir(chat_dir):
    if not filename.endswith('.txt'): continue
    filepath = os.path.join(chat_dir, filename)
    with open(filepath, 'r', encoding='utf-8') as f:
        lines = f.readlines()
        
    current_sender = None
    current_msg = []
    
    for line in lines:
        match = pattern.match(line)
        if match:
            # Save previous message
            if current_sender and current_msg:
                msg_text = '\n'.join(current_msg).strip()
                if msg_text and "<Media omitted>" not in msg_text and len(msg_text) > 4:
                    if msg_text not in seen_texts:
                        all_messages.append({'sender': current_sender, 'text': msg_text})
                        seen_texts.add(msg_text)
            
            # Start new message
            raw_sender = match.group(1).strip()
            # Map sender
            mapped = None
            for key in sender_map:
                if key.lower() in raw_sender.lower() or raw_sender.lower() in key.lower():
                    mapped = sender_map[key]
                    break
            
            if mapped:
                current_sender = mapped
                current_msg = [match.group(2).strip()]
            else:
                current_sender = None
                current_msg = []
        else:
            # Continuation of previous message
            if current_sender:
                current_msg.append(line.strip())

    # Save the last one
    if current_sender and current_msg:
        msg_text = '\n'.join(current_msg).strip()
        if msg_text and "<Media omitted>" not in msg_text and len(msg_text) > 4:
            if msg_text not in seen_texts:
                all_messages.append({'sender': current_sender, 'text': msg_text})
                seen_texts.add(msg_text)

# We want "enough texts so they remember it lifetime". Let's shuffle them to be random but unique.
random.shuffle(all_messages)

print(f"Total unique meaningful messages extracted: {len(all_messages)}")

# Output array for JS
with open('c:/Users/zgodm/Desktop/CV - Copy/AIT/wa_messages.json', 'w', encoding='utf-8') as out:
    json.dump(all_messages, out, ensure_ascii=False, indent=2)
