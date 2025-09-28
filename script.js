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
let chart;

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
        playEmotionSound(dominantEmotion);
        emotionCounts[dominantEmotion]++;
        lastEmotion = dominantEmotion;
        views++;
        updateStats();
    }
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
    updateStats();
    alert('Ad clicked! Thanks for participating in the experiment.');
});

// Update stats
function updateStats() {
    viewsSpan.textContent = views;
    clicksSpan.textContent = clicks;
    const rate = views > 0 ? ((clicks / views) * 100).toFixed(1) : 0;
    rateSpan.textContent = rate + '%';
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

// Settings modal
const settingsBtn = document.getElementById('settings-btn');
const modal = document.getElementById('settings-modal');
const closeBtn = document.querySelector('.close');
const soundToggle = document.getElementById('sound-toggle');
const darkModeToggle = document.getElementById('dark-mode-toggle');

settingsBtn.onclick = () => modal.style.display = 'block';
closeBtn.onclick = () => modal.style.display = 'none';
window.onclick = (event) => {
    if (event.target == modal) modal.style.display = 'none';
};

// Dark mode toggle
darkModeToggle.addEventListener('change', () => {
    document.body.classList.toggle('dark-mode');
});

// Sound toggle
soundToggle.addEventListener('change', () => {
    soundEnabled = soundToggle.checked;
});

// Initialize
async function init() {
    initChart();
    await loadModels();
    await startVideo();

    // Detect emotions every 2 seconds
    setInterval(detectEmotions, 2000);
}

init();