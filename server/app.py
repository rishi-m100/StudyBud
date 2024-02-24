from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

@app.route('/api/data')
def hello():
    return 'NO  , =!'


if __name__ == '__main__':
    app.run(debug=True)
