const waitingTime = async (req, res) => {
  const { orderId, waitingTime } = req.body; // Παραλαβή δεδομένων από τον client

  try {
    // Εκπομπή event μέσω Socket.IO
    req.io.emit("new_time", { orderId, waitingTime });

    return res.status(200).json({ message: "Time Sent" });
  } catch (error) {
    console.error("Error in sending time:", error);
    return res.status(500).json({ message: "Error sending time" });
  }
};

module.exports = { waitingTime };
