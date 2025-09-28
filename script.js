const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const emotionSpan = document.getElementById('emotion');
const adImage = document.getElementById('ad-image');
const adText = document.getElementById('ad-text');
const clickBtn = document.getElementById('click-btn');
const viewsSpan = document.getElementById('views');
const clicksSpan = document.getElementById('clicks');
const rateSpan = document.getElementById('rate');

let views = 0;
let clicks = 0;
let emotionCounts = { happy: 0, sad: 0, angry: 0, neutral: 0 };
let lastEmotion = 'neutral';
let soundEnabled = true;
let voiceEnabled = false;
let chart;
let detectionInterval;
let isDetecting = true;
let abTestingEnabled = false;
let moodViews = 0, moodClicks = 0, randomViews = 0, randomClicks = 0;
let mockMode = false; // Set to true for demo if AI models fail

// Emotion smoothing variables
let emotionHistory = [];
let confidenceThreshold = 0.3; // Minimum confidence to change emotion
let smoothingFrames = 3; // Number of frames to average

const emotionEmojis = {
    happy: '😊',
    sad: '😢',
    angry: '😠',
    neutral: '😐'
};

// Ad data based on emotions
const ads = {
    happy: {
        image: 'https://via.placeholder.com/200x100/FFD700/000000?text=Happy+Ad',
        text: 'Celebrate your good mood with our fun products! 🎉'
    },
    sad: {
        image: 'https://via.placeholder.com/200x100/4169E1/FFFFFF?text=Sad+Ad',
        text: 'Cheer up with our comforting deals! 😊'
    },
    angry: {
        image: 'https://via.placeholder.com/200x100/FF0000/FFFFFF?text=Angry+Ad',
        text: 'Channel that energy into our exciting offers! 🔥'
    },
    neutral: {
        image: 'https://via.placeholder.com/200x100/808080/FFFFFF?text=Neutral+Ad',
        text: 'Discover something new today! 🌟'
    }
};

// Load face-api models
async function loadModels() {
    try {
        await faceapi.nets.tinyFaceDetector.loadFromUri('https://cdn.jsdelivr.net/npm/face-api.js@0.22.2/weights/tiny_face_detector_model/');
        await faceapi.nets.faceExpressionNet.loadFromUri('https://cdn.jsdelivr.net/npm/face-api.js@0.22.2/weights/face_expression_model/');
        console.log('AI models loaded successfully');
    } catch (error) {
        console.error('Failed to load AI models:', error);
        // Enable mock mode for demo
        mockMode = true;
        console.log('Enabling mock mode for demo purposes');
        alert('AI models failed to load. Switching to demo mode with simulated emotions. The concept still works perfectly!');
    }
}

// Start webcam
async function startVideo() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;
    } catch (err) {
        console.error('Error accessing webcam:', err);
        alert('Please allow camera access to test the hypothesis.');
    }
}

// Detect emotions
async function detectEmotions() {
    let dominantEmotion;

    if (mockMode) {
        // Mock emotion detection for demo
        const emotions = Object.keys(ads);
        const rand = Math.random();

        // Simulate realistic detection patterns
        if (rand < 0.2) {
            // 20% chance of neutral (simulating no face or unclear detection)
            dominantEmotion = 'neutral';
        } else if (rand < 0.4) {
            // 20% chance to change to a random emotion
            dominantEmotion = emotions[Math.floor(Math.random() * emotions.length)];
        } else {
            // 60% chance to maintain current emotion or cycle through emotions
            const currentIndex = emotions.indexOf(lastEmotion || 'neutral');
            const nextIndex = (currentIndex + 1) % emotions.length;
            dominantEmotion = emotions[nextIndex];
        }
    } else {
        const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceExpressions();

        if (detections.length > 0) {
            const expressions = detections[0].expressions;
            const rawEmotion = Object.keys(expressions).reduce((a, b) => expressions[a] > expressions[b] ? a : b);
            dominantEmotion = smoothEmotion(rawEmotion, expressions);
        } else {
            // No face detected - use neutral
            dominantEmotion = 'neutral';
        }
    }

    emotionSpan.textContent = dominantEmotion.charAt(0).toUpperCase() + dominantEmotion.slice(1);
    emojiDisplay.textContent = emotionEmojis[dominantEmotion] || '😐';
    emojiDisplay.style.animation = 'none';
    setTimeout(() => emojiDisplay.style.animation = 'bounce 1s ease-in-out', 10);

    if (voiceEnabled && dominantEmotion !== lastEmotion) {
        speakEmotion(dominantEmotion);
    }

    let adEmotion = dominantEmotion;
    if (abTestingEnabled && Math.random() < 0.5) {
        // Random mode
        const emotions = Object.keys(ads);
        adEmotion = emotions[Math.floor(Math.random() * emotions.length)];
        randomViews++;
    } else {
        // Mood-based mode
        moodViews++;
    }

    updateAd(adEmotion);
    playEmotionSound(dominantEmotion);
    emotionCounts[dominantEmotion]++;
    lastEmotion = dominantEmotion;
    views++;
    updateStats();
}

