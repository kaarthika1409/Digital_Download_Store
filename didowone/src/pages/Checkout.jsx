import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
    const { cart, clearCart } = useContext(CartContext);
    const navigate = useNavigate();

    const [paymentDetails, setPaymentDetails] = useState({
        name: "",
        cardNumber: "",
        
    });

    const [error, setError] = useState("");

    
    const productDownloads = {
        "Quantum Physics": "https://images.jumpseller.com/store/digitaluniverse/8495454/attachments/cef26eceb6051a5a4933fedd36b8b652/Quantum_Physics_for_Beginners_Discover_the_Most_Mind.pdf",
        "Full Stack": "https://www.newline.co/fullstack-react/assets/media/sGEMe/MNzue/30-days-of-react-ebook-fullstackio.pdf",
        "Machine Learning": "https://aitskadapa.ac.in/e-books/AI&ML/MACHINE%20LEARNING/Machine%20Learning%20(%20etc.)%20(z-lib.org).pdf",
        "Data Science": "https://mrcet.com/downloads/digital_notes/CSE/II%20Year/DS/Introduction%20to%20Datascience%20%5BR20DS501%5D.pdf",
        "Electronics":"https://www.aicte-india.org/sites/default/files/Model_Curriculum/Final_ECE%20after%20addedum.pdf",
        "Chemical Engineering": "https://www.smbstcollege.com/uploads/department/College_chemistry_-_Epstein_Rosenberg.pdf",
    };

   
    const handleChange = (e) => {
        setPaymentDetails({ ...paymentDetails, [e.target.name]: e.target.value });
    };

    
    const handlePayment = (e) => {
        e.preventDefault();

       
        if (!paymentDetails.name || !paymentDetails.cardNumber ) {
            setError("Please fill in all payment details.");
            return;
        }

        if (paymentDetails.cardNumber.length !== 5 || isNaN(paymentDetails.cardNumber)) {
            setError("Invalid card number.");
            return;
        }

        

        setError(""); 

        const purchasedItems = cart.map((item) => ({
            name: item.name,
            downloadLink: productDownloads[item.name] || "#",
        }));

        localStorage.setItem("purchasedBooks", JSON.stringify(purchasedItems));
        localStorage.setItem("paymentDetails", JSON.stringify(paymentDetails)); 

        
        clearCart();
        navigate("/download");
    };

    return (
        <div style={styles.container}>
            <h1>Checkout</h1>
            
           
            <div style={styles.bill}>
                <h2>Bill Summary</h2>
                {cart.length === 0 ? (
                    <p>Your cart is empty</p>
                ) : (
                    <ul>
                        {cart.map((item, index) => (
                            <li key={index} style={styles.item}>
                                {item.name} - Rs.{item.price}
                            </li>
                        ))}
                    </ul>
                )}
                <h3>Total: Rs.{cart.reduce((total, item) => total + item.price, 0).toFixed(2)}</h3>
            </div>
            {cart.length > 0 && (
                <form onSubmit={handlePayment} style={styles.form}>
                    <h2>Enter Payment Details</h2>

                    <input 
                        type="text" 
                        name="name" 
                        placeholder="Cardholder Name" 
                        value={paymentDetails.name} 
                        onChange={handleChange} 
                        required 
                        style={styles.input}
                    />
                    
                    <input 
                        type="text" 
                        name="cardNumber" 
                        placeholder="Card Number (16 digits)" 
                        value={paymentDetails.cardNumber} 
                        onChange={handleChange} 
                        required 
                        maxLength="16"
                        style={styles.input}
                    />

                    
                    
                    {error && <p style={styles.error}>{error}</p>}

                    <button type="submit" style={styles.button}>
                        Pay Now 
                    </button>
                </form>
            )}
        </div>
    );
};

const styles = {
    container: {
        textAlign: "center",
        padding: "20px",
    },
    bill: {
        padding: "15px",
        maxWidth: "400px",
        margin: "0 auto",
        backgroundColor: "#f9f9f9",
    },
    item: {
        listStyleType: "none",
        padding: "5px 0",
    },
    form: {
        maxWidth: "400px",
        margin: "20px auto",
        padding: "15px",
        backgroundColor: "#f9f9f9",
    },
    input: {
        width: "100%",
        padding: "10px",
        margin: "5px 0",
        fontSize: "16px",
    },
    cardDetails: {
        display: "flex",
        justifyContent: "space-between",
    },
    smallInput: {
        width: "48%",
        padding: "10px",
        margin: "5px 0",
        fontSize: "16px",
    },
    button: {
        width: "100%",
        padding: "10px",
        fontSize: "16px",
        backgroundColor: "GREY",
        color: "white",
        border: "none",
        cursor: "pointer",
        marginTop: "10px",
    },
    error: {
        color: "red",
        fontSize: "14px",
    }
};

export default Checkout;
