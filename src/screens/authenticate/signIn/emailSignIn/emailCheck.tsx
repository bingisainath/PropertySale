import {
  View,
  Text,
  StyleSheet,
  Button,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import {WIDTH, HEIGHT, COLORS} from '../../../../constants/constants';
import CustomTextInput from '../../../../components/customTextInput/customTextInput';
import CustomButton from '../../../../components/customButton/customButton';
import {emailRequest} from '../../../../redux/userActions';


const EmailCheck = (props: any) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);

  const isEmailValid = (email: string) => {
    let Pattern =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    Pattern.test(String(email).toLowerCase())
      ? setEmailError(false)
      : setEmailError(true);
  };

  const handleEmail = (text: string) => {
    setEmail(text);
    isEmailValid(text);
  };

  const handleSubmit = async () => {
    if (!emailError && email !== '') {
      await dispatch(emailRequest(email, 'dummy'));
    } else {
      Alert.alert('Enter Valid Email');
    }
  };

  const user = useSelector((state: any) => state.user);
  const loading = useSelector((state: any) => state.loading);

  useEffect(() => {
    if (user === '') {
      // console.log('====================================');
      console.log('user is empty');
      // console.log('====================================');
    } else if (user === 'auth/wrong-password') {
     
      //@ts-ignore
      navigation.navigate('PasswordCheck', {email: email});
    } else if (user === 'auth/user-not-found') {
     
      //@ts-ignore
      navigation.navigate('EmailsignUp', {email: email});
    } else if(user === 'auth/network-request-failed'){
        Alert.alert("Connect to internet")
    } else{
      console.log(user);
    }
  }, [user]);

  return (
    <View style={{flex: 1, backgroundColor: COLORS.lightBlue}}>
      <View>
        <Text style={styles.textContainer}>
          Let’s check if you have an account with us...
        </Text>
      </View>
      <View style={{marginVertical: WIDTH / 20}}>
        <View style={styles.label}>
          <Text style={styles.labelText}>Email </Text>
          <Text style={{color: 'red'}}>*</Text>
        </View>
        <View style={styles.textInput}>
          <CustomTextInput
            placeholder="Email"
            error={emailError}
            errorText="Invalid Email. Enter Valid Email."
            viewHeight={undefined}
            value={email}
            onChange={(text: string) => handleEmail(text)}
          />
        </View>
      </View>
      {loading ? (
        <View style={styles.activityIndicator}>
          <ActivityIndicator size="small" color="black" />
        </View>
      ) : (
        <View style={styles.buttonContainer}>
          <CustomButton
            title="Submit"
            onPress={handleSubmit}
            backgroundColor={COLORS.btnColor}
            textColor={COLORS.white}
            paddingVertical={46}
            paddingHorizontal={9}
            marginVertical={HEIGHT / 20}
            marginHorizontal={WIDTH / 15}
            fontsize={16}
            fontWeight={900}
            borderColor={COLORS.black}
          />
        </View>
      )}
    </View>
  );
};

export default EmailCheck;

const styles = StyleSheet.create({
  textContainer: {
    top: HEIGHT / 20,
    marginLeft: WIDTH / 9,
  },
  label: {
    marginLeft: WIDTH / 9,
    flexDirection: 'row',
    top: HEIGHT / 20,
    margin: 10,
  },
  labelText: {
    color: 'black',
  },
  textInput: {
    marginHorizontal: WIDTH / 20,
    marginVertical: HEIGHT / 20,
  },
  buttonContainer: {
    marginHorizontal: WIDTH / 20,
    marginTop: HEIGHT <= 684 ? hp('25%') : hp('45%'),
  },
  activityIndicator: {
    padding: 20,
    backgroundColor: COLORS.lightBlue,
    marginHorizontal: WIDTH / 10,
    marginTop: HEIGHT <= 684 ? hp('25%') : hp('47%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
