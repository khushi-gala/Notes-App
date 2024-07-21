require("dotenv").config();

const mongoose = require("mongoose");

const User = require("./models/user.model");
const Note = require("./models/note.model");
const express = require("express");
const cors = require("cors")
const jwt = require("jsonwebtoken");
const { authenticateToken } = require("./utilities");

const app= express();

app.use(express.json());

app.use(cors({
    origin: 'https://pensieve-frontend-q3cg952hk-khushis-projects-ee3bf857.vercel.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true  // Enable credentials (cookies, authorization headers) cross-origin
}));

mongoose.connect(process.env.MONGODB_CONNECTION_STRING)
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Failed to connect to MongoDB', err));

app.get("/", (req, res) => {
    res.json({data: "hello"});
});


// Create Account
app.post("/create-account", async (req, res) => {
    const { fullName, email, password } = req.body;

    if(!fullName) {
        return res
        .status(400)
        .json({ error: true, message: "Full Name is Required"});
    }
    if(!email) {
        return res
        .status(400)
        .json({ error: true, message: "Email is Required"});
    }
    if(!password) {
        return res
        .status(400)
        .json({ error: true, message: "Password is Required"});
    }

    const isUser = await User.findOne({ email: email });

    if (isUser) {
        return res.json({
            error: true,
            message: "User already exists",
        });
    }

    const user = new User({
        fullName,
        email,
        password,
    });

    await user.save();

    const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "36000m",
    });

    return res.json({
        error: false,
        user, 
        accessToken,
        message: "Registration Successful",
    });
});

// Login
app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    if(!email) {
        return res.status(400).json({ message: "Email is required "});
    }
    if(!password) {
        return res.status(400).json({ message: "Password is required "});
    }
    
    const userInfo = await User.findOne({ email: email});

    if(!userInfo) {
        return res.status(400).json({ message: "User not found"});
    }

    if(userInfo.email == email && userInfo.password == password) {
        const user = { user: userInfo };
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "36000m",
        });

        return res.json({
            error: false,
            message: "Login Successful",
            email,
            accessToken,
        });
    }
    else{
        return res.status(400).json({
            error: true,
            message: "Invalid Credentials",
        });
    }
});

// Get User
app.get("/get-user", authenticateToken, async (req, res) => {
    const { user } = req.user;
    const isUser = await User.findOne({ _id: user._id});

    if(!isUser){
        return res.sendStatus(401);
    }

    return res.json({
        user: {
            fullName: isUser.fullName,
            email: isUser.email,
            "_id": isUser._id,
            createdOn: isUser.createdOn
        },
        message: "",
    });
})
// Add Note
app.post("/add-note", authenticateToken, async (req, res) => {
    const { title, content, tags, tasks} = req.body;
    const { user }= req.user;

    if(!title) {
        return res.status(400).json({ error: true, message: "Title is required"});
    }

    if (!content) {
        return res.status(400).json({ error: true, message: "Content is required"});
    }

    try {
        const note= new Note({
            title,
            content,
            tags: tags || [],
            tasks: tasks || [],
            userId: user._id,
        });
        
        await note.save();

        return res.json ({
            error: false,
            note, 
            message: "Note added successfully",
        });
    }
    catch (error) {
        return res.status(500).json({
            error: true,
            message: "Internal Server Error",
        });
    }

})

// Edit Note
app.put("/edit-note/:noteId", authenticateToken, async (req, res) => {
    const noteId = req.params.noteId;
    const { title, content, tags, isPinned, tasks } = req.body;
    const { user } = req.user;

    if(!title && !content && !tags && !tasks) {
        return res
        .status(400)
        .json({ error: true, 
            message: "No changes provided"
        });
    }

    try {
        const note = await Note.findOne({ _id: noteId, userId: user._id });

        if(!note){
            return res.status(404).json({ error: true, message: "Note not found"});
        }

        if(title) note.title = title;
        if(content) note.content = content;
        if(tags) note.tags = tags;
        if(tasks) note.tasks = tasks;
        if(isPinned) note.isPinned = isPinned;

        await note.save();

        return res.json({
            error: false,
            note,
            message: "Note updated successfully",
        });
    }
    catch (error) {
        return res.status(500).json({
            error: true,
            message: "Internal Server Error",
        });
    }
})

// Get All Notes
app.get("/get-all-notes", authenticateToken, async(req, res) =>{
    const { user } = req.user;
    try{
        const notes= await Note.find({userId: user._id}).sort({ isPinned: -1 });
        return res.json({
            error: false,
            notes,
            message: "All notes retrieved successfully"
        });
    }
    catch (error) {
        return res.status(500).json({
            error: true,
            message: "Internal Server Error"
        });
    }
})

