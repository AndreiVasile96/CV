# Personal CV

A modern, responsive personal CV built with React and SCSS. Features animated skill bars, interactive navigation, contact form integration, and a polished mobile-first design.

## ✨ Features
- **Responsive Design**: Mobile-first approach with seamless desktop experience
- **Interactive Skills Section**: Expandable skill categories with animated progress bars
- **Smooth Animations**: Page transitions and scroll-based animations
- **Custom Scrollbar**: Styled scrollbar with hover effects
- **Modern Navigation**: Burger menu for mobile, clean header for desktop  
- **Contact Integration**: EmailJS-powered contact form
- **SEO Optimized**: Open Graph, Twitter Cards, meta tags for social sharing
- **Performance Optimized**: Modular SCSS, optimized React components
- **Accessibility**: ARIA labels, keyboard navigation, semantic HTML
- **Firebase Deployment**: Production-ready hosting

## 🛠 Tech Stack
- **Frontend**: React, SCSS, React Media Query
- **Animation**: CSS keyframes, transform animations
- **Email**: EmailJS integration
- **Testing**: Jest, React Testing Library, jest-axe, Storybook
- **Deployment**: Firebase Hosting
- **Development**: ESLint, modern JavaScript (ES6+)

## 🚀 Setup

### Prerequisites
- Node.js (v14 or higher) & npm
- Firebase CLI (`npm install -g firebase-tools`)

### Installation
```bash
# Clone the repository
git clone https://github.com/AndreiVasile96/CV.git
cd CV

# Install dependencies
npm install
```

### Environment Variables
Create a `.env` file in the root directory with your EmailJS credentials:
```env
REACT_APP_EMAILJS_TEMPLATE_ID=your_template_id
REACT_APP_EMAILJS_SERVICE_ID=your_service_id
REACT_APP_EMAILJS_PUBLIC_KEY=your_public_key
REACT_APP_EMAILJS_PRIVATE_KEY=your_private_key
```

### 🔧 Development Commands

#### Run Locally
```bash
npm start
```
Opens the app at [http://localhost:3000](http://localhost:3000)

#### Build for Production
```bash
npm run build
```
Creates optimized production build in the `build/` directory

**Note**: Firebase source map warnings are harmless and can be ignored. They don't affect the final build.


### 🧪 Testing

#### Run Jest Unit & Integration Tests
```bash
npm test
```
Tests are located in the `src/tests/` directory and use Jest with React Testing Library.

#### Run Accessibility Tests
```bash
npm test -- src/tests/*.a11y.test.js
```
Accessibility tests use `jest-axe` to check for WCAG compliance violations.

#### Run Storybook (Visual & Responsive Testing)
```bash
npm run storybook
```
Interactive component documentation and testing at [http://localhost:6006](http://localhost:6006)

### 🚀 Deployment

#### Test Locally (Firebase)
```bash
firebase serve
```

#### Deploy to Production
```bash
firebase deploy
```

## 📱 Project Structure
```
src/
├── components/          # React components
│   ├── Header/         # Navigation header
│   ├── Skills/         # Interactive skills section
│   ├── AboutMe/        # About section
│   ├── Experience/     # Experience timeline
│   ├── ContactMe/      # Contact form
│   └── Footer/         # Footer with social links
├── assets/             # Images, icons, logos
├── data/              # JSON data files
├── styles/            # Global SCSS constants
└── tests/             # Test suites

## 🎨 Key Features Implemented

### Responsive Skills Section
- **Mobile**: Description → Buttons → Skill Bars
- **Desktop**: Two-column layout with perfect height alignment
- **Animations**: Staggered skill bar fills with color-coded levels

### Custom Scrollbar
- **Desktop**: 12px cyan scrollbar with red hover states
- **Mobile**: 6px responsive scrollbar
- **Header**: Overflow prevention with calculated widths

### Navigation
- **Mobile**: Animated burger menu with smooth transitions
- **Desktop**: Clean header with hover effects
- **Accessibility**: Proper ARIA labels and keyboard navigation

## 📄 License
MIT License - see [LICENSE](LICENSE) file for details

## 🤝 Contact & Links
- **LinkedIn**: [andrei-vasile](https://www.linkedin.com/in/andrei-vasile/)
- **GitHub**: [AndreiVasile96](https://github.com/AndreiVasile96)
- **Email**: andreisvasile@gmail.com
- **Live Site**: [Deployed on Firebase](https://your-firebase-url.web.app)

---

**Built with ❤️ using React, SCSS, and modern web technologies**
