"use client";

import { Toaster } from "@/components/ui/toaster";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./ui/card";
import { askQuestion } from "@/app/chat/route";
import { ChangeEvent, FormEvent, Fragment, useState } from "react";
import { useToast } from "@/components/ui/use-toast";

interface Chat {
  role?: {
    user?: string;
    chatbot?: string;
  }[];
}
export interface ChatProps {}

export default function Chat(props: ChatProps) {
  const [question, setQuestion] = useState<string | undefined>("");
  const [chat, setChat] = useState<Chat | undefined>({ role: [] });
  const { toast } = useToast();

  const handleChangeQuestion = (event: ChangeEvent<HTMLInputElement>) => {
    setQuestion(event.target.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = await askQuestion(question!);

    if (data.message) {
      toast({
        title: "Aviso",
        description: "Máximo de perguntas por dia excedidos",
        variant: "destructive",
      });
      setQuestion("");
    } else {
      const newRole = {
        user: question,
        chatbot: question,
      };
      setChat((prevState) => ({
        role: prevState?.role?.concat(newRole),
      }));

      setQuestion("");
    }
  };

  return (
    <Card className="w-[700px] h-[700px] grid grid-rows-[min-content_1fr_min-content]">
      <CardHeader>
        <CardTitle>Chat AI</CardTitle>
        <CardDescription>
          Using rapidAPI chatgpt to create a chat bot.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {chat?.role?.length
          ? chat.role.map((e, index) => (
              <Fragment key={index}>
                {e.user && (
                  <div className="flex gap-3 text-zinc-600 text-sm">
                    <Avatar>
                      <AvatarFallback>ND</AvatarFallback>
                      <AvatarImage src="https://github.com/Diotto6.png" />
                    </Avatar>
                    <p className="loading-relaxed pt-2">
                      <span className="bolck font-bold text-zinc-700 text-sm pr-2">
                        Humano:
                      </span>
                      {e.user}
                    </p>
                  </div>
                )}
                {e.chatbot && (
                  <div className="flex gap-3 text-zinc-600 text-sm">
                    <Avatar>
                      <AvatarFallback>CH</AvatarFallback>
                      <AvatarImage src="https://github.com/RocketChat.png" />
                    </Avatar>
                    <p className="loading-relaxed pt-2">
                      <span className="bolck font-bold text-zinc-700 text-sm pr-2">
                        AI:
                      </span>
                      {e.chatbot}
                    </p>
                  </div>
                )}
              </Fragment>
            ))
          : null}
      </CardContent>
      <CardFooter>
        <form className="w-full flex gap-2" onSubmit={handleSubmit}>
          <Input
            value={question}
            onChange={handleChangeQuestion}
            placeholder="Como posso te ajudar hoje?"
          />
          <Button type="submit">Enviar</Button>
        </form>
      </CardFooter>
      <Toaster />
    </Card>
  );
}
