const express = require('express');
const app = express();
const cors = require('cors');
const connectDB = require('./config/db');
const Person = require('./models/user');



app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post("/create", async(req, res)=>{
    try{
        const { name, email, age } = req.body;
        const user = new Person({
            name,
            email,
            age
        });
        await user.save();
        return res.status(201).json({ message: "User created successfully", user });
    }catch(err){
        console.error(err);
        return res.status(500).json({ message: "Something went wrong" });
    }
});

app.get("/users", async(req, res)=>{
    try{
        const users = await Person.find();
        return res.status(200).json({ users });
    }catch(err){
        console.error(err);
        return res.status(500).json({ message: "Something went wrong" });
    }
});

app.get("/user/:id", async(req, res)=>{
    try{
        const user = await Person.findById(req.params.id);
        return res.status(200).json({ user });
    }catch(err){
        console.error(err);
        return res.status(500).json({ message: "Something went wrong" });
    }
});


app.put("/user/:id", async(req, res)=>{
    try{
        const { name, email, age } = req.body;
        const user = await Person.findByIdAndUpdate({_id:req.params.id}, {
            name,
            email,
            age
        });
        await user.save();
        return res.status(200).json({ message: "User updated successfully" });
    }catch(err){
        console.error(err);
        return res.status(500).json({ message: "Something went wrong" });
    }
});

app.delete("/user/:id", async(req, res)=>{
    try{
        const user = await Person.findByIdAndDelete(req.params.id);
        return res.status(200).json({ message: "User deleted successfully" });
    }catch(err){
        console.error(err);
        return res.status(500).json({ message: "Something went wrong" });
    }
});


// Start the server
const port = process.env.PORT || 3001
app.listen(port, async()=>{
    console.log(`Server running at http://localhost:${port}`);
    await connectDB();
})

