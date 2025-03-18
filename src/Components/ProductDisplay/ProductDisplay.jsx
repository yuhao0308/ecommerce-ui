import React, { useContext, useState } from 'react';
import './ProductDisplay.css';
import star_icon from '../Assets/star_icon.png';
import start_dull_icon from '../Assets/star_dull_icon.png';
import { ShopContext } from '../../Context/ShopContext';
import { formatImageUrl } from '../../utils/imageHelpers';

const ProductDisplay = (props) => {
  const { product } = props;
  const { addToCart } = useContext(ShopContext);
  const [isBouncing, setIsBouncing] = useState(false);
  const [imgError, setImgError] = useState(false);

  const handleAddToCart = () => {
    addToCart(product._id);

    // Add bounce animation
    setIsBouncing(true);

    // Remove bounce class after animation ends
    setTimeout(() => {
      setIsBouncing(false);
    }, 300); // Duration matches the animation time in CSS
  };
  
  // Handle image loading errors
  const handleImageError = (e) => {
    e.target.onerror = null; // Prevent infinite loop
    setImgError(true);
    // Use a simple base64 encoded gray image as fallback
    e.target.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWCAMAAAAL34HQAAAASFBMVEX////Ly8vIyMjp6enz8/P4+Pjv7+/7+/vS0tLk5OTZ2dn19fXd3d3g4ODr6+vOzs7W1tbFxcXx8fHb29vAwMDJycnu7u7BwcExe0BnAAAEl0lEQVR4nO1b27aiMAwFWwoFaZXb//+pR2wTEKxwpgWeZj/Mi4tNuya9JZn9/DQ0NDQ0NDQ0NH4d4Mjva8DRMRrQSc9uVq4RveR6f1kvgaqSbfDRHQVDlusdyB+y4FtQQfaWXXCLqpoMSqXkgl1UMpNTqUwGEXKmXB4Y7JnLi6tNuTyW2ZJr+Ey5QkMzV8dPkst9rOCVHLLx/Nfx45SolVhDSfwQ9D26y4Xa7e3k7O3f+FrBh5eWdmLtZhXsQiqluE39u826ahVTrSFqLZ7+w/z60kZYeT9kR9rjYbN+P0R98xwvnxF5rdLr5Z3FS0CrJz+8m135IQlA5bdGr+AHfkgDkFFrXeAHvMsPbwLKfQ55DujdHvwAPNCjH1Khfts9FUYEP7yNUiCUuXypJEuWStc0P+yAGiuGQJ1NFCX6od/wQ1K1qpofNvnhJhiLUG75YRHBDzfV6jb44aDlh3uBUpYf7gbKG35Y44e7gZK7vz1+uB8ocfhbYPrGD3cEBep/Pmt+uCcoGNxYtn/cFZSI9tOfgF/uC2oA0e8OCvSEH/aHPH64KyhwkR+OADoVBYU8PzwLaMHzx7OAjqc/vgHo6DPLAeR/HChvcXTTFNv/DBTl+Rf3P0SHtjy+Vv9nYX/TDlj/GyOUVX7YG+iCTTa02jLv32f1v0X+h88o7vYPmTzUP7c8z1UzF55xS7MGF5/DgwYlF44Y8Ym7BNrB4fmL2ZKru7BTrSrz6XB/6aXSC07KrJ0HLK4aqV47aV8+7f9kDPDcKziBXrP51KKBjgbkVhXm03n/TzPfuFx+ZJZ8UaUZWUcPXCN6hdwZ55xV0F7dGb7+u0ZRaG0j5jJXcTorK+7J6Gt7eJ1/AepMd4bvW6SiifxmXs9jX/5Ww5A3CeWfO+NmbVLEIXXLqwYDm9aZiQnrK2ZZnYlyRmgmI6xujy/UawK0kZ6//Oc6Mwnnt0aGqJUyYX2D7ZhkGD19KT8H3ySWrIbGnkXnNw9W1Aq4QEDpv4QUqxHXWRUzQ6yatdSZPP/oWiF21Z+xNzqIVrKa+IxZxxC1GnueBpI8pN+cO5f/9KpSzuXPn2r2r0j2DBkm9vgx/IWE0FdzVW2lhGJyPvpG5CXa7yXfNNe+KdkqxfbgxfbgVsRtfRZpCQx9J6jzWj3f1b3WPu+uiUdWvT3eUEZW3/VxGknT9G36dQp0oEFkPbgkNcXdX8Og6yiZlQ5Vw6znBq1YJQSEXDcuLPc0PspjgAWxP1jHc4MejUfS5XFgL1wt8Fp03njEI4F1gL8pMMJZnmKJJ32xjuNGveWR0gT8tRw4hGYn8Gx54ZK9vGvkhcs96uR/yOhDWVa96NpAkr3uxQpZa0vQq4l6BdqC1I1bN5Ckl99fcEXpEtjXQdBEYKTxUOJimPxJUkwZt1EEe2FJzHonl7jnZ7k0w3f8DMdPMh9DFjlDf+ELsR8SsZXmXp+xZhCLCDEXsIxw+K/fF/EcYZoNDQ0NDQ0NDY0/jX9GmjZA2dMr5QAAAABJRU5ErkJggg==';
  };

  return (
    <div className="productdisplay">
      <div className="productdisplay-left">
        <div className="productdisplay-img-list">
          <img 
            src={imgError ? null : formatImageUrl(product.image)} 
            alt="" 
            onError={handleImageError} 
          />
          <img 
            src={imgError ? null : formatImageUrl(product.image)} 
            alt="" 
            onError={handleImageError} 
          />
          <img 
            src={imgError ? null : formatImageUrl(product.image)} 
            alt="" 
            onError={handleImageError} 
          />
          <img 
            src={imgError ? null : formatImageUrl(product.image)} 
            alt="" 
            onError={handleImageError} 
          />
        </div>
        <div className="productdisplay-img">
          <img 
            className="productdisplay-main-img" 
            src={imgError ? null : formatImageUrl(product.image)}
            alt={product.name || "Product"} 
            onError={handleImageError} 
          />
        </div>
      </div>
      <div className="productdisplay-right">
        <h1>{product.name}</h1>
        <div className="productdisplay-right-star">
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={start_dull_icon} alt="" />
          <p>(122)</p>
        </div>
        <div className="productdisplay-right-prices">
          <div className="productdisplay-right-price-old">${product.old_price}</div>
          <div className="productdisplay-right-price-new">${product.new_price}</div>
        </div>
        <div className="productdisplay-right-description">
          A versatile and comfortable T-shirt made from soft, breathable fabric, perfect for casual wear or layering, offering a timeless style that pairs easily with any outfit.
        </div>
        <div className="productdisplay-right-size">
          <h1>Select Size</h1>
          <div className="productdisplay-right-size">
            <div>S</div>
            <div>M</div>
            <div>L</div>
            <div>XL</div>
            <div>XXL</div>
          </div>
        </div>
        <button
          onClick={handleAddToCart}
          className={isBouncing ? 'bounce' : ''}
        >
          ADD TO CART
        </button>
        <p className="productdisplay-right-category"><span>Category: </span>Women, T-shirt, Crop Top</p>
        <p className="productdisplay-right-category"><span>Tags: </span>Modern, Latest</p>
      </div>
    </div>
  );
};

export default ProductDisplay;
