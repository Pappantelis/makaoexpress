const cancel = async (req, res) => {
  const { orderId } = req.body; // Παραλαβή δεδομένων από τον client

  try {
    // Εκπομπή event μέσω Socket.IO
    req.io.emit("cancel", { orderId });

    return res.status(200).json({ message: "Cancel order Sent" });
  } catch (error) {
    console.error("Error in sending cancel order:", error);
    return res.status(500).json({ message: "Error sending cancel order" });
  }
};

module.exports = { cancel };
