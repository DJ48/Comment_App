const post= require('../models/post');

function addPost(req,res){
    let data = req.body;
    let user = req.user;
    data.id=user[0].id;
    let responseData = {
        success: false,
        msg: "Invalid details for post"
    };
    if(data.post) {
        post.addPost(data, function(err, result) {
            if(err) {
                console.log(err);
                responseData.msg = "Error in adding post";
                return res.status(500).send(responseData);
            }
            responseData.success = true;
            responseData.msg = "Successfully added the post ";
            responseData.data = {
                post: data.post
            };
            return res.status(200).send(responseData);
        })
    } else {
        return res.status(400).send(responseData);
    }
}

function fetchPost(req,res){
    let responseData = {
        success: false,
        msg: "Invalid details for post"
    };

    post.fetchPost(function(err, result) {
        if(err) {
            console.log(err);
            responseData.msg = "Error in displaying post";
            return res.status(500).send(responseData);
        }
        responseData.success = true;
        responseData.msg = "Successfully displaying the post ";
        responseData.data = {
            post: result
        };
        return res.status(200).send(responseData);
    })
}

function filter(req,res){
    let data = req.body;
    let user = req.user;
    data.id=user[0].id;
    let responseData = {
        success: false,
        msg: "Invalid details for post"
    };
    post.filterPost(data,function(err, result) {
        if(err) {
            console.log(err);
            responseData.msg = "Error in filtering post";
            return res.status(500).send(responseData);
        }
        responseData.success = true;
        responseData.msg = "Successfully filtered the post ";
        responseData.data = {
            post: result
        };
        return res.status(200).send(responseData);
    })
}

module.exports = {addPost, fetchPost, filter};