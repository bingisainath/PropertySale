import {View, Text, StyleSheet, Button, ActivityIndicator} from 'react-native';
import React, {useState, useEffect} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import RNPickerSelect from 'react-native-picker-select';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';

import CustomTextInput from '../../../../components/customTextInput/customTextInput';
import CustomButton from '../../../../components/customButton/customButton';
import {
  HEIGHT,
  WIDTH,
  COLORS,
  phoneNumberOptions,
} from '../../../../constants/constants';
import {phoneRequest} from '../../../../redux/userActions';

const PhoneSignIn = (props: any) => {
  const {navigation} = props;

  const dispatch = useDispatch();
  const loading = useSelector((state: any) => state.loading);

  const [selectedCountryCode, setSelectedCountryCode] = useState(
    phoneNumberOptions[0].value,
  );
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');

  const handleCountryCodeChange = (value: any) => {
    // setSelectedCountryCode(value);
  };

  const [validNum, setValidNum] = useState(true);

  const signInWithPhoneNumber = async () => {
    const reg = /^[0-9]{10}$/;

    reg.test(phoneNumber) ? setValidNum(true) : setValidNum(false);

    if (validNum && phoneNumber != '' ) {
      dispatch(phoneRequest(phoneNumber));
    } else {
      setValidNum(false)
    }
  };

  const user = useSelector((state: any) => state.phoneNumber);

  useEffect(() => {
    if (user?.flag == false) {
      navigation.navigate('PhoneSignUp', {
        phoneNumber: phoneNumber,
        user: user,
      });
    } else if (user?.flag == true) {
      navigation.navigate('otp', {phoneNumber: phoneNumber, user: user});
    } else {
      console.log(user.flag);
    }
  }, [user]);

  return (
    <View style={{flex: 1, backgroundColor: COLORS.lightBlue}}>
      <>
        <View style={styles.textContainer}>
          <Text style={styles.textLabal}>Enter your phone number below</Text>
        </View>
        <View style={styles.codeLabel}>
          <Text style={styles.codeLabelText}>Mobile </Text>
          <Text style={{color: COLORS.status_red}}>*</Text>
        </View>
        <View style={{marginTop: WIDTH / 20}}>
          {validNum == true ? (
            <View>
              <View style={{flexDirection: 'row'}}>
                <View style={{width: 120}}>
                  <RNPickerSelect
                    onValueChange={handleCountryCodeChange}
                    items={phoneNumberOptions}
                    value={selectedCountryCode}
                    style={{
                      inputAndroid: {
                        fontSize: 16,
                        width: '90%',
                        height: 32,
                        backgroundColor: 'lightgray',
                        marginTop: 10,
                        marginHorizontal: 20,
                      },
                    }}
                  />
                </View>
                <View style={[styles.codeTextInput, {}]}>
                  <CustomTextInput
                    placeholder="Number"
                    errorText="Invalid Number. Enter Valid Number."
                    viewHeight={undefined}
                    value={phoneNumber}
                    onChange={(text: string) => setPhoneNumber(text)}
                  />
                </View>
              </View>
            </View>
          ) : (
            <View>
              <View style={{flexDirection: 'row'}}>
                <View style={{width: 120}}>
                  <RNPickerSelect
                    onValueChange={handleCountryCodeChange}
                    items={phoneNumberOptions}
                    value={selectedCountryCode}
                    style={{
                      inputAndroid: {
                        fontSize: 16,
                        width: '90%',
                        height: 32,
                        backgroundColor: 'lightgray',
                        marginTop: 10,
                        marginHorizontal: 20,
                      },
                    }}
                  />
                </View>
                <View style={[styles.codeTextInput, {}]}>
                  <CustomTextInput
                    placeholder="Number"
                    errorText="Invalid Number. Enter Valid Number."
                    viewHeight={undefined}
                    value={phoneNumber}
                    onChange={(text: string) => setPhoneNumber(text)}
                  />
                </View>
              </View>
              <View style={{marginLeft: 40, marginVertical: 10}}>
                <Text style={{color: 'red', fontWeight: 'bold'}}>
                  Entered Valid PhoneNumber
                </Text>
              </View>
            </View>
          )}
          <View style={{marginLeft: 40, marginTop: 10}}>
            <Text>We will send you an OTP for verification</Text>
          </View>
        </View>
        {loading ? (
        <View>
          <View style={styles.activityIndicator}>
            <ActivityIndicator size="small" color="#000" />
          </View>
        </View>
      ) : (
        <View style={styles.buttonContainer}>
          <CustomButton
            title="Submit"
            onPress={signInWithPhoneNumber}
            backgroundColor={COLORS.btnColor}
            textColor={COLORS.white}
            paddingVertical={39}
            paddingHorizontal={9}
            marginVertical={HEIGHT / 20}
            marginHorizontal={WIDTH / 15}
            fontsize={16}
            fontWeight={900}
            borderColor={COLORS.black}
          />
        </View>
      )}
      </>
    </View>
  );
};

export default PhoneSignIn;

const styles = StyleSheet.create({
  textContainer: {
    marginHorizontal: WIDTH / 10,
  },
  textLabal: {
    top: HEIGHT / 20,
    fontSize: 13,
    fontWeight: '400',
    color: '#222222',
  },
  codeLabel: {
    marginLeft: WIDTH / 15,
    flexDirection: 'row',
    top: HEIGHT / 20,
    marginTop: 30,
    marginBottom: 20,
  },
  codeLabelText: {
    color: 'black',
  },
  codeTextInput: {
    width: '65%',
  },
  NameInput: {
    margin: 10,
  },
  newLabel: {
    marginLeft: WIDTH / 9,
    flexDirection: 'row',
    top: HEIGHT / 50,
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
    marginTop: HEIGHT <= 684 ? hp('25%') : hp('40%'),
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
    marginTop: HEIGHT / 20,
  },
  activityIndicator: {
    padding: 20,
    backgroundColor: COLORS.lightBlue,
    marginHorizontal: WIDTH / 10,
    marginTop: HEIGHT <= 684 ? hp('25%') : hp('35%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
