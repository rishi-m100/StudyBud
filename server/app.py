from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

# Define a route to handle file uploads
@app.route('/api/upload', methods=['POST'])
def upload():
    # Check if the request contains a file
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'})

    file = request.files['file']

    # Check if the file is empty
    if file.filename == '':
        return jsonify({'error': 'No selected file'})

    # You can save the file to the server or process it as needed
    # For example, save the file to a specific directory
    # file.save('/path/to/save/' + secure_filename(file.filename))

    # For simplicity, let's return a success message
    return jsonify({'message': 'File uploaded successfully'})

if __name__ == '__main__':
    app.run(debug=True)
