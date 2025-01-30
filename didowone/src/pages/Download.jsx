import { useEffect, useState } from "react";

const Download = () => {
    const [purchasedBooks, setPurchasedBooks] = useState([]);

    useEffect(() => {
        
        const storedBooks = JSON.parse(localStorage.getItem("purchasedBooks")) || [];
        setPurchasedBooks(storedBooks);
    }, []);

    return (
        <div style={styles.container}>
            <h1>Thank you for your purchase!</h1>
            {purchasedBooks.length > 0 ? (
                purchasedBooks.map((book, index) => (
                    <div key={index} style={styles.book}>
                        <p>{book.name}</p>
                        <a href={book.downloadLink} download>
                            <button style={styles.button}>Download Your Product</button>
                        </a>
                    </div>
                ))
            ) : (
                <p>No downloads available.</p>
            )}
        </div>
    );
};

const styles = {
    container: {
        textAlign: "center",
        padding: "20px",
    },
    book: {
        marginTop: "10px",
        padding: "10px",
        border: "1px solid #ddd",
        backgroundColor: "#f9f9f9",
        borderRadius: "5px",
    },
    button: {
        padding: "10px 15px",
        fontSize: "16px",
        backgroundColor: "GREY",
        color: "white",
        border: "none",
        cursor: "pointer",
        borderRadius: "5px",
    },
};

export default Download;
