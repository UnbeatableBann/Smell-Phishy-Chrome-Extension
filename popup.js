document.addEventListener("DOMContentLoaded", function () {
    const checkButton = document.getElementById("checkButton");
    const anyInput = document.getElementById("anyInput");
    const result = document.getElementById("result");

    checkButton.addEventListener("click", async function () {
        const text = anyInput.value.trim();
        if (!text) {
            result.textContent = "Please enter a URL.";
            return;
        }

        result.textContent = "Checking...";
        
        try {
            const response = await fetch("http://127.0.0.1:5000/popup_check", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text: text })
            });
            
            if (!response.ok) {
                result.textContent = "Error checking URL.";
                return;
            }

            const data = await response.json();
            result.textContent = data.is_phishing ? "⚠️ Phishing Detected!" : "✅ Safe";
            result.style.color = data.is_phishing ? "red" : "green";
        } catch (error) {
            result.textContent = "Error connecting to server.";
        }
    });
});
