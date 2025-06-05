// src/components/BootstrapChatbot.jsx

import React, { useState } from "react";
import { Button, Card, Image } from "react-bootstrap";
import { Webchat, WebchatProvider, getClient } from "@botpress/webchat";
import "./ChatbotStyles.css"; 
const chatOpenSound = "/chat-open.mp3";

const clientId = "3695b556-44f8-4dfd-b752-82b6fc2701f3";

const configuration = {
  color: "#00C851", // Green accent color
};

const BootstrapChatbot = () => {
  const client = getClient({ clientId });
  const [isOpen, setIsOpen] = useState(false);
  const chatSound = new Audio(chatOpenSound);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
    if (!isOpen) {
      chatSound.play(); // Play sound when opening
    }
  };

  return (
    <>
      {/* Floating Button */}
      <div
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          zIndex: 1000,
        }}
      >
        <Button
          onClick={handleToggle}
          style={{
            borderRadius: "50%",
            width: "60px",
            height: "60px",
            backgroundColor: "#FF8C00",
            fontSize: "30px",
            padding: "0",
            border: "none",
          }}
        >
          💬
        </Button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <Card
          className="chatbot-card animate-pop"
          style={{
            width: "360px",
            height: "500px",
            position: "fixed",
            bottom: "90px",
            right: "20px",
            zIndex: 1000,
            borderRadius: "15px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Header */}
          <Card.Header className="bg-success text-white d-flex align-items-center gap-2">
            <Image
              src="https://cdn-icons-png.flaticon.com/512/4712/4712109.png"
              roundedCircle
              width={30}
              height={30}
              alt="Bot Avatar"
            />
            <span>Wellness Chatbot</span>
          </Card.Header>

          {/* Webchat Body */}
          <div className="chatbot-scroll" style={{ flex: 1 }}>
            <WebchatProvider client={client} configuration={configuration}>
              <Webchat />
            </WebchatProvider>
          </div>
        </Card>
      )}
    </>
  );
};

export default BootstrapChatbot;