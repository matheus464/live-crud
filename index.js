const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require("./database/database");
const Pergunta = require("./database/Pergunta");
const Resposta = require('./database/Resposta');

//Database
connection.
 authenticate().then( () => {
    console.log("Conexão feita com sucesso");
}).catch((msgErro) => {
    console.log('ocorreu o seguinte erro', msgErro);
});


// renderizador html
app.set('view engine', 'ejs');// habilita utilização das viwes no projeto
app.use(express.static('public'));// utilização arquivos estaticos

//uso do body parser
app.use(bodyParser.urlencoded({ extended: false }));// permite leitura dos dados enviados em requisições http
app.use(bodyParser.json());// permite leitura de dados enviados via json

//rotas
app.get("/", (req, res) => {
    Pergunta.findAll({raw: true, order: [
        ['id', 'desc']
    ]}).then(perguntas => {
        res.render('index', {
            pergunta: perguntas
        });
    })
});

app.get("/perguntar", (req, res) => {
    res.render('perguntar')
});

app.post("/salvarpergunta", (req, res) => {

    var titulo = req.body.titulo;
    var descricao = req.body.descricao;

    Pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(() => {
        res.redirect("/");
    })
});

app.get("/pergunta/:id", (req, res) => {
    var id = req.params.id;
    Pergunta.findOne({raw: true, where: {id: id}}).then(pergunta => {
        if(pergunta != undefined){
            res.render("pergunta", {
                pergunta: pergunta 
            })
        }else{
            res.redirect("/")
        }
    })
});

app.listen(8080, () => {console.log("app rodando!")});
