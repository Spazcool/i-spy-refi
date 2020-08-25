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

## Create local cofing files:
1. create config file for server/functions
  ``` 
  cd ~/PC/User/You/otherstuff/i-spy-refi/functions
  ```
  * Navigate to [firebase console](https://console.firebase.google.com/project/ispyrefi/settings/serviceaccounts/adminsdk)
  * click 'Generate new private key'
  * drag downloaded file to root directory
  * rename file to `key.json`
2. create config file for client:
  ```
  cd ~/PC/User/You/otherstuff/i-spy-refi/client/src
  ```
  * Add a file by the name of `firebase-config.json` in src directory
  * Navigate to: [firebase console](https://console.firebase.google.com/project/ispyrefi/settings/general/)
  * under 'Your Apps'
    * Click 'Config'
    * Copy config obj
  * Paste config obj into `firebase-config.json`
    * should look like the following: 
    ```
    {
      "apiKey": "REALLY-LONG-STRING-OF-TEXT",
      "authDomain": "ispyrefi.firebaseapp.com",
      "databaseURL": "https://ispyrefi.firebaseio.com",
      "projectId": "ispyrefi",
      "storageBucket": "ispyrefi.appspot.com",
      "messagingSenderId": "REALLY-LONG-STRING-OF-TEXT",
      "appId": "REALLY-LONG-STRING-OF-TEXT",
      "measurementId": "REALLY-LONG-STRING-OF-TEXT"
    }
    ```
  * Save
  
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