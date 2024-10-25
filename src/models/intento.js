const mongoose = require('mongoose');

const intentoSchema = new mongoose.Schema({
    fechaHora: { type: Date, required: true },
    codigo: { 
        type: String, 
        required: true,
        match: /^\d{3}$/,  // Asegura que el código tenga exactamente 3 dígitos
    },
    premio: { type: String, required: true },
    userid: { type: mongoose.Schema.Types.ObjectId, ref: 'UserInfo' }
}, { timestamps: true }); // Agrega createdAt y updatedAt automáticamente

module.exports = mongoose.model('Intento', intentoSchema);
