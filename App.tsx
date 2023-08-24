import {View, Text, StyleSheet} from 'react-native';
import React, {useState} from 'react';

import SignIn from './src/screens/authenticate/loginSelection';
// import EmailSignUp from './src/screens/authenticate/signUp/emailSignUp/signUp';
import Welcome from './src/screens/welcome/welcome';
import EmailCheck from './src/screens/authenticate/signIn/emailSignIn/emailCheck';
import PasswordCheck from './src/screens/authenticate/signIn/emailSignIn/passwordCheck';
import Navigation from './src/navigations';
import ChangePassword from './src/screens/forgotPassword/forgetPassword';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

//import {store, persistor} from './src/redux/store';
import PhoneSignIn from './src/screens/authenticate/signIn/phoneNumber/phoneSignIn';
import Dummy from './dummy';
import HomeScreen from './src/screens/home/homeScreen';

// import  store  from './src/reduxSaga/store';

// import store from './src/reduxSaga/store';
// import LoginScreen from './dummySaga/LoginScreen';
// import HomeScreen from './dummySaga/HomeScreen';
import store,{persistor} from './src/redux/store';

// import Filter from './src/screens/filter'

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <View style={{flex: 1}}>
          <Navigation />
        </View>
      </PersistGate>
    </Provider>

    // <View>
    //   <HomeScreen/>
    // </View>
  );
};

export default App;


// import { View, Text } from 'react-native'
// import React from 'react'
// import Apps from './dummySaga/App'

// const App = () => {
//   return (
//     <View>
//       <Apps/>
//     </View>
//   )
// }

// export default App