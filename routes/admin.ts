import { Router } from "express";

const adminRouter = Router();

// Page login
adminRouter.get("/", (req, res) => {
  res.render("pages/login", { error: null });
});

// POST login
adminRouter.post("/login", (req, res) => {
  const { username, password } = req.body;
  const ADMIN_USER = "admin";
  const ADMIN_PASS = "tonmotdepasse";

  if (username === ADMIN_USER && password === ADMIN_PASS) {
    res.redirect("/admin/dashboard");
  } else {
    res.render("pages/login", { error: "Identifiants incorrects" });
  }
});

// Dashboard
adminRouter.get("/dashboard", (req, res) => {
  const stats = {
    "Billet Adulte": 120,
    "Billet Enfant": 80,
    "Billet Senior": 30
  };

  const capacityByDay: Record<string, { booked: number; remaining: number }> = {};
  const currentDate = new Date();
  for (let i = 0; i < 7; i++) {
    const day = new Date(currentDate);
    day.setDate(currentDate.getDate() + i);
    const dayStr = day.toISOString().split("T")[0];
    const booked = Math.floor(Math.random() * 1500);
    capacityByDay[dayStr] = { booked, remaining: 1500 - booked };
  }

  res.render("pages/admin", { stats, capacityByDay });
});

export default adminRouter;
