import React, { useState } from "react";
import "./EmotionSection.css";

const emotionData = {
  sadness: { color: "#607D8B", emoji: "😢" },
  enthusiasm: { color: "#FF9800", emoji: "😃" },
  neutral: { color: "#9E9E9E", emoji: "😐" },
  worry: { color: "#FF5722", emoji: "😟" },
  surprise: { color: "#FFC107", emoji: "😲" },
  love: { color: "#E91E63", emoji: "😍" },
  fun: { color: "#00BCD4", emoji: "😆" },
  hate: { color: "#F44336", emoji: "😠" },
  happiness: { color: "#4CAF50", emoji: "😊" },
  boredom: { color: "#795548", emoji: "😴" },
  relief: { color: "#8BC34A", emoji: "😌" },
  anger: { color: "#D32F2F", emoji: "😡" },
  Unknown: { color: "#000000", emoji: "❓" },
};

const emotionOrder = [
  "sadness",
  "enthusiasm",
  "neutral",
  "worry",
  "surprise",
  "love",
  "fun",
  "hate",
  "happiness",
  "boredom",
  "relief",
  "anger",
];

const EmotionMeter = () => {
  const [text, setText] = useState("");
  const [emotion, setEmotion] = useState(null);
  const [confidence, setConfidence] = useState(null);
  const [angle, setAngle] = useState(-90);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    if (!text.trim()) return;
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("http://127.0.0.1:8000/predict-emotion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      if (!res.ok) throw new Error("Failed to fetch emotion");

      const data = await res.json();
      const label = data.label.toLowerCase();
      const conf = data.confidence || 0;

      setEmotion(label);
      setConfidence(conf);
      setAngle(getNeedleAngle(label));
    } catch (err) {
      console.error(err);
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const getNeedleAngle = (label) => {
    const index = emotionOrder.indexOf(label);
    const total = emotionOrder.length;
    const step = 180 / total;
    const offset = step / 2;
    return index !== -1 ? -90 + index * step + offset : -90;
  };

  const emotionInfo = emotionData[emotion] || emotionData.Unknown;

  return (
    <div className="emotion-container">
      <h2>How are you feeling today?</h2>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type your thoughts here..."
      />
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Detecting Emotion..." : "Detect Emotion"}
      </button>

      {error && <p className="error-message">{error}</p>}

      {emotion && (
        <div className="result">
          <h3>
            {emotionInfo.emoji} Detected Emotion:{" "}
            <span style={{ color: emotionInfo.color }}>
              {emotion.charAt(0).toUpperCase() + emotion.slice(1)}
            </span>{" "}
            ({(confidence * 100).toFixed(2)}%)
          </h3>

          <div className="meter-wrapper">
            <div className="meter">
              <div
                className="needle"
                style={{
                  transform: `rotate(${angle}deg)`,
                  backgroundColor: emotionInfo.color,
                }}
              />
              <div className="center-dot" />
            </div>

            <div className="labels-arc">
              {emotionOrder.map((emo, i) => {
                const total = emotionOrder.length;
                const step = 180 / total;
                const offset = step / 2;
                const deg = -90 + i * step + offset;
                return (
                  <div
                    key={emo}
                    className="label-point"
                    style={{
                      transform: `rotate(${deg}deg) translateY(-180px) rotate(${-deg}deg)`,
                      color: emotionData[emo]?.color || "#000",
                    }}
                  >
                    <span>{emotionData[emo]?.emoji || "❓"}</span>
                    <small>{emo}</small>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmotionMeter;