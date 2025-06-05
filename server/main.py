from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import tensorflow as tf
import pickle
import numpy as np
from tensorflow.keras.preprocessing.sequence import pad_sequences
import logging

# -------------------------
# ✅ Configuration & Logging
# -------------------------
MAX_LEN = 100  # Must match model training
logging.basicConfig(level=logging.INFO)

# -------------------------
# ✅ Load Model and Tokenizer
# -------------------------
model = tf.keras.models.load_model("emotion_lstm_model.h5")

with open("tokenizer.pkl", "rb") as f:
    tokenizer = pickle.load(f)

with open("label_encoder.pkl", "rb") as f:
    label_encoder = pickle.load(f)

# -------------------------
# ✅ Define Input Schema
# -------------------------
class TextInput(BaseModel):
    text: str

# -------------------------
# ✅ Initialize FastAPI App
# -------------------------
app = FastAPI()

# -------------------------
# ✅ Enable CORS
# -------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Replace "*" with your frontend domain in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------------
# ✅ Health Check Route
# -------------------------
@app.get("/")
def read_root():
    return {"message": "Emotion detection API is running!"}

# -------------------------
# ✅ Emotion Prediction Route
# -------------------------
@app.post("/predict-emotion")
def predict_emotion(input: TextInput):
    try:
        logging.info(f"Received text: {input.text}")

        # Preprocess input
        sequence = tokenizer.texts_to_sequences([input.text])
        padded = pad_sequences(sequence, maxlen=MAX_LEN, padding='post', truncating='post')

        # Make prediction
        prediction = model.predict(padded)
        emotion = label_encoder.inverse_transform([np.argmax(prediction)])[0]
        confidence = float(np.max(prediction))

        logging.info(f"Prediction: {emotion} ({confidence:.2f})")
        return {"label": emotion, "confidence": confidence}

    except Exception as e:
        logging.error(f"Prediction error: {str(e)}")
        return {"error": "Something went wrong while predicting emotion."}
