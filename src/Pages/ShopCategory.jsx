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

  // Component mount debug
  useEffect(() => {
    console.log('ShopCategory mounted with props:', {
      category: props.category,
      type: typeof props.category,
      length: props.category ? props.category.length : 0,
      charCodes: props.category ? Array.from(props.category).map(c => c.charCodeAt(0)) : []
    });
    
    // Debug API config
    console.log('API_URL:', API_URL);
    
    // Try a raw fetch to see production data
    fetch(`${API_URL}/products`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          const catCounts = {};
          data.products.forEach(p => {
            if (p.category) {
              const cat = p.category.toLowerCase();
              catCounts[cat] = (catCounts[cat] || 0) + 1;
            }
          });
          console.log('Categories in API:', catCounts);
          
          // Log some sample products
          const samplesMap = {};
          Object.keys(catCounts).forEach(cat => {
            samplesMap[cat] = data.products
              .filter(p => p.category && p.category.toLowerCase() === cat)
              .slice(0, 1)
              .map(p => ({ id: p._id, name: p.name, category: p.category }));
          });
          console.log('Sample products by category:', samplesMap);
        }
      })
      .catch(err => console.error('Error in raw fetch:', err));
  }, [props.category]);
  
  // Simplified approach - fetch and filter products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log(`Fetching products for category '${props.category}'`);
        console.log('Context products count:', allProducts.length);
        
        // First try filtering from context
        const contextFiltered = allProducts.filter(item => 
          item.category && props.category &&
          item.category.toLowerCase().trim() === props.category.toLowerCase().trim()
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
          
          // Log exact category values for comparison
          if (props.category) {
            console.log('Expected category:', {
              raw: props.category,
              lower: props.category.toLowerCase(),
              trimmed: props.category.trim(),
              lowerTrimmed: props.category.toLowerCase().trim()
            });
            
            const sampleCategories = [...new Set(data.products.map(p => p.category))].slice(0, 10);
            console.log('Sample categories from API:', sampleCategories);
          }
          
          // Filter by category with very loose matching to diagnose issues
          const apiFiltered = data.products.filter(product => 
            product.category && props.category &&
            product.category.toLowerCase().trim() === props.category.toLowerCase().trim()
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
      
      {/* Debug Banner */}
      <div className="debug-info" style={{margin: '10px', padding: '10px', background: '#f0f0f0', display: 'none'}}>
        <p>Category: "{props.category}"</p>
        <p>Products found: {categoryProducts.length}</p>
      </div>

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
            <p style={{fontSize: '12px', color: '#999'}}>Category: "{props.category}"</p>
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