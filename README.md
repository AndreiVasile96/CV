# Personal CV

A modern, responsive personal CV built with React and SCSS. Features animated skill bars, contact form (EmailJS), and mobile-friendly design.

## Features
- Responsive layout
- Animated skill bars
- Contact form with EmailJS integration
- Modular SCSS styling
- Firebase deployment

## Tech Stack
- React
- SCSS
- EmailJS
- Firebase

## Setup

### Prerequisites
- Node.js & npm
- Firebase CLI (`npm install -g firebase-tools`)

### Installation
```bash
npm install
```

### Environment Variables
Create a `.env` file in the root directory with:
```
REACT_APP_EMAILJS_TEMPLATE_ID=your_template_id
REACT_APP_EMAILJS_SERVICE_ID=your_service_id
REACT_APP_EMAILJS_PUBLIC_KEY=your_public_key
REACT_APP_EMAILJS_PRIVATE_KEY=your_private_key
```

### Run Locally
```bash
npm start
```


### Build
```bash
npm run build
```


### Run Jest Unit & Integration Tests
```bash
npm test
```
Tests are located in the `src/tests/` directory and use Jest with React Testing Library.

### Run Accessibility Tests
```bash
npm test -- src/tests/*.a11y.test.js
```
Accessibility tests use `jest-axe` to check for violations in key components.

### Run Storybook (Visual & Responsive Testing)
```bash
npm run storybook
```
Storybook provides visual and responsive testing for all main components. Access it at [http://localhost:6006](http://localhost:6006).

### Test Locally (Firebase)
```bash
firebase serve
```

### Deploy
```bash
firebase deploy
```

## Usage
- Fill out the contact form to send an email.
- View skills, experience, and education.

## License
MIT

## Contact
[LinkedIn](https://www.linkedin.com/in/andrei-vasile/) | andreisvasile@gmail.com
