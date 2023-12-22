let express = require('express');
let mongoose = require('mongoose');
const routesUrls = require('./route/routes');
const cors = require('cors');

let app = express();

app.use(express.json());
app.use(cors())

app.use('/users-api', routesUrls);

mongoose.connect("mongodb://localhost:27017/crud", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

let db = mongoose.connection;

db.on('open', () => {
    console.log('Connected to mongoDB');
});
db.on('error', (error) => {
    console.log(error)
})

app.get('/', function (req, res) {
    res.json({ "message": "Welcome to Simple CRUD operations." });
});

app.listen(3000, function () {
    console.log("Server is listening on port 3000");
});