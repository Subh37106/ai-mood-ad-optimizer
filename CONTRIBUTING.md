# 🤝 Contributing to AI Mood-Based Ad Optimizer

Thank you for your interest in contributing to the AI Mood-Based Ad Optimizer! 🎉 This project aims to explore the intersection of AI, emotion detection, and personalized advertising through scientific experimentation.

## 📋 Table of Contents
- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [How to Contribute](#how-to-contribute)
- [Development Guidelines](#development-guidelines)
- [Testing](#testing)
- [Submitting Changes](#submitting-changes)
- [Community](#community)

## 🤝 Code of Conduct

This project follows a code of conduct to ensure a welcoming environment for all contributors. By participating, you agree to:

- Be respectful and inclusive
- Focus on constructive feedback
- Accept responsibility for mistakes
- Show empathy towards other contributors
- Help create a positive community

## 🚀 Getting Started

### Prerequisites
- **Browser**: Modern web browser (Chrome 88+, Firefox 85+, Safari 14+)
- **Node.js**: Version 16+ (for development tools)
- **Git**: Version control system
- **Webcam**: For testing emotion detection features

### Quick Setup
1. **Fork** the repository on GitHub
2. **Clone** your fork locally:
   ```bash
   git clone https://github.com/your-username/ai-mood-ad-optimizer.git
   cd ai-mood-ad-optimizer
   ```
3. **Open** `index.html` in your browser to test

## 🛠️ Development Setup

### Local Development Environment

1. **Install Dependencies** (if using build tools):
   ```bash
   npm install
   ```

2. **Start Development Server** (if applicable):
   ```bash
   npm run dev
   ```

3. **Open Browser**:
   - Navigate to `http://localhost:3000` or
   - Directly open `index.html` in browser

### Project Structure
```
ai-mood-ad-optimizer/
├── index.html          # Main application
├── style.css           # Styling and animations
├── script.js           # Core functionality
├── README.md           # Project documentation
├── API.md             # API documentation
├── CONTRIBUTING.md    # This file
└── screenshots/       # Screenshots folder
```

## 💡 How to Contribute

### Types of Contributions
- 🐛 **Bug Fixes**: Report and fix issues
- ✨ **Features**: Add new functionality
- 📚 **Documentation**: Improve docs and guides
- 🎨 **UI/UX**: Enhance user interface
- 🧪 **Testing**: Add or improve tests
- 🌐 **Accessibility**: Improve accessibility

### Finding Issues
- Check [GitHub Issues](../../issues) for open tasks
- Look for `good first issue` or `help wanted` labels
- Test the app and report bugs you find

## 📝 Development Guidelines

### Code Style

#### JavaScript
```javascript
// Use descriptive variable names
let emotionDetectionInterval = setInterval(detectEmotions, 2000);

// Use async/await for promises
async function loadModels() {
    try {
        await faceapi.nets.tinyFaceDetector.loadFromUri('/models/');
        console.log('Models loaded successfully');
    } catch (error) {
        console.error('Failed to load models:', error);
    }
}

// Comment complex logic
function updateAd(emotion) {
    // Validate emotion parameter
    if (!emotion || !ads[emotion]) {
        console.warn('Invalid emotion:', emotion);
        emotion = 'neutral';
    }

    // Update UI elements
    adImage.src = ads[emotion].image;
    adText.textContent = ads[emotion].text;
}
```

#### CSS
```css
/* Use CSS custom properties for theming */
:root {
    --primary-color: #667eea;
    --secondary-color: #764ba2;
    --animation-duration: 0.3s;
}

/* Group related styles */
.emotion-display {
    text-align: center;
    margin: 30px 0;
    padding: 20px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 15px;
    backdrop-filter: blur(5px);
}

/* Use meaningful class names */
.ad-content {
    /* Styles for ad content */
}

.ad-content:hover {
    /* Hover effects */
}
```

#### HTML
```html
<!-- Use semantic HTML -->
<header>
    <h1>AI Mood-Based Ad Optimizer</h1>
    <nav>
        <button id="settings-btn" aria-label="Open settings">⚙️ Settings</button>
    </nav>
</header>

<main>
    <section class="emotion-detection">
        <!-- Content -->
    </section>
</main>
```

### Commit Messages
Follow conventional commit format:
```
type(scope): description

[optional body]

[optional footer]
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Testing
- `chore`: Maintenance

Examples:
```
feat: add voice feedback for emotion detection
fix: resolve webcam access issue on Firefox
docs: update API documentation for new features
```

### Branch Naming
```
feature/description-of-feature
bugfix/issue-description
docs/update-documentation
```

## 🧪 Testing

### Manual Testing Checklist
- [ ] App loads without errors
- [ ] Camera permission requested appropriately
- [ ] Emotion detection works (or falls back to demo mode)
- [ ] Ads change based on detected emotions
- [ ] Statistics update correctly
- [ ] A/B testing mode functions properly
- [ ] Export feature works
- [ ] All UI elements are accessible
- [ ] Responsive design works on different screen sizes

### Browser Testing
Test on:
- [ ] Chrome/Chromium
- [ ] Firefox
- [ ] Safari
- [ ] Edge

### Performance Testing
- [ ] Initial load time < 30 seconds
- [ ] Memory usage reasonable
- [ ] No memory leaks during extended use

## 📤 Submitting Changes

### Pull Request Process

1. **Create Feature Branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make Changes**:
   - Follow coding guidelines
   - Test thoroughly
   - Update documentation if needed

3. **Commit Changes**:
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

4. **Push Branch**:
   ```bash
   git push origin feature/your-feature-name
   ```

5. **Create Pull Request**:
   - Go to GitHub and create PR
   - Fill out PR template
   - Request review

### PR Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Code refactoring

## Testing
- [ ] Tested on Chrome
- [ ] Tested on Firefox
- [ ] Manual testing completed
- [ ] No breaking changes

## Screenshots (if applicable)
Add screenshots of UI changes

## Additional Notes
Any additional context or notes
```

## 🌐 Community

### Getting Help
- 📧 **Email**: For private inquiries
- 💬 **GitHub Issues**: For bugs and feature requests
- 🏗️ **GitHub Discussions**: For general discussion

### Recognition
Contributors will be:
- Listed in README.md acknowledgments
- Mentioned in release notes
- Recognized for significant contributions

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

## 🙏 Thank You!

Your contributions help advance the field of AI-powered advertising and emotion-aware interfaces. Every contribution, no matter how small, is valuable and appreciated! 🚀