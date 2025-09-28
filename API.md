# 🎯 AI Mood-Based Ad Optimizer API Documentation

## 📋 Overview
This document describes the JavaScript API for the AI Mood-Based Ad Optimizer. The application provides real-time emotion detection and dynamic ad personalization through a browser-based interface.

## 🏗️ Architecture

### Core Components
- **Emotion Detection Engine**: Uses face-api.js for facial expression analysis
- **Ad Management System**: Dynamic content swapping based on detected emotions
- **Statistics Tracker**: Real-time data collection and visualization
- **UI Controller**: Manages user interface interactions and settings

## 🔧 JavaScript API Reference

### Global Variables

#### Configuration
```javascript
let mockMode = false; // Set to true for demo mode when AI models fail
let soundEnabled = true; // Enable/disable audio feedback
let voiceEnabled = false; // Enable/disable voice announcements
let abTestingEnabled = false; // Enable A/B testing mode
```

#### Data Tracking
```javascript
let views = 0; // Total ad views
let clicks = 0; // Total ad clicks
let emotionCounts = { happy: 0, sad: 0, angry: 0, neutral: 0 }; // Emotion detection counts
let moodViews = 0, moodClicks = 0; // Mood-based ad stats
let randomViews = 0, randomClicks = 0; // Random ad stats
```

### Core Functions

#### `loadModels()`
Loads the AI models for emotion detection.

**Returns**: `Promise<void>`

**Throws**: Error if models fail to load (automatically switches to mock mode)

```javascript
await loadModels();
// Models loaded successfully or mock mode activated
```

#### `startVideo()`
Initializes webcam access and video stream.

**Returns**: `Promise<void>`

**Throws**: Error if camera access is denied

```javascript
await startVideo();
// Webcam stream started
```

#### `detectEmotions()`
Analyzes the current video frame for facial expressions.

**Behavior**:
- Detects faces using TinyFaceDetector
- Analyzes expressions using FaceExpressionNet
- Updates UI with detected emotion
- Triggers ad personalization
- Updates statistics

**Called automatically** every 2 seconds during active detection.

#### `updateAd(emotion)`
Updates the displayed ad based on the detected emotion.

**Parameters**:
- `emotion` (string): The detected emotion ('happy', 'sad', 'angry', 'neutral')

**Behavior**:
- Changes ad image and text
- Applies animation effects
- Updates A/B testing counters

```javascript
updateAd('happy'); // Shows happy-themed ad
```

#### `updateStats()`
Refreshes all statistics displays and charts.

**Behavior**:
- Updates view/click counters
- Calculates click-through rates
- Updates progress bar
- Refreshes Chart.js visualization
- Updates A/B testing statistics (if enabled)

#### `playEmotionSound(emotion)`
Plays audio feedback for emotion changes.

**Parameters**:
- `emotion` (string): The emotion to announce

**Behavior**:
- Generates tone using Web Audio API
- Different frequencies for different emotions
- Only plays if `soundEnabled` is true

#### `speakEmotion(emotion)`
Provides voice announcement of detected emotion.

**Parameters**:
- `emotion` (string): The emotion to announce

**Behavior**:
- Uses Web Speech API
- Only announces if `voiceEnabled` is true

### UI Control Functions

#### Settings Management
```javascript
// Dark mode toggle
document.body.classList.toggle('dark-mode');

// Sound toggle
soundEnabled = !soundEnabled;

// Voice toggle
voiceEnabled = !voiceEnabled;

// A/B testing toggle
abTestingEnabled = !abTestingEnabled;
abStats.style.display = abTestingEnabled ? 'block' : 'none';
```

#### Webcam Controls
```javascript
// Pause detection
clearInterval(detectionInterval);
isDetecting = false;

// Resume detection
detectionInterval = setInterval(detectEmotions, 2000);
isDetecting = true;
```

### Data Export API

#### `exportBtn.addEventListener('click', ...)`
Exports experiment data as JSON file.

**Generated Data Structure**:
```json
{
  "timestamp": "2025-01-28T07:58:14.905Z",
  "totalViews": 150,
  "totalClicks": 23,
  "clickRate": "15.3%",
  "emotionCounts": {
    "happy": 45,
    "sad": 32,
    "angry": 28,
    "neutral": 45
  },
  "abTesting": {
    "moodBased": {
      "views": 75,
      "clicks": 15,
      "rate": "20.0%"
    },
    "random": {
      "views": 75,
      "clicks": 8,
      "rate": "10.7%"
    }
  }
}
```

## 🎨 Customization API

### Ad Content Customization
Modify the `ads` object to change ad content:

```javascript
const ads = {
    happy: {
        image: 'path/to/happy-ad.jpg',
        text: 'Your happy message here!'
    },
    // ... other emotions
};
```

### Emotion Detection Sensitivity
Adjust detection intervals:

```javascript
// Change detection frequency (currently 2000ms)
detectionInterval = setInterval(detectEmotions, 1000); // Faster detection
```

### UI Theme Customization
Override CSS variables for theming:

```css
:root {
    --primary-color: #667eea;
    --secondary-color: #764ba2;
    --background-gradient: linear-gradient(135deg, #your-color1, #your-color2);
}
```

## 🔌 Integration Examples

### Basic Usage
```javascript
// Initialize the app
async function init() {
    await loadModels();
    await startVideo();
    detectionInterval = setInterval(detectEmotions, 2000);
}

init();
```

### Custom Ad Integration
```javascript
// Add custom emotion
emotionCounts.custom = 0;
ads.custom = {
    image: 'custom-ad.jpg',
    text: 'Custom message'
};

// Handle custom emotion in detectEmotions()
if (dominantEmotion === 'custom') {
    // Custom logic
}
```

### Event Listeners
```javascript
// Listen for emotion changes
document.addEventListener('emotionDetected', (event) => {
    console.log('New emotion:', event.detail.emotion);
});

// Listen for ad clicks
clickBtn.addEventListener('click', () => {
    console.log('Ad clicked!');
});
```

## 🐛 Error Handling

### Common Issues
1. **Camera Access Denied**: Check browser permissions
2. **Models Fail to Load**: Automatically falls back to mock mode
3. **Web Audio API Blocked**: Disable sound features

### Error Recovery
```javascript
try {
    await loadModels();
} catch (error) {
    console.warn('AI models failed, using demo mode');
    mockMode = true;
}
```

## 📊 Performance Considerations

- **Model Loading**: ~10-30 seconds initial load
- **Detection Frequency**: 2-second intervals balance accuracy vs. performance
- **Memory Usage**: Models consume ~50MB RAM
- **Browser Compatibility**: Requires modern browsers with WebRTC support

## 🔒 Security Notes

- All processing happens client-side
- No data is sent to external servers
- Webcam data never leaves the browser
- Models run locally for privacy

## 📞 Support

For API questions or integration help, check the main README.md or create an issue in the repository.