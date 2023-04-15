import re
from flask import Flask, render_template, request, redirect, url_for
import openai

app = Flask(__name__)

openai.api_key = "OPENAI_API_KEY"
model = "text-davinci-002"  # change the model as needed



@app.route("/", methods=("GET", "POST"))
def index():
    if request.method == "POST":
        plant = request.form["plant"]
        response = openai.Completion.create(
            model="text-davinci-003",
            prompt=generate_prompt(plant),
            temperature=0.6,
            max_tokens=250,
        )
        return redirect(url_for("index", result=response.choices[0].text))

    result = request.args.get("result")
    return render_template("index.html", result=result)


def generate_prompt(plant):
    return """Provide the following one line details for the given plant.
    
    Plant name: Cucumber\n
    Plant name: Cucumber\n
    Scientific name: Cucumis sativus\n
    Flower type: Yellow\n
    Seed types: Monoecious or dioecious, depending on the cultivar\n
    Season type: Warm season crop\n
    Preferred soil type: Well-drained, fertile soil\n
    Preferred pH level: 6.0-7.0\n
    Preferred nutrition: Balanced fertilizer with more emphasis on nitrogen\n
    Harvest time: 50-70 days after sowing\n
    Plant compatibility: Avoid planting with aromatic herbs or nightshades.\n
    Plant: {}""".format(
        plant.capitalize()
    )


if __name__ == "__main__":
    app.run(debug=True, port=5001)
