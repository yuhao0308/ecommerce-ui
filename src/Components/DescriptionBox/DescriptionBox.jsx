import React from 'react'
import './DescriptionBox.css'

const DescriptionBox = () => {
  return (
    <div className="description-box">
      <div className="description-box-navigator">
        <div className="description-box-nav-box">Description</div>
        <div className="description-box-nav-box fade">Reviews (122)</div>
      </div>
      <div className="description-box-description">
        <p>Effortlessly stylish and incredibly versatile, this T-shirt offers a perfect blend of comfort and fashion. Crafted from premium fabric, it’s ideal for everyday wear and easy layering.</p>
        <p>Designed for both comfort and style, this classic T-shirt pairs seamlessly with any wardrobe. Its soft, breathable material ensures all-day ease, making it a must-have staple.</p>
      </div>
    </div>
  )
}

export default DescriptionBox