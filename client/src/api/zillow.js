const Zillow = {
  async getZillow() {
    //   const res = await fetch("/api/workouts/" + id, {
    //     method: "PUT",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(data)
    //   });
    res = await fetch('GetSearchResults', {
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'zillow-com.p.rapidapi.com',
        'x-rapidapi-key': '26d05b2092msh8d14d2474ce38e0p120b64jsn0baeb38641f3',
      },
      body: {params = {
        address: encodeURIComponent(userHouse.street),
        citystatezip: encodeURIComponent(
          userHouse.city,
          userHouse.state,
          userHouse.zip
        ),
        rentzestimate: false,
      }},
    }).then((res) => console.log(res));

    const zillow = new Zillow(
      '26d05b2092msh8d14d2474ce38e0p120b64jsn0baeb38641f3'
    );

    const params = {
      address: encodeURIComponent(userHouse.street),
      citystatezip: encodeURIComponent(
        userHouse.city,
        userHouse.state,
        userHouse.zip
      ),
      rentzestimate: false,
    };

    zillow.get('GetSearchResults', params).then((results) => {
      console.log(results);
    });
    //   let res;
    //   try {
    //     res = await fetch("/api/workouts");
    //   } catch (err) {
    //     console.log(err)
    //   }
    //   const json = await res.json();

    //   return json[json.length - 1];
    // },
    // async addExercise(data) {
    //   const id = location.search.split("=")[1];
    //   const res = await fetch("/api/workouts/" + id, {
    //     method: "PUT",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(data)
    //   });

    //   const json = await res.json();

    //   return json;
    // },
    // async createWorkout(data = {}) {
    //   const res = await fetch("/api/workouts", {
    //     method: "POST",
    //     body: JSON.stringify(data),
    //     headers: { "Content-Type": "application/json" }
    //   });

    //   const json = await res.json();

    //   return json;
    // },
    // async getWorkoutsInRange() {
    //   const res = await fetch(`/api/workouts/range`);
    //   const json = await res.json();

    //   return json;
  },
};
