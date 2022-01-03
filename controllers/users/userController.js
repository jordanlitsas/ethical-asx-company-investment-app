const User = require('../../models/users/user');
const jwt = require('jsonwebtoken');
const accessTokenSecret = 'somerandomaccesstoken';
const refreshTokenSecret = 'somerandomstringforrefreshtoken';
let refreshTokens = [];


const getAllUsers = async (req, res) => {
    try {
        const user = await User.find();
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const getUserSpec = async (req, res) => {
    const email = req.params.email;

    try {
        const user = await User.findOne({ email: email });
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const createUser = async (req, res) => {
    const email = req.body.email
    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        age: req.body.age,
        password: req.body.password

    });
    try {
        const user = await User.findOne({email:email})
        if(user) {
            res.send('Email already exists, please use a different email')
        } else {
            await newUser.save();
            //res.status(201).json(newUser);
            const accessToken = jwt.sign({ username: user.email }, accessTokenSecret, { expiresIn: '20m' });
            const refreshToken = jwt.sign({ username: user.email }, refreshTokenSecret);
            refreshTokens.push(refreshToken);
            res.status(200).json({
                accessToken,
                refreshToken
            });
        }
       
    } catch (error) {
        res.status(404).json({ message: error.message });

    }
}

const login = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    try {
        const user =  await User.findOne({  email: email , password : password });
        if (user) {
            const accessToken = jwt.sign({ username: user.email }, accessTokenSecret, { expiresIn: '20m' });
            const refreshToken = jwt.sign({ username: user.email }, refreshTokenSecret);
            refreshTokens.push(refreshToken);
            res.status(200).json({
                accessToken,
                refreshToken,
                userId: user._id.toString() //this can be added here for the backend response to provide userId after login
            });
        } else {
            res.send('Email or password incorrect')
        }
    } catch (error) {
        res.status(404).json({ message: error.message });

    }
}

const refresh = async (req, res) => {
    const token = req.body.token;
    try {
        if(!token) {
            res.status(401);
       }
   
       if(!refreshTokens.includes(token)) {
            res.status(403);
       }
   
       jwt.verify(token, refreshTokenSecret, (err, user) => {  
           if(err) {
                res.status(403);
           }
           const accessToken = jwt.sign({ username: user.email }, accessTokenSecret, { expiresIn: '20m' });
           res.status(200).json({accessToken});
   
       });
    } catch (error) {
        res.status(404).json({ message: error.message });

    }
   
}

const logout = (req, res) => {
    const token = req.body.token;
    try {
        refreshTokens = refreshTokens.filter(t => t !== token);
        res.send("Logout successful");
    } catch (error) {
        res.status(404).json({ message: error.message });

    }
}



module.exports.getAllUsers = getAllUsers;
module.exports.getUserSpec = getUserSpec;
module.exports.createUser = createUser;
module.exports.login = login;
module.exports.refresh = refresh;
module.exports.logout = logout;

