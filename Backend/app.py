from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import pandas as pd
import os
import string
import nltk
from nltk.corpus import stopwords

# Initialize the Flask app and enable CORS
app = Flask(__name__)
CORS(app)

# Load the model and vectorizer from pickle files
with open('spam_detector_model.pkl', 'rb') as model_file:
    model = pickle.load(model_file)

with open('vectorizer.pkl', 'rb') as vectorizer_file:
    vectorizer = pickle.load(vectorizer_file)

# Download NLTK stopwords if not already available
nltk.download('stopwords')

# Text cleaning function
def clean_text(text):
    text = text.lower()
    text = ''.join([char for char in text if char not in string.punctuation])
    words = text.split()
    words = [word for word in words if word not in stopwords.words('english')]
    return ' '.join(words)

# Define the prediction endpoint
@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    message = data.get('message', '')

    cleaned_message = clean_text(message)
    transformed_message = vectorizer.transform([cleaned_message])

    prediction = model.predict(transformed_message)
    category = 'spam' if prediction[0] == 1 else 'ham'

    return jsonify({'message': message, 'prediction': category})

# Run the app
if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    app.run(debug=True, host="0.0.0.0", port=port)
