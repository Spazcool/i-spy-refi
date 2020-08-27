import {firestore as db} from '../firebase.js';

export const DB = {

  // ------------------------ CREATE ------------------------
  async createUser(user, additionalData){
    const userRef = db().doc(`users/${user.uid}`);
    const snapshot = await userRef.get();

    if (!snapshot.exists) {
      let data;
      if(!additionalData){ // if google signin
        data = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          firstName: '',
          lastName: '',
          zpid: '',
          admin: false,
        }
      } else {
        const { email, firstName, lastName } = additionalData;
        data = {
          uid: user.uid,
          email: email,
          displayName: '',
          firstName: firstName,
          lastName: lastName,
          zpid: '',
          admin: false,
        }
      }
      let returnedUser;

      try {
        returnedUser = await userRef.set(data, {merge: true})
      } catch (error) {
        console.error("Error creating user document", error);
      }

      const userObj = await returnedUser;
      return userObj;
    }
  },

  async createHouse(user, houseData){
    const data = {
      owner: user,
      zpid: houseData.zpid,
      location: new db.GeoPoint(houseData.location[0], houseData.location[1]),
      comps: houseData.comps
    }
    let returnedHouse;

    try{
      returnedHouse = await db().collection('houses').add(data)
    }
    catch(err){
      console.log(err)
    }
    const houseObj = await returnedHouse;
    return houseObj;
  },

  // ------------------------ READ ------------------------
  async getUser(id){
    let returnedUser;
    const user = db().collection('users').doc(id);
    try {
      returnedUser = await user.get();
    }
    catch(err) {
      console.error(err)
    }
    const userObj = await returnedUser;
    const data = {
      id: userObj.id,
      email: userObj.data().email ? userObj.data().email : undefined,
      firstName: userObj.data().firstName ? userObj.data().firstName : undefined,
      lastName: userObj.data().lastName ? userObj.data().lastName : undefined
    }
    return data;
  },

  async getUsers(){
    let returnedUsers;
    const usersList = db().collection('users');
    try {
      returnedUsers = await usersList.get();
    }
    catch(err) {
      console.log(err)
    }
    const users = await returnedUsers;
    //todo break this off into a reusable func seeing as this shit is gonna happen a bunch
    const usersArr = [];
    users.forEach(user => {
      // todo does this enforcing of data model belong here?
      const data = {
        id: user.id,
        email: user.data().email,
        firstName: user.data().firstName,
        lastName: user.data().lastName
      }
      usersArr.push(data) 
    })
    return usersArr;
  },

  async getHouse(id){
    let returnedHouse;
    const house = db().collection('houses').doc(id);
    try {
      returnedHouse = await house.get();
    }
    catch(err) {
      console.log(err)
    }
    const houseObj = await returnedHouse;
    // todo is there a way to abstract this out of here? I guess the concep tof a model
    const data = {
      id: houseObj.id,
      value: houseObj.data().value,
      zpid: houseObj.data().zpid,
    }
    return data;
  },

  async getHouses(){
    let returnedHouses;
    const housesList = db().collection('houses');
    try {
      returnedHouses = await housesList.get();
    }
    catch(err) {
      console.log(err)
    }
    const houses = await returnedHouses;
    //todo break this off into a reusable func seeing as this shit is gonna happen a bunch
    const housesArr = [];
    houses.forEach(house => {
      // todo does this enforcing of data model belong here?
      const data = {
        id: house.id,
        owner: house.data().owner,
        value: house.data().value,
        zpid: house.data().zpid
      }
      housesArr.push(data) 
    })
    return housesArr;
  },

  // ------------------------ UPDATE ------------------------
  async updateUser(user, updateUserData){
    const userRef = db().doc(`users/${user}`);
    const snapshot = await userRef.get();

    if (!snapshot.exists) {
      return;
    }else{
      const {email, displayName, firstName, lastName, zpid, admin} = updateUserData;
      const data = {
        email,
        displayName,
        firstName,
        lastName,
        zpid,
        admin,
      }

      try {
        await userRef.update(data)
      } catch (error) {
        console.error("Error updating user document", error);
      }
      return `${user} updated successfully.`;
    }
  },

  async updateHouse(updateHouseData){
    const {comps} = updateHouseData;
    const data = {comps, lastUpdated: db.FieldValue.serverTimestamp()}
    db().collection('houses').where('zpid', '==', updateHouseData.zpid)
      .get()
      .then((houses) => {  
        const house = houses.docs[0];
        house.ref.update(data);
        return house;
      })
      .then((house)=> `${house} updated successfully.`)
      .catch((err)=> console.error("Error updating house document", err));
  }, 

  // ------------------------ DELETE ------------------------
  async deleteUser(user){
    const userRef = db().doc(`users/${user}`);
    const snapshot = await userRef.get();

    if (!snapshot.exists) {
      return;
    }else{
      try {
        await userRef.delete()
      } catch (error) {
        console.error("Error deleting user document", error);
      }
    }
    console.log(`${user} deleted successfully`);
    const usersHouses = await this.getHouses(); // might be costly, make another endpoint to find the house by user id
    const [house] = usersHouses.filter(house => house.owner == user)
    this.deleteHouse(house.id)
    console.log(`${house.id} deleted successfully`);
  },

  async deleteHouse(house){
    db().collection('houses').doc(house)
      .get()
      .then((house) => {  
        house.ref.delete();
        return house;
      })
      .then((house) => console.log(`${house} deleted successfully.`))
      .catch((err) => console.error("Error deleting house document", err));
  }
};