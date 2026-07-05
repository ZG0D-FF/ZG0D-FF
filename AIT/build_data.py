import os
import json
import re
from collections import defaultdict

def build_data():
    captions_file = 'captions.txt'
    images_dir = 'ME AND DADADIDI'
    output_file = 'data.js'
    
    if not os.path.exists(images_dir):
        print(f"Error: Directory '{images_dir}' not found.")
        return

    # Dictionary mapping 'filename' -> 'relative_path_for_html'
    actual_images = {}
    
    # Recursively find all images in ME AND DADADIDI and its subdirectories (like DADADIDI/)
    for root_dir, _, files in os.walk(images_dir):
        for file in files:
            # Create a path relative to the base directory where index.html lives
            rel_path = os.path.join(root_dir, file).replace('\\', '/')
            actual_images[file] = f"./{rel_path}"
    
    if not os.path.exists(captions_file):
        print(f"Error: File '{captions_file}' not found.")
        return
        
    with open(captions_file, 'r', encoding='utf-8') as f:
        lines = f.readlines()
        
    time_pattern = re.compile(r'WhatsApp Image (.*?)(\s\(\d+\))?\.jpe?g', re.IGNORECASE)
    
    events = defaultdict(list)
    
    matched_count = 0
    missing_images = []
    
    for line in lines:
        line = line.strip()
        if not line or '|' not in line:
            continue
            
        filename, caption = line.split('|', 1)
        filename = filename.strip()
        caption = caption.strip()
        
        # Match exactly or fallback between .jpg and .jpeg
        if filename in actual_images:
            mapped_filename = filename
        elif filename.endswith('.jpg') and filename.replace('.jpg', '.jpeg') in actual_images:
            mapped_filename = filename.replace('.jpg', '.jpeg')
        elif filename.endswith('.jpeg') and filename.replace('.jpeg', '.jpg') in actual_images:
            mapped_filename = filename.replace('.jpeg', '.jpg')
        else:
            mapped_filename = None

        if mapped_filename:
            match = time_pattern.search(mapped_filename)
            if match:
                timestamp = match.group(1)
                if "2026-07-04 at 4.33" in timestamp:
                    timestamp = "2026-07-04 at 11.59.00 PM"
            else:
                timestamp = "Unknown Time"
                
            events[timestamp].append({
                # This uses the correct subfolder path we mapped earlier
                "src": actual_images[mapped_filename],
                "caption": caption
            })
            matched_count += 1
        else:
            missing_images.append(filename)
            
    from datetime import datetime
    
    # Parse timestamps for sorting
    def parse_time(ts_str):
        if "Unknown Time" in ts_str:
            return datetime.max
        # ts_str format: "2026-07-04 at 4.33.40 PM" or "2026-06-29 at 9.00.43 PM"
        # Wait, some have "(1)" etc? No, timestamp comes from time_pattern which strips that.
        # But wait, there might be slight variations like "2026-06-29 at 9.00.43 PM" or "2026-06-29 at 9.00 PM"?
        # Let's try standard parsing.
        try:
            # We matched: r'WhatsApp Image (.*?)(\s\(\d+\))?\.jpe?g'
            # e.g., "2026-06-29 at 12.14.40 AM"
            return datetime.strptime(ts_str.strip(), "%Y-%m-%d at %I.%M.%S %p")
        except ValueError:
            pass
        return datetime.max

    ordered_events = []
    for ts in events.keys():
        ordered_events.append({
            "time": ts,
            "photos": events[ts]
        })
        
    ordered_events.sort(key=lambda x: parse_time(x['time']))
    
    js_content = f"const tripData = {json.dumps(ordered_events, indent=2, ensure_ascii=False)};\n"
    
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(js_content)
        
    print(f"Successfully generated {output_file}")
    print(f"Mapped {matched_count} images total (including original and new batch).")
    if missing_images:
        print(f"Missing {len(missing_images)} images:")
        for m in missing_images:
            print(f" - {m}")

if __name__ == '__main__':
    build_data()
