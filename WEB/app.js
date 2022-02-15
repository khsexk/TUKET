const express = require('express');
const path = require('path');
const morgan = require('morgan');

const { sequelize } = require('./models/index');

const app = express();

/* by Taeyong npm i ws pug 할 것!*/

app.set("view engine", "pug"); // view engine pug로 지정
app.set("views", __dirname + "/views"); // views 실행중인 폴더 /views
app.use("/public", express.static(__dirname + "/public"));
app.set('port', process.env.PORT || 3000);

app.get("/", (req, res) => {
    res.render("home"); // home.pug
});
app.get("/*", (_, res) => res.redirect("/"));
/* by Taeyong */
app.set('port', process.env.PORT || 3000);

sequelize.sync({ force: false })
    .then(() => {
        console.log('DB Connect Success');
    })
    .catch((err) => {
        console.error(err);
    });

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.use(express.urlencoded({ extended: false }))

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중');
});