function analyzeDescriptionAndHashtags() {
    let description = document.querySelector("#description")?.innerText || "";
    let hashtags = Array.from(document.querySelectorAll("a[href*='hashtag']")).map(el => el.innerText);

    const triggerWords = [
        // Mental health and emotional triggers
    "depression", "suicide", "self-harm", "anxiety", "panic attack",
    "hopeless", "sad", "trigger warning", "trauma", "grief", "loss",
    "loneliness", "abuse", "PTSD", "isolation", "crying", "hurt", "pain",
    "fear", "guilt", "shame", "worthless", "suffering", "unwanted",
    
    // Sensitive and distressing topics
    "bullying", "harassment", "violence", "assault", "rape", "murder",
    "addiction", "alcoholism", "overdose", "drug abuse", "eating disorder",
    "anorexia", "bulimia", "self-loathing", "insomnia", "nightmares",
    
    // Emotional expressions
    "breaking down", "nervous breakdown", "crisis", "mental breakdown",
    "overwhelmed", "exhausted", "no hope", "can't cope", "end it all"
	
    ];

    let warningMessages = [];

    // Check description
    triggerWords.forEach(word => {
        if (description.toLowerCase().includes(word)) {
            warningMessages.push(`⚠️ Trigger word detected in description: "${word}"`);
        }
    });

    // Check hashtags
    hashtags.forEach(tag => {
        triggerWords.forEach(word => {
            if (tag.toLowerCase().includes(word)) {
                warningMessages.push(`⚠️ Trigger word detected in hashtag: "${tag}"`);
            }
        });
    });

    if (warningMessages.length > 0) {
        showWarning(warningMessages);
    }
}

function showWarning(warnings) {
    let existingWarning = document.getElementById('mentalHealthWarning');
    if (existingWarning) {
        existingWarning.remove();
    }

    let warningDiv = document.createElement('div');
    warningDiv.id = 'mentalHealthWarning';
    warningDiv.style.position = 'fixed';
    warningDiv.style.bottom = '20px';
    warningDiv.style.right = '20px';
    warningDiv.style.width = '350px';
    warningDiv.style.background = '#ffe6e6';
    warningDiv.style.color = '#000';
    warningDiv.style.padding = '20px';
    warningDiv.style.border = '2px solid #f00';
    warningDiv.style.borderRadius = '8px';
    warningDiv.style.zIndex = '9999';
    warningDiv.style.fontSize = '14px';
    warningDiv.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
    warningDiv.style.maxHeight = '300px';
    warningDiv.style.overflowY = 'auto';

    warningDiv.innerHTML = `
        <strong style="font-size: 16px;">⚠️ Mental Health Warning</strong>
        <button id="closeWarningBtn" style="
            float: right; 
            background: #f00; 
            color: #fff; 
            border: none; 
            border-radius: 50%;
            width: 24px; 
            height: 24px; 
            font-size: 14px; 
            cursor: pointer;
        ">❌</button>
        <div style="margin-top: 10px;">${warnings.join('<br>')}</div>
        <hr style="margin: 10px 0; border: none; border-top: 1px solid #ccc;">
        <div style="font-size: 13px; margin-top: 10px;">
            🧠 <strong>Suggestion:</strong> If you're feeling overwhelmed, take a break, talk to a friend, or reach out to a mental health professional. Remember, you're not alone. 💜
        </div>
    `;

    document.body.appendChild(warningDiv);

    document.getElementById('closeWarningBtn').addEventListener('click', () => {
        warningDiv.remove();
    });
}

// Run the analysis when a Shorts page is loaded
setTimeout(analyzeDescriptionAndHashtags, 3000);