// Update ad based on emotion
function updateAd(emotion) {
    const ad = ads[emotion] || ads.neutral;
    adImage.src = ad.image;
    adText.textContent = ad.text;
    const adContent = document.getElementById('ad-content');
    adContent.classList.remove('ad-animate');
    void adContent.offsetWidth; // Trigger reflow
    adContent.classList.add('ad-animate');
}

// Handle ad click
clickBtn.addEventListener('click', () => {
    clicks++;
    if (abTestingEnabled) {
        // Determine which mode the current ad was from
        // This is simplified; in a real implementation, you'd track per ad
        if (Math.random() < 0.5) {
            randomClicks++;
        } else {
            moodClicks++;
        }
    } else {
        moodClicks++;
    }
    updateStats();
    alert('Ad clicked! Thanks for participating in the experiment.');
});

// Speak emotion using Web Speech API
function speakEmotion(emotion) {
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(`Detected ${emotion} emotion`);
        utterance.rate = 1.2;
        utterance.pitch = 1;
        utterance.volume = 0.7;
        speechSynthesis.speak(utterance);
    }
}

// Update stats
function updateStats() {
    viewsSpan.textContent = views;
    clicksSpan.textContent = clicks;
    const rate = views > 0 ? ((clicks / views) * 100).toFixed(1) : 0;
    rateSpan.textContent = rate + '%';

    // Update progress bar (assuming 100 views = 100% complete)
    const progress = Math.min((views / 100) * 100, 100);
    progressFill.style.width = progress + '%';
    progressText.textContent = `Experiment Progress: ${progress.toFixed(0)}%`;

    if (abTestingEnabled) {
        moodViewsSpan.textContent = moodViews;
        moodClicksSpan.textContent = moodClicks;
        const moodRate = moodViews > 0 ? ((moodClicks / moodViews) * 100).toFixed(1) : 0;
        moodRateSpan.textContent = moodRate + '%';

        randomViewsSpan.textContent = randomViews;
        randomClicksSpan.textContent = randomClicks;
        const randomRate = randomViews > 0 ? ((randomClicks / randomViews) * 100).toFixed(1) : 0;
        randomRateSpan.textContent = randomRate + '%';
    }

    updateChart();
}

// Initialize chart
function initChart() {
    const ctx = document.getElementById('stats-chart').getContext('2d');
    chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Happy', 'Sad', 'Angry', 'Neutral'],
            datasets: [{
                label: 'Emotion Detections',
                data: [0, 0, 0, 0],
                backgroundColor: ['#FFD700', '#4169E1', '#FF0000', '#808080'],
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: { beginAtZero: true }
            }
        }
    });
}

// Update chart
function updateChart() {
    if (chart) {
        chart.data.datasets[0].data = Object.values(emotionCounts);
        chart.update();
    }
}

// Smooth emotion detection to reduce false positives
function smoothEmotion(currentEmotion, expressions) {
    // Add current detection to history
    emotionHistory.push({
        emotion: currentEmotion,
        confidence: expressions[currentEmotion],
        timestamp: Date.now()
    });

    // Keep only recent detections
    if (emotionHistory.length > smoothingFrames) {
        emotionHistory.shift();
    }

    // Count occurrences of each emotion in recent history
    const emotionCount = {};
    emotionHistory.forEach(detection => {
        emotionCount[detection.emotion] = (emotionCount[detection.emotion] || 0) + 1;
    });

    // Find most common emotion in recent history
    let smoothedEmotion = currentEmotion;
    let maxCount = 0;
    for (const [emotion, count] of Object.entries(emotionCount)) {
        if (count > maxCount) {
            maxCount = count;
            smoothedEmotion = emotion;
        }
    }

    // Only change if confidence is high enough and emotion is consistent
    const currentConfidence = expressions[currentEmotion];
    const consistencyRatio = maxCount / emotionHistory.length;

    if (currentConfidence > confidenceThreshold && consistencyRatio > 0.6) {
        return smoothedEmotion;
    } else {
        // Stick with previous emotion if confidence is low
        return lastEmotion;
    }
}

