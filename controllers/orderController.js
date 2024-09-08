// Προσθήκη νέας παραγγελίας και εκπομπή event
const addOrder = async (req, res) => {
  const { orderData } = req.body;

  try {
    // Εκπομπή event μέσω Socket.IO
    req.io.emit("new_order", orderData[0]);

    return res.status(200).json({ message: "Event emitted" });
  } catch (error) {
    return res.status(500).json({ message: "Error adding order" });
  }
};

module.exports = { addOrder };
