import storage, {firebase} from '@react-native-firebase/storage';
import React from 'react';
import auth from '@react-native-firebase/auth';

export const upload = async (dataList: any) => {
  const user = auth().currentUser;

  try {

    // console.log('================= datalist ===================');
    // console.log(dataList);
    // console.log('====================================');

    dataList.forEach(async (element: any) => {
      storage()
        .ref(`/images/${user?.uid}/${element.name}`)
        .putFile(element.path)
        .on('state_changed');
    });
  } catch (e) {
    console.log(e);
  }
};
