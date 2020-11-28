const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { v4: uuidv4 } = require('uuid');
const Item = require('../models/Item');

dotenv.config();

const { MONGODB } = process.env;

mongoose
  .connect(
    `${MONGODB}zoo`,
    { useNewUrlParser: true },
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

const perro = new Item({ 'id': uuidv4(), 'name': 'Perro' });
const gato = new Item({ 'id': uuidv4(), 'name': 'Gato' });
const pez = new Item({ 'id': uuidv4(), 'name': 'Pez' });
const raton = new Item({ 'id': uuidv4(), 'name': 'Ratón' });
const hamster = new Item({ 'id': uuidv4(), 'name': 'Hámster' });
const erizo = new Item({ 'id': uuidv4(), 'name': 'Erizo' });

Promise.all([
  perro.save(),
  gato.save(),
  pez.save(),
  raton.save(),
  hamster.save(),
  erizo.save(),
]).then(() => {
  console.log('cerrando conexion');
  mongoose.connection.close();
});
