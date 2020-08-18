# GETTING STARTED, the quick & dirty way
 1. install dependencies for server
  ``` 
  cd ~/PC/User/You/otherstuff/i-spy-refi/ 
  ```
  ``` 
  npm install 
  ```
 2. install dependencies for client
  ``` 
  cd ~/PC/User/You/otherstuff/i-spy-refi/client 
  ```
  ``` 
  npm install 
  ```
 3. create .env file
  * navigate back to root
    ``` 
    cd ~/PC/User/You/otherstuff/i-spy-refi/ 
    ```
  * create file with the following: 
    > DB_PASSWORD='{yourpassowrdhere}'
    >
    > DB_NAME='refi_db'
    >
    > DB_HOST='localhost'
    >
    > DB_USER='root'
    >
    > DB_PORT='3306'
 4. create DB
  * from terminal run:
    ``` 
    mysql -u root -p 
    ```
    ``` 
    source /PC/User/You/otherstuff/i-spy-refi/config/refi_db.sql 
    ```
 5. run server
  ``` 
  cd ~/PC/User/You/otherstuff/i-spy-refi/ 
  ```
  ``` 
  node server 
  ```
 6. run client
  ``` 
  cd ~/PC/User/You/otherstuff/i-spy-refi/client 
  ```
  ``` 
  npm start 
  ```