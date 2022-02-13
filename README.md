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

* Download [Insomnia](https://insomnia.rest/download) or [Postman](https://www.postman.com/downloads/) for web api testing.
* How to test the program
* Step-by-step bullets
```
code blocks for commands
```

## Help

Any advise for common problems or issues.
```
command to run if program contains helper info
```

## Authors

Contributors names and contact info

ex. Dominique Pizzie  
ex. [@DomPizzie](https://twitter.com/dompizzie)

## Version History

* 0.2
    * Various bug fixes and optimizations
    * See [commit change]() or See [release history]()
* 0.1
    * Initial Release

## License

This project is licensed under the [NAME HERE] License - see the LICENSE.md file for details

## Acknowledgments

Inspiration, code snippets, etc.
* [awesome-readme](https://github.com/matiassingers/awesome-readme)
* [PurpleBooth](https://gist.github.com/PurpleBooth/109311bb0361f32d87a2)
* [dbader](https://github.com/dbader/readme-template)
* [zenorocha](https://gist.github.com/zenorocha/4526327)
* [fvcproductions](https://gist.github.com/fvcproductions/1bfc2d4aecb01a834b46)
