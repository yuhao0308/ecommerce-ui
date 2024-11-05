import React from 'react';
import './NewsLetter.css';

const NewsLetter = () => {
  return (
    <div className="newsletter">
      <h1>Exclusive Offers, Straight to Your Inbox</h1>
      <p>Subscribe for the latest deals and updates.</p>
      <div>
        <input type="email" placeholder="Your email address" />
        <button>Subscribe</button>
      </div>
    </div>
  );
}

export default NewsLetter;
