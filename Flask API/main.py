from flask import Flask, request, jsonify
from flask_cors import CORS
import subprocess
import json
import re

app = Flask(__name__)
#CORS(app, origins=['http://localhost:54722/'])
CORS(app)

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


if __name__ == '__main__':
    app.run(debug=True)

