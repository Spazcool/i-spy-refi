import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { handleSubmit } from '../pages/HouseAdditions';

const AuthContext = React.createContext();

export const HouseProvider = ({ children }) => {
  const [isInput, setIsInput] = useState(false);
  const [userHouse, setUserHouse] = useState();

  useEffect(() => {
    checkSubmit();
  }, []);

  const checkSubmit = async () => {
    await handleSubmit((isInput) => {
      if (isInput !== null) {
        setUserHouse({ user: userHouse });
        setIsInput(true);
      } else {
        setIsInput(false);
      }
    });
  };

  const notInput = async () => {
    isInput === false, setIsInput(false);
    return <Redirect to='/HouseAdditions' />;
  };
  return (
    <AuthContext.Provider value={{ isInput, setIsInput, notInput }}>
      {{ children }}
    </AuthContext.Provider>
  );
};
