import os
import glob
from PIL import Image
from pillow_heif import register_heif_opener

# Register HEIF opener so PIL can read HEIC files
register_heif_opener()

def convert_all_heic():
    base_dir = "c:/Users/zgodm/Desktop/CV - Copy/AIT"
    
    # Find all HEIC files recursively
    heic_files = []
    # os.walk to find all heic files case-insensitive
    for root, dirs, files in os.walk(base_dir):
        for f in files:
            if f.lower().endswith(".heic"):
                heic_files.append(os.path.join(root, f))
                
    if not heic_files:
        print("No HEIC files found.")
        return
        
    print(f"Found {len(heic_files)} HEIC files. Converting to JPG...")
    
    converted = 0
    failed = 0
    
    for heic_path in heic_files:
        try:
            # Open HEIC
            image = Image.open(heic_path)
            
            # Create JPG path
            base_path = os.path.splitext(heic_path)[0]
            jpg_path = base_path + ".jpg"
            
            # Convert and save
            image.convert('RGB').save(jpg_path, "JPEG")
            
            # Optional: remove original HEIC
            os.remove(heic_path)
            converted += 1
            print(f"Converted {os.path.basename(heic_path)} to JPG.")
        except Exception as e:
            print(f"Failed to convert {heic_path}: {e}")
            failed += 1
            
    print(f"\nDone! Successfully converted {converted} files. Failed: {failed}")

if __name__ == "__main__":
    convert_all_heic()
