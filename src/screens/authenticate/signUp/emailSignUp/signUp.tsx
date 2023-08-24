import {View, Text, StyleSheet, Alert, ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import CustomTextInput from '../../../../components/customTextInput/customTextInput';
import CustomButton from '../../../../components/customButton/customButton';
import {HEIGHT, WIDTH, COLORS} from '../../../../constants/constants';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';

import {signUpRequest} from '../../../../redux/userActions';

const EmailsignUp = (props: any) => {
  const navigation = useNavigation();

  const loading = useSelector((state: any) => state.loading);

  const [email, setEmail] = useState(props.route.params.email);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [nameError, setNameError] = useState(false);
  const [Passerror, setPassError] = useState(false);

  const dispatch = useDispatch();

  const submitOnPress = async () => {
    if (name != '') {
      if (
        isLengthValid &&
        hasSpecialChar &&
        hasNumber &&
        hasUppercase &&
        hasLowercase
      ) {
        await dispatch(signUpRequest(email, password, name));
        // console.log('success');
      } else {
        Alert.alert('Enter Valid Password');
      }
    } else {
      Alert.alert('Enter Valid Name');
    }
  };

  useEffect(() => {
    console.log('================= loading ===================');
    console.log(loading);
    console.log('====================================');
  }, [loading]);

  const isLengthValid = password.length >= 8;
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);

  const getIndicatorColor = (isValid: any) => (isValid ? 'green' : 'red');

  return (
    <View style={{flex: 1, backgroundColor: COLORS.lightBlue}}>
      <View style={styles.textContainer}>
        <Text style={styles.textLabal}>
          {`Looks like you don’t have an account using ${email}. Let’s create one!`}
        </Text>
      </View>
      <View style={{marginTop: WIDTH / 20}}>
        <View style={styles.codeLabel}>
          <Text style={styles.codeLabelText}>Your Name </Text>
          <Text style={{color: 'red'}}>*</Text>
        </View>
        <View style={styles.codeTextInput}>
          <CustomTextInput
            placeholder="Your Name"
            error={nameError}
            errorText="Invalid Name. Enter Valid Name."
            viewHeight={undefined}
            value={name}
            onChange={(text: string) => setName(text)}
          />
        </View>
      </View>
      <View style={{}}>
        <View style={styles.newLabel}>
          <Text style={styles.newLabelText}>Password </Text>
          <Text style={{color: 'red'}}>*</Text>
        </View>
        <View style={styles.newTextInput}>
          <CustomTextInput
            placeholder="Password"
            error={Passerror}
            errorText="Invalid Password. Enter Valid Password."
            viewHeight={undefined}
            value={password}
            onChange={(text: string) => setPassword(text)}
          />
        </View>
        <View>
          <View style={styles.requirementsContainer}>
            <Text style={styles.requirement}>
              Minimum 8 characters:{' '}
              <Text style={{color: getIndicatorColor(isLengthValid)}}>
                {isLengthValid ? '✓' : '✕'}
              </Text>
            </Text>
            <Text style={styles.requirement}>
              One special character:{' '}
              <Text style={{color: getIndicatorColor(hasSpecialChar)}}>
                {hasSpecialChar ? '✓' : '✕'}
              </Text>
            </Text>
            <Text style={styles.requirement}>
              One number:{' '}
              <Text style={{color: getIndicatorColor(hasNumber)}}>
                {hasNumber ? '✓' : '✕'}
              </Text>
            </Text>
            <Text style={styles.requirement}>
              One uppercase letter:{' '}
              <Text style={{color: getIndicatorColor(hasUppercase)}}>
                {hasUppercase ? '✓' : '✕'}
              </Text>
            </Text>
            <Text style={styles.requirement}>
              One lowercase letter:{' '}
              <Text style={{color: getIndicatorColor(hasLowercase)}}>
                {hasLowercase ? '✓' : '✕'}
              </Text>
            </Text>
          </View>
        </View>
      </View>
      {loading ? (
        <View style={styles.activityIndicator}>
          <ActivityIndicator size="small" color="#fff" />
        </View>
      ) : (
        <View style={styles.buttonContainer}>
          <CustomButton
            title="Submit"
            onPress={submitOnPress}
            backgroundColor={COLORS.btnColor}
            textColor={COLORS.white}
            paddingVertical={40}
            paddingHorizontal={9}
            marginVertical={HEIGHT / 2}
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

export default EmailsignUp;

const styles = StyleSheet.create({
  textContainer: {
    marginHorizontal: WIDTH / 10,
  },
  textLabal: {
    top: HEIGHT / 20,
  },
  codeLabel: {
    marginLeft: WIDTH / 9,
    flexDirection: 'row',
    top: HEIGHT / 20,
    marginTop: 10,
  },
  codeLabelText: {
    color: 'black',
  },
  codeTextInput: {
    marginHorizontal: WIDTH / 20,
    marginTop: HEIGHT / 20,
  },
  newLabel: {
    marginLeft: WIDTH / 9,
    flexDirection: 'row',
    top: HEIGHT / 50,
    // margin: 10,
  },
  newLabelText: {
    color: 'black',
  },
  newTextInput: {
    marginHorizontal: WIDTH / 20,
    marginTop: HEIGHT / 50,
  },
  confirmLabel: {
    marginLeft: WIDTH / 9,
    flexDirection: 'row',
    top: HEIGHT / 50,
    // margin: 10,
  },
  confirmLabelText: {
    color: 'black',
  },
  confirmTextInput: {
    marginHorizontal: WIDTH / 20,
    marginTop: HEIGHT / 50,
  },
  buttonContainer: {
    marginHorizontal: WIDTH / 20,
    marginTop: HEIGHT <= 684 ? hp('10%') : hp('20%'),
    // backgroundColor:'blue'
  },
  requirementsContainer: {
    marginTop: 5,
    marginLeft: 60,
  },
  requirement: {
    marginBottom: 5,
  },
  activityIndicator: {
    padding: 20,
    backgroundColor: COLORS.btnColor,
    marginHorizontal: WIDTH / 10,
    marginTop: HEIGHT <= 684 ? hp('25%') : hp('20%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
