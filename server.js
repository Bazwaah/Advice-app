import express from "express";
import axios from "axios";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 3000;

// Setup for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set EJS as templating engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Route to render advice
app.get("/", async (req, res) => {
  try {
    const response = await axios.get("https://api.adviceslip.com/advice");
    const advice = response.data.slip.advice;
    const imageUrl =
      "https://source.unsplash.com/random/800x600/?education,books,apple";
    res.render("index", { advice, imageUrl }); // ✅ This is the correct placement
  } catch (error) {
    res.render("index", {
      advice: "Failed to fetch advice.",
      imageUrl: "https://source.unsplash.com/random/800x600/?error",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
