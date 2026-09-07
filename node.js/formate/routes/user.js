const express = require("express");
const router = express.Router();
const {
    handleGetAllUsers,
    handleCreateUser,
    handleGetUserById,
    handleUpdateUser,
    handleDeleteUser,
} = require("../controllers/user");

// Routes are mounted at /api/users in index.js
// So here we just use "/" and "/:id"

router.route("/")
    .get(handleGetAllUsers)
    .post(handleCreateUser);

router.route("/:id")
    .get(handleGetUserById)
    .patch(handleUpdateUser)
    .delete(handleDeleteUser);

module.exports = router;