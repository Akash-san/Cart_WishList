
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar'
import Shop from './components/Shop/Shop';
import Cart from './components/Shop/Cart';
import Wishlist from './components/Shop/Wishlist';
import Signup from './components/Auth/Signup';
import Login from './components/Auth/Login';


function App() {
  return (
   
      <BrowserRouter>
         
      <Navbar />

      <Routes>
        <Route path="/" element={<Navigate to="/shop" />} /> {/* Redirect root to /shop */}
        <Route path="/shop" element={<Shop />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/logout"
          element={<Navigate to="/shop" replace />} />
      </Routes>
        </BrowserRouter>
  
  );
}

export default App;
