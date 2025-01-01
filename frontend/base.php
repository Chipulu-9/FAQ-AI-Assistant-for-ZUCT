<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta charset="UTF-8">
    <title>Chatbot</title>
    <link rel="stylesheet" href="style.css">

</head>

<body>
<div class="container">
        <div class="chatbox">
            <div class="chatbox__support">
                <div class="">
                    <div class="header-content">
                        <div class="chatbox__image--header">
                            <img src="./images/zut.svg" alt="Chatbot Logo">
                        </div>
                        <div class="chatbox__content--header">
                            <h4 class="chatbox__heading--header">Chat Support</h4>
                        </div>
                        <button class="quiz-button" id="quizButton" onclick="window.location.href='../Quiz App/index.html'">Quiz</button>
                    </div>
                </div>
                <div class="chatbox__messages" id="chatMessages">
                    <div></div>
                </div>
                <div class="chatbox__footer">
                    <input type="text" placeholder="Write a message..." id="question" required autocomplete="off">
                    <button class="chatbox__send--footer send__button" id="sendButton">Send</button>
                </div>
            </div>
            <div class="chatbox__button">
                <button><img src="./images/chatbox-icon.svg" alt="Chat Icon"></button>
            </div>
        </div>
    </div>

    <script src="./app.js"></script>

    <script>
        // Define available APIs with metadata
        const apis = [
            {
                name: "Zut",
                url: "https://copilot5.p.rapidapi.com/copilot",
                headers: {
                    "Content-Type": "application/json",
                    "x-rapidapi-host": "copilot5.p.rapidapi.com",
                    "x-rapidapi-key": "0ca1780071mshde25a3d03524f3cp146211jsn93facbf3b4b4"
                },
                features: ["basic", "balanced"],
                load: 20, // Simulated load percentage
                priority: 1
            }
        ];

        // Function to select the best API
        function selectBestAPI(question) {
            return apis[0]; // Simplified: Always select the first API
        }

        // Function to send a message
        function sendMessage() {
            const question = document.getElementById("question").value.trim();
            if (!question) return; // Exit if input is empty

            const suffix = "With reference to Zambia University College of Technology, provide the necessary answers in accordance with ";
            const modifiedQuestion = `${suffix}${question}`;

            const chatMessages = document.getElementById("chatMessages");

            // Display user's message
            const userMessage = document.createElement("div");
            userMessage.textContent = question;
            userMessage.classList.add("user-message");
            chatMessages.appendChild(userMessage);

            // Clear input and disable button
            document.getElementById("question").value = "";
            const sendButton = document.getElementById("sendButton");
            chatMessages.scrollTop = chatMessages.scrollHeight;
            sendButton.disabled = true;

            const selectedAPI = selectBestAPI(question);
            if (!selectedAPI) {
                const errorMessage = document.createElement("div");
                errorMessage.textContent = "Zut: No suitable API available.";
                errorMessage.classList.add("bot-message");
                chatMessages.appendChild(errorMessage);
                sendButton.disabled = false;
                return;
            }

            // Send API request
            fetch(selectedAPI.url, {
                method: "POST",
                headers: selectedAPI.headers,
                body: JSON.stringify({
                    message: modifiedQuestion,
                    conversation_id: null,
                    tone: "BALANCED",
                    markdown: null,
                    photo_url: null
                })
            })
                .then(response => response.json())
                .then(data => {
                    console.log("API Response:", data); // Debugging
                    const botMessage = document.createElement("div");
                    botMessage.textContent = "Zut: " + (data.data?.message || "No response");
                    botMessage.classList.add("bot-message");
                    chatMessages.appendChild(botMessage);

                    // Scroll to the bottom
                    chatMessages.scrollTop = chatMessages.scrollHeight;

                    // Re-enable button
                    sendButton.disabled = false;
                })
                .catch(error => {
                    console.error("Error:", error);
                    const errorMessage = document.createElement("div");
                    errorMessage.textContent = "Zut: Sorry, something went wrong.";
                    errorMessage.classList.add("bot-message");
                    chatMessages.appendChild(errorMessage);

                    chatMessages.scrollTop = chatMessages.scrollHeight;

                    sendButton.disabled = false; // Re-enable button
                });
        }

        // Attach event listener to the Send button
        document.getElementById("sendButton").addEventListener("click", function(event) {
            event.preventDefault();
            sendMessage();
        });

        // Add functionality for Quiz button (optional)
        document.getElementById("quizButton").addEventListener("click", function() {
            location.href = './Quiz App/index.html';
        });
    </script>

</body>

</html>