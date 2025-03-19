import React, { useContext, useEffect, useState } from 'react'
import './CSS/ShopCategory.css'
import { ShopContext } from '../Context/ShopContext'
import dropdown_icon from '../Components/Assets/dropdown_icon.png'
import Item from '../Components/Item/Item';
import { API_URL } from '../config';

const ShopCategory = (props) => {
  const { allProducts } = useContext(ShopContext);
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [directApiProducts, setDirectApiProducts] = useState([]);

  // Direct API check - as a backup solution
  useEffect(() => {
    const fetchDirectFromApi = async () => {
      try {
        console.log(`Directly fetching category '${props.category}' from API`);
        
        // Fetch all products and filter manually if there might be case sensitivity issues
        const response = await fetch(`${API_URL}/products`);
        const data = await response.json();
        
        if (data.success && data.products) {
          console.log(`API returned ${data.products.length} total products`);
          
          // Filter products by category (case-insensitive) manually
          const filtered = data.products.filter(product => 
            product.category && 
            product.category.toLowerCase() === props.category.toLowerCase()
          );
          
          console.log(`After manual filtering: ${filtered.length} products match category '${props.category}'`);
          console.log('Category values found:', filtered.map(p => p.category));
          
          setDirectApiProducts(filtered);
          
          // If no products found in context but API has products, use the API products
          if (categoryProducts.length === 0 && filtered.length > 0) {
            console.log('Using products from direct API call with manual filtering');
            setCategoryProducts(filtered);
          }
        } else {
          console.error('Error fetching direct from API:', data.message);
        }
      } catch (error) {
        console.error('Error in direct API fetch:', error);
      }
    };
    
    if (isLoading && allProducts.length > 0) {
      fetchDirectFromApi();
    }
  }, [props.category, isLoading, allProducts.length, categoryProducts.length]);

  useEffect(() => {
    // Log all products and categories for debugging
    console.log("All products:", allProducts);
    const categories = allProducts.map(p => p.category);
    console.log("Available categories:", [...new Set(categories)]);
    
    // Filter products by category (case-insensitive) and log results by category
    const filtered = allProducts.filter(item => 
      item.category && props.category && 
      item.category.toLowerCase() === props.category.toLowerCase()
    );
    
    // Additional debugging for the current category
    console.log(`Current category: "${props.category}"`);
    console.log(`Found ${filtered.length} products for category "${props.category}"`);
    if (filtered.length > 0) {
      console.log(`First few products in ${props.category} category:`, 
        filtered.slice(0, 3).map(p => ({ name: p.name, category: p.category, id: p._id }))
      );
    }
    
    setCategoryProducts(filtered);
    setIsLoading(false);
  }, [allProducts, props.category]);

  // Ensure we're only displaying products that match the current category
  // Double-check with an additional filter
  const productsToDisplay = categoryProducts.length > 0 
    ? categoryProducts.filter(item => 
        item.category && 
        item.category.toLowerCase() === props.category.toLowerCase())
    : directApiProducts.filter(item => 
        item.category && 
        item.category.toLowerCase() === props.category.toLowerCase());

  return (
    <div className="shop-category">
      <img src={props.banner} alt="Category Banner" className="shop-category-banner"/>

      <div className="shop-category-index-sort">
        {/* Page Index */}
        <p>
          <span>Showing {productsToDisplay.length}</span> out of {productsToDisplay.length} products
        </p>

        {/* Sort By */}
        <div className="shop-category-sort">
          Sort By
          <img src={dropdown_icon} alt="Dropdown Icon" />
        </div>
      </div>

      {/* Product Grid */}
      <div className="shop-category-products">
        {isLoading ? (
          <div className="loading-message">Loading products...</div>
        ) : productsToDisplay.length > 0 ? (
          productsToDisplay.map((item) => (
            <Item 
              key={item._id} 
              id={item._id} 
              name={item.name} 
              image={item.image} 
              new_price={item.new_price} 
              old_price={item.old_price}
            />
          ))
        ) : (
          <div className="no-products-message">
            <h3>No products found in this category</h3>
            <p>We're working on adding new products to this category. Please check back soon!</p>
          </div>
        )}
      </div>

      {/* Load More Button */}
      {productsToDisplay.length > 0 && (
        <div className="shop-category-load-more">
          Explore More
        </div>
      )}
    </div>
  );
};

export default ShopCategory