document.addEventListener('DOMContentLoaded', event => {
  const app = firebase.app();

  const db = firebase.firestore();

  const housesList = db.collection('houses');
  const myHouse = db.collection('houses').doc('JWb8oyGegTY1HCi9XcaX');
  // const query = housesList.where('value', '>', 100000);
  const query = housesList.orderBy('value', 'desc');

  query.get()
    .then(houses => {
      houses.forEach(doc => {

        data = doc.data();
        console.log(data);
        let li = document.createElement("li");
        li.innerHTML = `Location: ${data.location.latitude}/${data.location.longitude} <br/> Value: ${data.value}`;
        document.querySelector('#query').appendChild(li)
      })
    })
// Grab the data as it is at the moment of grabbing it
  myHouse.get()
    .then(doc => {
      const data = doc.data();
      document.querySelector('#query2').innerHTML = `${data.location.latitude}/${data.location.longitude} || ${data.value}`
    })

// Auto Update references to the DB on the frontend
  myHouse.onSnapshot(doc => {
    const data = doc.data();
    // document.write(`${data.location.latitude}/${data.location.longitude} || ${data.value}`)
    document.querySelector('#value').innerHTML = data.value;
  });


});

const googleLogin = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
//stores the user auth in indexdb, uses JSONwebtokens
//can view list of authed users in the firebase console
//https://console.firebase.google.com/project/manjarbranco-c6646/authentication/users
  firebase.auth().signInWithPopup(provider)
    .then(res => {
      const user = res.user;
      document.querySelector('#signedin').innerHTML = `Hi ${user.displayName}`;
      console.log(user);
    })
    .catch(console.log)
}

function updateValue(event) {
  const db = firebase.firestore();
  const myHouse = db.collection('houses').doc('JWb8oyGegTY1HCi9XcaX');

  myHouse.update({value: event.target.value})
}