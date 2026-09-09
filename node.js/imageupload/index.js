const path = require("path");
const fs = require("fs");
const express = require("express");
const multer = require("multer");

const app = express();
const PORT = 8000;

// ─── Ensure uploads/ directory exists ────────────────────────────────────────
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

// ─── Multer storage config ────────────────────────────────────────────────────
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, uniqueName + path.extname(file.originalname));
    },
});

// Only allow image files
const fileFilter = (req, file, cb) => {
    const allowed = /jpeg|jpg|png|gif|webp/;
    const isValid = allowed.test(path.extname(file.originalname).toLowerCase())
                 && allowed.test(file.mimetype);
    if (isValid) {
        cb(null, true);
    } else {
        cb(new Error("Only image files are allowed (jpg, png, gif, webp)"));
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
});

// ─── App config ───────────────────────────────────────────────────────────────
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve uploaded files as static
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ─── Routes ───────────────────────────────────────────────────────────────────
app.get("/", (req, res) => {
    res.render("home", { uploadedFile: null, error: null });
});

app.post("/upload", upload.single("profilePic"), (req, res) => {
    if (!req.file) {
        return res.render("home", { uploadedFile: null, error: "No file selected." });
    }

    console.log("✅ File uploaded:", req.file.filename);
    res.render("home", {
        uploadedFile: `/uploads/${req.file.filename}`,
        error: null,
    });
});

// ─── Error handler (multer errors) ───────────────────────────────────────────
app.use((err, req, res, next) => {
    console.error("Upload error:", err.message);
    res.render("home", { uploadedFile: null, error: err.message });
});

// ─── Start server ─────────────────────────────────────────────────────────────
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});