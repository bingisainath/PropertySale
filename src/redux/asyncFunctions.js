// userRedux.js

import {takeLatest, put, call} from 'redux-saga/effects';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage, {firebase} from '@react-native-firebase/storage';
import {upload} from '../components/uploadMedia/upload';

//Function to check existance of user email
export const emailCheck = async action => {
  try {
    return await auth()
      .signInWithEmailAndPassword(action.email, 'dummy')
      .then(res => true)
      .catch(err => err.code);
  } catch (e) {
    console.log(e);
  }
};

//Authentication based on password
export const passwordCheck = async action => {
  try {
    return await auth()
      .signInWithEmailAndPassword(action.email, action.password)
      .then(res => {
        const data = {res: res, flag: true};
        console.log('email res: ', data);
        console.log('email res: ', data);
        return data;
      })
      .catch(err => {
        const data = {res: err.code, flag: false};
        console.log('pass err', data);
        console.log('pass err', data);
        return data;
      });
  } catch (e) {
    console.log("Error:",e);
  }
};

//Function to check existance of user phone number
export const phoneCheck = async action => {
  try {
    const phone = '+91' + action;
    console.log(phone);
    const confirmation = await auth()
      .signInWithPhoneNumber(phone)
      .then(res => res)
      .catch(err => console.log("err",e));
    return {data: confirmation, confirm: confirmation.confirm};
  } catch (e) {
    console.log("OTP Error :",e);
  }
};

//Validating using OTP
export const otpCheck = async action => {
  try {
    //@ts-ignore
    const res = await action.confirm.res.data.confirm(action.otp);

    return res;
  } catch (e) {
    console.log(e);
    return e.code;
  }
};

//to update user name
export const updateName = async action => {
  const user = await auth().currentUser;
  await user.updateProfile({displayName: action.name});
};

//Creating user account
export const signUp = async action => {
  try {
    return await auth()
      .createUserWithEmailAndPassword(action.email, action.password)
      .then(res => res)
      .catch(err => err.code);
  } catch (e) {
    console.log(e);
  }
};

//Retreiving home data
export const homeData = async action => {
  try {
    let homeRentData;
    let homeBuyData;
    let finalHomeRentData = [];
    let finalHomeBuyData = [];
    if (action.location == '' || action.location == undefined) {
      const locationData = [
        'Mumbai',
        'Mysore',
        // 'Kochi',
        // 'Allapuzha',
        'Indore',
        'Bhopal',
        'Pune',
        'Hyderabad',
        'Chennai',
        'Bangalore',
        'Coimbatore',
        // 'Nalgonda',
      ];
      homeRentData = await firestore()
        .collection('AllProperties')
        .where('city', 'in', locationData)
        .where('rent', '==', 'rent')
        .get();
      homeBuyData = await firestore()
        .collection('AllProperties')
        .where('city', 'in', locationData)
        .where('rent', '==', 'sale')
        .get();
      homeRentData.forEach(documentSnapshot => {
        finalHomeRentData.push(documentSnapshot.data());
      });
      homeBuyData.forEach(documentSnapshot => {
        finalHomeBuyData.push(documentSnapshot.data());
      });
    } else {
      homeRentData = await firestore()
        .collection('AllProperties')
        .where('rent', '==', 'rent')
        .where('city', 'in', [action.location])
        .get();
      homeBuyData = await firestore()
        .collection('AllProperties')
        .where('rent', '==', 'sale')
        .where('city', 'in', [action.location])
        .get();
      homeRentData.forEach(documentSnapshot => {
        finalHomeRentData.push(documentSnapshot.data());
      });
      homeBuyData.forEach(documentSnapshot => {
        finalHomeBuyData.push(documentSnapshot.data());
      });

      // console.log(homeBuyData);
    }

    return [finalHomeRentData, finalHomeBuyData];
  } catch (e) {
    console.log(e);
    return e;
  }
};

//retreiving filtered data
export const searchResultsData = async action => {
  try {
    const AllProperties = await firestore().collection('AllProperties').get();
    const AllProperties1 = [];
    AllProperties.forEach(documentSnapshot => {
      AllProperties1.push(documentSnapshot.data());
    });

    let AllPropertiesFilteredData = [];

    if (action.data[0][0] == '' || action.data[0][0] == undefined) {
      console.log(action.data[0][0]);
      const locationData = [
        'Mumbai',
        'Mysore',
        // 'Kochi',
        // 'Allapuzha',
        'Indore',
        'Bhopal',
        'Pune',
        'Hyderabad',
        'Chennai',
        'Bangalore',
        'Coimbatore',
        // 'Nalgonda',
      ];

      const locationFilteredArray = await AllProperties1.filter(element =>
        locationData.includes(element.city),
      );

      AllPropertiesFilteredData = locationFilteredArray.filter(obj => {
        const price = parseInt(obj.price);
        const sqFeet = parseInt(obj.sqFeet);
        return (
          action.data[1].includes(obj.propertyCondition) &&
          action.data[2].includes(obj.numberOfRooms) &&
          price >= action.data[3][0] &&
          price <= action.data[3][1] &&
          sqFeet >= action.data[4][0] &&
          sqFeet <= action.data[4][1] &&
          action.data[5].includes(obj.propertyType)
        );
      });

      console.log("All Property Data ",AllPropertiesFilteredData);

    } else {

      AllPropertiesFilteredData = AllProperties1.filter(obj => {
        const price = parseInt(obj.price);
        const sqFeet = parseInt(obj.sqFeet);
        return (
          action.data[0].includes(obj.city) &&
          action.data[1].includes(obj.propertyCondition) &&
          action.data[2].includes(obj.numberOfRooms) &&
          price >= action.data[3][0] &&
          price <= action.data[3][1] &&
          sqFeet >= action.data[4][0] &&
          sqFeet <= action.data[4][1] &&
          action.data[5].includes(obj.propertyType)
        );
      });
    }
    return AllPropertiesFilteredData;
  } catch (e) {
    console.log(e);
    return e;
  }
};

