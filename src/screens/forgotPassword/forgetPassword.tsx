import {View, Text, StyleSheet, Alert} from 'react-native';
import React, {useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {WIDTH, HEIGHT, COLORS} from '../../constants/constants';
import CustomTextInput from '../../components/customTextInput/customTextInput';
import CustomButton from '../../components/customButton/customButton';
import auth from '@react-native-firebase/auth';

const ForgetPassword = (props: any) => {
  const user = auth().currentUser;

  const {navigation} = props;

  const [code, setCode] = useState();
  const [validCode, setValidCode] = useState(true);
  const [password, setPassword] = useState('');
  const [passError, setPasswordError] = useState(false);
  const [confirmPassword, setConfirmPassowrd] = useState('');

  const isPasswordValid = (password: string) => {
    let Pattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    Pattern.test(password) ? setPasswordError(false) : setPasswordError(true);
  };

  const handlePassword = (text: string) => {
    setPassword(text);
    isPasswordValid(text);
  };

  const handleSubmit = () => {
    if (validCode) {
      if (!passError && password != '') {
        if (confirmPassword === password) {
          navigation.navigate('SignIn');
        }
      }
    } else {
      Alert.alert('Enter Valid code');
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: COLORS.lightPink}}>
      <View style={styles.textContainer}>
        <Text style={styles.textLabal}>
          {`please check mail sent to ${props.route.params.email}. Enter code shared over mail and then set your new password.`}
        </Text>
      </View>
      <View style={{marginTop: WIDTH / 20}}>
        <View style={styles.codeLabel}>
          <Text style={styles.codeLabelText}>Enter Code </Text>
          <Text style={{color: 'red'}}>*</Text>
        </View>
        <View style={styles.codeTextInput}>
          <CustomTextInput
            placeholder="Enter Code"
            errorText="Invalid Email. Enter Valid Email."
            viewHeight={undefined}
            value={code}
          />
        </View>
      </View>
      <View style={{}}>
        <View style={styles.newLabel}>
          <Text style={styles.newLabelText}>New Password </Text>
          <Text style={{color: 'red'}}>*</Text>
        </View>
        <View style={styles.newTextInput}>
          <CustomTextInput
            placeholder="New Password"
            error={passError}
            errorText="Invalid Email. Enter Valid Email."
            viewHeight={undefined}
            value={password}
            onChange={(text: string) => handlePassword(text)}
          />
        </View>
      </View>
      <View>
        <Text style={{marginHorizontal: WIDTH / 10}}>
          Minimum 8 Characters ✓ 1 Special Character ✓ 1 Uppercase ✓ 1 Number ✓
          No Spaces ✓
        </Text>
      </View>
      <View style={{}}>
        <View style={styles.confirmLabel}>
          <Text style={styles.confirmLabelText}>Confirm Password </Text>
          <Text style={{color: 'red'}}>*</Text>
        </View>
        <View style={styles.confirmTextInput}>
          <CustomTextInput
            placeholder="Confirm Password"
            errorText="Invalid Email. Enter Valid Email."
            viewHeight={undefined}
            value={confirmPassword}
            onChange={(text: string) => setConfirmPassowrd(text)}
          />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton
          title="Submit"
          onPress={handleSubmit}
          backgroundColor={COLORS.black}
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
  );
};

export default ForgetPassword;

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
    marginTop: HEIGHT <= 684 ? hp('7%') : hp('13%'),
  },
});
