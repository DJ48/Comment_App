const sqlConnection = require("../services/sqlConnection");
const bcrypt = require("bcryptjs");
const res = require("express/lib/response");
const auth = require("../util/auth");


function strongSignup(data, cb) {
    let sql = `INSERT INTO user_t
    (email, password, secret,createdAt)
    Values (? , ? , ?, now())`;
    let values = [];
    values.push(data.email);
    values.push(data.password);
    bcrypt.hash(data.secret, 8, function(err, hash) {
        if(err) {
            console.log(err);
            return;
        }
        values.push(hash);
        sqlConnection.executeQuery(sql, values, function(err, result) {
            cb(err, result);
        });
    });
}

function getUsersSignupDetails(data, cb) {
    let sql = "SELECT * FROM user_t WHERE email = ?";
    let values = [];
    values.push(data.email);
    sqlConnection.executeQuery(sql, values, function(err, result) {
        cb(err, result);
    });
}

function strongLogin(data, cb) {
    let sql = `SELECT id,email, password 
               FROM user_t WHERE 
               email = ?`;
    let values = [];
    values.push(data.email);
    sqlConnection.executeQuery(sql, values, function(err, result) {
        if(result.length == 0){
            cb(err,[]);
            return;
        }
        const isValidPass = data.password.localeCompare(result[0].password);
        if(isValidPass==0) {
            const token = auth.newToken(result[0]);
            const response = [
                {
                    email: result[0].email,
                    authToken: token
                }
            ];
            cb(err, response);
        } else {
            cb(err, []);
        }
    });
}

function getUserById(id, cb) {
    let sql = `SELECT id, email
               FROM user_t WHERE 
               id = ?`;
    let values = [];
    values.push(id);
    sqlConnection.executeQuery(sql, values, function(err, result) {
        cb(err, result);
    });
}

function forgetPassword(data,cb){
    let sql = `SELECT email, password, secret
               FROM user_t WHERE 
               email = ?`;
    let values = [];
    values.push(data.email);
    sqlConnection.executeQuery(sql, values, function(err, result) {
        if(result.length == 0){
            cb(err,[]);
            return;
        }
        const isValidPass = bcrypt.compareSync(data.secret, result[0].secret);

        if(isValidPass) {
            const token = auth.newToken(result[0]);
            const response = [
                {
                    password: result[0].password,
                    authToken: token
                }
            ];
            cb(err, response);
        } else {
            cb(err, []);
        }
    });
}

module.exports = {getUsersSignupDetails, getUserById, strongSignup, strongLogin, forgetPassword};