const chatInput = document.querySelector(".chat-input textarea");
const sendChatbtn = document.querySelector(".chat-input span");
const chatbox = document.querySelector(".chatbox");

let userMessage;
const API_KEY = "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";
const TEST_API = "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";
const COHERE_API = "Aib3XAEEkDttboSFo50lVy24U4r8m6gwIYnelqbJ";

const createChatLi = (message, className) => {
  const chatLi = document.createElement("li");
  chatLi.classList.add("chat", className);
  let chatContent =
    className === "outgoing"
      ? `<p>${message}</p> `
      : `<span class="material-symbols-outlined">smart_toy</span><p>${message}</p> `;
  chatLi.innerHTML = chatContent;
  return chatLi;
};

const generateResponse = async (incomingChatLi) => {
  //   const API_URL = "https://api.cohere.ai/v1/chat";
  const messageElement = incomingChatLi.querySelector("p");
  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      authorization: `Bearer ${COHERE_API}`,
    },
    body: JSON.stringify({
      message: userMessage,
    }),
  };

  fetch("https://api.cohere.ai/v1/chat", options)
    .then((response) => response.json())
    .then((response) => {
      messageElement.textContent = response.text;
    })
    .catch((err) => {
      messageElement.textContent =
        "OOPS! Something went wrong. Please try again";
    });
};

const handlechat = () => {
  userMessage = chatInput.value.trim();
  if (!userMessage) return;

  chatbox.appendChild(createChatLi(userMessage, "outgoing"));

  setTimeout(() => {
    chatInput.value = "";
    const incomingChatLi = createChatLi("Thinking ....", "incoming");
    chatbox.appendChild(incomingChatLi);
    generateResponse(incomingChatLi);
  }, 600);
};

sendChatbtn.addEventListener("click", handlechat);
