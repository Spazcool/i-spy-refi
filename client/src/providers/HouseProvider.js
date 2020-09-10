import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { handleSubmit } from '../pages/HouseAdditions';
import { firestore as db } from '../firebase';
import { DB } from '../api/firestore';
// export const HouseContext = React.createContext();

// export const HouseProvider = ({ children }) => {
//   const [house, setHouse] = useState(false);
//   const [userHouse, setUserHouse] = useState();

//   useEffect(() => {
//     checkUserHouse();
//   }, []);

//   const checkUserHouse = async () => {
//     await DB.getHouseByOwner((house) => {
//       if (house !== null) {
//         setUserHouse({ user: userHouse });
//         setHouse(true);
//       } else {
//         setHouse(false);
//       }
//     });
//   };

//   const noHouse = async () => {
//     house !== false, setHouse(false);
//     return <Redirect to='/HouseAdditions' />;
//   };
//   return (
//     <AuthContext.Provider value={{ house, setHouse, noHouse }}>
//       {{ children }}
//     </AuthContext.Provider>
//   );
// };
