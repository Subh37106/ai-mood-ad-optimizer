# AI Mood-Based Ad Optimizer

## Hypothesis
People click ads 50% more when they match the viewer's real-time emotional state (detected via facial expressions).

## Experiment Overview
This web application uses AI-powered facial emotion detection to dynamically change ad content based on the user's detected mood. The goal is to test whether personalized, emotion-matched ads improve click-through rates compared to static ads.

### Key Features
- Real-time webcam emotion detection using face-api.js
- Dynamic ad content swapping (image and text) based on detected emotions: Happy, Sad, Angry, Neutral
- Click tracking and statistics display with interactive chart
- Sound feedback for emotion changes
- Smooth animations for ad transitions
- Settings panel with dark mode and sound toggle
- Responsive, user-friendly interface

## Technologies Used
- **Frontend**: HTML5, CSS3, JavaScript
- **AI/ML**: face-api.js for facial expression recognition
- **Libraries**: face-api.js (via CDN), Chart.js for data visualization

## Setup Instructions

### Prerequisites
- A modern web browser with webcam support (Chrome, Firefox, etc.)
- Internet connection for loading face-api.js models

### Installation
1. Clone or download this repository.
2. Open `index.html` in your web browser.
3. Allow camera access when prompted.

### Running the Experiment
1. Launch the app in your browser.
2. Position yourself in front of the webcam.
3. The app will detect your facial expressions and update the ad accordingly.
4. Click the ad button to simulate clicks and observe the statistics.
5. Run multiple sessions with different emotions to gather data.

## How It Works
1. **Emotion Detection**: Uses TinyFaceDetector and FaceExpressionNet from face-api.js to analyze webcam feed every 2 seconds.
2. **Ad Personalization**: Based on the dominant detected emotion, the ad image and text change to match the mood.
3. **Data Collection**: Tracks total ad views and clicks, calculating click-through rate in real-time.

## Experiment Results
During testing:
- **Views**: [Insert number]
- **Clicks**: [Insert number]
- **Click Rate**: [Insert percentage]%

### Analysis
- [Describe if the hypothesis was supported or not based on your data]
- Challenges: [e.g., lighting conditions affecting detection accuracy]
- Insights: [What you learned about AI in advertising]

## Hackathon Submission
This project is submitted for the "Code Hypothesis: A 24-Hour Hackathon for Wild Ideas".

### Judging Criteria Alignment
- **Originality & Creativity**: Novel use of AI for real-time ad personalization.
- **Execution & Functionality**: Fully functional web app with working emotion detection.
- **Clarity of Thought**: Clear hypothesis, implementation, and results documentation.
- **Smart Use of AI**: Thoughtful integration of pre-trained models for emotion recognition.
- **Beginner Spirit**: Accessible code using JavaScript and web APIs.

### Demo Video
[Link to 2-minute demo video explaining the hypothesis and showing the app in action]

### Prize Targeting
- Proven Hypothesis Award: If data proves/disproves the hypothesis clearly.
- Wild Theory Award: For the bold idea of mood-based ads.
- Smart Use of AI: Core AI implementation.

## Future Improvements
- Integrate with real ad networks for A/B testing.
- Add more emotions and ad categories.
- Improve detection accuracy with custom training.
- Backend for data storage and analysis.

## License
This project is open-source under the MIT License.

## Acknowledgments
- face-api.js library for emotion detection
- Devpost for the hackathon platform