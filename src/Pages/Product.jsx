import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../Context/ShopContext';
import Breadcrumb from '../Components/Breadcrumbs/Breadcrumb';
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay';
import DescriptionBox from '../Components/DescriptionBox/DescriptionBox';
import RelatedProducts from '../Components/RelatedProducts/RelatedProducts';
import { API_URL } from '../config';

const Product = () => {
  const { allProducts } = useContext(ShopContext);
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // First try to find the product in allProducts
        const contextProduct = allProducts.find((e) => e._id === productId);
        if (contextProduct) {
          setProduct(contextProduct);
          return;
        }

        // If not found in context, fetch from API
        const response = await fetch(`${API_URL}/products/${productId}`);
        const data = await response.json();
        if (data.success) {
          setProduct(data.product);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [productId, allProducts]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Breadcrumb product={product} />
      <ProductDisplay product={product} />
      <DescriptionBox />
      <RelatedProducts currentProduct={product} />
    </>
  );
};

export default Product;
