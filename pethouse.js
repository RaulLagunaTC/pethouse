const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
const port = 3000;

mongoose.connect('mongodb://127.0.0.1:27017/pethouse', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 20000
})

const UsuarioSchema = new mongoose.Schema({

  email: { type: String, required: true },
  password: { type: String },
});

const Usuario = mongoose.model("Usuario", UsuarioSchema);


app.post("/cadastrousuario", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password


  const usuario = new Usuario({
    email: email,
    password: password
  })

  try {
    const newUsuario = await usuario.save();

    res.json({ error: null, msg: "Cadastro feito com sucesso", usuarioId: newUsuario._id });
  }
  catch (error) {
    res.status(400).json({ error });
  }
});

app.get("/cadastrousuario", async (req, res) => {
  res.sendFile(__dirname + "/cadastrousuario.html")
})

const ProdutopetSchema = new mongoose.Schema({
  id_produtopet: { type: String, required: true },
  descricao: { type: String },
  fornecedor: { type: String },
  dataValidade: { type: Date },
  quantidadeEstoque: { type: Number }
});

const Produtopet = mongoose.model("Produtopet", ProdutopetSchema);

app.post("/cadastroprodutopet", async (req, res) => {
  const id_produtopet = req.body.id_produtopet;
  const descricao = req.body.descricao;
  const fornecedor = req.body.fornecedor;
  const dataValidade = req.body.dataValidade;
  const quantidadeEstoque = req.body.quantidadeEstoque;


  const produtopet = new Produtopet({
    id_produtopet: id_produtopet,
    descricao: descricao,
    fornecedor: fornecedor,
    dataValidade: dataValidade,
    quantidadeEstoque: quantidadeEstoque
  });

  try {
    const newProdutopet = await produtopet.save();

    res.json({ error: null, msg: "Cadastro feito com sucesso", produtopetId: newProdutopet._id });
  }
  catch (error) {
    res.status(400).json({ error });
  }
});

app.get("/cadastroprodutopet", async (req, res) => {
  res.sendFile(__dirname + "/cadastroprodutopet.html")
})



app.get("/", async (req, res) => {
  res.sendFile(__dirname + "/index.html")
});


app.listen(port, () => {
  console.log(`servidor rodando na porta ${port}`)
})