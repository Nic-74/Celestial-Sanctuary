import json
import time
import os
from flask import Flask, request, jsonify
from flask_cors import CORS

# --- Configuration ---
app = Flask(__name__)
CORS(app)  # Allows your index.html to talk to this server
DATABASE_FILE = 'database.json'

# --- Helper Functions ---
def read_data():
    """Reads the entire database from the JSON file."""
    try:
        with open(DATABASE_FILE, 'r', encoding='utf-8') as f:
            return json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        # If file is missing or empty, create a default structure
        if not os.path.exists(DATABASE_FILE) or os.path.getsize(DATABASE_FILE) == 0:
            write_data({"tome": [], "gallery": [], "discover": [], "timeline": [], "music": [], "universes": [], "voice_garden": []})
        return {} # Return empty if file doesn't exist

def write_data(data):
    """Writes the entire database to the JSON file."""
    with open(DATABASE_FILE, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

def generate_id(prefix):
    """Generates a simple unique ID."""
    return f"{prefix}_{int(time.time() * 1000)}"

# --- API Routes ---

# [GET] Read all data for initial page load
@app.route('/api/all-data', methods=['GET'])
def get_all_data():
    """Sends all data from database.json to the JavaScript frontend."""
    data = read_data()
    return jsonify(data)

# ---
# Generic CRUD Routes for any data type (e.g., gallery, discover, timeline)
# ---

@app.route('/api/<data_type>', methods=['GET'])
def get_items(data_type):
    """Gets all items for a given data type."""
    data = read_data()
    items = data.get(data_type, [])
    return jsonify(items)

@app.route('/api/<data_type>', methods=['POST'])
def add_item(data_type):
    """Adds a new item to a given data type collection."""
    new_item_data = request.json
    new_item_data['id'] = generate_id(data_type)
    
    data = read_data()
    if data_type not in data:
        data[data_type] = []
        
    data[data_type].append(new_item_data)
    write_data(data)
    
    return jsonify(new_item_data), 201

@app.route('/api/<data_type>/<item_id>', methods=['PUT'])
def update_item(data_type, item_id):
    """Updates an item in a given data type collection by its ID."""
    updated_data = request.json
    data = read_data()
    
    items = data.get(data_type, [])
    for i, item in enumerate(items):
        if item.get('id') == item_id:
            items[i].update(updated_data)
            write_data(data)
            return jsonify(items[i])
            
    return jsonify({'status': 'error', 'message': 'Item not found'}), 404

@app.route('/api/<data_type>/<item_id>', methods=['DELETE'])
def delete_item(data_type, item_id):
    """Deletes an item from a given data type collection by its ID."""
    data = read_data()
    items = data.get(data_type, [])
    initial_length = len(items)
    data[data_type] = [item for item in items if item.get('id') != item_id]
    
    if len(data[data_type]) < initial_length:
        write_data(data)
        return jsonify({'status': 'success', 'message': f'Item {item_id} deleted.'})
    else:
        return jsonify({'status': 'error', 'message': 'Item not found.'}), 404

# ---
# [CREATE] Add a new chapter
# ---
@app.route('/api/tome', methods=['POST'])
def add_chapter():
    """Receives a new chapter from JavaScript and saves it."""
    new_chapter_data = request.json  # Get the data (title, author, content, etc.)
    
    # Generate a unique ID
    new_chapter_data['id'] = generate_id('tome')
    
    data = read_data()
    if 'tome' not in data:
        data['tome'] = []
        
    data['tome'].append(new_chapter_data)
    write_data(data)
    
    return jsonify(new_chapter_data), 201 # 201 means "Created"

# ---
# [UPDATE] Edit an existing chapter
# ---
@app.route('/api/tome/<chapter_id>', methods=['PUT'])
def update_chapter(chapter_id):
    """Finds a chapter by its ID and updates it with new data."""
    updated_data = request.json
    data = read_data()
    
    chapter_found = False
    for i, chapter in enumerate(data.get('tome', [])):
        if chapter.get('id') == chapter_id:
            # Update the chapter in the list
            data['tome'][i].update(updated_data)
            chapter_found = True
            break
            
    if chapter_found:
        write_data(data)
        return jsonify(data['tome'][i])
    else:
        return jsonify({'status': 'error', 'message': 'Chapter not found'}), 404

# ---
# [DELETE] Remove a chapter
# ---
@app.route('/api/tome/<chapter_id>', methods=['DELETE'])
def delete_chapter(chapter_id):
    """Finds a chapter by its ID and removes it."""
    data = read_data()
    
    initial_length = len(data.get('tome', []))
    # This is a fast, Pythonic way to remove an item from a list
    data['tome'] = [chap for chap in data.get('tome', []) if chap.get('id') != chapter_id]
    
    if len(data['tome']) < initial_length:
        write_data(data)
        return jsonify({'status': 'success', 'message': f'Chapter {chapter_id} deleted.'})
    else:
        return jsonify({'status': 'error', 'message': 'Chapter not found.'}), 404

# --- Run the Server ---
if __name__ == '__main__':
    app.run(debug=True, port=5000)