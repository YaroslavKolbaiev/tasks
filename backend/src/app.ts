import express from 'express';

const app = express();
const PORT = process.env.PORT || 5174;

// Middleware
app.use(express.json());

// Initialize routes

app.listen(PORT, () => {
  console.log(`DOCKER Server is running on http://localhost:${PORT}`);
});
