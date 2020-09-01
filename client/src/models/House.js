class House {
  constructor(hid, zpid, user, location, zip, state, city, street, comps, formData, lastUpdated){
    this.hid = hid;
    this.zpid = zpid;
    this.user = user;
    this.location = location;
    this.zip = zip;
    this.state = state;
    this.city = city;
    this.street = street;
    this.comps = comps;
    this.formData = formData;
    this.lastUpdated = lastUpdated;
  }

  getHouseData(){
    return {
      hid: this.hid,
      zpid: this.zpid,
      user: this.user,
      location: this.location,
      zip: this.zip,
      state: this.state,
      city: this.city,
      street: this.street,
      comps: this.comps,
      formData: this.formData,
      lastUpdated: this.lastUpdated,
    }
  }
}

module.exports = House;