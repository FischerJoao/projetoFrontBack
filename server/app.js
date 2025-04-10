let express = require('express');
let bodyParser = require('body-parser');
let cors = require('cors');
let mongoose = require('mongoose'); 
let methodOverride = require('method-override');
const { status } = require('express/lib/response');

//obj
let app = express();

app.use(cors());

//permite usar o verbo HTTP
app.use(methodOverride('X-HTTP-Method'))
app.use(methodOverride('X-HTTP-Method-Override'))
app.use(methodOverride('X-Method-Override'))
app.use(methodOverride('_method'))

app.use((req, res, next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//pasta raiz
app.get('/', (req, res)=>{
    res.send({status: 'ok'});
});
//mongoose
//conecta ao banco de dados
let url = 'mongodb://localhost:27017/FatecVotorantim'; //url do banco de dados
mongoose.connect(url).then(()=>{
    console.log('Banco de dados conectado com sucesso!');
}).catch((err)=>{
    console.log('Erro ao conectar no banco de dados: ' + err);
});

//criar uma estrutura de dados
let User = mongoose.model('Usuario', new mongoose.Schema({
    nome: String,
}));

//get find()
app.get("/users", async (req, res) => {
    const users = await User.find({});
    res.send(users); // Corrigido
});
//rotas
app.post("/add", async (req, res) => {
    try {
        let vnome = req.body.nome; //pega o nome do corpo da requisição
        let item = await new User({ nome: vnome }); //cria um novo objeto do tipo User
        await item.save();
        res.status(201).send({ message: 'Usuário adicionado com sucesso!', user: item }); // responde ao cliente
    } catch (err) {
        res.status(500).send({ message: 'Erro ao adicionar usuário', error: err.message }); // responde com erro
    }
});

app.put("/update/:id", async (req, res) => {
    try {
        console.log('ID recebido:', req.params.id);
        console.log('Dados recebidos:', req.body); // Verifica os dados enviados pelo frontend

        let id = req.params.id;
        let item = req.body;
        const updatedUser = await User.findByIdAndUpdate(id, item, { new: true });

        if (!updatedUser) {
            return res.status(404).send({ message: 'Usuário não encontrado' });
        }

        res.status(200).send({ message: 'Usuário atualizado com sucesso!', user: updatedUser });
    } catch (err) {
        res.status(500).send({ message: 'Erro ao atualizar usuário', error: err.message });
    }
});

app.delete("/delelete/:id", async (req, res) => {
    try {
        let id = req.params.id;
        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).send({ message: 'Usuário não encontrado' });
        }

        res.status(200).send({ message: 'Usuário deletado com sucesso!', user: deletedUser });
    } catch (err) {
        res.status(500).send({ message: 'Erro ao deletar usuário', error: err.message });
    }
}); 

//cria o servidor
let server = app.listen(3000, ()=>{
    console.log('Servidor rodando na porta 3000');
});