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
    await faceapi.nets.tinyFaceDetector.loadFromUri('https://cdn.jsdelivr.net/npm/face-api.js@0.22.2/weights/');
    await faceapi.nets.faceExpressionNet.loadFromUri('https://cdn.jsdelivr.net/npm/face-api.js@0.22.2/weights/');
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
    const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceExpressions();
    
    if (detections.length > 0) {
        const expressions = detections[0].expressions;
        const dominantEmotion = Object.keys(expressions).reduce((a, b) => expressions[a] > expressions[b] ? a : b);
        
        emotionSpan.textContent = dominantEmotion.charAt(0).toUpperCase() + dominantEmotion.slice(1);
        updateAd(dominantEmotion);
        views++;
        updateStats();
    }
}

// Update ad based on emotion
function updateAd(emotion) {
    const ad = ads[emotion] || ads.neutral;
    adImage.src = ad.image;
    adText.textContent = ad.text;
}

// Handle ad click
clickBtn.addEventListener('click', () => {
    clicks++;
    updateStats();
    alert('Ad clicked! Thanks for participating in the experiment.');
});

// Update stats
function updateStats() {
    viewsSpan.textContent = views;
    clicksSpan.textContent = clicks;
    const rate = views > 0 ? ((clicks / views) * 100).toFixed(1) : 0;
    rateSpan.textContent = rate + '%';
}

// Initialize
async function init() {
    await loadModels();
    await startVideo();
    
    // Detect emotions every 2 seconds
    setInterval(detectEmotions, 2000);
}

init();