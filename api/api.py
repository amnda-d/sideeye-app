import time
from flask import Flask

app = Flask(__name__)

@app.route("/")
def hello():
    return "Hello World! This is powered by Python backend."

@app.route("/test")
def test():
    return "test 2"

@app.after_request
def after_request(response):
  response.headers.add('Access-Control-Allow-Origin', '*')
  response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
  response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  return response

if __name__ == "__main__":
    app.run(host='127.0.0.1', port=5000)
