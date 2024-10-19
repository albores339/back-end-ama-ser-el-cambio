// src/controllers/firebaseController.js
const users = require('../models/users'); // Asegúrate de que la ruta al modelo sea correcta

// Guardar el token FCM
const saveToken = async (req, res) => {
  const { token, userId } = req.body; // También puedes recibir el ID del usuario

  // Guarda el token en la base de datos
  try {
    await users.findByIdAndUpdate(userId, { fcmToken: token }, { new: true, upsert: true });
    console.log("Token guardado:", token);
    res.status(200).send("Token guardado correctamente");
  } catch (error) {
    console.error("Error al guardar el token", error);
    res.status(500).send("Error al guardar el token");
  }
};

module.exports = {
  saveToken,
};
