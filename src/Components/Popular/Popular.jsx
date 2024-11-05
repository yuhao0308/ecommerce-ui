import React, { useState, useEffect } from 'react'
import "./Popular.css"
import Item from '../Item/Item'
import { API_URL } from '../../config'

const Popular = () => {
  const [popularProducts, setPopularProducts] = useState([]);

  useEffect(()=>{
    const fetchPopularProducts = async () => {
      try {
        const response = await fetch(`${API_URL}/products?category=women&limit=4`);
        const data = await response.json();
        setPopularProducts(data.products || []);
      } catch (error) {
        console.error('Error fetching popular products:', error);
      }
    };

    fetchPopularProducts();
  }, []);

  return (
    <div className="popular">
      <h1>POPULAR IN WOMEN</h1>
      <hr/>
      <div className="popular-item">
        {popularProducts.map((item)=>(
          <Item key={item._id} id={item._id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
        ))}
      </div>
    </div>
  )
}

export default Popular