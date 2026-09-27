const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index", {
    title: "Student Registration Portal"
  });
});

app.post("/register", (req, res) => {
  const { name, email, college, course, skills } = req.body;

  if (!name || !email || !college || !course || !skills) {
    return res.status(400).render("index", {
      title: "Student Registration Portal",
      error: "Please fill in all fields."
    });
  }

  res.render("success", {
    title: "Registration Successful",
    student: {
      name,
      email,
      college,
      course,
      skills
    }
  });
});

app.use((req, res) => {
  res.status(404).send("Page not found");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
