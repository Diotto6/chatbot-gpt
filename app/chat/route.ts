import axios from "axios";

export async function askQuestion(question: string) {
  const options = {
    method: 'POST',
    url: 'https://chatgpt-api8.p.rapidapi.com/',
    headers: {
      'content-type': 'application/json',
      'X-RapidAPI-Key': '5dd4b89141msh4f1a364c7db0462p15dc6ejsnd6222f4bb78c',
      'X-RapidAPI-Host': 'chatgpt-api8.p.rapidapi.com'
    },
    data: [
      {
        content: question,
        role: 'user'
      }
    ]
  };

  try {
    const response = await axios.request(options);
    if (response.data.message) return response.data
    return response.data
  } catch (error) {
    console.error(error);
    return error
  }
};
