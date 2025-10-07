import React from 'react';
import ReactDOM from 'react-dom/client';

// ✅ Add slick css imports here at the top
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// your own css after
import './index.css';

import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);