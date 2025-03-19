import React, { useEffect, useState } from 'react'
import './CSS/ShopCategory.css'
import dropdown_icon from '../Components/Assets/dropdown_icon.png'
import Item from '../Components/Item/Item';
import { API_URL } from '../config';

const ShopCategory = (props) => {
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Direct fetch approach without context
  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        setIsLoading(true);
        
        // Always fetch directly from API for most reliable results
        const response = await fetch(`${API_URL}/products`);
        const data = await response.json();
        
        if (data.success && data.products && data.products.length > 0) {
          console.log(`API returned ${data.products.length} total products`);
          
          // Try case-insensitive contains match instead of exact match
          const matchingProducts = data.products.filter(product => 
            product.category && 
            product.category.toLowerCase().includes(props.category.toLowerCase())
          );
          
          console.log(`Found ${matchingProducts.length} products matching category '${props.category}'`);
          
          if (matchingProducts.length > 0) {
            setCategoryProducts(matchingProducts);
          } else {
            // Try a more flexible matching approach
            console.log("Trying flexible matching...");
            
            // For 'men', also match 'mens', 'men's', etc.
            // For 'kids', also match 'kid', 'children', etc.
            let flexibleMatches = [];
            const category = props.category.toLowerCase();
            
            if (category === 'men') {
              flexibleMatches = data.products.filter(p => 
                p.category && 
                (p.category.toLowerCase().includes('men') || 
                 p.category.toLowerCase().includes('male'))
              );
            } else if (category === 'kids') {
              flexibleMatches = data.products.filter(p => 
                p.category && 
                (p.category.toLowerCase().includes('kid') || 
                 p.category.toLowerCase().includes('child') ||
                 p.category.toLowerCase().includes('youth'))
              );
            } else if (category === 'women') {
              flexibleMatches = data.products.filter(p => 
                p.category && 
                (p.category.toLowerCase().includes('women') || 
                 p.category.toLowerCase().includes('female') ||
                 p.category.toLowerCase().includes('lady'))
              );
            }
            
            console.log(`Flexible matching found ${flexibleMatches.length} products`);
            setCategoryProducts(flexibleMatches);
          }
        } else {
          console.error('Error fetching products or no products returned');
          setCategoryProducts([]);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        setCategoryProducts([]);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchAllProducts();
  }, [props.category]);

  return (
    <div className="shop-category">
      <img src={props.banner} alt="Category Banner" className="shop-category-banner"/>
      
      <div className="shop-category-index-sort">
        {/* Page Index */}
        <p>
          <span>Showing {categoryProducts.length}</span> out of {categoryProducts.length} products
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
        ) : categoryProducts.length > 0 ? (
          categoryProducts.map((item) => (
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
      {categoryProducts.length > 0 && (
        <div className="shop-category-load-more">
          Explore More
        </div>
      )}
    </div>
  );
};

export default ShopCategory