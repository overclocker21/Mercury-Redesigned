const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require("body-parser");
const path = require('path');
const app = express();
let sendEmail = require("./public/js/functions");

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Static folder
app.use(express.static(path.join(__dirname, 'public')));

//Index route
app.get('/', (req, res) => {
    res.render('home');
});

//Blog route
app.get('/blog', (req, res) => {
    res.render('blog', {
        not_home_nav: true
    });
});

//Careers route
app.get('/careers', (req, res) => {
    res.render('careers', {
        not_home_nav: true
    });
});

//Send email route
app.post('/email', (req, res) => {

    const data = {
        from: `Customer Inquiry <${req.body.email}>`,
        to: 'mercurystk1@gmail.com',
        subject: `You have an email from the customer!`,
        text: `Contact Deatails:
        Name: ${req.body.name}
        Email: ${req.body.email}
        Message: ${req.body.message}`
    };

    sendEmail(data).then(
        function (result) {
            console.log("Result: " + result);
            res.sendStatus(200);
        },
        function (error) {
            console.log("Error:" + error);
            res.sendStatus(500);
        }
    );

});

const port = 5000;

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});