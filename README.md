# Comment App V2

## Description

I have created the backend of Comment App using Nodejs.

## Getting Started

### Installation & Setup

1. Install [Node.js](https://nodejs.org/en/) and [MySql](https://dev.mysql.com/downloads/installer/)
2. Clone this repository and install the dependencies.
    ```
      git clone https://github.com/DJ48/Zoho_App.git
      cd Zoho_App
      npm install
    ```     
3. Now Setup the database (ex: zoho). If you are using another name please change the below queries accordingly.
    * Create the user_t table.
    ```
    CREATE TABLE `zoho`.`user_t` (
      `id` INT NOT NULL AUTO_INCREMENT,
      `email` VARCHAR(65) NULL,
      `password` VARCHAR(120) NULL,
      `secret` VARCHAR(120) NULL,
      `createdAt` DATETIME NULL,
      PRIMARY KEY (`id`));
    ```
    * Create the post_t table.
    ```
    CREATE TABLE `zoho`.`post_t` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `post` VARCHAR(250) NULL,
    `user_id` INT NULL,
    `createdAt` DATETIME NULL,
     PRIMARY KEY (`id`),
     INDEX `fk_post_idx` (`user_id` ASC) VISIBLE,
     CONSTRAINT `fk_post`
     FOREIGN KEY (`user_id`)
     REFERENCES `zoho`.`user_t` (`id`)
     ON DELETE NO ACTION
     ON UPDATE NO ACTION);
    ```
4. Now update the backendConfig.js ( Path: Zoho_App>src>constants ) file for database connection.
    * Update the following entries.
    ```
      host: "ip_addr",
      user: "your_username",
      password: "your_password",
      database: "db_name"
    ```
5. Now, within the Zoho_App directory. Start the server.
    ```
      node app.js
    ```
    
### Executing program

1. Download [Insomnia](https://insomnia.rest/download) or [Postman](https://www.postman.com/downloads/) for web api testing.
2. I have created six api. I am gonna explain each api and their input json.
    * SignUp Api :- The user will pass email, password and secret code for signing up. 

        ```
        URL: http://127.0.0.1:3000/api/v1/signup
        Method: POST
        
        Input JSON:-
        {
	        "email":"test@gmail.com",
	        "password":"12",
	        "secret":"1"
        }
        ```
     * SignIn Api :- The user will pass email and password for logging in. It will return a auth token that you have to use in authorization for other Api.

        ```
        URL: http://127.0.0.1:3000/api/v1/signin
        Method :- GET
        
        Input JSON:-
        {
	        "email":"test@gmail.com",
	        "password":"12"
        }
        
        Output JSON:-
        {
	        "success": true,
	        "msg": "Successfully logged in ",
	        "data": {
		        "username": "test@gmail.com",
		        "authToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjQ0NzcyMDAwLCJleHAiOjE2NDU2MzYwMDB9.h89IJaB-Mpk_ozJtkHHc98sLLKjcaatxwRaqiXKOVbk"
	        }
        }
        ```
        <b>Note:- Save the auth token that you got as an output after login. It will be used in calling other APIs.</b>
     
     * ForgetPassword Api :- The user will pass email and secret code as input and this api will display the user password. 

        ```
        URL: http://127.0.0.1:3000/api/v1/forgetPassword
        Method: GET
        
        Input JSON:-
        {
	        "email":"test@gmail.com",
	        "secret":"1"
        }
        
        Output JSON:-
        {
	        "success": true,
	        "msg": "Successfully displayed the password ",
	        "data": {
		        "password": "12"
	        }
        }
        ```
    * Add Comment Api :- The user will pass post and auth token as input. The post will be successfully added in the database.

        ```
        URL:- http://127.0.0.1:3000/api/v1/post/add
        Method: POST
        
        Input JSON:-
        {
	        "post":"post by user1."
        }
        
        Input Header:
            type:- auth
            value:- eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjQ0NzcyMDAwLCJleHAiOjE2NDU2MzYwMDB9.h89IJaB-Mpk_ozJtkHHc98sLLKjcaatxwRaqiXKOVbk
            Note:- This value was generated during login. 
        
        Output JSON:-
        {
	        "success": true,
	        "msg": "Successfully added the post ",
	        "data": {
		        "post": "post by user1."
	        }
        }
        ```
    * Get ALL Comments Api :- The user will pass auth token as header and this api will display all the user's Post.

        ```
        URL: http://127.0.0.1:3000/api/v1/post/get
        Method: GET
        
        Input Header:
            type:- auth
            value:- eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjQ0NzcyMDAwLCJleHAiOjE2NDU2MzYwMDB9.h89IJaB-Mpk_ozJtkHHc98sLLKjcaatxwRaqiXKOVbk
            Note:- his value was generated during login.
       
       Output JSON:-
        {
	        "success": true,
	        "msg": "Successfully displaying the post ",
	        "data": {
		        "post": [
			        {
				        "post_num": 1,
				        "post": "post by user1.",
				        "createdAt": "2022-02-13T17:18:21.000Z"
			        },
			        {
				        "post_num": 2,
				        "post": "another post by user 1.",
				        "createdAt": "2022-02-13T17:28:56.000Z"
			        },
			        {
				        "post_num": 3,
				        "post": "Hi i am user 2.",
				        "createdAt": "2022-02-13T17:32:11.000Z"
			        },
			        {
				        "post_num": 4,
				        "post": "User 2 is on vacation.",
				        "createdAt": "2022-02-13T17:33:54.000Z"
			        }
		        ]
	        }
        }
        ```
    * Filter Comment by user Api :- The user will pass auth token as header and this api will display the post of the logged in user. 

        ```
        URL: http://127.0.0.1:3000/api/v1/post/filter
        Method: POST
        
        Input Header:
            type:- auth
            value:- eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjQ0NzcyMDAwLCJleHAiOjE2NDU2MzYwMDB9.h89IJaB-Mpk_ozJtkHHc98sLLKjcaatxwRaqiXKOVbk
            Note:- This value was generated during login.
        
        Output JSON:-
        {
	        "success": true,
	        "msg": "Successfully filtered the post ",
	        "data": {
		        "post": [
			        {
				        "id": 1,
				        "post": "post by user1.",
				        "createdAt": "2022-02-13T17:18:21.000Z"
			        },
			        {
				        "id": 2,
				        "post": "another post by user 1.",
				        "createdAt": "2022-02-13T17:28:56.000Z"
			        }
		        ]
	        }
        }
        ```

## Authors

Deepak Jaiswal

[Read & Rate my Article on Linked List](https://www.geeksforgeeks.org/multiplication-of-two-polynomials-using-linked-list/)

## Version History

* v1
    * Initial Release
