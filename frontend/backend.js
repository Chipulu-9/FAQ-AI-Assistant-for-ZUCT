
        const apis = [
            {
                name: "ZutBot",
                url: "https://copilot5.p.rapidapi.com/copilot",
                headers: {
                    "Content-Type": "application/json",
                    "x-rapidapi-host": "copilot5.p.rapidapi.com",
                    "x-rapidapi-key": "14800b3001msh286a0581a52c326p14d7f1jsn6bdff7a88aaf"
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
            const userMessage = document.createElement("p");
            userMessage.textContent = "You: " + question;
            userMessage.classList.add("user-message");
            chatMessages.appendChild(userMessage);

            // Clear input and disable button
            document.getElementById("question").value = "";
            const sendButton = document.getElementById("sendButton");
            sendButton.disabled = true;

            const selectedAPI = selectBestAPI(question);
            if (!selectedAPI) {
                const errorMessage = document.createElement("p");
                errorMessage.textContent = "Bot: No suitable API available.";
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
                    const botMessage = document.createElement("p");
                    botMessage.textContent = "Bot: " + (data.data?.message || "No response");
                    botMessage.classList.add("bot-message");
                    chatMessages.appendChild(botMessage);

                    // Scroll to the bottom
                    chatMessages.scrollTop = chatMessages.scrollHeight;

                    // Re-enable button
                    sendButton.disabled = false;
                })
                .catch(error => {
                    console.error("Error:", error);
                    const errorMessage = document.createElement("p");
                    errorMessage.textContent = "Bot: Sorry, something went wrong.";
                    errorMessage.classList.add("bot-message");
                    chatMessages.appendChild(errorMessage);

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
            location.href = '../Quiz App/index.html';
        });
    