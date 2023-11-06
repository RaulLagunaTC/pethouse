const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
const port = 3000;

mongoose.connect("mongodb://127.0.0.1:27017/pethouse",
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}); 

const UsuarioSchema = new  mongoose.Schema({
    email : {type : String , required : true},
    senha : {type : String , require : true}
});
const Usuario = mongoose.model("Usuario", UsuarioSchema);

app.post("/cadastrousuario", async (req, res) => {
  const email = req.body.email;
  const senha = req.body.senha;

  if(email == null || senha == null){
    return res.status(400).json({error : "Preenchar todos os campos!!!"});
  }

  const Usuario = new Usuario({
    email: email,
    senha : senha
  });
 
  try {
    const newUsuario = await Usuario.save();
    res.json({ error: null, msg: "Cadastro ok", UsuarioId: newUsuario._id });
  } catch (error) {}
});


const ProdutoPetSchema = new mongoose.Schema({
    id_produtopet : {type : String , required : true},
    descricao : {type : String , required : true},
    fornecedor : {type : String , required : true},
    dataValidade : {type : Date , required : true},
    quantidadeEstoque : {type : Number , required : true}
});
const ProdutoPet = mongoose.model("ProdutoPet", ProdutoPetSchema);

app.post("/cadastroprodutopet", async (req, res) => {
    const id_produtopet = req.body.id_produtopet;
    const descricao = req.body.descricao;
    const fornecedor = req.body.fornecedor;
    const dataValidade = req.body.dataValidade;
    const quantidadeEstoque = req.body.quantidadeEstoque;
  
    if(id_produtopet == null || nome == null || descricao == null || fornecedor == null || dataValidade == null || quantidadeEstoque == null ){
      return res.status(400).json({error : "Preenchar todos os campos!!!"});
    }

    const produtopet = new produtopet({
        email: email,
        senha : senha
      });
     
      try {
        const newprodutopet = await produtopet.save();
        res.json({ error: null, msg: "Cadastro ok", id_produtopet: newprodutopet._id });
      } catch (error) {}
    });

    app.get("/cadastrousuario", async (req, res) => {
        res.sendFile(__dirname + "/cadastrousuario.html");
      });

      app.get("/cadastroprodutopet", async (req, res) => {
        res.sendFile(__dirname + "/cadastroprodutopet.html");
      });
       
      app.get("/", async (req, res) => {
        res.sendFile(__dirname + "/index.html");
      });
       
      app.listen(port, () => {
        console.log(`Servidor rodando na porta ${port}`);
      });