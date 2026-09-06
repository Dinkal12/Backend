const express = require("express");
const users = require("./MOCK_DATA .json");
const app = express();
const PORT = 8000;
const fs = require("fs");

// Middleware to parse JSON request bodies
app.use(express.json());

// Middleware to parse URL-encoded request bodies
app.use(express.urlencoded({extended:false}));

// html
app.get("/users",(req   ,res)=>{
    const html =`
    <ul>
    ${users.map((user)=>
        `<li> ${user.first_name} ${user.last_name}</li>`
    ).join("")}
    </ul>
    `;
    res.send(html);
})

// Rest api\

app.route("/api/users")
.get((req,res)=>{
    return res.json(users);
})
.post((req,res)=>{
    const body = req.body;
    users.push({ 
        ...body, 
        id: users.length + 1,
    });
    try {
        fs.writeFileSync("./MOCK_DATA .json", JSON.stringify(users));
        return res.json({ status: "success", user: body });
    } catch(err) {
        return res.status(500).json({ status: "error", message: err.message });
    }
});

app.route("/api/users/:id")
.get((req,res)=>{
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    if (!user) return res.status(404).json({ status: "error", message: "User not found" });
    return res.json(user);
})
.patch((req,res)=>{
    const id = Number(req.params.id);  // <-- id from URL, not body
    const body = req.body;
    const user = users.find((user) => user.id === id);
    if (!user) {
        return res.status(404).json({ status: "error", message: "User not found" });
    }
    if (body.first_name) user.first_name = body.first_name;
    if (body.last_name)  user.last_name  = body.last_name;
    if (body.email)      user.email      = body.email;
    if (body.gender)     user.gender     = body.gender;
    if (body.job_title)  user.job_title  = body.job_title;
    fs.writeFileSync("./MOCK_DATA .json", JSON.stringify(users));
    return res.json({ status: "success", user });
})
.delete((req,res)=>{
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    if (!user) {
        return res.status(404).json({ status: "error", message: "User not found" });
    }
    users.splice(users.indexOf(user), 1);
    fs.writeFileSync("./MOCK_DATA .json", JSON.stringify(users));
    return res.json({ status: "success", user });
});


app.listen(PORT, () => console.log("Server is running at port", PORT));