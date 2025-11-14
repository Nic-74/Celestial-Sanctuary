import json
import time
import uuid

DATABASE_FILE = 'database.json'

# Function to generate a unique ID
def generate_id(prefix):
    # Combine prefix with a timestamp-based UUID for uniqueness
    return f"{prefix}_{uuid.uuid4().hex[:8]}"

# Read the database
try:
    with open(DATABASE_FILE, 'r', encoding='utf-8') as f:
        data = json.load(f)
    print("Database loaded...")

    # --- Add IDs to Tome ---
    if 'tome' in data and data['tome']:
        print(f"Updating {len(data['tome'])} tome chapters...")
        for i, item in enumerate(data['tome']):
            if 'id' not in item or not item['id']:
                item['id'] = generate_id(f'tome_{i}')
    
    # --- Add IDs to Gallery ---
    if 'gallery' in data and data['gallery']:
        print(f"Updating {len(data['gallery'])} gallery items...")
        for i, item in enumerate(data['gallery']):
            if 'id' not in item or not item['id']:
                item['id'] = generate_id(f'gallery_{i}')

    # --- Add IDs to Discover ---
    if 'discover' in data and data['discover']:
        print(f"Updating {len(data['discover'])} discover items...")
        for i, item in enumerate(data['discover']):
            if 'id' not in item or not item['id']:
                item['id'] = item.get('id') or generate_id(f'discover_{i}')
    
    # --- Add IDs to Timeline ---
    if 'timeline' in data and data['timeline']:
        print(f"Updating {len(data['timeline'])} timeline items...")
        for i, item in enumerate(data['timeline']):
            if 'id' not in item or not item['id']:
                item['id'] = generate_id(f'timeline_{i}')
    
    # --- Add IDs to Music ---
    if 'music' in data and data['music']:
        print(f"Updating {len(data['music'])} music items...")
        for i, item in enumerate(data['music']):
            if 'id' not in item or not item['id']:
                item['id'] = generate_id(f'music_{i}')

    # Write the updated data back
    with open(DATABASE_FILE, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False) # Use indent=2 to match your file
        
    print("All items in database.json now have unique IDs!")

except FileNotFoundError:
    print("Error: database.json not found. Make sure it's in the same folder.")
except Exception as e:
    print(f"An error occurred: {e}")