//pushing data into cloud(firebase)
export const wishList = async action => {
  try {
    await firestore()
      .collection('users')
      .doc(action.id)
      .collection('Wishlist')
      .doc(action.data.propertyName)
      .set(action.data)
      .then(res => true)
      .catch(err => false);
  } catch (e) {
    console.log(e);
    return e;
  }
};

//pushing data into cloud(firebase)
export const postProperty = async action => {
  try {
    let arr = [];
    try {
      for (const element of action.imgData) {
        const reference = storage().ref(
          `/images/${action.user.uid}/${action.Data.propertyName}/${element.name}`,
        );
        const task = await reference.putFile(element.path);
        const downloadURL = await reference.getDownloadURL();
        console.log('download url = ', downloadURL);
        arr.push(downloadURL);
      }
    } catch (e) {
      console.log(e);
    }
    const finalData = {...action.Data, imageData: [...arr]};

    await firestore()
      .collection('users')
      .doc(action.user.uid)
      .collection('PostedProperty')
      .doc(action.Data.propertyName)
      .set(finalData)
      .then(res => console.log(res))
      .catch(err => console.log(err));

    await firestore()
      .collection('AllProperties')
      .doc(action.Data.propertyName)
      .set(finalData)
      .then(res => console.log(res))
      .catch(err => console.log(err));
  } catch (e) {
    console.log(e);
    return e;
  }
};

export const editSaleProperty = async action => {
  try {
    await firestore()
      .collection('users')
      .doc(action.user.uid)
      .collection('PostedProperty')
      .doc(action.Data.propertyName)
      .update(action.Data)
      .then(res => console.log(res))
      .catch(err => console.log(err));

    await firestore()
      .collection('AllProperties')
      .doc(action.Data.propertyName)
      .update(action.Data)
      .then(res => console.log(res))
      .catch(err => console.log(err));
  } catch (e) {
    console.log(e);
    return e;
  }
};
//Retreiving wishlist data
export const getWishList = async action => {
  try {
    const wishlistData = await firestore()
      .collection('users')
      .doc(action.id)
      .collection('Wishlist')
      .get();
    let finalWishlistData = [];
    wishlistData.forEach(documentSnapshot => {
      finalWishlistData.push(documentSnapshot.data());
    });
    return finalWishlistData;
  } catch (e) {
    console.log(e);
    return e;
  }
};

//function for dashboard
export const dashboard = async action => {
  try {
    const wishlistData = await firestore()
      .collection('users')
      .doc(action.id)
      .collection('PostedProperty')
      .get();
    let dashboardData = [];
    wishlistData.forEach(documentSnapshot => {
      dashboardData.push(documentSnapshot.data());
    });
    return dashboardData;
  } catch (e) {
    console.log(e);
    return e;
  }
};

export const homeFilter = async action => {
  try {
    const finalHomeBuyData = [];

    if (action.location == '' || action.location == undefined) {
      const locationdata = [
        'Mumbai',
        'Mysore',
        // 'Kochi',
        // 'Allapuzha',
        'Indore',
        'Bhopal',
        'Pune',
        'Hyderabad',
        'Chennai',
        'Bangalore',
        'Coimbatore',
        // 'Nalgonda',
      ];
      const homeRentData = await firestore()
        .collection('AllProperties')
        .where('city', 'in', locationdata)
        .where(action.type, '==', action.data)
        .get();

      await homeRentData.forEach(documentSnapshot => {
        finalHomeBuyData.push(documentSnapshot.data());
      });
    } else {

      console.log(action.location);
      const homeRentData = await firestore()
        .collection('AllProperties')
        .where('city', '==', action.location)
        .where(action.type, '==', action.data)
        .get();

      homeRentData.forEach(documentSnapshot => {
        finalHomeBuyData.push(documentSnapshot.data());
      });
    }

    return finalHomeBuyData;
  } catch (e) {
    console.log(e);
    return e;
  }
};

//function to logout application
export const logout = async () => {
  try {
    await auth().signOut();
    return 'success';
  } catch (e) {
    console.log(e);
    return 'error';
  }
};
