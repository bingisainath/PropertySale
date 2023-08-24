import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import auth from '@react-native-firebase/auth';
import {useDispatch, useSelector} from 'react-redux';
import IonIcon from 'react-native-vector-icons/Ionicons';

import {WIDTH, HEIGHT, COLORS, PropertyData} from '../../constants/constants';
import CustomButton from '../../components/customButton/customButton';
import {useIsFocused} from '@react-navigation/native';
import {
  homeDataRequest,
  homeFilterRequest,
} from '../../../src/redux/userActions';

const Tab = createMaterialTopTabNavigator();

const itemSeparatorComponent = () => {
  return (
    <View
      style={{
        height: '100%',
        backgroundColor: COLORS.lightPink,
      }}
    />
  );
};

const Buy = (props: any) => {
  const {navigation} = props;
  const user = auth().currentUser;
  const dispatch = useDispatch();

  const homeData = useSelector((state: any) => state.homeBuyData);
  const location = useSelector((state: any) => state.location);
  const loading = useSelector((state: any) => state.loading);

  const HomeScreenfilter = async (filter: any) => {
    const filterdata = {
      type: filter.type,
      data: filter.data,
      location: location,
    };
    dispatch(homeFilterRequest(filterdata));
    navigation.navigate('homeScreenFilter');
  };

  return (
    <>
      {loading ? (
        <View style={styles.activityIndicator1}>
          <ActivityIndicator size="large" color="#2ab5e8" />
        </View>
      ) : (
        <>
          {homeData != '' ? (
            <ScrollView
              nestedScrollEnabled={true}
              style={{backgroundColor: COLORS.lightPink}}>
              <View style={styles.recentRentContainer}>
                <Text style={styles.recentRentText}>
                  Recently Added in @{location ? location : ''}
                </Text>
              </View>
              <View style={{}}>
                <FlatList
                  horizontal
                  pagingEnabled={true}
                  ItemSeparatorComponent={itemSeparatorComponent}
                  data={homeData}
                  renderItem={({item}) => (
                    <View
                      style={{
                        marginLeft: 20,
                        marginBottom: 20,
                        borderRadius: 10,
                        // paddingLeft: 5,
                        backgroundColor: 'white',
                        elevation: 5,
                        shadowColor: '#000',
                        shadowOffset: {width: 0, height: 0},
                        shadowOpacity: 0.1,
                        shadowRadius: 5,
                      }}>
                      <TouchableOpacity
                        style={{
                          backgroundColor: COLORS.lightBlue,
                          borderRadius: 10,
                          width: '100%',
                        }}
                        onPress={() => {
                          navigation.navigate('Details', {data: item});
                        }}>
                        <View style={{}}>
                          <View
                            style={{
                              borderTopLeftRadius:10,borderTopRightRadius:10,
                              overflow: 'hidden',
                            }}>
                            <ImageBackground
                              source={{uri: item?.imageData[0]}}
                              style={{
                                height: HEIGHT / 4,
                                flexDirection: 'column-reverse',
                                backgroundColor: COLORS.white,
                                width: WIDTH / 1.3,
                              }}>
                              <View
                                style={{
                                  marginTop: 8,
                                  backgroundColor: COLORS.lightPink,
                                  width:
                                    item?.propertyType.length <= 3
                                      ? item?.propertyType.length * 12
                                      : item?.propertyType.length * 8,
                                }}>
                                <Text
                                  style={{
                                    paddingLeft: 6,
                                    paddingVertical: 3,
                                    fontSize: 12,
                                  }}>
                                  {item?.propertyType}
                                </Text>
                              </View>

                              <View
                                style={{
                                  marginTop: 8,
                                  backgroundColor: COLORS.lightGreen,
                                  width: '18%',
                                }}>
                                <Text
                                  style={{
                                    paddingLeft: 6,
                                    paddingVertical: 3,
                                    fontSize: 12,
                                  }}>
                                  {item?.numberOfRooms}
                                </Text>
                              </View>
                            </ImageBackground>
                          </View>
                          <View style={{marginTop: 10, marginLeft: 10}}>
                            <Text
                              style={{
                                color: 'black',
                                fontWeight: 'bold',
                              }}>
                              {item?.propertyName}
                            </Text>
                          </View>
                          <View style={{flexDirection: 'row', margin: 10}}>
                            <View style={{flexDirection: 'row'}}>
                            <IonIcon
                                      name="location-outline"
                                      size={20}
                                      color="#000"
                                    />
                              <Text>{item?.city}</Text>
                            </View>
                            <View style={{marginLeft: 50}}>
                              <Text
                                style={{
                                  color: 'black',
                                  fontWeight: 'bold',
                                }}>
                                {'               '}
                                {item?.price} /-
                              </Text>
                            </View>
                          </View>
                        </View>
                      </TouchableOpacity>
                    </View>
                  )}
                  keyExtractor={item => item.id}
                />
              </View>
              <View style={styles.exploreRentContainer}>
                <Text style={styles.exploreRentText}>
                  Explore Property Types {location ? location : ''}
                </Text>
              </View>
              <View style={{left: 10}}>
              <FlatList
                  horizontal
                  pagingEnabled={true}
                  ItemSeparatorComponent={() => (
                    <View
                      style={{
                        height: '100%',
                        backgroundColor: COLORS.lightPink,
                      }}
                    />
                  )}
                  data={PropertyData}
                  renderItem={({item}) => (
                    <View
                      style={{
                        // borderWidth: 1,
                        borderRadius: 5,
                        marginLeft: 20,
                        marginBottom: 20,
                        // borderRadius: 10,
                        // paddingLeft: 5,
                        backgroundColor: 'white',
                        elevation: 5,
                        shadowColor: '#000',
                        shadowOffset: {width: 0, height: 0},
                        shadowOpacity: 0.1,
                        shadowRadius: 5,
                      }}>
                      <TouchableOpacity
                        style={{overflow: 'hidden'}}
                        onPress={() =>
                          HomeScreenfilter({
                            type: 'propertyType',
                            data: item.title,
                          })
                        }>
                        <View
                          style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            margin: 10,
                            marginBottom: 10,
                          }}>
                          <Image
                            source={item.img}
                            style={{height: 120, width: 120}}
                          />
                          <View
                            style={{
                              justifyContent: 'center',
                              alignItems: 'center',
                              marginTop: 10,
                            }}>
                            <Text>{item.title}</Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    </View>
                  )}
                  keyExtractor={item => item.id}
                />
              </View>

              <View style={styles.BHKRentContainer}>
                <Text style={styles.BHKRentText}>BHK Types</Text>
              </View>
              <View style={{marginBottom: 20}}>
                <View style={{flexDirection: 'row', marginLeft: 20}}>
                  <TouchableOpacity
                    style={{
                      borderColor: 'black',
                      borderWidth: 2,
                      width: '45%',
                      height: 40,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    onPress={() =>
                      HomeScreenfilter({
                        type: 'numberOfRooms',
                        data: '1BHK',
                      })
                    }>
                    <Text style={{color: 'black'}}>1BHK</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      borderColor: 'black',
                      borderWidth: 2,
                      width: '45%',
                      height: 40,
                      alignItems: 'center',
                      justifyContent: 'center',
                      left: 25,
                    }}
                    onPress={() =>
                      HomeScreenfilter({
                        type: 'numberOfRooms',
                        data: '2BHK',
                      })
                    }>
                    <Text style={{color: 'black'}}>2BHK</Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={{flexDirection: 'row', marginTop: 10, marginLeft: 20}}>
                  <TouchableOpacity
                    style={{
                      borderColor: 'black',
                      borderWidth: 2,
                      width: '45%',
                      height: 40,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    onPress={() =>
                      HomeScreenfilter({
                        type: 'numberOfRooms',
                        data: '3BHK',
                      })
                    }>
                    <Text style={{color: 'black'}}>3BHK</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      borderColor: 'black',
                      borderWidth: 2,
                      width: '45%',
                      height: 40,
                      alignItems: 'center',
                      justifyContent: 'center',
                      left: 25,
                    }}
                    onPress={() =>
                      HomeScreenfilter({
                        type: 'numberOfRooms',
                        data: '4BHK',
                      })
                    }>
                    <Text style={{color: 'black'}}>4BHK</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          ) : (
            <View style={{flex: 1, backgroundColor: COLORS.lightPink}}>
              <View style={styles.heyContainer}>
                <Text style={styles.heyText}>
                  {' '}
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
              <View style={styles.infoContainer}>
                <Text style={styles.infoText}>
                  Sorry, We dont have anything to show
                </Text>
              </View>
            </View>
          )}
        </>
      )}
    </>
  );
};

export default Buy;

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
  activityIndicator1: {
    flex: 1,
    backgroundColor: COLORS.lightPink,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContainer: {
    marginTop: 20,
    marginLeft: 20,
  },
  infoText: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  heyText: {
    fontSize: 20,
    color: '#000',
    marginLeft: 20,
    marginTop: 20,
  },
  heyContainer: {
    marginTop: 20,
    marginLeft: 20,
  },
});
