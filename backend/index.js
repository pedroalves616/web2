const express = require('express')
const app = express()
const cors = require('cors');
const Sequelize = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'database.sqlite'
});
const { Op } = require("sequelize");
var jwt = require('jsonwebtoken');

const equipes = require('./models/m2_equipes.js')
const usuarios = require('./models/m2_usuarios.js');

usuarios.belongsTo(equipes, { foreignKey: 'idequipe' })
app.listen(5500, () => console.log('Rodando na porta 5500'))
app.use((req, res, next) => {
	//Qual site tem permissão de realizar a conexão, no exemplo abaixo está o "*" indicando que qualquer site pode fazer a conexão
    res.header("Access-Control-Allow-Origin", "*");
	//Quais são os métodos que a conexão pode realizar na API
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');

    res.header("x-access-token", 'GET,PUT,POST,DELETE');
    app.use(cors());
    next();
});
app.use(express.json())

// m2_equipes.create({
//     nome: 'teste',
//     ativo: 1
// })
// usuarios.create({
//     nome: "Ana",
//     password: "teste",
//     login: "teste",
//     idequipe: 1,
//     ativo: 1
// })

function verifyJWT(req, res, next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null){ 
        return res.sendStatus(401)
    }
    jwt.verify(token, 'my-32-character-ultra-secure-and-ultra-long-secret', (err, user) => {
        if (err) return res.sendStatus (403)
        req.id = user
        next()
    })
}

//console.log(m2_equipes)
app.route('/login').post((req, res) => 
    usuarios.findAll({
        include: [
            {
                model: equipes,
                required: false,
                attributes: ["nome"] // empty array means that no column from ModelB will be returned
            }
        ],
        where: { 
            login: req.body.login,
            password: req.body.password,
            ativo: 1
        }
    }).then(function (usuarios) {
        if (usuarios[0].dataValues.login == req.body.login && usuarios[0].dataValues.password == req.body.password) {
            const token = jwt.sign({id: usuarios[0].dataValues.id}, 'my-32-character-ultra-secure-and-ultra-long-secret', {expiresIn: 300})
            res.json({ auth:true, token });
        }
        else{
            res.json('chupa rodrigames')
        }
    })
)

app.route('/usuarios').get((req, res) => 
{
    usuarios.findAll({
        include: [
            {
                model: equipes,
                required: true,
                where:{
                    ativo: 1
                }
                ,
                attributes: ["nome"] // empty array means that no column from ModelB will be returned
            }
        ],
        where: { ativo: 1}
    }).then(function (usuarios) {
        res.json(usuarios);
    })
})

app.post('/usuarios', verifyJWT,(req, res) => 
    {
        console.log(req.userId)
        usuarios.create({
            nome: req.body.nome, 
            password: req.body.password,
            login: req.body.login,
            idequipe: req.body.idequipe,
            ativo: req.body.ativo 
        })
        res.json('usuario cadastrado com sucesso !') 
    }
)
app.post('/usuarios/', verifyJWT, (req, res) => 
    {
        usuarios.update({
            nome: req.body.nome, 
            password: req.body.password,
            login: req.body.login,
            idequipe: req.body.idequipe,
            ativo: req.body.ativo 
        },
        {
            where: {
                id:req.body.usuarioId
            }
        }
        ).then(function () {
            res.json("usuario atualizado")
        }) 
    }
)

app.delete('/usuarios/', verifyJWT, (req, res) => 
    {
        console.log(req.body.id)
        usuarios.update({
            ativo: 0 
        },
        {
            where: {
                id:req.body.id
            }
        }
        ).then(function () {
            res.json("usuario desativado")
        }) 
    }
)

app.route('/equipes').get((req, res) => 
    equipes.findAll({
        where: { ativo: 1}
    }).then(function (equipes) {
        res.json(equipes);
    })
)

app.post('/equipes/', verifyJWT,(req, res) => 
    {
        equipes.create({
            nome: req.body.nome, 
            ativo: req.body.ativo 
        })
        res.json('equipe cadastrada com sucesso !') 
    }
)
app.put('/equipes/', verifyJWT, (req, res) => 
    {
        equipes.update({
            nome: req.body.nome, 
            ativo: req.body.ativo 
        },
        {
            where: {
                id:req.body.id
            }
        }
        ).then(function () {
            res.json("equipe atualizada")
        }) 
    }
)

app.delete('/equipes/', verifyJWT, (req, res) => 
    {
        equipes.update({
            ativo: 0 
        },
        {
            where: {
                id:req.body.id
            }
        }
        ).then(function () {
            res.json("equipe desativada")
        }) 
    }
)