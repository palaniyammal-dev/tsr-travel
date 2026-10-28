"use client";

import { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send, Mic, MicOff, Volume2, VolumeX, Sparkles } from "lucide-react";
import axios from "axios";

type Message = {
  sender: "user" | "bot";
  text: string;
};

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isMuted, setIsMuted] = useState(true); // Default muted to comply with web audio policies
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Web Speech APIs
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    // Initialize default welcome message
    setMessages([
      { sender: "bot", text: "Hello! I am your TSR TRAVEL AI Assistant. Ask me anything about our tour packages, weather, hotels, or driving directions. I speak both English and Tamil! (வணக்கம்! நான் உங்களுக்கு எவ்வாறு உதவ வேண்டும்?)" }
    ]);

    // Setup speech recognition
    if (typeof window !== "undefined") {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const rec = new SpeechRecognition();
        rec.continuous = false;
        rec.interimResults = false;
        rec.lang = "en-IN"; // English/Indian accent by default; will try to capture Tamil sounds if Tamil words spoken

        rec.onstart = () => setIsListening(true);
        rec.onend = () => setIsListening(false);
        rec.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setInputValue(transcript);
        };
        rec.onerror = () => setIsListening(false);
        recognitionRef.current = rec;
      }
    }
  }, []);

  useEffect(() => {
    // Auto-scroll chat to bottom
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const speakText = (text: string) => {
    if (isMuted || typeof window === "undefined" || !window.speechSynthesis) return;
    
    // Stop any ongoing speech
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Attempt to match Tamil voice if Tamil text is detected
    const isTamil = /[அ-ஹ]/.test(text);
    if (isTamil) {
      utterance.lang = "ta-IN";
    } else {
      utterance.lang = "en-IN";
    }
    
    window.speechSynthesis.speak(utterance);
  };

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    // Add user message
    const userMsg = textToSend.trim();
    setMessages(prev => [...prev, { sender: "user", text: userMsg }]);
    setInputValue("");
    setIsTyping(true);

    // Get current context path
    const pageContext = typeof window !== "undefined" ? window.location.pathname : "home";

    try {
      const response = await axios.post("http://localhost:8000/api/ai/chat", {
        message: userMsg,
        page_context: pageContext
      });

      const reply = response.data.reply;
      setIsTyping(false);
      
      // Add bot message
      setMessages(prev => [...prev, { sender: "bot", text: reply }]);
      speakText(reply);

    } catch (error) {
      console.error("AI assistant API error. Falling back locally.", error);
      setIsTyping(false);
      
      let localReply = "I am having trouble connecting to my brain right now, but TSR Travels has Mahindra Mini Bus and Maruti Omni ready for your journey! Call Owner Ravitharan at +91 79048 72119.";
      if (userMsg.toLowerCase().includes("weather") || userMsg.toLowerCase().includes("வானிலை")) {
        localReply = "Weather details are currently unavailable offline. Typical Tamil Nadu weather is sunny and warm right now. Ideal for travel!";
      }
      
      setMessages(prev => [...prev, { sender: "bot", text: localReply }]);
      speakText(localReply);
    }
  };

  const toggleMic = () => {
    if (!recognitionRef.current) {
      alert("Speech recognition is not supported on this browser. Please try Chrome or Safari.");
      return;
    }

    if (isListening) {
      try {
        recognitionRef.current.stop();
      } catch (err) {
        console.error("SpeechRecognition stop error:", err);
      }
    } else {
      try {
        // Toggle language context based on user selection or guess
        recognitionRef.current.lang = inputValue.match(/[அ-ஹ]/) ? "ta-IN" : "en-IN";
        recognitionRef.current.start();
      } catch (err) {
        console.error("SpeechRecognition start error:", err);
      }
    }
  };

  const handleQuickChip = (chipText: string) => {
    handleSend(chipText);
  };

  return (
    <>
      {/* Floating Chat Bubble - Bottom Left to offset bottom-right float buttons */}
      <div className="fixed bottom-6 left-6 z-40">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-4 rounded-full bg-primary text-white hover:bg-primary-hover shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center cursor-pointer border border-primary/20"
          aria-label="Open AI Assistant"
        >
          <MessageCircle size={22} className={isOpen ? "rotate-90 transition-transform" : "transition-transform"} />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-secondary rounded-full animate-ping" />
        </button>
      </div>

      {/* Glassmorphism Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 left-6 z-50 w-[340px] sm:w-[380px] h-[480px] glass-card rounded-3xl shadow-2xl flex flex-col justify-between overflow-hidden border border-primary/10 animate-slide-up">
          {/* Header */}
          <div className="bg-[#05291e] p-4 text-white flex justify-between items-center border-b border-[#0b6e4f]/20">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-secondary/15 rounded-lg text-secondary">
                <Sparkles size={16} className="animate-pulse" />
              </div>
              <div>
                <h3 className="font-display font-bold text-sm">TSR TRAVEL AI</h3>
                <span className="text-xxs text-gray-300 block">Tamil & English Travel Assistant</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              {/* Speaker Toggle */}
              <button
                onClick={() => {
                  setIsMuted(!isMuted);
                  if (isMuted && typeof window !== "undefined") {
                    window.speechSynthesis.cancel();
                  }
                }}
                className="p-1.5 text-gray-300 hover:text-white rounded-lg hover:bg-white/10 transition cursor-pointer"
                title={isMuted ? "Unmute Voice Output" : "Mute Voice Output"}
              >
                {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-gray-300 hover:text-white rounded-lg hover:bg-white/10 transition cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-grow p-4 overflow-y-auto space-y-4 max-h-[320px]">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`p-3 rounded-2xl text-xs max-w-[80%] leading-relaxed ${
                    msg.sender === "user"
                      ? "bg-primary text-white rounded-br-none"
                      : "glass-card text-foreground-theme rounded-bl-none border border-primary/5"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            
            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="p-3 rounded-2xl text-xs bg-black/5 dark:bg-white/5 text-foreground-theme/50 rounded-bl-none flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-primary dark:bg-secondary rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-1.5 h-1.5 bg-primary dark:bg-secondary rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-1.5 h-1.5 bg-primary dark:bg-secondary rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Action Chips */}
          <div className="px-4 py-2 border-t border-primary/5 flex gap-1.5 overflow-x-auto whitespace-nowrap scrollbar-none scroll-smooth">
            {[
              "Weather",
              "Attractions",
              "Travel Time",
              "வானிலை",
              "இடங்கள்"
            ].map((chip) => (
              <button
                key={chip}
                onClick={() => handleQuickChip(chip)}
                className="px-3 py-1 rounded-full border border-primary/10 hover:border-primary/30 text-xxs font-medium text-foreground-theme/70 hover:text-primary dark:hover:text-secondary hover:bg-primary/5 dark:hover:bg-secondary/5 transition cursor-pointer"
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Form Input Footer */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(inputValue);
            }}
            className="p-3 border-t border-primary/10 dark:border-secondary/10 flex items-center gap-2 bg-background/30 backdrop-blur-sm"
          >
            {/* Voice Input microphone */}
            <button
              type="button"
              onClick={toggleMic}
              className={`p-2 rounded-xl shrink-0 transition cursor-pointer ${
                isListening
                  ? "bg-red-500 text-white animate-pulse"
                  : "bg-primary/5 hover:bg-primary/10 text-primary dark:text-secondary"
              }`}
              title={isListening ? "Listening..." : "Voice Input"}
            >
              {isListening ? <MicOff size={16} /> : <Mic size={16} />}
            </button>

            <input
              type="text"
              placeholder="Ask in English or தமிழ்..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="flex-grow px-3 py-2 text-xs rounded-xl border border-primary/10 dark:border-secondary/10 bg-background/50 text-foreground-theme outline-none focus:border-primary dark:focus:border-secondary"
            />

            <button
              type="submit"
              className="p-2 bg-primary text-white dark:bg-secondary dark:text-black rounded-xl hover:opacity-90 transition cursor-pointer"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
