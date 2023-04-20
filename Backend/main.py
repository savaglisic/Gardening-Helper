from flask import Flask, request, jsonify
from flask_cors import CORS
import subprocess
import json
import re
import openai
from collections import OrderedDict

app = Flask(__name__)
CORS(app)
openai.api_key = "OPEN_AI_API_KEY"
model = "text-davinci-002"

def read_user_data():
    with open('user_data.json', 'r') as f:
        user_data = json.load(f)
    return user_data

@app.route('/login', methods=['POST'])
def login():
    login_data = request.get_json()
    email = login_data.get('email')
    password = login_data.get('password')

    user_data = read_user_data()

    for user in user_data:
        if user['email'] == email and user['password'] == password:
            return jsonify({"message": "Login successful!"}), 200
    return jsonify({"message": "Invalid email or password."}), 401

def save_user_data(user_data):
    file_name = 'user_data.json'
    data = []

    try:
        with open(file_name, 'r') as f:
            data = json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        pass

    # Check if the email already exists
    email_exists = any(item['email'] == user_data['email'] for item in data)

    if not email_exists:
        data.append(user_data)
        with open(file_name, 'w') as f:
            json.dump(data, f, indent=2)
        return True
    else:
        return False


@app.route('/signup', methods=['POST'])
def signup():
    user_data = request.get_json()
    print(user_data)
    #email = user_data.get('email')
    #print("Email:", email)
    save_user_data(user_data)
    return jsonify({"message": "User data received"}), 200

def update_user_data(email, updated_user):
    file_name = 'user_data.json'
    data = []

    try:
        with open(file_name, 'r') as f:
            data = json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        pass

    for i, user in enumerate(data):
        if user['email'] == email:
            data[i] = updated_user
            with open(file_name, 'w') as f:
                json.dump(data, f, indent=2)
            return True

    return False

@app.route('/add-to-garden', methods=['POST'])
def add_to_garden():
    data = request.get_json()
    email = data.get('email')
    plant = data.get('plant')

    user_data = read_user_data()

    for user in user_data:
        if user['email'] == email:
            if 'garden' not in user:
                user['garden'] = []
            user['garden'].append(plant)
            update_user_data(email, user)
            return jsonify({"message": "Plant added to garden", "plant": plant}), 200

    return jsonify({"message": "User not found"}), 404

@app.route('/get-garden', methods=['GET'])
def get_garden():
    email = request.args.get('email')

    user_data = read_user_data()

    for user in user_data:
        if user['email'] == email:
            garden = user.get('garden', [])
            return jsonify({"message": "Garden data retrieved", "garden": garden}), 200

    return jsonify({"message": "User not found"}), 404

@app.route('/remove-from-garden', methods=['POST'])
def remove_from_garden():
    data = request.get_json()
    email = data.get('email')
    plant = data.get('plant')

    user_data = read_user_data()

    for user in user_data:
        if user['email'] == email:
            user['garden'] = [p for p in user.get('garden', []) if p != plant]
            update_user_data(email, user)
            return jsonify({"message": "Plant removed from garden", "plant": plant}), 200

    return jsonify({"message": "User not found"}), 404

@app.route('/save-garden-changes', methods=['POST'])
def save_garden_changes():
    data = request.get_json()
    email = data.get('email')
    updated_garden = data.get('garden')

    user_data = read_user_data()

    for user in user_data:
        if user['email'] == email:
            user['garden'] = updated_garden
            update_user_data(email, user)
            return jsonify({"message": "Garden changes saved successfully"}), 200

    return jsonify({"message": "User not found"}), 404

@app.route('/search', methods=['GET'])
def search_plants():
    query = request.args.get('query')
    print(f"Search query: {query}")

    cmd = ['go', 'run', 'main.go', '1', query]
    result = subprocess.run(cmd, stdout=subprocess.PIPE)
    output = result.stdout.decode('utf-8')
    print(output)

    # Parse the output
    common_name_pattern = re.compile(r"Common Name: (.+)")
    scientific_name_pattern = re.compile(r"Scientific Name: (.+)")

    common_names = common_name_pattern.findall(output)
    scientific_names = scientific_name_pattern.findall(output)

    search_results = []
    for common_name, scientific_name in zip(common_names, scientific_names):
        search_results.append({
            "name": common_name,
            "scientificName": scientific_name
        })

    response = {
        "message": "Search results",
        "data": search_results
    }

    return jsonify(response), 200

def generate_prompt(plant):
    return """Provide the following one line details for the given plant.
    
    Plant name: Cucumber\n
    Scientific name: Cucumis sativus\n
    Flower type: Yellow\n
    Seed types: Monoecious or dioecious, depending on the cultivar\n
    Season type: Warm season crop\n
    Preferred soil type: Well-drained, fertile soil\n
    Preferred pH level: 6.0-7.0\n
    Preferred nutrition: Balanced fertilizer with more emphasis on nitrogen\n
    Harvest time: 50-70 days after sowing\n
    Planting Season: Summer
    Harvest Season: Winter
    Shade Requirements: None
    Plant compatibility: Avoid planting with aromatic herbs or nightshades.\n
    Plant: {}""".format(
        plant.capitalize()
    )

@app.route('/get-tips', methods=['POST'])
def get_tips():
    data = request.get_json()
    plant = data.get('plant')
    plant = str(plant)
    start = plant.find('name')
    end = plant.find('notes')
    plant = plant[start+8:end-4]
    print(plant)

    if plant:
        prompt = generate_prompt(plant)
        response = openai.Completion.create(engine=model, prompt=prompt, max_tokens=150, n=1, stop=None, temperature=0.5)
        text = response.choices[0].text.strip()

        lines = text.split('\n')
        details = [line.split(':', 1) for line in lines if ':' in line]

        # Convert the details to an OrderedDict with keys and values
        formatted_details = [OrderedDict([('key', key.strip()), ('value', value.strip())]) for key, value in details]

        result = {
            "name": plant,
            "details": formatted_details
        }
        return jsonify(result), 200
    else:
        return jsonify({"message": "Plant not provided"}), 400

if __name__ == '__main__':
    app.run(debug=True)

