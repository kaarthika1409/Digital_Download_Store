import { useParams } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

const products = [
    { id: 1, name: "Quantum Physics", price: 10, description: "A detailed explanation by the Aspirants", image: "https://i.pinimg.com/736x/a9/07/0f/a9070fd5babf6b67bbcb8b071487343d.jpg" },
    { id: 2, name: "Full Stack", price: 15, description: "A complete guide for starters by IT professionals", image: "https://i.pinimg.com/736x/df/77/13/df7713ad7745114fe3e74805bf517bb1.jpg" },
    { id: 3, name: "Machine Learning", price: 20, description: "A complete guide for beginners by the experts", image: "https://i.pinimg.com/236x/f4/21/f0/f421f051222461889af151207e70a829.jpg" },
    { id: 4, name: "Data Science", price: 30, description: "A complete guide for students by data science specialists", image: "https://i.pinimg.com/236x/84/a4/ea/84a4eabab50c1ff61a91ac22730339f0.jpg" },
    { id: 5, name: "Electronics", price: 45, description: "A complete guide for ECE students by professors", image: "https://i.pinimg.com/236x/c1/c5/07/c1c5076c6fe62bdc771a7794b6bd4d61.jpg" },
    { id: 6, name: "Chemical Engineering", price: 25, description: "A successful guide for chemists by chemists", image: "https://i.pinimg.com/236x/60/85/ac/6085ac5ef0c60cad3e5c868289bbcd1e.jpg" }
];

const ProductDetails = () => {
    const { id } = useParams();
    const { addToCart } = useContext(CartContext);
    const product = products.find((p) => p.id === Number(id));

    const reviews = [
        { username: "Rithanya", text: "Great book! Very helpful.", rating: 5 },
        { username: "Deepika", text: "Good content, but could be more detailed.", rating: 4 }
    ];

    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            <img
                src={product.image}
                alt={product.name}
                style={{ width: "200px", height: "200px", borderRadius: "10px" }}
            />
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <p><strong>Rs.{product.price}</strong></p>
            <button
                onClick={() => addToCart(product)}
                style={{ padding: "10px 20px", backgroundColor: "grey", color: "white", border: "none", borderRadius: "5px" }}
            >
                Add to Cart
            </button>

            <div style={{ marginTop: "20px", textAlign: "left" }}>
                <h2>Reviews</h2>
                {reviews.length > 0 ? (
                    reviews.map((review, index) => (
                        <div key={index} style={{ marginBottom: "10px" }}>
                            <strong>{review.username}</strong> ⭐ {review.rating}/5
                            <p>{review.text}</p>
                        </div>
                    ))
                ) : (
                    <p>No reviews yet.</p>
                )}
            </div>
        </div>
    );
};

export default ProductDetails;