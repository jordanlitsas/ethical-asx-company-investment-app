const express= require('express');
const mongoose= require('mongoose');
const app=express();
const cors = require('cors');
const port=9000;
const userRouter = require("./routes/users/user_routes");
const paymentRouter = require("./routes/transactions/payment");
const companyRouter = require("./routes/companies/company");
const companyFinanceRouter = require("./routes/companies/companyFinance");
const companyFavouritesRouter = require("./routes/companies/companyFavourites");
const transactionHistoryRouter = require("./routes/transactions/transationHistory");
const investRouter = require('./routes/transactions/invest');
const portfolioRouter = require('./routes/transactions/portfolio');
const url= "mongodb+srv://admin:inaampassword@cluster0.kcyeo.mongodb.net/companyDashboardDevDB?retryWrites=true&w=majority";
mongoose.connect(url,{useNewUrlParser: true});
const con= mongoose.connection;
const cookieSession = require('cookie-session');
const passport = require('passport');
require('./middleware/passport');
const isLoggedIn = require('./middleware/0Auth')
const cft = require('./services/companies/companyFinanceTracker');
// cft.intialFillCompanyList();

app.use(express.json());
app.use(cors({
    origin: '*'
}));
app.use(cookieSession({
    name: 'auth-session',
    keys: ['key1', 'key2']
}));
app.use(passport.initialize());
app.use(passport.session());


//note: bofore deploying remove nodemon


//facebook auth
app.get('/facebook', isLoggedIn, (req,res)=>{
    console.log(req.user.emails[0].value)

    res.send(`Hello world ${req.user.displayName}`)
  })
app.get('/auth/error', (req, res) => res.send('Unknown Error'))
app.get('/auth/facebook',passport.authenticate('facebook'));
app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/auth/facebook' }),
  function(req, res) {
    //  res.redirect('https://inaam-frontend.herokuapp.com/Home.html');
     res.redirect('http://localhost:8080/Home.html');
  });


//google auth
app.get('/google', isLoggedIn, (req, res) => res.send(`Welcome ${req.user.displayName}!`))
app.get('/auth/error', (req, res) => res.send('Unknown Error'))
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/auth/error' }),
function(req, res) {
    // res.redirect('https://inaam-frontend.herokuapp.com/Home.html');
    res.redirect('http://localhost:8080/Home.html');
}
);

app.get('/logout', (req, res) => {
    req.session = null;
    req.logout();
    res.redirect('/');
  });

try{
    con.on('open',() => {
        console.log('connected');
    })
}catch(error)
{
    console.log("Error: "+error);
}

app.use('/api', userRouter);
app.use('/api', paymentRouter);
app.use('/company/dashboard', companyRouter);
app.use('/company/code', companyFinanceRouter);
app.use('/company/favourites', companyFavouritesRouter);
app.use('/transactions/history', transactionHistoryRouter);
app.use('/invest', investRouter);
app.use('/portfolio', portfolioRouter);




module.exports = app.listen(process.env.PORT || port, () =>{
    console.log('Server started on', port);
  
})


