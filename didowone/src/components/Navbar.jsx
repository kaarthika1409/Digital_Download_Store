import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate("/signup");
  };

  return (
    <nav style={styles.navbar}>
      
      <div style={styles.links}>
        <Link to="/Home" style={styles.link}>Home</Link>
        
        <Link to="/cart" style={styles.link}>Cart</Link>
        <Link to="/" style={styles.link}>Logout</Link>
       
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    display: "flex",
    alignItems: "center",
    padding: "15px 30px",
    backgroundColor: "grey",
    color: "white",
  },
  
  links: {
    display: "flex",
    alignItems: "center",
  },
  link: {
    color: "white",
    textDecoration: "none",
    fontSize: "18px",
    marginRight: "20px",
  },
  logoutButton: {
    
    border: "none",
    padding: "10px 15px",
    color: "white",
    fontSize: "16px",
    cursor: "pointer",
    borderRadius: "5px",
  },
};

export default Navbar;
