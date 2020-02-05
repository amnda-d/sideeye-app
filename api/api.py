import os
from flask import Flask
from flask import jsonify, request, make_response
import sideeye


app = Flask(__name__)


@app.route("/sideeye", methods=["POST"])
def process_file():
    config = request.json["config"]
    region_file = request.json["region_file"]
    files = request.json["files"]

    cfg = sideeye.config.Configuration(config)
    experiments = sideeye.parser.experiment.parse_files(files, region_file, cfg)
    out = sideeye.calculate_all_measures(experiments, None, cfg)

    output = make_response(out)
    output.headers["Content-Disposition"] = "attachment; filename=output.csv"
    output.headers["Content-type"] = "text/csv"
    return output


@app.after_request
def after_request(response):
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add("Access-Control-Allow-Headers", "Content-Type,Authorization")
    response.headers.add("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS")
    return response


if __name__ == "__main__":
    print(os.path.dirname(__file__))
    app.run(host="127.0.0.1", port=3001)
