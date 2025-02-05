const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Signup = require('./models/signupSchema');
const Login = require('./models/loginSchema'); // Import Login Schema
const bcrypt = require('bcrypt');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const app = express();


dotenv.config();


app.use(cors());
app.use(express.json());


mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MongoDB Connection Successful");
    })
    .catch((err) => {
        console.error("MongoDB Connection Unsuccessful:", err.message);
    });


const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) return res.status(401).send("Access Denied");

    try {
        const user = jwt.verify(token, process.env.SECRET_KEY);
        req.user = user;
        next();
    } catch (err) {
        console.log(err);
        res.status(400).send("Invalid Token");
    }
};


app.get('/', (req, res) => {
    res.send("Store loaded successfully");
});

app.get('/json', verifyToken, (req, res) => {
    res.json({
        message: "This is the middleware",
        user: req.user
    });
});


app.post('/signup', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send({ message: "Email and password are required" });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const newSignup = new Signup({
            email: email,
            password: hashedPassword
        });

        await newSignup.save();
        res.status(201).send("SignUp Successful");
    } catch (err) {
        if (err.code === 11000) {
            res.status(400).send({ message: "Email already exists" });
        } else {
            res.status(400).send({ message: "SignUp Unsuccessful", error: err.message });
        }
    }
});


app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
       
        const user = await Signup.findOne({ email });
        if (!user) {
            return res.status(401).send({ message: "User not found. Please sign up!" });
        }

       
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(401).send({ message: "Invalid password" });
        }

       
        const payload = { email: user.email };
        const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1h' });

        await Login.create({ email, password: user.password });

        res.status(200).send({ message: "Login Successful", token: token });
    } catch (err) {
        res.status(500).send({ message: "Error during login", error: err.message });
    }
});



app.get('/getsignupdet', async (req, res) => {
    try {
        const signUpdet = await Signup.find();
        res.status(200).json(signUpdet);
    } catch (err) {
        res.status(500).send({ message: "Error Fetching Data", error: err.message });
    }
});


app.get('/getlogindet', async (req, res) => {
    try {
        const loginDetails = await Login.find();
        res.status(200).json(loginDetails);
    } catch (err) {
        res.status(500).send({ message: "Error Fetching Login Data", error: err.message });
    }
});


app.listen(3000, () => {
    console.log("Server Started on Port 3001");
});
