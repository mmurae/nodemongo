const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Conexao com Mongo
mongoose.connect('mongodb://mongo:27017/docker-node-mongo', { useNewUrlParser: true })

  mongoose.connection.on('connected', function () {console.log('Mongo Conectado!');}); 
  mongoose.connection.on('error',function (err) {console.log('Mongo Erro na Conexao!');}); 

mongoose.connection.on('disconnected', function () {  
  console.log('Mongo Desconectado!'); 
  });


//Esquema da collection do Mongo
const ItemSchema =  mongoose.Schema({
  hello: { type: String,
           required: true }  });

// Model da aplicacao
const Item = mongoose.model('item', ItemSchema);


//GET - Retorna todos os registros existentes no banco
app.get("/info", function (req, res) {
	Item.find(function(err, todos) {
		if (err) {res.json(err);}
     else {res.json(todos);} })
});

//POST - Adiciona um registro
app.post("/add", function (req, res) {
	var register = new Item({'hello': req.body.hello });
	register.save(function (err) {
		if (err) {  console.log(err);
			          res.send(err);
			          res.end(); }
                });
	res.send(register);
	res.end();
});


const port = 3000;

app.listen(port, () => console.log('Server running...'));
