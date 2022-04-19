const express = require('express');
const res = require('express/lib/response');
const app = express()
const cors = require('cors');
const port = 2000
app.use(express.json())
const url = 'mongodb+srv://brunobarros:senhadobruno@cluster0.yohai.mongodb.net/jogosLista?retryWrites=true&w=majority'
const mongoose = require('mongoose');
const { config } = require('nodemon');
const match = require('nodemon/lib/monitor/match');


app.use(cors())


//o que pode entrar no banco de dados

const jogoSchema = new mongoose.Schema({
  name: String,
  trofeus: Number,
  dificuldade: String,
  data_finalizou: String
});

const jogoModel = mongoose.model('jogo', jogoSchema);
const db = mongoose.connection;

db.on('error', function callback() {
  console.log('erro ao conectar')
});
db.once('open', function callback() {
  console.log('conectado com sucesso')
})




let listaJogos = [];


//quando acessa a url é GET
//quando envia é POST
// quando vai deletar é DELETE
// PATH edita
app.get('/api', async (req, res) => {
  const jogos = await jogoModel.find();
  res.json(jogos)
})


//quando vamos pegar algo nós usamos o REQ
//e a gente processa o dado que pediu e manda de volta com o RES
//antes de dá uma requisição eles rodam todos os middlewares


//para criar 
app.post('/api', (req, res) => {
  const name = req.body.name
  const trofeus = req.body.trofeus
  const dificuldade = req.body.dificuldade
  const data_finalizou = req.body.data_finalizou
  const novoJogo = {
    name,
    trofeus,
    dificuldade,
    data_finalizou
  }

  const novoJogoToDB = new jogoModel(novoJogo)
  novoJogoToDB.save();
  res.json({ success: true })
})


//para editar

app.put('/api/:id', (req, res) => {
  const id = req.params.id;
  const name = req.body.name
  const trofeus = req.body.trofeus
  const dificuldade = req.body.dificuldade
  const data_finalizou = req.body.data_finalizou

  const pesquisa = jogoModel.findOneAndUpdate({ _id: id }, { name, trofeus, dificuldade, data_finalizou })
    .then(() => res.json({ success: true }))
    .catch((err) => res.json({ success: false }))

})



// para deletar

app.delete('/api/:id', (req, res) => {
  const id = req.params.id;
  jogoModel.deleteOne({ _id: id })
    .then(() => res.json({ success: true }))
    .catch((err) => res.json({ success: false }))
})


config.MONGOOSE = mongoose.connect(url)

//servidor escuta a porta 2000
app.listen(port, function () {
  console.log('CORS-enabled web server listening on port 80')
})