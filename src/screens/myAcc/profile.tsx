import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useIsFocused} from '@react-navigation/native';
import {logoutRequest} from '../../redux/userActions';
import {useDispatch, useSelector} from 'react-redux';
import {TouchableOpacity} from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';
import IonIcon from 'react-native-vector-icons/FontAwesome';

import CustomButton from '../../components/customButton/customButton';
import {HEIGHT, WIDTH, COLORS} from '../../constants/constants';

const Profile = (props: any) => {
  const {navigation} = props;

  const isFocused = useIsFocused();

  const location = useSelector((state: any) => state.location);
  const loading = useSelector((state: any) => state.loading);

  const user = auth().currentUser;

  const dispatch = useDispatch();
  
  const handleLogout = async () => {
    await dispatch(logoutRequest());
  };

  return (
    <View style={{backgroundColor: COLORS.lightPink, flex: 1}}>
      <View style={{height: '80%'}}>
        <View style={styles.helloContainer}>
          <Text style={styles.helloText}>
            Hello{' '}
            {user?.displayName
              ? user?.displayName
              : user?.email
              ? user?.email
              : user?.phoneNumber
              ? user.phoneNumber
              : 'info Not avaliable'}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.detailsContainer}
          onPress={() => navigation.navigate('MyDetails')}>
          <View style={{width: '80%'}}>
            <Text style={styles.detailsText}>My details</Text>
          </View>
          <View>
            <IonIcon name="angle-double-right" size={20} color="#000" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.detailsContainer}
          onPress={() => navigation.navigate('ChangePassword')}>
          <View style={{width: '80%'}}>
            <Text style={styles.detailsText}>Change Password</Text>
          </View>
          <View>
            <IonIcon name="angle-double-right" size={20} color="#000" />
          </View>
        </TouchableOpacity>
        <View style={{marginTop: HEIGHT / 3.3}}></View>

        {loading ? (
          <View style={styles.activityIndicator}>
            <ActivityIndicator size="small" color="#000" />
          </View>
        ) : (
          <TouchableOpacity
            style={styles.signoutContainer}
            onPress={handleLogout}>
            <View style={{width: '80%'}}>
              <Text style={styles.detailsText}>Sign out</Text>
            </View>
            <View>
              <IonIcon name="angle-double-right" size={20} color="#000" />
            </View>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.stickyBottom}>
        <View style={styles.stickyTextContainer}>
          <Text style={styles.stickyText}> Sale or Rent out property </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginBottom: 20,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View>
            <CustomButton
              title="Sell/Rent Property"
              onPress={() => navigation.navigate('SaleProperty0')}
              backgroundColor={COLORS.gray_circle}
              textColor={COLORS.black}
              paddingVertical={50}
              paddingHorizontal={27}
              marginVertical={HEIGHT / 15}
              marginHorizontal={WIDTH / 15}
              fontsize={16}
              fontWeight={900}
              borderColor={COLORS.black}
              // icon='../../assets/call-end.jpg'
            />
          </View>
          <View>
            <CustomButton
              title="Dashboard"
              onPress={() => navigation.navigate('Dashboard')}
              backgroundColor={COLORS.gray_circle}
              textColor={COLORS.black}
              paddingVertical={50}
              paddingHorizontal={9}
              marginVertical={HEIGHT / 15}
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

export default Profile;

const styles = StyleSheet.create({
  stickyBottom: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderWidth: 2,
    borderColor: '#BECDE2',
    padding: 2,
    paddingBottom: 3,
  },
  stickyText: {
    color: 'black',
    padding: 3,
    fontSize: 16,
    margin: 1,
  },
  stickyTextContainer: {
    marginTop: 5,
    marginLeft: 20,
  },
  helloContainer: {
    margin: 20,
  },
  helloText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  detailsContainer: {
    padding: 20,
    backgroundColor: COLORS.lightBlue,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'black',
    borderTopWidth: 0.6,
  },
  detailsText: {
    color: '#000',
  },
  signoutContainer: {
    padding: 20,
    backgroundColor: COLORS.lightBlue,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activityIndicator: {
    width: '100%',
    backgroundColor: COLORS.lightPink,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signoutText: {
    color: '#000',
  },
});
