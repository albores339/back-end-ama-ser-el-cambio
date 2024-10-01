const Message = require('../models/message');

// Crear un nuevo mensaje
// Crear un nuevo mensaje
const createMessage = async (req, res) => {
  try {
    const { nombre, email, mensaje } = req.body;

    // Crear el mensaje en la base de datos
    const newMessage = await Message.create({ nombre, email, mensaje });
    
    res.status(201).json(newMessage);
  } catch (error) {
    if (error.name === 'ValidationError') {
      const errors = {};
      Object.keys(error.errors).forEach((key) => {
        errors[key] = error.errors[key].message;
      });
      res.status(400).json({ errors });
    } else {
      res.status(500).json({ message: 'Error del servidor' });
    }
  }
};

// Obtener todos los mensajes
const getMessages = async (req, res) => {
  try {
    const messages = await Message.find();
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los mensajes' });
  }
};

module.exports = { createMessage, getMessages };