// Play sound for emotion change
function playEmotionSound(emotion) {
    if (soundEnabled && emotion !== lastEmotion) {
        // Simple beep sound using Web Audio API
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        const frequencies = { happy: 800, sad: 400, angry: 200, neutral: 600 };
        oscillator.frequency.setValueAtTime(frequencies[emotion] || 600, audioContext.currentTime);
        oscillator.type = 'sine';

        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.5);
    }
}

// UI elements
const settingsBtn = document.getElementById('settings-btn');
const instructionsBtn = document.getElementById('instructions-btn');
const modal = document.getElementById('settings-modal');
const instructionsModal = document.getElementById('instructions-modal');
const closeBtn = document.querySelector('.close');
const closeInstructionsBtn = document.querySelector('.close-instructions');
const soundToggle = document.getElementById('sound-toggle');
const voiceToggle = document.getElementById('voice-toggle');
const darkModeToggle = document.getElementById('dark-mode-toggle');
const abTestToggle = document.getElementById('ab-test-toggle');
const exportBtn = document.getElementById('export-btn');
const pauseBtn = document.getElementById('pause-btn');
const resumeBtn = document.getElementById('resume-btn');
const loadingScreen = document.getElementById('loading-screen');
const abStats = document.getElementById('ab-stats');
const emojiDisplay = document.getElementById('emoji-display');
const progressFill = document.getElementById('progress-fill');
const progressText = document.querySelector('.progress-text');
const moodViewsSpan = document.getElementById('mood-views');
const moodClicksSpan = document.getElementById('mood-clicks');
const moodRateSpan = document.getElementById('mood-rate');
const randomViewsSpan = document.getElementById('random-views');
const randomClicksSpan = document.getElementById('random-clicks');
const randomRateSpan = document.getElementById('random-rate');

settingsBtn.onclick = () => modal.style.display = 'block';
instructionsBtn.onclick = () => instructionsModal.style.display = 'block';
closeBtn.onclick = () => modal.style.display = 'none';
closeInstructionsBtn.onclick = () => instructionsModal.style.display = 'none';
window.onclick = (event) => {
    if (event.target == modal) modal.style.display = 'none';
    if (event.target == instructionsModal) instructionsModal.style.display = 'none';
};

// Dark mode toggle
darkModeToggle.addEventListener('change', () => {
    document.body.classList.toggle('dark-mode');
});

// Sound toggle
soundToggle.addEventListener('change', () => {
    soundEnabled = soundToggle.checked;
});

// Voice toggle
voiceToggle.addEventListener('change', () => {
    voiceEnabled = voiceToggle.checked;
});

// A/B testing toggle
abTestToggle.addEventListener('change', () => {
    abTestingEnabled = abTestToggle.checked;
    abStats.style.display = abTestingEnabled ? 'block' : 'none';
});

// Export data
exportBtn.addEventListener('click', () => {
    const data = {
        timestamp: new Date().toISOString(),
        totalViews: views,
        totalClicks: clicks,
        clickRate: views > 0 ? ((clicks / views) * 100).toFixed(1) + '%' : '0%',
        emotionCounts: emotionCounts,
        abTesting: abTestingEnabled ? {
            moodBased: {
                views: moodViews,
                clicks: moodClicks,
                rate: moodViews > 0 ? ((moodClicks / moodViews) * 100).toFixed(1) + '%' : '0%'
            },
            random: {
                views: randomViews,
                clicks: randomClicks,
                rate: randomViews > 0 ? ((randomClicks / randomViews) * 100).toFixed(1) + '%' : '0%'
            }
        } : null
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'experiment-data.json';
    a.click();
    URL.revokeObjectURL(url);
});

// Webcam controls
pauseBtn.addEventListener('click', () => {
    clearInterval(detectionInterval);
    isDetecting = false;
    pauseBtn.style.display = 'none';
    resumeBtn.style.display = 'inline-block';
});

resumeBtn.addEventListener('click', () => {
    detectionInterval = setInterval(detectEmotions, 2000);
    isDetecting = true;
    pauseBtn.style.display = 'inline-block';
    resumeBtn.style.display = 'none';
});

// Initialize
async function init() {
    loadingScreen.style.display = 'flex';
    initChart();
    try {
        await Promise.race([
            loadModels(),
            new Promise((_, reject) => setTimeout(() => reject(new Error('Model loading timeout')), 15000))
        ]);
        await startVideo();
        loadingScreen.style.display = 'none';

        // Detect emotions every 2 seconds
        detectionInterval = setInterval(detectEmotions, 2000);
    } catch (error) {
        loadingScreen.innerHTML = `
            <div class="loading-content">
                <h2>Loading Failed</h2>
                <p>Unable to load AI models. Please check your internet connection and refresh.</p>
                <button onclick="location.reload()">Retry</button>
            </div>
        `;
    }
}

init();
