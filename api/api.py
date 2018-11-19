import time
from flask import Flask
from flask import jsonify
from flask import request
from sideeye import parser

app = Flask(__name__)

@app.route("/")
def hello():
    return "Hello World! This is powered by Python backend."

@app.route("/region_cnt", methods=['POST'])
def test():
    try:
        print(request.content_type)
        json = request.form
        print(json)
        items = parser.region.file(json['file_name'], json['number_location'], json['condition_location'], json['includes_y'])
        print(items)
        return (items, 200)
    except Exception as e:
        return (str(e), 500)

@app.after_request
def after_request(response):
  response.headers.add('Access-Control-Allow-Origin', '*')
  response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
  response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  return response

if __name__ == "__main__":
    app.run(host='127.0.0.1', port=3001)
