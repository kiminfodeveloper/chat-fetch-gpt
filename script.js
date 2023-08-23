// script.js

// Função para exibir mensagens no chat
function displayMessage(message, sender) {
  var chatContainer = document.querySelector(".messages");
  var messageElement = document.createElement("div");
  messageElement.classList.add("message", sender);
  messageElement.textContent = message;
  chatContainer.appendChild(messageElement);
}

// Função para enviar a mensagem ao ChatGPT-3
async function sendMessageToGPT(message) {
  const API_KEY = "SUA_API_NÃO_COMPARTILHE";
  const API_URL = "https://api.openai.com/v1/engines/davinci/completions";

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        prompt: message,
        max_tokens: 50,
      }),
    });

    const data = await response.json();

    if (data.choices && data.choices[0]) {
      return data.choices[0].text;
    } else {
      console.error("Resposta inválida da API do GPT-3:", data);
      return "Desculpe, ocorreu um erro ao gerar a resposta.";
    }
  } catch (error) {
    console.error("Erro ao chamar a API do GPT-3:", error);
    return "Desculpe, ocorreu um erro ao gerar a resposta.";
  }
}

// Função para lidar com o envio da mensagem
async function handleSendMessage() {
  var inputElement = document.querySelector('input[type="text"]');
  var message = inputElement.value.trim();

  if (message !== "") {
    // Exibir a mensagem enviada no chat
    displayMessage(message, "user");

    // Enviar a mensagem para o ChatGPT-3 e receber a resposta
    const gptResponse = await sendMessageToGPT(message);

    // Exibir a resposta no chat
    displayMessage(gptResponse, "gpt");

    // Limpar o campo de entrada após o envio
    inputElement.value = "";
  }
}

// Lidar com o clique no botão "Enviar"
var sendButton = document.querySelector(".send-button");
sendButton.addEventListener("click", handleSendMessage);

// Lidar com a tecla Enter
var inputElement = document.querySelector('input[type="text"]');
inputElement.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    handleSendMessage();
  }
});
