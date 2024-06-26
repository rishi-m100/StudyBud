from flask import Flask, jsonify, request
from flask_cors import CORS
from PyPDF2 import PdfReader
import speech_recognition as sr
from pydub import AudioSegment
from openai import OpenAI
import json
import os
from dotenv import load_dotenv
import string


# load_dotenv()

# key = os.getenv("OPENAI_API_KEY")


def get_key():
    return key

client = OpenAI(api_key=get_key)

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
    print("2")

    # Check if the file is empty
    if file.filename == '':
        return jsonify({'error': 'No selected file'})

    # Check if the file is a PDF or MP3
    if not file.filename.endswith('.pdf') and not file.filename.endswith('.mp3'):
        return jsonify({'error': 'Only PDF and mp3 files are supported'})

    if file.filename.endswith('.mp3'):
        sound = AudioSegment.from_mp3(file.stream)
        sound.export("transcript.wav", format="wav")
        AUDIO_FILE = "transcript.wav"
        r = sr.Recognizer()
        with sr.AudioFile(AUDIO_FILE) as source:
            audio = r.record(source, duration=100)  # read the entire audio file                  
            print(audio)
            print("Transcription: " + r.recognize_google(audio))
            text=r.recognize_google(audio)
            text = str(text)
            print(type(text)) 
            
        converted_filename = generate_unique_filename(file.filename)
        completion = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a study guide generator. I will provide you a transcription of a lectire video. You will generate a detailed study guide based on this information. It should give a timeline, study tips, and a schedule. It should also provide similar practice queestions and highlight/emphasize important topics."},
            {"role": "user", "content": text}
        ]
        )
        print("3")

    # Write completion to a unique filename
        with open(converted_filename, 'w') as f:
            string = str(completion.choices[0].message)
            string = string.replace('\\n', '\n')
            string = string.replace("ChatCompletionMessage(content='","")
            string = string.replace("role='assistant', function_call=None, tool_calls=None)","")
            f.write(string)

        with open('extracted_text.txt', 'w') as f:
            f.write(text)
        response = jsonify({'text': string})

    # Extract text from the PDF file
    else:
        pdf_text = extract_text_from_pdf(file)

        with open('extracted_text.txt', 'w') as f:
            f.write(pdf_text)

    # Generate a unique filename based on the uploaded file name

    # Return the extracted text
        response = jsonify({'text': pdf_text})
    response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')  # Add CORS header
    
    converted_filename = generate_unique_filename(file.filename)

    return response


def extract_text_from_pdf(file):
    # Create a PdfReader object
    pdf_reader = PdfReader(file)

    # Initialize an empty list to store the lines of extracted text
    lines = []

    # Iterate through each page in the PDF and extract text
    for page_num in range(len(pdf_reader.pages)):
        page_text = pdf_reader.pages[page_num].extract_text()

        # Split the page text into lines based on the newline character
        page_lines = page_text.split('\n')

        # Extend the lines list with the lines from the current page
        lines.extend(page_lines)

    # Join the lines with newline characters to create the formatted text
    formatted_text = '\n'.join(lines)

    json_text = json.dumps(formatted_text)

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
        string = str(completion.choices[0].message)
        string = string.replace('\\n', '\n')
        string = string.replace("ChatCompletionMessage(content='","")
        string = string.replace("role='assistant', function_call=None, tool_calls=None)","")
        f.write(string)

    return string


if __name__ == '__main__':
    app.run(debug=True)
