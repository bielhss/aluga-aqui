const express = require('express');
const cors = require('cors');
const multer = require('multer');
const bodyParser = require('body-parser');
const models = require('./models');
const crypto = require('crypto');
const port = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/images', express.static('images'))

//models
let usuario = models.Usuario;
let post = models.Post;
let foto = models.Foto;
let reserva = models.Reserva;

const storage = multer.diskStorage({
    destination(req, file, callback) {
        callback(null, './images');
    },
    filename(req, file, callback) {
        callback(null, `${file.originalname}_${Date.now()}.jpg`);
    }
})

const upload = multer({ storage });

app.post('/signup', upload.single('image'), async (req, res) => {
    await usuario.create({
        nome: req.body.nome,
        telefone: req.body.telefone,
        senha: crypto.createHash('md5').update(req.body.senha).digest('hex'),
        dataNascimento: req.body.dataNascimento,
        foto: req.file.filename,
        locador: req.body.locador,
        whatsapp: req.body.whatsapp,
        facebook: req.body.facebook,
    }).then(usuario => {
        res.status(200).json({
            'id': usuario.id
        });
    }).catch(error => {
        res.status(500).json({
            'message': error
        })
    })
});

app.post('/login', async (req, res) => {
    await usuario.findOne({
        where:{
            telefone: req.body.telefone,
            senha: crypto.createHash('md5').update(req.body.senha).digest('hex')
        }
    }).then(usuario => {
        if(usuario)
            res.status(200).json({
                'message': 'ok',
                'id': usuario.id
            })
        else
            res.status(200).json({
                'message': 'erro'
            })
    })
});

app.post('/alterar_usuario', async (req, res) => {
    await usuario.update({
        nome: req.body.nome,
        telefone: req.body.telefone,
        dataNascimento: req.body.dataNascimento,
        facebook: req.body.facebook,
        whatsapp: req.body.whatsapp
    },
    {
        where: {id: req.body.id}
    }).then(() => {
        res.status(200).json({
            'message': 'ok'
        })
    }).catch(error => {
        res.status(500).json({
            'message': error
        })
    })
});

app.post('/verificar_telefone', async (req, res) => {
    await usuario.findOne({
        where: {
            telefone: req.body.telefone
        }
    }).then(usuario => {
        if(usuario)
            res.status(200).json({
                'message': 'login'
            })
        else
            res.status(200).json({
                'message': 'signup'
            })
    })
});

app.post('/verificar_locador', async (req, res) => {
    await usuario.findOne({
        where: {
            id: req.body.id
        }
    })
    .then(usuario => res.status(200).json(usuario))
    .catch(error => res.status(500).json({
        'message': error
    }))
});

app.post('/tornar_locador', async (req, res) => {
    await usuario.update({
        locador: !req.body.locador
    },
    {
        where: {id: req.body.id}
    }
    ).then(() => {
        res.status(200).json({
            'message': 'ok'
        })
    }).catch(error => {
        res.status(500).json({
            'message': error
        })
    })
});

app.post('/post', upload.array('images'), async (req, res) => {
    await post.create({...req.body})
    .then(post => {
        if(post){
            req.files.forEach(async (file) => {
                await foto.create({
                    path: file.filename,
                    postId: post.id
                });
            })
            res.status(200).json({
                'message': 'ok'
            })
        } else {
            res.status(500).json({
                'message': 'erro'
            })
        }
    })
});

app.get('/posts/:nome', async (req, res) => {
    const { Op } = require("sequelize");
    await post.findAll({
            include: [{
                model: foto
            }],
            where: {
                nome: { [Op.like]:  `%${req.params.nome != null ? req.params.nome : ''}%`}
            },
    }).then(posts => res.status(200).json(posts))
});

app.get('/posts', async (req, res) => {
    await post.findAll({
            include: [{
                model: foto
            }],
    }).then(posts => res.status(200).json(posts))
});


app.get('/post/:id', async (req, res) => {
    await post.findOne({
        include: [
            {
                model: foto
            },
            {
                model: usuario
            },
            {
                model: reserva
            }
        ],
        where: {id: req.params.id}
    }).then(post => res.status(200).json(post))
});

app.post('/reservar', async (req, res) => {    
    req.body.datas.forEach(async (data) => {
        await reserva.create({
            data: data,
            status: false,
            usuarioId: req.body.usuarioId,
            postId: req.body.postId
        })
    });
    res.status(200).json({
        'message': 'ok'
    });
});

app.get('/reservas/:userId', async (req, res) => {
    await reserva.findAll({
        include: [{
            model: post
        }],
        where: {usuarioId: req.params.userId},
        order: [['data', 'ASC']]
    })
    .then(reservas => res.status(200).json(reservas))
    .catch(error => res.status(500).json({'message': error}))
});

app.get('/locacoes/:userId', async(req, res) => {
    await post.findAll({
        include: [
            {
                model: reserva
            },
            {
                model: foto
            }
        ],
        where: {usuarioId: req.params.userId},
    }).then(async (posts) => {
        posts = await Promise.all(posts.map(async (post) => {
            post.Reservas = await Promise.all(post.Reservas.map(async (reserva) => {
                reserva.usuarioId = await reserva.getUsuario()
                return reserva;
            }));
            return post;    
        }))
        res.status(200).json(posts)
    })
})

app.post('/reserva/confirm', async (req, res) => {
    await reserva.update({status: true},{where: {id: req.body.id}})
    .then(() => res.status(200).json({'message': 'ok'}))
    .catch(error => res.status(500).json({'message': error}));
})

app.post('/reserva/delete', async (req, res) => {
    await reserva.destroy({
        where: {id: req.body.id}
    })
    .then(() => res.status(200).json({'message': 'ok'}))
    .catch(error => res.status(500).json({'message': error}));
})

app.get('/reservas/count/:userId', async(req, res) => {
    let count = 0
    await usuario.findOne({
        where: {
            id: req.params.userId
        }
    }).then(async (usuario) => {
        if(usuario){
            let posts = await usuario.getPosts()
            let reservas = await Promise.all(posts.map(async (post) => {
                return post.getReservas()
            }))
            reservas.forEach(reservas => {
                reservas.forEach(reserva => {
                    if(!reserva.status)
                        count++
                })
            })
        }
        res.status(200).json(count)
    })
})

app.listen(port, (req, res) => {
    console.log("Servidor Rodando");
});