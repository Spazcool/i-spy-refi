class User {
  constructor(uid, displayName, email, firstName, lastName, zpid, admin, lastUpdated,building_size,houseImage){
    this.uid = uid;
    this.displayName = displayName;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.zpid = zpid;
    this.admin = admin;
    this.lastUpdated = lastUpdated;
  }

  getUserData(){
    return {
      uid: this.uid,
      displayName: this.displayName,
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      zpid: this.zpid,
      admin: this.admin,
      lastUpdated: this.lastUpdated,
    }
  }
}

export default User;
