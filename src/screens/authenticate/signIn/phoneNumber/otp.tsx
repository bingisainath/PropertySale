import {View, Text, StyleSheet, Button, Alert} from 'react-native';
import React, {useState, useEffect} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import RNPickerSelect from 'react-native-picker-select';

import CustomTextInput from '../../../../components/customTextInput/customTextInput';
import CustomButton from '../../../../components/customButton/customButton';
import {
  HEIGHT,
  WIDTH,
  COLORS,
  phoneNumberOptions,
} from '../../../../constants/constants';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {otpRequest} from '../../../../redux/userActions';

const Otp = (props: any) => {
  const {navigation} = props;

  const dispatch = useDispatch();

  const OTPCheck = useSelector((state: any) => state.otpSuccess);
  const user = useSelector((state: any) => state.user);

  const [selectedCountryCode, setSelectedCountryCode] = useState(
    phoneNumberOptions[0].value,
  );
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');

  const verifyOtp = async () => {
    try {
      dispatch(otpRequest(props?.route?.params?.user, otp));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (OTPCheck) {
      console.log('true');
    } else if (OTPCheck === '') {
      console.log('Enter is empty');
    } else if (OTPCheck == false) {
      Alert.alert('Enter Valid OTP');
    }
  }, [user,OTPCheck]);

  return (
    <>
      <View>
        <Text style={styles.textContainer}>
          Enter 6 Digit OTP sent to {phoneNumber}
        </Text>
      </View>
      <View style={{marginVertical: WIDTH / 20}}>
        <View style={styles.label}>
          <Text style={styles.labelText}>Enter OTP </Text>
          <Text style={{color: 'red'}}>*</Text>
        </View>
        <View style={styles.textInput}>
          <CustomTextInput
            placeholder="_ _ _ _ _ _"
            viewHeight={undefined}
            value={otp}
            onChange={(text: string) => setOtp(text)}
          />
        </View>
        {/* <View style={{marginLeft: 40}}>
          <Text style={{textDecorationLine: 'underline'}}>
            Resend OTP in : 45 sec{' '}
          </Text>
        </View> */}
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton
          title="Submit OTP"
          //@ts-ignore
          onPress={verifyOtp}
          backgroundColor={COLORS.btnColor}
          textColor={COLORS.white}
          paddingVertical={39}
          paddingHorizontal={9}
          marginVertical={HEIGHT / 20}
          marginHorizontal={WIDTH / 15}
          fontsize={16}
          fontWeight={900}
          borderColor={COLORS.black}
          // icon='../../assets/call-end.jpg'
        />
      </View>
    </>
  );
};

export default Otp;

const styles = StyleSheet.create({
  textContainer: {
    marginHorizontal: WIDTH / 10,
    marginTop: 30,
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
});
