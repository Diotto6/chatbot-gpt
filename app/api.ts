import axios from "axios";

export async function askQuestion(question: string) {
  const options = {
    method: "POST",
    url: "https://chatgpt-api8.p.rapidapi.com/",
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": "bac5a9ad8amsh840d3a7f0130a34p131d14jsned586198f9d9",
      "X-RapidAPI-Host": "chatgpt-api8.p.rapidapi.com",
    },
    data: [
      {
        content: question,
        role: "user",
      },
    ],
  };
  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    throw new Error("Limite de perguntas por dia excedidas");
  }
}