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

  // Simplified approach - fetch and filter products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log(`Fetching products for category '${props.category}'`);
        console.log('Context products count:', allProducts.length);
        
        // First try filtering from context
        const contextFiltered = allProducts.filter(item => 
          item.category && 
          item.category.toLowerCase() === props.category.toLowerCase()
        );
        
        console.log(`Found ${contextFiltered.length} matching products in context`);
        
        // If we found products in context, use those
        if (contextFiltered.length > 0) {
          setCategoryProducts(contextFiltered);
          setIsLoading(false);
          return;
        }
        
        // Otherwise fetch directly from API
        console.log('Fetching from API as fallback');
        const response = await fetch(`${API_URL}/products`);
        const data = await response.json();
        
        if (data.success && data.products) {
          console.log(`API returned ${data.products.length} total products`);
          
          // Filter by category
          const apiFiltered = data.products.filter(product => 
            product.category && 
            product.category.toLowerCase() === props.category.toLowerCase()
          );
          
          console.log(`After filtering: ${apiFiltered.length} products match category '${props.category}'`);
          if (apiFiltered.length > 0) {
            console.log('Sample products:', apiFiltered.slice(0, 2).map(p => ({
              id: p._id,
              name: p.name,
              category: p.category
            })));
          }
          
          setCategoryProducts(apiFiltered);
        } else {
          console.error('Error fetching from API:', data.message);
          setCategoryProducts([]);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        setCategoryProducts([]);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProducts();
  }, [props.category, allProducts]);

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