import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {useSelector} from 'react-redux';

import AuthNavigation from './authNavigation';
import AppNavigation from './appNavigation';
import auth from '@react-native-firebase/auth';


const index = (props: any) => {

  const isLoggedIn = useSelector((state: any) => state.user);

  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    setIsUserLoggedIn(isLoggedIn?.isloggedIn);

  }, [isLoggedIn]);

  return (
    <NavigationContainer independent={true}>
      {isUserLoggedIn ? <AppNavigation /> : <AuthNavigation />}
    </NavigationContainer>
  );
};

export default index;
