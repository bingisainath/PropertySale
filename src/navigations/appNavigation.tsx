import {View, Text, Button, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {Dropdown} from 'react-native-element-dropdown';
import {useDispatch, useSelector} from 'react-redux';
import auth from '@react-native-firebase/auth';

import IonIcon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeScreen from '../screens/home/homeScreen';
import Wishlist from '../screens/wishList/wishlist';
import Search from '../screens/search/search';
import Details from '../screens/details/details';
import SearchResults from '../screens/searchResults/searchResults';
import SaleProperty from '../screens/saleProperty/saleProperty0';
import SaleProperty1 from '../screens/saleProperty/saleProperty1';
import SaleProperty2 from '../screens/saleProperty/saleProperty2';
import Profile from '../screens/myAcc/profile';
import ChangePassword from '../screens/changePassword/changePassword';
import ProfileExtra from '../screens/myAcc/ProfileExtra';
import Dashboard from '../screens/Dashboard/Dashboard';
import ViewScreen from '../screens/Dashboard/view';
import EditSaleProperty from '../screens/Dashboard/EditProperty.tsx/editSaleProperty0';
import EditSaleProperty1 from '../screens/Dashboard/EditProperty.tsx/editSaleProperty1';
import EditSaleProperty2 from '../screens/Dashboard/EditProperty.tsx/editSaleProperty2';
import homeScreenFilter from '../screens/home/homeScreenFilter';

import {WIDTH} from '../constants/constants';
import {
  locationRequest,
  homeDataRequest,
  getWishListDataRequest,
  getDashboardRequest,
} from '../../src/redux/userActions';

const AppNavigation = () => {
  const user = auth().currentUser;

  const Tab = createBottomTabNavigator();

  const HomeStack = createStackNavigator();
  const ProfileStack = createStackNavigator();
  const SearchStack = createStackNavigator();
  const WishlistStack = createStackNavigator();

  const data = [
    {label: 'Bangalore', value: 'Bangalore'},
    {label: 'Mysore', value: 'Mysore'},
    {label: 'Kochi', value: 'Kochi'},
    {label: 'Allapuzha', value: 'Allapuzha'},
    {label: 'Indore', value: 'Indore'},
    {label: 'Bhopal', value: 'Bhopal'},
    {label: 'Mumbai', value: 'Mumbai'},
    {label: 'Pune', value: 'Pune'},
    {label: 'Chennai', value: 'Chennai'},
    {label: 'Coimbatore', value: 'Coimbatore'},
    {label: 'Hyderabad', value: 'Hyderabad'},
    {label: 'Nalgonda', value: 'Nalgonda'},
  ];

  const [value, setValue] = useState(null);

  const dispatch = useDispatch();

  const handleLocation = (data: any) => {
    dispatch(locationRequest(data));
  };

  const allCities = [
    'Mumbai',
    'Mysore',
    'Kochi',
    'Allapuzha',
    'Indore',
    'Bhopal',
    'Pune',
    'Hyderabad',
    'Chennai',
    'Bangalore',
    'Coimbatore',
    'Nalgonda',
  ];

  const location = useSelector((state: any) => state.location);

  useEffect(() => {
    // if(location != undefined)
    dispatch(homeDataRequest(location, user));
    dispatch(getWishListDataRequest(user?.uid));
    dispatch(getDashboardRequest(user?.uid));
  }, [location]);

  function HomeStackScreen() {
    //set redux state

    return (
      <HomeStack.Navigator>
        <HomeStack.Screen
          name="HomeStackScreen"
          component={HomeScreen}
          options={{
            headerTitle: () => (
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={{fontSize: 18}}>My App</Text>
              </View>
            ),
            headerRight: () => (
              <TouchableOpacity style={{marginRight: 10}}>
                <MaterialIcon name="bell-outline" size={25} color="#000" />
              </TouchableOpacity>
            ),
            headerLeft: () => (
              <TouchableOpacity
                style={{
                  marginLeft: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <IonIcon name="location-outline" size={20} color="#000" />
                <View />
                <Dropdown
                  style={styles.dropdown}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  iconStyle={styles.iconStyle}
                  // containerStyle={{alignItems:'center'}}
                  data={data}
                  search
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder={location ? location : 'All cities'}
                  searchPlaceholder="Search..."
                  value={value}
                  onChange={(item: any) => {
                    handleLocation(item.value);
                  }}
                />
              </TouchableOpacity>
            ),
          }}
        />
        <HomeStack.Screen name="Details" component={Details} />
        <HomeStack.Screen
          name="homeScreenFilter"
          component={homeScreenFilter}
        />
        <SearchStack.Screen name="SearchResults" component={SearchResults} />
      </HomeStack.Navigator>
    );
  }

  function SearchStackScreen() {
    return (
      <SearchStack.Navigator>
        <SearchStack.Screen
          name="searchScreen"
          component={Search}
          options={{
            headerTitle: () => (
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={{fontSize: 18}}>My App</Text>
              </View>
            ),
            headerLeft: () => (
              <TouchableOpacity
                style={{
                  marginLeft: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <IonIcon name="location-outline" size={20} color="#000" />
                <View />
                <Dropdown
                  style={styles.dropdown}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  iconStyle={styles.iconStyle}
                  data={data}
                  search
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder={location ? location : 'All Cities'}
                  searchPlaceholder="Search..."
                  value={value}
                  onChange={(item: any) => {
                    handleLocation(item.value);
                  }}
                />
              </TouchableOpacity>
            ),
          }}
        />
        <SearchStack.Screen name="SearchResults" component={SearchResults} />
        <SearchStack.Screen name="Details" component={Details} />
      </SearchStack.Navigator>
    );
  }

  function WishlistStackScreen() {
    return (
      <WishlistStack.Navigator>
        <WishlistStack.Screen
          name="WishlistScreen"
          component={Wishlist}
          options={{
            headerTitle: () => (
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={{fontSize: 18}}>My App</Text>
              </View>
            ),
            headerLeft: () => (
              <TouchableOpacity
                style={{
                  marginLeft: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <IonIcon name="location-outline" size={20} color="#000" />
                <View />
                <Dropdown
                  style={styles.dropdown}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  iconStyle={styles.iconStyle}
                  // containerStyle={{alignItems:'center'}}
                  data={data}
                  search
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder={location ? location : 'All Cities'}
                  searchPlaceholder="Search..."
                  value={value}
                  onChange={(item: any) => {
                    handleLocation(item.value);
                  }}
                />
              </TouchableOpacity>
            ),
          }}
        />
        <WishlistStack.Screen name="Details" component={Details} />
      </WishlistStack.Navigator>
    );
  }

  function ProfileStackScreen() {
    return (
      <ProfileStack.Navigator>
        <ProfileStack.Screen
          name="ProfileScreen"
          component={Profile}
          options={{
            headerTitle: () => (
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={{fontSize: 18}}>My App</Text>
              </View>
            ),
            headerLeft: () => (
              <TouchableOpacity
                style={{
                  marginLeft: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <IonIcon name="location-outline" size={20} color="#000" />
                <Dropdown
                  style={styles.dropdown}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  iconStyle={styles.iconStyle}
                  data={data}
                  search
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder={location ? location : 'All Cities'}
                  searchPlaceholder="Search..."
                  value={value}
                  onChange={(item: any) => {
                    handleLocation(item.value);
                  }}
                />
              </TouchableOpacity>
            ),
          }}
        />
        <SearchStack.Screen name="SaleProperty0" component={SaleProperty} />
        <SearchStack.Screen name="SaleProperty1" component={SaleProperty1} />
        <SearchStack.Screen name="SaleProperty2" component={SaleProperty2} />
        <SearchStack.Screen name="ChangePassword" component={ChangePassword} />
        <SearchStack.Screen name="MyDetails" component={ProfileExtra} />
        <SearchStack.Screen name="Dashboard" component={Dashboard} />
        <SearchStack.Screen name="ViewScreen" component={ViewScreen} />
        <SearchStack.Screen
          name="EditSaleProperty0"
          component={EditSaleProperty}
        />
        <SearchStack.Screen
          name="EditSaleProperty1"
          component={EditSaleProperty1}
        />
        <SearchStack.Screen
          name="EditSaleProperty2"
          component={EditSaleProperty2}
        />
      </ProfileStack.Navigator>
    );
  }
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator>
        <Tab.Screen
          name="HomeScreen"
          options={{
            headerShown: false,
            tabBarIcon: ({focused, color}) =>
              focused ? (
                <IonIcon name="home-sharp" size={30} color="#000" />
              ) : (
                <IonIcon name="home-outline" size={30} color="#000" />
              ),
            tabBarShowLabel: false,
          }}
          component={HomeStackScreen}
        />
        <Tab.Screen
          name="Search"
          options={{
            headerShown: false,
            tabBarIcon: ({focused, color}) =>
              focused ? (
                <MaterialIcon name="text-box-search" size={30} color="#000" />
              ) : (
                <MaterialIcon name="text-search" size={30} color="#000" />
              ),
            tabBarShowLabel: false,
          }}
          component={SearchStackScreen}
        />
        <Tab.Screen
          name="Whishlist"
          options={{
            headerShown: false,
            tabBarIcon: ({focused, color}) =>
              focused ? (
                <IonIcon name="heart" size={30} color="#000" />
              ) : (
                <IonIcon name="heart-outline" size={30} color="#000" />
              ),
            tabBarShowLabel: false,
          }}
          component={WishlistStackScreen}
        />
        <Tab.Screen
          name="Profile"
          options={{
            headerShown: false,
            tabBarIcon: ({focused, color}) =>
              focused ? (
                <IonIcon name="person" size={30} color="#000" />
              ) : (
                <IonIcon name="person-outline" size={30} color="#000" />
              ),
            tabBarShowLabel: false,
          }}
          component={ProfileStackScreen}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;

const styles = StyleSheet.create({
  dropdown: {
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
    width: '60%',
    textAlign: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
    alignSelf: 'center',
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    alignItems: 'center',
  },
});
