import os
from flask import Flask
from flask import jsonify, request
import sideeye


app = Flask(__name__)


@app.route("/test")
def test():
    return jsonify(test="test")


@app.route("/sideeye", methods=["POST"])
def process_file():
    file = request.json["file"]
    with open(file) as f:
        print(f.read())

    config = request.json["config"]
    region_file = request.json["region_file"]
    files = request.json["files"]

    cfg = sideeye.config.Configuration(config)
    experiments = sideeye.parser.experiment.parse_files(files, region_file, cfg)
    out = sideeye.calculate_all_measures(experiments, None, cfg)
    return jsonify(out=out)

    # print(request.form["file"])
    # check if the post request has the file part
    # if 'file' not in request.files:
    #     flash('No file part')
    #     return redirect(request.url)
    # file = request.files['file']
    # # if user does not select file, browser also
    # # submit an empty part without filename
    # if file.filename == '':
    #     flash('No selected file')
    #     return redirect(request.url)
    # if file and allowed_file(file.filename):
    #     filename = secure_filename(file.filename)
    #     file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
    #     return redirect(url_for('uploaded_file',
    #                             filename=filename))


@app.after_request
def after_request(response):
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add("Access-Control-Allow-Headers", "Content-Type,Authorization")
    response.headers.add("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS")
    return response


if __name__ == "__main__":
    print(os.path.dirname(__file__))
    app.run(host="127.0.0.1", port=3001)
