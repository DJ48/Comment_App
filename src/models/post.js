const sqlConnection = require("../services/sqlConnection");

function addPost(data,cb){
    let sql = `INSERT INTO post_t
    (post, user_id, createdAt)
    Values (? , ? , now())`;
    let values = [];
    values.push(data.post);
    values.push(data.id);
    sqlConnection.executeQuery(sql, values, function(err, result) {
        cb(err, result);
    });
}

function fetchPost(cb){
    let sql = "select id as post_num, post, createdAt from post_t";
    let values = [];
    sqlConnection.executeQuery(sql, values, function(err, result) {
        cb(err, result);
    });
}

function filterPost(data,cb){
    let sql = "select id, post, createdAt from post_t where user_id = ?";
    let values = [];
    values.push(data.id);
    sqlConnection.executeQuery(sql, values, function(err, result) {
        cb(err, result);
    });
}

module.exports={addPost, fetchPost, filterPost};