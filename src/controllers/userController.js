const User = require("../models/user");
const auth = require("../util/auth");

function signup(req, res) {
    let data = req.body;
    let responseData = {
        success: false,
        msg: "Invalid details for signup"
    };
    if(data.email && data.password && data.secret) {
        User.getUsersSignupDetails(data, function(err, result) {
            if(err) {
                console.log(err);
                responseData.msg = "Error in signup";
                return res.status(500).send(responseData);
            }
            if(result.length > 0) {
                responseData.msg = "User already exists";
                return res.status(500).send(responseData);
            } else {
                User.strongSignup(data, function(err1, result1) {
                    if(err1) {
                        console.log(err1);
                        return res.status(500).send(responseData);
                    }
                    responseData.success = true;
                    responseData.msg = "Successfully signed up";
                    responseData.data = {
                        username: data.email,
                    };
                    return res.status(200).send(responseData);
                })
            }
        })
    } else {
        return res.status(400).send(responseData);
    }
}

function login(req, res) {
    let data = req.body;
    let responseData = {
        success: false,
        msg: "Invalid details for signin"
    };
    if(data.email && data.password) {
        User.strongLogin(data, function(err, result) {
            if(err) {
                console.log(err);
                responseData.msg = "Error in signin";
                return res.status(500).send(responseData);
            }
            if(result.length == 0) {
                responseData.msg = "Invalid Email Or Password";
                return res.status(500).send(responseData);
            }
            responseData.success = true;
            responseData.msg = "Successfully logged in ";
            responseData.data = {
                username: result[0].email,
                authToken: result[0].authToken
            };
            return res.status(200).send(responseData);
        })
    } else {
        return res.status(400).send(responseData);
    }
}

function isAuthenticated(req, res, next) {
    const token = req.headers.auth;
    let response;
    response = auth.verifyToken(token);
    if(response.length==0) {
        return res.status(401).send({message: "Invalid Token"});
    }
    User.getUserById(response.id, function(err, result) {
        if(err) {
            return res.status(401).send({message: "Invalid user"});
        }
        req.user = result;
        next();
    });
}

function forgetPassword(req, res){
    let data = req.body;
    let responseData = {
        success: false,
        msg: "Invalid details for email or sercet"
    };
    if(data.email && data.secret) {
        User.forgetPassword(data, function(err, result) {
            if(err) {
                console.log(err);
                responseData.msg = "Error in displaying password";
                return res.status(500).send(responseData);
            }
            if(result.length == 0) {
                responseData.msg = "Invalid email Or secret";
                return res.status(500).send(responseData);
            }
            responseData.success = true;
            responseData.msg = "Successfully displayed the password ";
            responseData.data = {
                password: result[0].password
            };
            return res.status(200).send(responseData);
        })
    } else {
        return res.status(400).send(responseData);
    }
}

module.exports = {signup, login, isAuthenticated, forgetPassword};