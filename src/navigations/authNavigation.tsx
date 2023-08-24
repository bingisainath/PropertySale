import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useSelector} from 'react-redux';

import Welcome from '../screens/welcome/welcome';
import EmailCheck from '../screens/authenticate/signIn/emailSignIn/emailCheck';
import PasswordCheck from '../screens/authenticate/signIn/emailSignIn/passwordCheck';
import EmailsignUp from '../screens/authenticate/signUp/emailSignUp/signUp';
import SignIn from '../screens/authenticate/loginSelection';
import ChangePassword from '../screens/forgotPassword/forgetPassword';
import SplashImage from '../screens/splash/splashImage';
import IntroSlider0 from '../screens/splash/introSlider0';
import IntroSlider1 from '../screens/splash/introSlider1';
import IntroSlider2 from '../screens/splash/introSlider2';
import EnablePermission from '../screens/splash/enablePermission';
import PhoneSignIn from '../screens/authenticate/signIn/phoneNumber/phoneSignIn';
import PhoneSignUp from '../screens/authenticate/signUp/phoneNumberSignUp/phoneSignUp';
import otp from '../screens/authenticate/signIn/phoneNumber/otp';


const Stack = createNativeStackNavigator();

const AuthNavigation = (props: any) => {
  const {navigation} = props;

  const test = useSelector((state: any) => state.user);

  const newLogin = useSelector((state: any) => state.newLogin);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={newLogin==false ? 'SplashImage' : 'Welcome'}>
      <Stack.Screen
        name={'SplashImage'}
        component={SplashImage}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={'IntroSlider0'}
        component={IntroSlider0}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={'IntroSlider1'}
        component={IntroSlider1}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={'IntroSlider2'}
        component={IntroSlider2}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={'EnablePermission'}
        component={EnablePermission}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={'Welcome'}
        component={Welcome}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={'SignIn'}
        component={SignIn}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={'EmailCheck'}
        component={EmailCheck}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={'PasswordCheck'}
        component={PasswordCheck}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name={'EmailsignUp'}
        component={EmailsignUp}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name={'ChangePassword'}
        component={ChangePassword}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name={'PhoneSignIn'}
        component={PhoneSignIn}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name={'PhoneSignUp'}
        component={PhoneSignUp}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name={'otp'}
        component={otp}
        options={{headerShown: true}}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigation;
