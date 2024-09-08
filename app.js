const express = require("express");
const { Server } = require("socket.io");
const http = require("http");
const cors = require("cors");
const dotenv = require("dotenv");
const routes = require("./routes/orders");

dotenv.config();

const app = express();
const httpServer = http.createServer(app);

app.use(cors());
app.use(express.json());

const io = new Server(httpServer, {
  cors: {
    origin: "https://www.makaoxanthi.org", // Next.js frontend URL
  },
});

io.on("connection", (socket) => {
  console.log("Client connected");

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

// Πέρασμα του io ως παράμετρο στο routes
app.use(
  "/api/orders",
  (req, res, next) => {
    req.io = io; // Αποθηκεύουμε το io στο req για να το χρησιμοποιήσουμε στα routes
    next();
  },
  routes
);

const PORT = process.env.PORT || 4000;
httpServer.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
