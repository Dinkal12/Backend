const express = require("express");
const fs = require("fs");
const mongoose = require("mongoose");

const app = express();
const PORT = 8000;

// Connection
mongoose
        .connect('mongodb://127.0.0.1:27017/practice')
        .then(() => console.log("MongoDB Connected"))
        .catch(err => console.log("Error : ", err));


/// Schema

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
    },
    jobTitle: {
        type: String,
        required: true,
    }
});

const User = mongoose.model("User", UserSchema);


// Middleware to parse JSON request bodies
app.use(express.json());

// Middleware-lugins
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
    console.log("middleware 1");
    fs.appendFile("./log.txt", `
Method: ${req.method}\n
URL: ${req.url}\n
Path: ${req.path}\n
Time: ${Date.now()}\n`, (err, data) => {
        next();
    });
});
app.use((req, res, next) => {
    console.log("middleware 2");
    next();
});

// HTML - fetch all users from MongoDB
app.get("/users", async (req, res) => {
    try {
        const users = await User.find({});
        const html = `
    <ul>
    ${users.map((user) =>
            `<li> ${user.firstName} ${user.lastName}</li>`
        ).join("")}
    </ul>
    `;
        res.send(html);
    } catch (err) {
        res.status(500).send("Error fetching users");
    }
});

// REST API

app.route("/api/users")
    // GET all users
    .get(async (req, res) => {
        try {
            const users = await User.find({});
            return res.json(users);
        } catch (err) {
            return res.status(500).json({ status: "error", message: err.message });
        }
    })
    // POST - create new user
    .post(async (req, res) => {
        const body = req.body;
        try {
            const result = await User.create({
                firstName: body.first_name,
                lastName: body.last_name,
                email: body.email,
                gender: body.gender,
                jobTitle: body.job_title,
            });
            return res.status(201).json({ status: "success", user: result });
        } catch (err) {
            return res.status(500).json({ status: "error", message: err.message });
        }
    });


app.route("/api/users/:id")
    // GET user by MongoDB _id
    .get(async (req, res) => {
        try {
            const user = await User.findById(req.params.id);
            if (!user) return res.status(404).json({ status: "error", message: "User not found" });
            return res.json(user);
        } catch (err) {
            return res.status(500).json({ status: "error", message: err.message });
        }
    })
    // PATCH - update user by MongoDB _id
    .patch(async (req, res) => {
        const body = req.body;
        try {
            const user = await User.findByIdAndUpdate(
                req.params.id,
                {
                    ...(body.first_name && { firstName: body.first_name }),
                    ...(body.last_name  && { lastName:  body.last_name  }),
                    ...(body.email      && { email:     body.email      }),
                    ...(body.gender     && { gender:    body.gender     }),
                    ...(body.job_title  && { jobTitle:  body.job_title  }),
                },
                { new: true }   // return the updated document
            );
            if (!user) return res.status(404).json({ status: "error", message: "User not found" });
            return res.json({ status: "success", user });
        } catch (err) {
            return res.status(500).json({ status: "error", message: err.message });
        }
    })
    // DELETE - remove user by MongoDB _id
    .delete(async (req, res) => {
        try {
            const user = await User.findByIdAndDelete(req.params.id);
            if (!user) return res.status(404).json({ status: "error", message: "User not found" });
            return res.json({ status: "success", user });
        } catch (err) {
            return res.status(500).json({ status: "error", message: err.message });
        }
    });


app.listen(PORT, () => console.log("Server is running at port", PORT));