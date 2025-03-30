from flask import Flask, request, jsonify, render_template
import numpy as np
import pickle

app = Flask(__name__)

# Load trained model & scaler
model = pickle.load(open("model.pkl", "rb"))
scaler = pickle.load(open("scaler.pkl", "rb"))

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.json
        features = np.array([[data['square_feet'], data['bedrooms'], data['bathrooms'], data['age']]])
        
        # Standardize input
        features_scaled = scaler.transform(features)
        
        # Predict price
        price = model.predict(features_scaled)[0]
        
        return jsonify({"predicted_price": round(price, 2)})
    
    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == "__main__":
    app.run(debug=True)