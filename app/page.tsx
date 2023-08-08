"use client";

import React, {
  ChangeEvent,
  FormEvent,
  Fragment,
  useEffect,
  useRef,
  useState,
} from "react";
import { askQuestion } from "./api";
import { isErrorWithMessage } from "./isErrorWithMessage";
import {
  ThreeDotsLoading,
  ScrollArea,
  Avatar,
  AvatarFallback,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Input,
  Toaster,
  toast,
  StreamAnimation,
} from "./components";

interface Chat {
  message?: string;
  sender?: "user" | "ai";
}

export default function Home() {
  const [loading, setLoading] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(true);
  const [messages, setMessages] = useState<Chat[]>([]);
  const [userMessage, setUserMessage] = useState("");

  const handleChangeQuestion = (event: ChangeEvent<HTMLInputElement>) => {
    setUserMessage(event.target.value);
    setDisabled(false);
  };

  function addMessage(message: string, sender: "user" | "ai") {
    setMessages((prevMessages) => [...prevMessages, { message, sender }]);
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    addMessage(userMessage, "user");
    setUserMessage("");
    setDisabled(true);
    try {
      const data = await askQuestion(userMessage!);
      if (data?.text) {
        const utf8Text = new TextDecoder().decode(
          new TextEncoder().encode(data.text)
        );
        setLoading(false);
        addMessage(utf8Text, "ai");
      }
    } catch (error) {
      if (isErrorWithMessage(error)) {
        toast({
          description: error.message as string,
          variant: "destructive",
        });
        setLoading(false);
      } else {
        toast({
          description: "An unknown error occurred",
          variant: "destructive",
        });
        setLoading(false);
      }
    }
  };
  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [loading]);

  const content = (
    <ScrollArea className="w-full h-full flex-grow-1">
      {messages.map((msg, index) => (
        <Fragment key={index}>
          {msg.sender === "user" && (
            <div className="flex gap-3 text-zinc-600 text-sm mb-4">
              <Avatar>
                <AvatarFallback>HM</AvatarFallback>
              </Avatar>
              <p className="loading-relaxed pt-2">
                <span className="font-bold text-zinc-700 text-sm pr-2">
                  Humano:
                </span>
                {msg.message}
              </p>
            </div>
          )}
          {loading && index === messages.length - 1 ? (
            <div className="flex gap-3 text-zinc-600 text-sm mb-4">
              <Avatar>
                <AvatarFallback>AI</AvatarFallback>
              </Avatar>
              <p className="pt-2 flex items-center justify-between">
                <span className="block font-bold text-zinc-700 text-sm pr-2 pb-4">
                  AI:
                </span>
              </p>
              <ThreeDotsLoading />
            </div>
          ) : msg.sender === "ai" && msg.message?.length ? (
            <div className="flex gap-3 text-zinc-600 text-sm mb-4">
              <Avatar>
                <AvatarFallback>AI</AvatarFallback>
              </Avatar>
              <p className="loading-relaxed pt-2">
                <span className="font-bold text-zinc-700 text-sm pr-2 pb-4">
                  AI:
                </span>
                <StreamAnimation text={msg?.message} interval={35} />
              </p>
            </div>
          ) : null}
        </Fragment>
      ))}
    </ScrollArea>
  );

  return (
    <div
      className="flex min-h-screen bg-zinc-100 items-center justify-center"
      ref={chatContainerRef}
    >
      <Card className="w-[800px] h-full">
        <CardHeader>
          <CardTitle>Chat AI</CardTitle>
          <CardDescription>
            Using rapidAPI chatgpt to create a chat bot.
          </CardDescription>
        </CardHeader>
        <CardContent>{content}</CardContent>
        <CardFooter>
          <form className="w-full flex gap-2" onSubmit={handleSubmit}>
            <Input
              value={userMessage}
              onChange={handleChangeQuestion}
              placeholder="Como posso te ajudar hoje?"
            />
            <Button type="submit" disabled={disabled}>
              Enviar
            </Button>
          </form>
        </CardFooter>
      </Card>
      <Toaster />
    </div>
  );
}
