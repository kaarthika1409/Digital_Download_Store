import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Download from "./pages/Download";
import Login from "./components/Login";
import Signup from "./components/Signup";
import "./App.css";

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    return (
        <CartProvider>
            <Router>
                
               
                <Routes>
                    
                    <Route path="/" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />

                            <Route path="/Home" element={<><Navbar/><Home /></>} />
                            <Route path="/product/:id" element={<><Navbar/><ProductDetails /></>} />
                            <Route path="/cart" element={<><Navbar/><Cart /></>} />
                            <Route path="/checkout" element={<><Navbar/><Checkout /></>} />
                            <Route path="/download" element={<><Navbar/><Download /></>} />
                           
                    
                    
                </Routes>
            </Router>
        </CartProvider>
    );
};

export default App;
