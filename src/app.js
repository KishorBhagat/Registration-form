const express = require('express');
const path = require('path');
const hbs = require('hbs');
const bcrypt = require('bcrypt');

const app = express();
require("./db/conn");
const user = require("./models/user");
const port = process.env.PORT || 3000;

const logged = false;

app.use('/static', express.static(path.join(__dirname, "../public")));  // don't know why /static paramether need to be passed here this time
app.use('/css', express.static(path.join(__dirname, "../public/css"))); // Did a lot of research but don't know why this worked

app.set('views', path.join(__dirname, '../views'));
app.set("view engine", "hbs");
hbs.registerPartials(path.join(__dirname, '../partials'));

// app.use(express.urlencoded());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get('/', (req, res) => {
    res.render("index");
});
app.get('/signup', (req, res) => {
    res.render("signup");
});
app.get('/login', (req, res) => {
    res.render("login");
});


app.post('/signup', async (req, res) => {
    try {
        const password = req.body.password;
        const confirmpassword = req.body.confirmpassword;
        if (password === confirmpassword) {
            const newUser = new user(req.body);
            newUser.save().then(() => {
                // res.status(201).render("index");
                res.send(`<h1 style="color:MediumSeaGreen;" >User has been saved to the database.</h1>`)
            }).catch(() => {
                // res.status(201).render("index");
                res.status(400).send(`<h1>User not saved to the database.</h1>`)
            });
        } else {
            // res.status(201).render("index");
            req.status(400).send(`<h1 style="color:red;" >passwords not matching</h1>`);
        }
    } catch (error) {
        res.status(400).send(`<h1>server error</h1>`);
    }
});

app.post('/login', async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        const data = await user.findOne({email: email});
        if(!data){
            res.send(`<h1 style="color:blue;">User not found. Please register first.</h1>`);
        }
        else{
            const isMatch = await bcrypt.compare(password, data.password);
            if(isMatch){
                res.send(data);
            //     res.status(201).render("index");
            }else{
                res.send(`<h1 style="color:red;">Ivalid Credentials. Try again</h1>`);
            }
        }

    } catch (error) {
        console.log(error);
        res.status(500).send(`<h1>Server error</h1>`);
    }
});

app.listen(port, () => {
    console.log('Server listening at port ' + port);
});
