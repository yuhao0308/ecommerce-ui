import React, { useContext } from 'react'
import './CSS/ShopCategory.css'
import { ShopContext } from '../Context/ShopContext'
import dropdown_icon from '../Components/Assets/dropdown_icon.png'
import Item from '../Components/Item/Item';

const ShopCategory = (props) => {
  const { allProducts } = useContext(ShopContext);

  return (
    <div className="shop-category">
      <img src={props.banner} alt="Category Banner" className="shop-category-banner"/>

      <div className="shop-category-index-sort">
        {/* Page Index */}
        <p>
          <span>Showing 1 to 12</span> out of 36 products
        </p>

        {/* Sort By */}
        <div className="shop-category-sort">
          Sort By
          <img src={dropdown_icon} alt="Dropdown Icon" />
        </div>
      </div>

      {/* Product Grid */}
      <div className="shop-category-products">
        {allProducts.map((item) => {
          // Conditionally render items based on category
          if (props.category === item.category)  {
            return <Item key={item._id} id={item._id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>;
          }
          else {
            return null;
          }
        })}
      </div>

      {/* Load More Button */}
      <div className="shop-category-load-more">
        Explore More
      </div>
    </div>
  );
};

export default ShopCategory