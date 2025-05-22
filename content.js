console.log("🔹 Extension Loaded!");

let lastUrl = window.location.href; // Store the last known URL

// Function to check if user is in inbox or viewing an email
function checkEmail() {
    let currentUrl = window.location.href;

    if (currentUrl !== lastUrl) { // Run only if URL actually changed
        console.log("🔗 Before URL Changed:", lastUrl);
        lastUrl = currentUrl; // Update last URL
        console.log("🔗 After URL Changed:", currentUrl);
        
        if (currentUrl.includes("#inbox") && !currentUrl.includes("FMfcgz")) {
            console.log("📩 User is in the inbox.");
        } else if (currentUrl.includes("FMfcgz")) {
            console.log("📨 User opened an email.");
            checkEmailContent();
        }
    }
}  

// Initial call to check email
checkEmail();

// Function to remove URLs from text
function removeUrlsFromText(text) {
    return text.replace(/https?:\/\/[^\s]+/g, ""); // Removes all URLs
}

// Remove attachment names from email body
function removeAttachmentText(text, attachmentNames) {
    attachmentNames.forEach(name => {
        let regex = new RegExp(name, "gi"); // Create a case-insensitive regex
        text = text.replace(regex, ""); // Remove the attachment name from the text
    });
    return text;
}

// Function to check and analyze email content
function checkEmailContent() { 
    try {
        console.log("aef")
        let emailBodyElement = document.querySelector(".ii.gt");
        let emailBody = emailBodyElement ? emailBodyElement.innerText : "No content found";

        let urls = [];
        let links = emailBodyElement ? emailBodyElement.querySelectorAll("a") : [];
        links.forEach(link => {
            if (link.href.startsWith("http")) {
                urls.push(link.href);
            }
        });

        let attachments = [];
        let attachmentNames = []; // To store only file names for filtering
        let attachmentElements = document.querySelectorAll(".aQH span");
        attachmentElements.forEach(attachment => {
            let fileName = attachment.innerText;
            let downloadLink = attachment.closest("a")?.href || "No download link";
            attachments.push({ fileName, downloadLink });
            attachmentNames.push(fileName); // Store filenames separately for removal
        });

        let senderElement = document.querySelector(".gD"); 
        let senderName = senderElement ? senderElement.innerText : "Unknown Sender";

        // **Remove URLs from Email Body**
        let cleanedEmailBody = removeUrlsFromText(emailBody);

        // **Remove Attachment Names from Email Body**
        cleanedEmailBody = removeAttachmentText(cleanedEmailBody, attachmentNames);

        fetch("http://127.0.0.1:5000/check", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text:cleanedEmailBody, urls: urls, attachments: attachments })
        })
        .then(response => response.json())
        .then(data => {
            console.log("Backend Response", data);
            let resultText = data.result === "Phishing" ? "⚠️ Phishing Email" : "✅ Safe Email";

            let badge = document.createElement("span");
            badge.innerText = resultText;
            badge.style.color = data.result === "Phishing" ? "red" : "green";
            badge.style.fontWeight = "bold";
            badge.style.marginLeft = "10px";

            if (senderElement) senderElement.appendChild(badge);
        })
        .catch(error => console.error("Error checking link:", error));
    } catch (error) {
        console.error("Error in checkEmailContent:", error);
    }
}

// Monitor for Gmail content changes
const observer = new MutationObserver(() => {
    checkEmail();
});

observer.observe(document.body, { childList: true, subtree: true });

console.log("📬 Monitoring Gmail for phishing detection...");
