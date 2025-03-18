import React from 'react'
import "./Item.css"
import {Link} from 'react-router-dom'
import { formatImageUrl } from '../../utils/imageHelpers'

const Item = (props) => {
  // Create a fallback image URL when the main image fails to load
  const handleImageError = (e) => {
    // Try to use a placeholder image or fall back to a data URL
    e.target.onerror = null; // Prevent infinite loop
    e.target.src = 'https://via.placeholder.com/150?text=No+Image';
  };

  return (
    <div className="item">
      <div className="img-container">
        <Link to={`/product/${props.id}`}>
          <img 
            src={formatImageUrl(props.image)} 
            alt={props.name || "Product Item"}
            onError={handleImageError}
          />
        </Link>
      </div>
      <p>{props.name}</p>
      <div className="item-prices">
        <div className="item-price-new">
          ${props.new_price}
        </div>
        <div className="item-price-old">
          ${props.old_price}
        </div>
      </div>
    </div>
  )
}

export default Item