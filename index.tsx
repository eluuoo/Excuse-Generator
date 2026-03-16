import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Pacifico+Nunito
const fontLink = document.createElement('link');
fontLink.href = 'https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;700&family=Pacifico&display=swap';
fontLink.rel = 'stylesheet';
document.head.appendChild(fontLink);

// Font Awesome
const faLink = document.createElement('link');
faLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
faLink.rel = 'stylesheet';
document.head.appendChild(faLink);

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<App />);