from flask import Flask, jsonify, request
from flask_cors import CORS
from PyPDF2 import PdfReader
import speech_recognition as sr
from pydub import AudioSegment
from openai import OpenAI
import json
import os

client = OpenAI(api_key='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')

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

def generate_unique_filename(filename):
    base, ext = os.path.splitext(filename)
    index = 1
    while os.path.exists(f"{base}_{index}.txt"):
        index += 1
    return f"{base}_{index}.txt"

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

    # Check if the file is a PDF or MP3
    if not file.filename.endswith('.pdf') and not file.filename.endswith('.mp3'):
        return jsonify({'error': 'Only PDF and mp3 files are supported'})

    if file.filename.endswith('.mp3'):
        sound = AudioSegment.from_mp3("transcript.mp3")
        sound.export("transcript.wav", format="wav")
        AUDIO_FILE = "transcript.wav"
        r = sr.Recognizer()
        with sr.AudioFile(AUDIO_FILE) as source:
            audio = r.record(source)  # read the entire audio file                  

            print("Transcription: " + r.recognize_google(audio))

    # Extract text from the PDF file
    pdf_text = extract_text_from_pdf(file)

    with open('extracted_text.txt', 'w') as f:
        f.write(pdf_text)

    # Generate a unique filename based on the uploaded file name
    converted_filename = generate_unique_filename(file.filename)

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

    json_text = json.dumps(text)

    # Generate a unique filename
    converted_filename = generate_unique_filename(file.filename)

    completion = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a study guide generator. I will provide you documents of lecture notes, homework assignments, and syllabi. You will generate a detailed study guide based on this information. It should give a timeline, study tips, and a schedule. It should also provide similar practice queestions and highlight/emphasize important topics."},
            {"role": "user", "content": json_text}
        ]
    )

    # Write completion to a unique filename
    with open(converted_filename, 'w') as f:
        f.write(str(completion.choices[0].message))

    return str(completion.choices[0].message)

if __name__ == '__main__':
    app.run(debug=True)
