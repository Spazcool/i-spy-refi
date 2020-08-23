<!-- https://firebase.google.com/docs/hosting/full-config -->

# GETTING STARTED w/ FIREBASE, the quick & dirty way

## Clone the Repo/Branch
1. Clone repo
  ```
  git clone ...
  ```
2. Checkout non-master branch 
  ```
  git checkout --track origin/firebase
  ```

---

## Initial Firebase Setup
1. Install firebase:
  ```
  npm install -g firebase-tools
  ```
2. Log in to firebase:
  ```
  firebase login
  ```
3. Configure & install app (POSSIBLY OPTIONAL AS YOU SHOULD ALREADY HAVE THE .firebaserc & firebase.json files):
  * ``` firebase init ```
  * App type options:
    * Hosting
  * Existing project:
    * ispy...
  * Specify starting location:
    * client/build
  * Some other opiton:
    * Yes
  * Overwrite index.html?
    * No, but not a biggy if you do

---

## Get it all running:
 1. install dependencies for server/functions
  ``` 
  cd ~/PC/User/You/otherstuff/i-spy-refi/functions
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
 3. create a build directory for React/Client:
  ``` 
  cd ~/PC/User/You/otherstuff/i-spy-refi/client 
  ```
  ``` 
  npm run build 
  ```
 4. run all the things
  ``` 
  cd ~/PC/User/You/otherstuff/i-spy-refi/ 
  ```
  ``` 
  firebase serve
  ```
  * if you get an error about ports...
    ```
    firebase serve --port=5001
    ```