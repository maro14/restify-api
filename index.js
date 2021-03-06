var restify = require('restify');
const config = require('./config/config.js');
const mongoose = require('mongoose');
const User = require('./models/user.js');

const server = restify.createServer({
    name: "restapi for customer",
    version: '1.1.0'
})

const db = mongoose.connection;

db.on('error', err => console.log(err));

server.use(restify.plugins.bodyParser())

server.get("/", function(req, res, next) {
   res.getHeader('Content-Type', 'application/jon')
    res.status(200)
    res.send('Hello')
})

server.get('/test', (req, res) => {
    res.send('test')
})

server.get("/json", (req, res) => {
    res.status(200)
    res.json({hello: 'world'})
})

server.post('/user', (req, res, next) => {
    const { name } = req.body;
    const user = new User({
        name
    })
    try {
        const newUser = user.save();
        res.send(201)
        next(newUser)
    } catch(err) {
        return next(err, "Nothing happen")
    }
})

server.get("/user", (req, res, next) => {
    res.setHeader("Content-Type", "application/json")
    const users = user.find({})
    res.send(users)
    next()
})


server.listen(config.PORT, () => {
    console.log('Server on 5000');
    mongoose.connect(
        config.MONGODB_URL,
        {useNewUrlParser: true,
        useUnifiedTopology: true}
        )
        console.log("Mongodb Connected");;
});