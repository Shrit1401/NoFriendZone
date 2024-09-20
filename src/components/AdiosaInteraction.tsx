"use client";

import React, { useState, useEffect, useRef } from "react";
import { Send, Sparkles } from "lucide-react";
import { getAdiosaResponseFromAI } from "@/lib/actions";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Message {
  type: "user" | "adiosa";
  text: string;
}

type Difficulty = "easy" | "medium" | "hard";

export default function AdiosaChat() {
  const [input, setInput] = useState<string>("");
  const [difficulty, setDifficulty] = useState<Difficulty>("medium");
  const [messages, setMessages] = useState<Message[]>([]);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async () => {
    if (!input.trim()) return;

    try {
      const userMessage: Message = { type: "user", text: input };
      setMessages((prev) => [...prev, userMessage]);
      setInput("");

      const adiosaResponse = await getAdiosaResponseFromAI(input, difficulty);
      if (
        adiosaResponse.response.includes(
          "Sorry, I can't process your request right now"
        )
      ) {
        alert(adiosaResponse);
      } else {
        const adiosaMessage: Message = {
          type: "adiosa",
          text: adiosaResponse.response,
        };
        setMessages((prev) => [...prev, adiosaMessage]);
      }
    } catch (error) {
      alert("An error occurred while processing your request.");
    }
  };

  return (
    <div className="flex flex-col h-[90vh] sm:w-full  mx-auto bg-gradient-to-b from-pink-100 to-purple-100 rounded-lg overflow-hidden border border-pink-300 shadow-lg">
      <header className="flex items-center justify-between p-4 bg-white border-b border-pink-300">
        <div className="flex items-center space-x-3">
          <Avatar className="w-12 h-12 border-2 border-pink-500">
            <AvatarImage
              src="/placeholder.svg?height=50&width=50"
              alt="Adiosa"
            />
            <AvatarFallback>AI</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="font-semibold text-lg capitalize">adiosa</h2>
            <p className="text-sm text-gray-500 capitalize">Rizz up adiosa</p>
          </div>
        </div>
        <div className="flex items-center space-x-2  ">
          <span className="animate-pulse text-xl">Difficulty:</span>
          <Select
            value={difficulty}
            onValueChange={(value) => setDifficulty(value as Difficulty)}
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Select mode" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="easy">Innocent</SelectItem>
              <SelectItem value="medium">Self-Control</SelectItem>
              <SelectItem value="hard">Attitude</SelectItem>
            </SelectContent>
          </Select>
          {/* <Button variant="ghost" size="icon">
            <Star />
            <span className="ml-1 text-sm">{rizzRate}</span>{" "} */}
          {/* Show Rizz Rate */}
          {/* </Button> */}
        </div>
      </header>

      <div
        className="flex-1 overflow-y-auto p-4 space-y-4"
        ref={chatContainerRef}
      >
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.type === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[70%] p-3 rounded-lg ${
                message.type === "user" ? "bg-pink-500 text-white" : "bg-white"
              }`}
            >
              <p>{message.text}</p>
            </div>
          </div>
        ))}
      </div>

      <footer className="p-4 bg-white border-t border-pink-300">
        <div className="flex space-x-2">
          <Input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSubmit()}
            placeholder="Type your message..."
            className="flex-1 outline-none"
          />
          <Button onClick={handleSubmit}>
            <Send className="h-5 w-5" color="white" />
          </Button>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          adiosa will try her best to friendzone you{" "}
          <Sparkles className="h-4 w-4 inline" />{" "}
        </p>
      </footer>
    </div>
  );
}
