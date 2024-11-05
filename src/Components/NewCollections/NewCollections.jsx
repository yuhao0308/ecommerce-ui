import React, { useState, useEffect } from 'react'
import './NewCollections.css'
import Item from '../Item/Item'
import { API_URL } from '../../config'

const NewCollections = () => {

  const [newCollection, setNewCollection]  = useState([]);

  useEffect(()=>{
    const fetchNewCollection = async () => {
      try {
        const response = await fetch(`${API_URL}/products?sort=latest&limit=8`);
        const data = await response.json();
        setNewCollection(data.products || []);
      } catch (error) {
        console.error('Error fetching new collections:', error);
      }
    };

    fetchNewCollection();
  }, []);

  return (
    <div className="new-collections">
      <h1>NEW COLLECTIONS</h1>
      <hr/>
      <div className="collections">
        {newCollection.map((item)=>(
          <Item key={item._id} id={item._id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
        ))}
      </div>
    </div>
  )
}

export default NewCollections