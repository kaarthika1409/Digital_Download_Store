import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

const Cart = () => {
    const { cart, removeFromCart } = useContext(CartContext);

    return (
        <div style={styles.container}>
            <h1>Your Cart</h1>
            {cart.length === 0 ? <p>Cart is empty</p> : null}
            {cart.map((item) => (
                <div key={item.id} style={styles.cartItem}>
                    <img src={item.image} alt={item.name} style={styles.image} />
                    <div>
                        <h2>{item.name}</h2>
                        <p><strong>Rs.{item.price}</strong></p>
                        <button onClick={() => removeFromCart(item.id)} style={styles.button}>Remove</button>
                    </div>
                </div>
            ))}
            {cart.length > 0 && <Link to="/checkout" style={styles.checkoutButton}>Proceed to Checkout</Link>}
        </div>
    );
};

const styles = {
    container: {
        textAlign: "center",
        padding: "20px",
    },
    cartItem: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px",
        margin: "10px auto",
        maxWidth: "500px",
    },
    image: {
        width: "50px",
        height: "50px",
        objectFit: "cover",
    },
    button: {
        padding: "5px 10px",
        fontSize: "14px",
        backgroundColor: "red",
        color: "white",
        border: "none",
        cursor: "pointer",
    },
    checkoutButton: {
        display: "block",
        textDecoration: "none",
        backgroundColor: "GREY",
        color: "white",
        padding: "10px",
        borderRadius: "5px",
        marginTop: "20px",
    }
};

export default Cart;
