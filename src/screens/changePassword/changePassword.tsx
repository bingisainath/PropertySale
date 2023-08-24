import {View, Text, StyleSheet, Alert} from 'react-native';
import React, {useState} from 'react';
import CustomTextInput from '../../components/customTextInput/customTextInput';
import CustomButton from '../../components/customButton/customButton';
import auth from '@react-native-firebase/auth';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {firebase} from '@react-native-firebase/auth';

import {
  HEIGHT,
  WIDTH,
  COLORS,
  phoneNumberOptions,
} from '../../constants/constants';

const ChangePassword = () => {
  const user = auth().currentUser;

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = () => {
    if (confirmPassword == newPassword) {
      const reauthenticate = (oldPassword: any) => {
        var user1 = firebase.auth().currentUser;
        //@ts-ignore
        var cred = firebase.auth.EmailAuthProvider.credential(
          //@ts-ignore
          user1?.email,
          oldPassword,
        );
        //@ts-ignore
        return user1.reauthenticateWithCredential(cred);
      };

      reauthenticate(oldPassword)
        .then(() => {
          var user1 = firebase.auth().currentUser;
          user1
            ?.updatePassword(newPassword)
            .then(() => {
              console.log('Password updated!');
              Alert.alert('Password updated!');
            })
            .catch((error: any) => {
              console.log('Error1', error);
              Alert.alert(error);
            });
        })
        .catch((error: any) => {
          console.log('Error2', error);
          Alert.alert('The old password is invalid');
        });
    } else {
      Alert.alert('please enter confirm and new password same');
    }
  };

  return (
    <View style={styles.main}>
      <View style={{marginLeft: 20, marginRight: 20}}>
        <View style={styles.textContainer}>
          <Text style={styles.textLabal}>
            {`your changing the password of following account ${
              user?.displayName
                ? user?.displayName
                : user?.email
                ? user?.email
                : user?.phoneNumber
                ? user.phoneNumber
                : 'info Not avaliable'
            }`}
          </Text>
        </View>
        <View style={{marginTop: 20}}>
          <Text style={{marginLeft: 20}}>Old Password *</Text>
          <View style={styles.textInput}>
            <CustomTextInput
              placeholder="Old Password"
              color={COLORS.lightPink}
              backgroundColor={COLORS.white}
              viewHeight={undefined}
              onChange={(text: any) => setOldPassword(text)}
            />
          </View>
          <Text style={{marginLeft: 20}}>New Password *</Text>
          <View style={styles.textInput}>
            <CustomTextInput
              placeholder="New Password"
              color={COLORS.lightPink}
              backgroundColor={COLORS.white}
              viewHeight={undefined}
              onChange={(text: any) => setNewPassword(text)}
            />
          </View>
          <Text style={{marginLeft: 20}}>Confirm Password *</Text>
          <View style={styles.textInput}>
            <CustomTextInput
              placeholder="Confirm Password"
              color={COLORS.lightPink}
              backgroundColor={COLORS.white}
              viewHeight={undefined}
              onChange={(text: any) => setConfirmPassword(text)}
            />
          </View>
          <View style={styles.buttonContainer}>
            <CustomButton
              title="Submit"
              onPress={handleSubmit}
              backgroundColor={COLORS.btnColor}
              textColor={COLORS.white}
              paddingVertical={36}
              paddingHorizontal={9}
              marginVertical={HEIGHT / 20}
              marginHorizontal={WIDTH / 15}
              fontsize={16}
              fontWeight={900}
              borderColor={COLORS.black}
              // icon='../../assets/call-end.jpg'
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: COLORS.lightBlue,
    textAlign: 'center',
  },
  textInput: {
    marginHorizontal: WIDTH / 600,
    backgroundColor: COLORS.lightBlue,
  },
  textContainer: {
    marginHorizontal: 20,
  },
  textLabal: {
    marginTop: HEIGHT / 20,
  },
  buttonContainer: {
    marginHorizontal: WIDTH / 20,
    marginTop: HEIGHT <= 684 ? hp('13%') : hp('20%'),
    // backgroundColor:'blue'
  },
});

export default ChangePassword;
