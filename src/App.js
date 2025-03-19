import './App.css';
import Navbar from "./Components/Navbar/Navbar"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Shop from './Pages/Shop';
import ShopCategory from './Pages/ShopCategory';
import Product from './Pages/Product';
import Cart from './Pages/Cart';
import LoginSignUp from './Pages/LoginSignUp'
import Footer from './Components/Footer/Footer';
import men_banner from './Components/Assets/banner_mens.png'
import women_banner from './Components/Assets/banner_women.png'
import kids_banner from './Components/Assets/banner_kids.png'

// Define category constants to ensure consistency
const CATEGORY_MEN = "men";
const CATEGORY_WOMEN = "women";
const CATEGORY_KIDS = "kids";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Shop/>}/>
          <Route path="/men" element={<ShopCategory banner={men_banner} category={CATEGORY_MEN}/>}/>
          <Route path="/women" element={<ShopCategory banner={women_banner} category={CATEGORY_WOMEN}/>}/>
          <Route path="/kids" element={<ShopCategory banner={kids_banner} category={CATEGORY_KIDS}/>}/>
          <Route path="/product/:productId" element={<Product/>}/>
          <Route path="/cart" element={<Cart/>}/>
          <Route path="/login" element={<LoginSignUp/>}/>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;