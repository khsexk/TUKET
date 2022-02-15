const express = require('express');
const path = require('path');
const morgan = require('morgan');

const { sequelize } = require('./models/index');

const app = express();

app.set('port', process.env.PORT || 3000)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

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