import { Link } from "react-router-dom";

const products = [
    { id: 1, name: "Quantum Physics", price: 10, description: "Quantum physics book", image: "https://i.pinimg.com/736x/a9/07/0f/a9070fd5babf6b67bbcb8b071487343d.jpg" },
    { id: 2, name: "Full Stack", price: 15, description: "Guide for Full Stack", image: "https://i.pinimg.com/736x/df/77/13/df7713ad7745114fe3e74805bf517bb1.jpg" },
    { id: 3, name: "Machine Learning", price: 20, description: "Guide for Machine Learning", image: "https://i.pinimg.com/236x/f4/21/f0/f421f051222461889af151207e70a829.jpg" },
    { id: 4, name: "Data Science", price: 30, description: "Guide for Data Science", image: "https://i.pinimg.com/236x/84/a4/ea/84a4eabab50c1ff61a91ac22730339f0.jpg" },
    { id: 5, name: "Electronics", price: 25, description: "Guide for ECE", image: "https://i.pinimg.com/236x/c1/c5/07/c1c5076c6fe62bdc771a7794b6bd4d61.jpg" },
    { id: 6, name: "Chemistry", price: 30, description: "Guide for Chemistry", image: "https://i.pinimg.com/236x/60/85/ac/6085ac5ef0c60cad3e5c868289bbcd1e.jpg" }
];

const Home = () => {
    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            <h1>Welcome to Digital Store</h1>
            <h2>Explore our DIGITAL PRODUCTS</h2>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "20px", padding: "20px" }}>
                {products.map((product) => (
                    <div key={product.id} style={{  padding: "15px", borderRadius: "8px", width: "250px", textAlign: "center" }}>
                        <img src={product.image} alt={product.name} style={{ width: "100%", height: "180px", objectFit: "cover", borderRadius: "5px" }} />
                        <h2>{product.name}</h2>
                        <p>{product.description}</p>
                        <p><strong>Rs. {product.price}</strong></p>
                        <Link to={`/product/${product.id}`} style={{ display: "inline-block", textDecoration: "none", backgroundColor: "#007bff", color: "white", padding: "10px", borderRadius: "5px", fontWeight: "bold" }}>View Details</Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;