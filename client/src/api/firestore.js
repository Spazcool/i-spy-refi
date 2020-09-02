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
        data = new User(
          user.uid,
          user.displayName,
          user.email,
          '',
          '',
          '',
          false,
          ''
        );
      } else {
        const { email, firstName, lastName } = additionalData;

        data = new User(
          user.uid,
          `${firstName} ${lastName}`,
          email,
          firstName,
          lastName,
          '',
          false,
          ''
        );
      }

      let message;

      try {
        userRef.set(data.getUserData(), { merge: true });
        message = 'success';
      } catch (error) {
        message = error;
        console.error('Error creating user document', error);
      }

      return { message };
    }
    return { message: 'user already exists' };
  },

  async createHouse(userID, houseData) {
    let message = { message: 'house already exists' };

    const houseRef = db().doc(`houses/${houseData.hid}`);
    const snapshot = await houseRef.get();

    if (!snapshot.exists) {
      const {
        hid,
        zpid,
        latitude,
        longitude,
        zip,
        state,
        city,
        street,
        comps,
        formData,
        lastUpdated,
      } = houseData;
      const data = new House(
        hid,
        zpid,
        userID,
        new db.GeoPoint(parseFloat(latitude), parseFloat(longitude)),
        zip,
        state,
        city,
        street,
        comps,
        formData,
        lastUpdated
      );

      try {
        houseRef.set(data.getHouseData(), { merge: true });
        message = { message: 'success' };
      } catch (error) {
        message = { message: error };
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
    const {
      displayName,
      email,
      firstName,
      lastName,
      zpid,
      admin,
      lastUpdated,
    } = userObj.data();

    const data = new User(
      userObj.id,
      displayName,
      email,
      firstName,
      lastName,
      zpid,
      admin,
      lastUpdated
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
      const {
        uid,
        displayName,
        email,
        firstName,
        lastName,
        zpid,
        admin,
        lastUpdated,
      } = user.data();
      const data = new User(
        uid,
        displayName,
        email,
        firstName,
        lastName,
        zpid,
        admin,
        lastUpdated
      );
      usersArr.push(data.getUserData());
    });
    return usersArr;
  },

  async getHouseByID(docID) {
    let returnedHouse;
    const house = db().collection('houses').doc(docID);

    try {
      returnedHouse = await house.get();
    } catch (err) {
      console.log(err);
    }

    const houseObj = await returnedHouse;

    const {
      hid,
      zpid,
      location,
      user,
      zip,
      state,
      city,
      street,
      comps,
      formData,
      lastUpdated,
    } = houseObj.data();
    const data = new House(
      hid,
      zpid,
      user,
      location,
      zip,
      state,
      city,
      street,
      comps,
      formData,
      lastUpdated
    );

    return data.getHouseData();
  },

  async getHouseByOwner(userId) {
    let returnedHouse;

    const house = db().collection('houses').where('user', '==', userId);

    try {
      returnedHouse = await house.get();
    } catch (err) {
      returnedHouse = { message: `Error loading house: ${err}.` };
    }

    let houseArr = [];
    const houseObj = await returnedHouse;
    console.log(houseObj);
    houseObj.forEach((house) => {
      if (house.message) {
        houseArr.push(house);
      }
      const {
        hid,
        zpid,
        location,
        user,
        zip,
        state,
        city,
        street,
        comps,
        formData,
        lastUpdated,
      } = house.data();
      const data = new House(
        hid,
        zpid,
        user,
        location,
        zip,
        state,
        city,
        street,
        comps,
        formData,
        lastUpdated
      );

      houseArr.push(data.getHouseData());
    });

    return houseArr;
  },

  async getHouses() {
    let returnedHouses;
    const housesList = db().collection('houses');
    try {
      returnedHouses = await housesList.get();
    } catch (err) {
      returnedHouses = { message: `Error loading houses: ${err}.` };
    }

    const housesArr = [];
    const houses = await returnedHouses;

    houses.forEach(async (house) => {
      const {
        hid,
        zpid,
        location,
        user,
        zip,
        state,
        city,
        street,
        comps,
        formData,
        lastUpdated,
      } = house.data();
      const data = new House(
        hid,
        zpid,
        user,
        location,
        zip,
        state,
        city,
        street,
        comps,
        formData,
        lastUpdated
      );

      housesArr.push(data.getHouseData());
    });
    return housesArr;
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
    const {
      hid,
      zpid,
      location,
      user,
      zip,
      state,
      city,
      street,
      comps,
      formData,
      lastUpdated,
    } = updateHouseData;
    const data = new House(
      hid,
      zpid,
      user,
      location,
      zip,
      state,
      city,
      street,
      comps,
      formData,
      db.FieldValue.serverTimestamp()
    );
    // const { comps } = updateHouseData;
    // const data = { comps, lastUpdated: db.FieldValue.serverTimestamp() };
    db()
      .collection('houses')
      .where('zpid', '==', data.getHouseData().zpid) //
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
      return { message: `User ${userID} does not exist in DB.` };
    } else {
      const usersHouses = await this.getHouseByOwner(userID);
      console.log(usersHouses);
      const [house] = usersHouses.filter((house) => house.owner == userID); //todo presumes one house per owner
      const deletedHouse = await this.deleteHouse(house.id);
      message.push(deletedHouse);

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

      authedUser
        .delete()
        .then(function () {
          message.push(
            `User ${userID} deleted successfully, from Auth User list.`
          );
        })
        .catch(function (error) {
          message.push(
            `Error deleting User ${userID}, from Auth List: ${error}`
          );
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
        console.log('where');

        return house;
      })
      .then((house) => {
        console.log('here');
        return { message: `House ${houseID} deleted successfully.` };
      })
      .catch((err) => {
        console.log('here');

        return { message: `Error deleting house ${houseID}: ${err}.` };
      });
  },
};
