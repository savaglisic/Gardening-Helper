from flask import Flask, request, jsonify
from flask_cors import CORS
import subprocess
import re

app = Flask(__name__)
#CORS(app, origins=['http://localhost:54722/'])
CORS(app)



@app.route('/api/search/<search_term>', methods=['GET'])
def search(search_term):
    # Your search implementation here
    # For example, search a database or file and return the results
    print(search_term)
    cmd = ['go', 'run', 'main.go', '1', search_term]
    result = subprocess.run(cmd, stdout=subprocess.PIPE)
    print(result)

    search_results = [search_term + " 1", search_term + " 2", search_term + " 3"]
    return jsonify(search_results)

if __name__ == '__main__':
    app.run(debug=True)

