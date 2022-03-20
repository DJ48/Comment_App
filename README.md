# Comment App

## Description

I have created the backend of Comment App using Nodejs.

Functionality
1. Sign-up where the user will be allowed to enter his emailID and password along
with a secret code. This data will be validated and sent to the backend where the
data will be stored in a Database.
2. Sign-in where the user will be allowed to enter his emailID and password. This
data will be sent to the backend where it will be cross-checked with the data
available in the database and a proper response is returned to the frontend.
3. Forget-password where the user will be allowed to enter the email id and
secret code. This data will be sent to the backend and If the data matches with
any record already in the database then the password should be shown to the
user In frontend.
4. After sign-in the user will be presented with a text area where he will be able to
type any comments. After submitting, the comment will be taken to the backend
and saved in database.
5. Below the text area, the user will also see other users' comments.
6. There will be a filter button on click it, the comment area will show only the
comments of the logged in user.

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

## Author

Deepak Jaiswal

[Read & Rate my Article on Linked List](https://www.geeksforgeeks.org/multiplication-of-two-polynomials-using-linked-list/)

## Version History

* v1
    * Initial Release
