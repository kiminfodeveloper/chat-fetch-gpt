// TESTE COM O AXIOS, ERROS EXISTENTES.

const API_KEY = "SUA_API_AQUI";
const API_URL = "https://api.openai.com/v1/engines/davinci-codex/completions";

async function generateResponse(message) {
  try {
    const response = await axios.post(
      API_URL,
      {
        prompt: message,
        max_tokens: 50,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );

    return response.data.choices[0].text;
  } catch (error) {
    console.error("Erro ao chamar a API do GPT-3:", error);
    return "Desculpe, ocorreu um erro ao gerar a resposta.";
  }
}
