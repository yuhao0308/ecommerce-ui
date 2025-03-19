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
    const fetchCategoryProducts = async () => {
      try {
        setIsLoading(true);
        
        // Fetch products by category directly from the API
        const response = await fetch(`${API_URL}/products?category=${props.category}`);
        const data = await response.json();
        
        if (data.success && data.products && data.products.length > 0) {
          console.log(`API returned ${data.products.length} products for category '${props.category}'`);
          setCategoryProducts(data.products);
        } else {
          console.error(`No products found for category '${props.category}'`);
          setCategoryProducts([]);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        setCategoryProducts([]);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchCategoryProducts();
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