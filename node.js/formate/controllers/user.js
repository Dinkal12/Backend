const User = require("../models/user");

// GET /api/users
async function handleGetAllUsers(req, res) {
    try {
        const users = await User.find({});
        return res.json(users);
    } catch (err) {
        return res.status(500).json({ status: "error", message: err.message });
    }
}

// POST /api/users
async function handleCreateUser(req, res) {
    const body = req.body;
    try {
        const user = await User.create({
            firstName: body.first_name,
            lastName:  body.last_name,
            email:     body.email,
            gender:    body.gender,
            jobTitle:  body.job_title,
        });
        return res.status(201).json({ status: "success", user });
    } catch (err) {
        return res.status(500).json({ status: "error", message: err.message });
    }
}

// GET /api/users/:id
async function handleGetUserById(req, res) {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ status: "error", message: "User not found" });
        return res.json(user);
    } catch (err) {
        return res.status(500).json({ status: "error", message: err.message });
    }
}

// PATCH /api/users/:id
async function handleUpdateUser(req, res) {
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
            { new: true }
        );
        if (!user) return res.status(404).json({ status: "error", message: "User not found" });
        return res.json({ status: "success", user });
    } catch (err) {
        return res.status(500).json({ status: "error", message: err.message });
    }
}

// DELETE /api/users/:id
async function handleDeleteUser(req, res) {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ status: "error", message: "User not found" });
        return res.json({ status: "success", user });
    } catch (err) {
        return res.status(500).json({ status: "error", message: err.message });
    }
}

module.exports = {
    handleGetAllUsers,
    handleCreateUser,
    handleGetUserById,
    handleUpdateUser,
    handleDeleteUser,
};