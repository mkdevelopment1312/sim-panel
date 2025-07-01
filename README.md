
<!--- Copyright © 2025 Kamil Maslanka -->

# SIM Panel - Professional SIM Card Registration

A modern, single-page React application for professional SIM card registration services, optimized for GitHub Pages hosting.

## 🚀 Features

- **Modern UI**: Clean, cyberpunk-inspired design with TailwindCSS
- **Single Page Application**: No routing dependencies, perfect for GitHub Pages
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **TypeScript Support**: Type-safe code with modern JavaScript features
- **CDN-Based**: Uses CDN-hosted dependencies for optimal performance
- **Professional Interface**: Clean and intuitive user experience

## 📋 Technology Stack

- **React 18**: CDN-hosted via unpkg
- **TypeScript**: Babel standalone for JSX/TS compilation
- **TailwindCSS**: CDN-hosted via official CDN
- **Modern JavaScript**: ES2015+ features

## 🛠️ GitHub Pages Deployment

### Method 1: Using GitHub Actions (Recommended)

1. **Fork or clone this repository** to your GitHub account

2. **Enable GitHub Pages** in your repository settings:
   - Go to `Settings` → `Pages`
   - Select `GitHub Actions` as the source

3. **Create workflow file** `.github/workflows/deploy.yml`:
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
    
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./
        publish_branch: gh-pages
```

4. **Push changes** to the main branch. GitHub Actions will automatically deploy your site.

### Method 2: Manual Deployment

1. **Clone the repository**:
```bash
git clone https://github.com/yourusername/sim-panel.git
cd sim-panel
```

2. **Create gh-pages branch**:
```bash
git checkout -b gh-pages
```

3. **Push to GitHub**:
```bash
git add .
git commit -m "Deploy to GitHub Pages"
git push origin gh-pages
```

4. **Enable GitHub Pages**:
   - Go to repository `Settings` → `Pages`
   - Select `gh-pages` branch as source
   - Your site will be available at `https://yourusername.github.io/sim-panel`

## 🔧 Local Development

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Local web server (optional, for testing)

### Running Locally

1. **Clone the repository**:
```bash
git clone https://github.com/yourusername/sim-panel.git
cd sim-panel
```

2. **Open with a local server** (optional but recommended):
```bash
# Using Python 3
python -m http.server 8000

# Using Node.js http-server
npx http-server

# Using PHP
php -S localhost:8000
```

3. **Open in browser**:
   - Navigate to `http://localhost:8000` or
   - Open `index.html` directly in your browser

## 📁 Project Structure

```
sim-panel/
├── index.html          # Main HTML file with embedded React app
├── favicon.svg         # Custom favicon (stylized 'K')
├── README.md          # This file
└── public/
    └── favicon.svg    # Favicon file
```

## 🎨 Customization

### Colors
The app uses a cyberpunk color scheme defined in TailwindCSS config:
- `cyber-dark`: `#0a0a0a` - Main background
- `neon-green`: `#00ff41` - Primary accent
- `neon-blue`: `#00bfff` - Secondary accent
- `dark-gray`: `#1a1a1a` - Card backgrounds

### Modifying the App
Since everything is contained in `index.html`, you can easily modify:
- **Styling**: Update the TailwindCSS config object
- **Components**: Modify the React components in the `<script type="text/babel">` section
- **Content**: Update text, titles, and descriptions directly in the JSX

## 🔒 Security Considerations for GitHub Pages

- No server-side processing (static hosting only)
- No form submissions to external servers
- Client-side only authentication (demo purposes)
- HTTPS automatically provided by GitHub Pages

## 🌐 Browser Compatibility

- **Chrome**: 60+
- **Firefox**: 60+
- **Safari**: 12+
- **Edge**: 79+

## 📱 Mobile Support

The application is fully responsive and works on:
- iOS Safari
- Android Chrome
- Mobile browsers with ES2015+ support

## � Performance Optimization

- **CDN Dependencies**: Fast loading from global CDNs
- **Minimal Bundle**: Single HTML file with embedded assets
- **Responsive Images**: Optimized for different screen sizes
- **Modern CSS**: TailwindCSS for optimal styling performance

## � Troubleshooting

### Common Issues

1. **Blank page**: Check browser console for JavaScript errors
2. **Styling issues**: Ensure TailwindCSS CDN is loading
3. **Local file access**: Use a local server instead of opening HTML directly

### Development Tips

- Use browser dev tools for debugging
- Check the Network tab for CDN loading issues
- Validate HTML/CSS using browser developer tools

## 📄 License

Copyright © 2025 Kamil Maslanka. All rights reserved.

## 🤝 Contributing

This is a personal project. For suggestions or improvements, please create an issue or contact the maintainer.

## � Support

For support or questions, please create an issue in the GitHub repository.

---

**Note**: This application is designed specifically for GitHub Pages hosting and uses CDN-based dependencies for optimal performance and simplicity.