// Delete Note
app.delete("/delete-note/:noteId", authenticateToken, async (req, res) => {
    const noteId = req.params.noteId;
    const { user } = req.user;

    try {
        const note = await Note.findOne({ _id: noteId, userId: user._id });

        if(!note){
            return res.status(404).json({ error: true, message: "Note not found"});
        }

        await Note.deleteOne({ _id: noteId, userId: user._id });
        
        return res.json({
            error: false,
            note,
            message: "Note deleted successfully",
        });
    }
    catch (error) {
        return res.status(500).json({
            error: true,
            message: "Internal Server Error",
        });
    }
})

// Pin Note
app.put("/update-note-pin/:noteId", authenticateToken, async (req, res) => {
    const noteId = req.params.noteId;
    const { user } = req.user;
    const { isPinned } = req.body;

    try {
        const note = await Note.findOne({ _id: noteId, userId: user._id });

        if(!note){
            return res.status(404).json({ error: true, message: "Note not found"});
        }

        
        note.isPinned = isPinned;

        await note.save();

        return res.json({
            error: false,
            note,
            message: "Note updated successfully",
        });
    }
    catch (error) {
        return res.status(500).json({
            error: true,
            message: "Internal Server Error",
        });
    }
})

// Search Note
app.get("/search-notes", authenticateToken, async (req, res) => {
    const { user } = req.user;
    const { query } = req.query;
    if(!query){
        return res
        .status(400)
        .json({ error: true, message: "Search query is required" })
    }

    try {
        const matchingNotes = await Note.find({
            userId: user._id,
            $or: [
                { title: { $regex: new RegExp(query, "i" )}},
                { content: {$regex: new RegExp(query, "i" )}},
            ],
        });
        return res.json({
            error: false,
            notes: matchingNotes,
            message: "Notes Matching the search query retrieved successfully",
        });
    }
    catch (error){
        return res.status(500).json({
            error: true,
            message: "Internal Server Error",
        });
    }

})

// Add Task
app.post(`/notes/:noteId/add-task`, async (req, res) => {
    console.log('Received POST request for add-task:', req.params.noteId, req.body);
    const { noteId } = req.params;
    const tasks = req.body.tasks;
    // console.log("1");
    if (!Array.isArray(tasks)) {
        // console.log("2");
        console.log(noteId);
        return res.status(400).send('Tasks should be an array');
        // console.log("3");
    }

    try {
        // console.log("3");
        const note = await Note.findById(noteId);
        // console.log("4");
        if (!note) return res.status(404).send('Note not found');
        // console.log("5");
        note.tasks.push(...tasks);
        // console.log("6");
        await note.save();
        // console.log("7");
        res.status(201).send(note);
        // console.log("8");
    } catch (error) {
        res.status(500).send(error);
    }
});

// Get All Task
app.get(`/notes/:noteId/get-task`, async (req, res) => {
    const { noteId } = req.params;

    try {
        const note = await Note.findById(noteId);
        if (!note) return res.status(404).send('Note not found');

        res.status(200).send(note.tasks);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Update Task Status
app.put(`/notes/:noteId/task/:taskIndex/update`, async (req, res) => {
    const { noteId, taskIndex } = req.params;
    const { done } = req.body;

    try {
        const note = await Note.findById(noteId);
        if (!note) return res.status(404).send('Note not found');

        // Check if taskIndex is within the array bounds
        if (taskIndex < 0 || taskIndex >= note.tasks.length) {
            return res.status(404).send('Invalid task index');
        }

        // Update done status of the task at taskIndex
        note.tasks[taskIndex].done = done;
        await note.save();

        res.status(200).send(note.tasks[taskIndex]);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Delete Task
app.delete(`/notes/:noteId/task/:taskIndex/delete`, async (req, res) => {
    const { noteId, taskIndex } = req.params;

    try {
        const note = await Note.findById(noteId);
        if (!note) return res.status(404).send('Note not found');

        // Check if taskIndex is within the array bounds
        if (taskIndex < 0 || taskIndex >= note.tasks.length) {
            return res.status(404).send('Invalid task index');
        }

        // Remove task at taskIndex from tasks array
        note.tasks.splice(taskIndex, 1);
        await note.save();

        res.status(200).send({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).send(error);
    }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, function () {
    console.log('Example app listening on port 8000!');
});
module.exports= app;
