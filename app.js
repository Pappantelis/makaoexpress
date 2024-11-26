const express = require("express");
const { Server } = require("socket.io");
const http = require("http");
const cors = require("cors");
const dotenv = require("dotenv");
const orderRoutes = require("./routes/orders");
const waitingTimeRoutes = require("./routes/waitingTime"); // Προσθήκη του νέου route
const cancelRoutes = require("./routes/cancel"); // Προσθήκη του νέου route

dotenv.config();

const app = express();
const httpServer = http.createServer(app);

app.use(cors());
app.use(express.json());

const io = new Server(httpServer, {
  cors: {
    origin: process.env.OFFLINE_HOST || process.env.ONLINE_HOST, // Χρήση δυναμικής τιμής
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
  orderRoutes
);

app.use(
  "/api/waitingTime",
  (req, res, next) => {
    req.io = io; // Πέρασμα του io για το waitingTime route
    next();
  },
  waitingTimeRoutes
);

app.use(
  "/api/cancel",
  (req, res, next) => {
    req.io = io; // Πέρασμα του io για το waitingTime route
    next();
  },
  cancelRoutes
);

const PORT = process.env.PORT || 4000;
httpServer.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
