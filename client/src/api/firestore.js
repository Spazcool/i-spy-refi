import { auth, firestore as db } from '../firebase.js';
import User from '../models/User';
import House from '../models/House';

export const DB = {
  // ------------------------ CREATE ------------------------
  // expected fields:
  // user(uid, displayName, email, firstName, lastName, zpid, admin, lastUpdated)
  async createUser(user, additionalData) {
    const userRef = db().doc(`users/${user.uid}`);
    const snapshot = await userRef.get();

    if (!snapshot.exists) {
      let data;
      if (!additionalData) {
        // if google signin
        data = new User(user.uid, user.displayName, user.email, '', '', '', false, '');
      } else {
        const { email, firstName, lastName } = additionalData;

        data = new User(user.uid, `${firstName} ${lastName}`, email, firstName, lastName, '', false, '');
      }

      let message;

      try {
        userRef.set(data.getUserData(), { merge: true });
        message = 'success'
      } catch (error) {
        message = error;
        console.error('Error creating user document', error);
      }

      return {message};
    }
    return {message: 'user already exists'};

  },

  async createHouse(userID, houseData) {
    let message = {message: 'house already exists'};

    const houseRef = db().doc(`houses/${houseData.hid}`);
    const snapshot = await houseRef.get();

    if (!snapshot.exists) {
      const { hid, zpid, location, zip, state, city, street, comps, formData, lastUpdated } = houseData;
      const data = new House(
        hid,
        zpid,
        userID,
        new db.GeoPoint(location[0], location[1]),
        zip,
        state,
        city,
        street,
        comps,
        formData,
        lastUpdated,
      );

      try {
        houseRef.set(data.getHouseData(), { merge: true });
        message = {message: 'success'}
      } catch (error) {
        message = {message: error};
        console.error('Error creating house document', error);
      }
    }
    
    return message;
  },

  // ------------------------ READ ------------------------
  async getUser(id) {
    let returnedUser;
    const user = db().collection('users').doc(id);
    try {
      returnedUser = await user.get();
    } catch (err) {
      console.error(err);
    }
    const userObj = await returnedUser;
    const {displayName, email, firstName, lastName, zpid, admin, lastUpdated} = userObj.data();

    const data = new User(
      userObj.id,
      displayName,
      email,
      firstName,
      lastName,
      zpid,
      admin,
      lastUpdated,
    );

    return data.getUserData();
  },

  async getUsers() {
    let returnedUsers;
    const usersList = db().collection('users');
    try {
      returnedUsers = await usersList.get();
    } catch (err) {
      console.log(err);
    }
    const users = await returnedUsers;
    const usersArr = [];
    users.forEach((user) => {
      const { uid, displayName, email, firstName, lastName, zpid, admin, lastUpdated } = user.data();
      const data = new User(
        uid,
        displayName,
        email,
        firstName,
        lastName,
        zpid,
        admin,
        lastUpdated,
      );
      usersArr.push(data.getUserData());
    });
    return usersArr;
  },

  async getHouseByID(id) {
    let returnedHouse;
    const house = db().collection('houses').doc(id);

    try {
      returnedHouse = await house.get();
    } catch (err) {
      console.log(err);
    }

    const houseObj = await returnedHouse;
    let returnedFormData;

    try {
      returnedFormData = await this.getFormByID(id);
    } catch (err) {
      console.log(err);
    }
    // const formObj = await returnedFormData;
    
    // todo is there a way to abstract this out of here? I guess the concep tof a model
    const data = {
      id: houseObj.id,
      value: houseObj.data().value,
      zpid: houseObj.data().zpid,
      formData: houseObj.data().formData
    }
 
    return data;
  },

  async getHouseByOwner(userId) {
    let returnedHouse;

    const house = db().collection('houses').where('user', '==', userId);

    try {
      returnedHouse = await house.get();
    } catch (err) {
      console.log(err);
    }
    let houseinfoobj = [];
    const houseObj = await returnedHouse;

    houseObj.forEach((house) => {
      const data = {
        id: house.id,
        street: house.data().street,
        city: house.data().city,
        state: house.data().state,
        zip: house.data().zip,
        zpid: house.data().zpid,
      };

      houseinfoobj.push(data);
    });

    // console.log('houseobj:', houseinfoobj);

    return houseinfoobj;
  },

  async getHouses() {
    let returnedHouses;
    const housesList = db().collection('houses');
    try {
      returnedHouses = await housesList.get();
    } catch (err) {
      console.log(err);
    }
    const houses = await returnedHouses;
    //todo break this off into a reusable func seeing as this shit is gonna happen a bunch
    const housesArr = [];
    houses.forEach(async (house) => {
      let returnedFormData;

      try {
        returnedFormData = await this.getFormByID(house.id);
      } catch (err) {
        console.log(err);
      }
      const formObj = await returnedFormData;

      // todo does this enforcing of data model belong here?
      const data = {
        id: house.id,
        owner: house.data().owner,
        value: house.data().value,
        zpid: house.data().zpid,
        formData: formObj,
      };
      housesArr.push(data);
    });
    return housesArr;
  },

  async getFormByID(houseID) {
    let returnedFormData;
    const formData = db()
      .collection('houses')
      .doc(houseID)
      .collection('formData');

    try {
      returnedFormData = await formData.get();
    } catch (err) {
      console.log(err);
    }
    const formObj = await returnedFormData;
    let data;

    // todo only returns one form's data
    // todo will need to beef up the returned fields
    formObj.forEach((form) => {
      data = {
        id: form.id,
        bathroom: form.data().bathroom,
      };
    });

    return data;
  },

  // ------------------------ UPDATE ------------------------
  // TODO UNTESTED
  async updateUser(user, updateUserData) {
    const userRef = db().doc(`users/${user}`);
    const snapshot = await userRef.get();

    if (!snapshot.exists) {
      return;
    } else {
      const {
        email,
        displayName,
        firstName,
        lastName,
        zpid,
        admin,
        lastUpdated,
      } = updateUserData;

      const data = new User(
        user.user.uid,
        displayName,
        email,
        firstName,
        lastName,
        zpid,
        admin,
        lastUpdated
      );

      try {
        await userRef.update(data.getUserData());
      } catch (error) {
        console.error('Error updating user document', error);
      }
      return `${user} updated successfully.`;
    }
  },

  async updateHouse(updateHouseData) {
    const { comps } = updateHouseData;
    const data = { comps, lastUpdated: db.FieldValue.serverTimestamp() };
    db()
      .collection('houses')
      .where('zpid', '==', updateHouseData.zpid)
      .get()
      .then((houses) => {
        const house = houses.docs[0];
        house.ref.update(data);
        return house;
      })
      .then((house) => `${house} updated successfully.`)
      .catch((err) => console.error('Error updating house document', err));
  },

  // ------------------------ DELETE ------------------------
  // TODO UNTESTED!!!
  async deleteUser(userID) {
    let message = [];
    const userRef = db().doc(`users/${userID}`);
    const snapshot = await userRef.get();

    if (!snapshot.exists) {
      return {message: `User ${userID} does not exist in DB.`};
    } else {
      const usersHouses = await this.getHouseByOwner(userID);
      console.log(usersHouses);
      const [house] = usersHouses.filter(house => house.owner == userID)//todo presumes one house per owner
      const deletedHouse = await this.deleteHouse(house.id);
      message.push(deletedHouse)

      try {
        await userRef.delete();
        message.push(`User ${userID} deleted successfully.`);
      } catch (error) {
        message.push(`Error deleting User ${userID}: ${error}`);
      }

      // TODO DELETES THE AUTH CREDS FOR THE CURRENTLY SIGNED IN USER
      // NOT SURE IF WE CAN FIND THE CREDS FOR ANY USER & DELETE THEM...BECUASE
      // SECURITY IS A THING
      const authedUser = auth().currentUser;

      authedUser.delete().then(function() {
        message.push(`User ${userID} deleted successfully, from Auth User list.`);
      }).catch(function(error) {
        message.push(`Error deleting User ${userID}, from Auth List: ${error}`);
      });
    }
  },

  async deleteHouse(houseID) {
    // TODO WORKS, BUT NOT SENDING A PROMISE BACK TO THE FRONTEND, SO THE MESSAGES NEVER MAKE IT
    db()
      .collection('houses')
      .doc(houseID)
      .get()
      .then((house) => {
        house.ref.delete();
        console.log('where')

        return house;
      })
      .then((house) => {
        console.log('here')
        return {message: `House ${houseID} deleted successfully.`}
      })
      .catch((err) => {
        console.log('here')

        return {message: `Error deleting house ${houseID}: ${err}.`}
      });
  },
};
