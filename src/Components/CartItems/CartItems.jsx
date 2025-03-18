import React, { useContext, useState } from 'react';
import './CartItems.css';
import { ShopContext } from '../../Context/ShopContext';
import remove_icon from '../Assets/cart_cross_icon.png';
import { formatImageUrl } from '../../utils/imageHelpers';

const CartItems = () => {
  const {
    cartItems,
    removeFromCart,
    updateCartItemQuantity,
    getTotalCartAmount,
  } = useContext(ShopContext);
  const [imgErrors, setImgErrors] = useState({});

  // Function to increase item quantity
  const increaseItemQuantity = async (item) => {
    await updateCartItemQuantity(item._id, item.quantity + 1);
  };

  // Function to decrease item quantity or remove from cart if quantity is 1
  const decreaseItemQuantity = async (item) => {
    if (item.quantity > 1) {
      await updateCartItemQuantity(item._id, item.quantity - 1);
    } else {
      await removeFromCart(item._id);
    }
  };
  
  // Handle image loading errors
  const handleImageError = (e, itemId) => {
    e.target.onerror = null; // Prevent infinite loop
    setImgErrors(prev => ({...prev, [itemId]: true}));
    // Use a simple base64 encoded gray image as fallback
    e.target.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWCAMAAAAL34HQAAAASFBMVEX////Ly8vIyMjp6enz8/P4+Pjv7+/7+/vS0tLk5OTZ2dn19fXd3d3g4ODr6+vOzs7W1tbFxcXx8fHb29vAwMDJycnu7u7BwcExe0BnAAAEl0lEQVR4nO1b27aiMAwFWwoFaZXb//+pR2wTEKxwpgWeZj/Mi4tNuya9JZn9/DQ0NDQ0NDQ0NH4d4Mjva8DRMRrQSc9uVq4RveR6f1kvgaqSbfDRHQVDlusdyB+y4FtQQfaWXXCLqpoMSqXkgl1UMpNTqUwGEXKmXB4Y7JnLi6tNuTyW2ZJr+Ey5QkMzV8dPkst9rOCVHLLx/Nfx45SolVhDSfwQ9D26y4Xa7e3k7O3f+FrBh5eWdmLtZhXsQiqluE39u826ahVTrSFqLZ7+w/z60kZYeT9kR9rjYbN+P0R98xwvnxF5rdLr5Z3FS0CrJz+8m135IQlA5bdGr+AHfkgDkFFrXeAHvMsPbwLKfQ55DujdHvwAPNCjH1Khfts9FUYEP7yNUiCUuXypJEuWStc0P+yAGiuGQJ1NFCX6od/wQ1K1qpofNvnhJhiLUG75YRHBDzfV6jb44aDlh3uBUpYf7gbKG35Y44e7gZK7vz1+uB8ocfhbYPrGD3cEBep/Pmt+uCcoGNxYtn/cFZSI9tOfgF/uC2oA0e8OCvSEH/aHPH64KyhwkR+OADoVBYU8PzwLaMHzx7OAjqc/vgHo6DPLAeR/HChvcXTTFNv/DBTl+Rf3P0SHtjy+Vv9nYX/TDlj/GyOUVX7YG+iCTTa02jLv32f1v0X+h88o7vYPmTzUP7c8z1UzF55xS7MGF5/DgwYlF44Y8Ym7BNrB4fmL2ZKru7BTrSrz6XB/6aXSC07KrJ0HLK4aqV47aV8+7f9kDPDcKziBXrP51KKBjgbkVhXm03n/TzPfuFx+ZJZ8UaUZWUcPXCN6hdwZ55xV0F7dGb7+u0ZRaG0j5jJXcTorK+7J6Gt7eJ1/AepMd4bvW6SiifxmXs9jX/5Ww5A3CeWfO+NmbVLEIXXLqwYDm9aZiQnrK2ZZnYlyRmgmI6xujy/UawK0kZ6//Oc6Mwnnt0aGqJUyYX2D7ZhkGD19KT8H3ySWrIbGnkXnNw9W1Aq4QEDpv4QUqxHXWRUzQ6yatdSZPP/oWiF21Z+xNzqIVrKa+IxZxxC1GnueBpI8pN+cO5f/9KpSzuXPn2r2r0j2DBkm9vgx/IWE0FdzVW2lhGJyPvpG5CXa7yXfNNe+KdkqxfbgxfbgVsRtfRZpCQx9J6jzWj3f1b3WPu+uiUdWvT3eUEZW3/VxGknT9G36dQp0oEFkPbgkNcXdX8Og6yiZlQ5Vw6znBq1YJQSEXDcuLPc0PspjgAWxP1jHc4MejUfS5XFgL1wt8Fp03njEI4F1gL8pMMJZnmKJJ32xjuNGveWR0gT8tRw4hGYn8Gx54ZK9vGvkhcs96uR/yOhDWVa96NpAkr3uxQpZa0vQq4l6BdqC1I1bN5Ckl99fcEXpEtjXQdBEYKTxUOJimPxJUkwZt1EEe2FJzHonl7jnZ7k0w3f8DMdPMh9DFjlDf+ELsR8SsZXmXp+xZhCLCDEXsIxw+K/fF/EcYZoNDQ0NDQ0NDY0/jX9GmjZA2dMr5QAAAABJRU5ErkJggg==';
  };

  return (
    <div className="cart-items">
      <div className="cart-items-header cart-items-grid">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      {cartItems.map((item) => (
        <div key={item._id}>
          <div className="cart-items-row cart-items-grid">
            <img
              src={imgErrors[item._id] ? null : formatImageUrl(item.product.image)}
              alt={item.product.name}
              className="cart-product-image"
              onError={(e) => handleImageError(e, item._id)}
            />
            <p>{item.product.name}</p>
            <p>${item.product.new_price}</p>
            <div className="cart-quantity-controls">
              <button onClick={() => decreaseItemQuantity(item)}> - </button>
              <span>{item.quantity}</span>
              <button onClick={() => increaseItemQuantity(item)}> + </button>
            </div>
            <p>${(item.product.new_price * item.quantity).toFixed(2)}</p>
            <img
              className="cart-remove-icon"
              src={remove_icon}
              onClick={() => {
                removeFromCart(item._id);
              }}
              alt="Remove"
            />
          </div>
          <hr />
        </div>
      ))}
      <div className="cart-summary">
        <div className="cart-totals">
          <h1>Cart Totals</h1>
          <div>
            <div className="cart-totals-item">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-totals-item">
              <p>Shipping Fee</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="cart-totals-item">
              <h3>Total</h3>
              <h3>${getTotalCartAmount()}</h3>
            </div>
          </div>
          <button className="cart-checkout-button">PROCEED TO CHECKOUT</button>
        </div>
        <div className="cart-promo-code">
          <p>If you have a promo code, enter it here</p>
          <div className="cart-promo-box">
            <input type="text" placeholder="Promo code" />
            <button>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
