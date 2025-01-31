import { useEffect, useState } from "react";

const Download = () => {
    const [purchasedBooks, setPurchasedBooks] = useState([]);

    useEffect(() => {
        const storedBooks = JSON.parse(localStorage.getItem("purchasedBooks")) || [];
        setPurchasedBooks(storedBooks);
    }, []);

    // 🔽 Function to force download the PDF
    const handleDownload = (link, name) => {
        fetch(link)
            .then(response => response.blob())
            .then(blob => {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = `Book-${name}.pdf`; // Set a default filename
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
            })
            .catch(error => console.error("Download failed:", error));
    };

    return (
        <div style={styles.container}>
            <h1>Thank you for your purchase!</h1>
            {purchasedBooks.length > 0 ? (
                purchasedBooks.map((book, index) => (
                    <div key={index} style={styles.book}>
                        <p>{book.name}</p>
                        {/* 🔽 Update button to use handleDownload */}
                        <button 
                            style={styles.button} 
                            onClick={() => handleDownload(book.downloadLink, book.name)}
                        >
                            Download Your Product
                        </button>
                    </div>
                ))
            ) : (
                <p>No downloads available.</p>
            )}
        </div>
    );
};

// Styles remain the same
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
