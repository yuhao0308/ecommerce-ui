import React, { useState, useEffect } from 'react'
import './RelatedProducts.css'
import Item from '../Item/Item'
import { API_URL } from '../../config'

const RelatedProducts = ({ currentProduct }) => {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      if (!currentProduct || !currentProduct.category) {
        setIsLoading(false);
        return;
      }
      
      try {
        setIsLoading(true);
        // Fetch products from the same category
        const response = await fetch(`${API_URL}/products?category=${currentProduct.category}`);
        const data = await response.json();
        
        if (data.success) {
          // Filter out the current product by ID
          const filtered = data.products.filter(product => product._id !== currentProduct._id);
          
          // Limit to 4 products
          const limitedResults = filtered.slice(0, 4);
          
          setRelatedProducts(limitedResults);
        }
      } catch (error) {
        console.error('Error fetching related products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRelatedProducts();
  }, [currentProduct]);

  if (isLoading) {
    return (
      <div className="related-products">
        <h1>Related Products</h1>
        <hr/>
        <div className="related-products-item">
          <p>Loading related products...</p>
        </div>
      </div>
    );
  }

  if (relatedProducts.length === 0) {
    return (
      <div className="related-products">
        <h1>Related Products</h1>
        <hr/>
        <div className="related-products-item">
          <p>No related products found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="related-products">
      <h1>Related Products</h1>
      <hr/>
      <div className="related-products-item">
        {relatedProducts.map((item) => (
          <Item 
            key={item._id}
            id={item._id}
            name={item.name}
            image={item.image}
            new_price={item.new_price}
            old_price={item.old_price}
          />
        ))}
      </div>
    </div>
  )
}

export default RelatedProducts