from flask import Flask, jsonify, request
from flask_cors import CORS
# import PyPDF2
from PyPDF2 import PdfReader

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

# Define a route to handle file uploads
@app.route('/api/upload', methods=['POST'])
def upload():
    print("Upload endpoint called")
    # Check if the request contains a file
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'})

    file = request.files['file']

    # Check if the file is empty
    if file.filename == '':
        return jsonify({'error': 'No selected file'})

    # Check if the file is a PDF
    if not file.filename.endswith('.pdf'):
        return jsonify({'error': 'Only PDF files are supported'})

    # Extract text from the PDF file
    pdf_text = extract_text_from_pdf(file)

    with open('extracted_text.txt', 'w') as f:
        f.write(pdf_text)
    # Return the extracted text
    response = jsonify({'text': pdf_text})
    response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')  # Add CORS header
    return response


def extract_text_from_pdf(file):
    # Create a PdfReader object
    pdf_reader = PdfReader(file)

    # Initialize an empty string to store the extracted text
    text = ''

    # Iterate through each page in the PDF and extract text
    for page_num in range(len(pdf_reader.pages)):
        text += pdf_reader.pages[page_num].extract_text()

    return text

if __name__ == '__main__':
    app.run(debug=True)
