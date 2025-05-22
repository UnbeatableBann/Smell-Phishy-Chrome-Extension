from flask import Flask, request, jsonify
from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch
from flask_cors import CORS

app = Flask(__name__)
CORS(app) # Allow CORS for all routes

# Load the phishing detection model
tokenizer = AutoTokenizer.from_pretrained("ealvaradob/bert-finetuned-phishing")
model = AutoModelForSequenceClassification.from_pretrained("ealvaradob/bert-finetuned-phishing")

def check_url(url):
    return True  # Placeholder for URL checking

def check_attachment(attachment):
    return True  # Placeholder for attachment checking

def check_text(text):
    inputs = tokenizer(text, return_tensors="pt", truncation=True, padding=True)
    with torch.no_grad():
        outputs = model(**inputs)
    prediction = torch.argmax(outputs.logits, dim=1).item()
    return prediction == 1  # Assuming 1 is phishing, 0 is safe

@app.route('/check', methods=['POST'])
def check():
    data = request.json
    url= data.get('urls')
    attachment=data.get('attachments')
    body=data.get('text')
    if not data or 'text' not in data:
        return jsonify({"error": "No text provided"}), 400
    
    result = check_text(body)
    return jsonify({"is_phishing": result})

@app.route('/popup_check', methods=['POST'])
def popup_check():
    data = request.json
    body=data.get('text')
    if not data or 'text' not in data:
        return jsonify({"error": "No text provided"}), 400
    
    result = check_text(body)
    return jsonify({"is_phishing": result})

if __name__ == '__main__':
    app.run(debug=True)
