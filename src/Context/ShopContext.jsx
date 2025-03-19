import React, {createContext, useState, useEffect} from "react";
import { API_URL } from '../config';

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
  const [allProducts, setAllProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [shopcartId, setShopcartId] = useState(null);

  // Fetch all products
  const fetchAllProducts = async () => {
    try {
      console.log('Fetching products from:', `${API_URL}/products`);
      const response = await fetch(`${API_URL}/products`);
      const data = await response.json();
      if (data.success) {
        console.log(`Successfully fetched ${data.products?.length || 0} products`);
        
        // Log category distribution
        const categories = {};
        data.products?.forEach(product => {
          if (product.category) {
            if (!categories[product.category]) {
              categories[product.category] = 0;
            }
            categories[product.category]++;
          } else {
            console.warn('Product missing category:', product._id, product.name);
          }
        });
        console.log('Category distribution:', categories);
        
        setAllProducts(data.products || []);
      } else {
        console.error('Error fetching products:', data.message);
        setAllProducts([]);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      setAllProducts([]);
    }
  };

  // Fetch shopcart
  const fetchShopcart = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('User is not authenticated');
        return;
      }

      // Fetch the user's data to get the shopcart ID
      const userResponse = await fetch(`${API_URL}/users/me`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const userData = await userResponse.json();
      if (!userData.success) {
        console.error('Error fetching user data:', userData.message);
        return;
      }

      const userId = userData.user._id;
      const shopcartId = userData.user.shopcart._id;

      if (!shopcartId) {
        console.error('User does not have a shopcart');
        return;
      }

      setShopcartId(shopcartId);

      // Fetch the shopcart items
      const shopcartResponse = await fetch(`${API_URL}/shopcarts/${shopcartId}/items`);
      const shopcartData = await shopcartResponse.json();
      if (shopcartData.success) {
        setCartItems(shopcartData.items || []);
      } else {
        console.error('Error fetching shopcart items:', shopcartData.message);
        setCartItems([]);
      }
    } catch (error) {
      console.error('Error fetching shopcart:', error);
      setCartItems([]);
    }
  }

  // Fetch products and shopcart on component mount
  useEffect(() => {
    fetchAllProducts();
    fetchShopcart();
  }, []);

  // Add to cart
  const addToCart = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('User is not authenticated');
        return;
      }

      if (!shopcartId) {
        console.error('User does not have a shopcart');
        return;
      }

      const response = await fetch(`${API_URL}/shopcarts/${shopcartId}/items`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ productId })
      });
      const data = await response.json();
      if (data.success) {
        const cartResponse = await fetch(`${API_URL}/shopcarts/${shopcartId}/items`);
        const cartData = await cartResponse.json();
        setCartItems(cartData.items || []);
      } else {
        console.error('Error adding to cart:', data.message);
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  }

  // Remove from cart
  const removeFromCart = async (itemId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('User is not authenticated');
        return;
      }

      if (!shopcartId) {
        console.error('User does not have a shopcart');
        return;
      }

      const response = await fetch(`${API_URL}/shopcarts/${shopcartId}/items/${itemId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (data.success) {
        const cartResponse = await fetch(`${API_URL}/shopcarts/${shopcartId}/items`);
        const cartData = await cartResponse.json();
        setCartItems(cartData.items || []);
      } else {
        console.error('Error removing from cart:', data.message);
      }
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  }

  // Update cart item quantity
  const updateCartItemQuantity = async (itemId, newQuantity) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('User is not authenticated');
        return;
      }

      if (!shopcartId) {
        console.error('User does not have a shopcart');
        return;
      }

      if (newQuantity < 1) {
        console.error('Quantity cannot be less than 1');
        return;
      }

      const response = await fetch(`${API_URL}/shopcarts/${shopcartId}/items/${itemId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ quantity: newQuantity })
      });
      const data = await response.json();
      if (data.success) {
        setCartItems([...data.shopcart.items]);
      } else {
        console.error('Error updating cart item quantity:', data.message);
      }
    } catch (error) {
      console.error('Error updating cart item quantity:', error);
    }
  }

  // Function to get the total amount in the cart
  const getTotalCartAmount = () => {
    let totalAmount = 0;
    cartItems.forEach((item) => {
      totalAmount += item.product.new_price * item.quantity;
    });
    return totalAmount.toFixed(2);
  };

  // Function to get the total number of items in the cart
  const getTotalCartItems = () => {
    let totalItems = 0;
    cartItems.forEach((item) => {
      totalItems += item.quantity;
    });
    return totalItems;
  };

  const contextValue = {allProducts, cartItems, addToCart, removeFromCart, updateCartItemQuantity, getTotalCartAmount, getTotalCartItems};

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  )
}

export default ShopContextProvider