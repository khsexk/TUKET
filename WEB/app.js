const express = require('express');

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

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중');
});