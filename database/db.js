// db.js
// Conexao com o Mongo

const mongoose = require('mongoose');

mongoose.connect('mongodb://mongo:27017/docker-node-mongo', { useNewUrlParser: true })
  mongoose.connection.on('connected', function () {console.log('Mongo Conectado!');}); 
  mongoose.connection.on('error',function (err) {console.log('Mongo Erro na Conexao!');}); 
  
mongoose.Promise = global.Promise;

module.exports = mongoose;


