import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Button,
} from 'react-native';
import React, {useEffect} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import auth from '@react-native-firebase/auth';
import {useDispatch, useSelector} from 'react-redux';

import {WIDTH, HEIGHT, COLORS} from '../../constants/constants';
import CustomButton from '../../components/customButton/customButton';
import {useIsFocused} from '@react-navigation/native';
import {homeDataRequest} from '../../redux/userActions';

import Rent from './rent';
import Buy from './buy';

const Tab = createMaterialTopTabNavigator();

export default function HomeScreen(props: any) {
  const user = auth().currentUser;
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  const location = useSelector((state: any) => state.location);

  useEffect(() => {
    dispatch(homeDataRequest(location, user));
  }, [location]);

  return (
    <View style={{flex: 1, backgroundColor: COLORS.lightBlue}}>
      <ScrollView>
        <View style={{height: HEIGHT - 650}}>
          <View>
            <View>
              <Text style={styles.helloText}>
                Hello{' '}
                {user?.displayName
                  ? user?.displayName
                  : user?.email
                  ? user?.email
                  : user?.phoneNumber
                  ? user.phoneNumber
                  : 'info Not avaliable'}{' '}
                !
              </Text>
            </View>
            <View>
              <Text style={styles.leadText}>We’ll lead you the way home !</Text>
            </View>
          </View>
        </View>
        <View style={{height: HEIGHT - 110}}>
          <Tab.Navigator
            screenOptions={{
              tabBarActiveTintColor: 'black',
              tabBarIndicatorStyle: {
                backgroundColor: 'black',
              },
              tabBarStyle: {
                backgroundColor: COLORS.lightPink,
              },
              tabBarLabelStyle: {
                fontWeight: 'bold',
              },
            }}>
            <Tab.Screen name="rent" component={Rent} />
            <Tab.Screen name="Buy" component={Buy} />
          </Tab.Navigator>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#FF0000',
  },
  headerTitle: {
    color: '#FFFFFF',
  },
  helloText: {
    fontSize: 20,
    top: 10,
    left: 20,
    color: '#000',
  },
  leadText: {
    fontSize: 32,
    top: 20,
    left: 20,
    color: '#3e3f40',
  },
  finalText: {
    fontSize: 12,
    top: 30,
    left: 20,
    bottom: 30,
    marginBottom: 20,
    color: '#3e3f40',
  },
  recentRentContainer: {
    marginTop: 15,
    marginBottom: 15,
    marginLeft: 20,
  },
  recentRentText: {
    color: COLORS.black,
    fontWeight: 'bold',
  },
  exploreRentContainer: {
    marginTop: 15,
    marginBottom: 15,
    marginLeft: 20,
  },
  exploreRentText: {
    color: COLORS.black,
    fontWeight: 'bold',
  },
  BHKRentContainer: {
    marginTop: 15,
    marginBottom: 10,
    marginLeft: 20,
  },
  BHKRentText: {
    color: COLORS.black,
    fontWeight: 'bold',
  },
  buttonContainer: {},
});
