const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: Number, required: true },
    password: { type: String, required: true },
    dateUpdate: { type: Date },
    dateCreate: { type: Date, default: Date.now },
    role: { type: String, required: true, enum: ['admin', 'customer'] },
    phone: { type: Number, default: 1 },
});

userSchema.methods.equalPassword = async function (password) { //Se define un metodo para el esquema que permite comparar contraseña
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.encryptPassword = async (password) => { //se define un metodo para el esquema que permite encriptar la contraseña
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
};

module.exports = model('User', userSchema);