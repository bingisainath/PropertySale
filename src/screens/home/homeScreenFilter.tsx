import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import auth from '@react-native-firebase/auth';
import IonIcon from 'react-native-vector-icons/Ionicons';

import {HEIGHT, WIDTH, COLORS} from '../../constants/constants';

const SearchResults = (props: any) => {
  const {navigation} = props;
  const user = auth().currentUser;

  const homeFilterData = useSelector((state: any) => state.homeFilterData);

  useEffect(() => {
    console.log(homeFilterData);
  }, [homeFilterData]);

  // render
  return (
    <View style={{flex: 1, backgroundColor: COLORS.lightPink}}>
      {homeFilterData?.length != 0 ? (
        <>
          <View style={{marginRight: 10}}>
            <Text
              style={{
                fontSize: 20,
                color: 'black',
                backgroundColor: COLORS.lightPink,
                paddingLeft: 20,
                padding: 10,
              }}>
              Result: {homeFilterData?.length}
            </Text>
            <View
              style={{
                height: '93%',
                backgroundColor: COLORS.lightPink,
                paddingTop: 10,
              }}>
              <FlatList
                data={homeFilterData}
                renderItem={({item}) => (
                  <View
                    style={{
                      // borderWidth: 1,
                      borderRadius: 15,
                      marginLeft: 20,
                      marginBottom: 20,
                      marginRight: 10,
                      backgroundColor: COLORS.lightBlue,
                      elevation: 5,
                      shadowColor: '#000',
                      shadowOffset: {width: 0, height: 0},
                      shadowOpacity: 0.1,
                      shadowRadius: 5,
                    }}>
                    <TouchableOpacity
                      style={{
                        marginRight: 10,
                        backgroundColor: COLORS.lightBlue,
                        // marginHorizontal: 10,
                        borderRadius: 10,
                      }}
                      onPress={() => {
                        navigation.navigate('Details', {data: item});
                      }}>
                      <View style={{flexDirection: 'row', margin: 10}}>
                        <View
                          style={{
                            margin: 5,
                            borderRadius: 10,
                            overflow: 'hidden',
                          }}>
                          <Image
                            source={{uri: item?.imageData[0]}}
                            style={{height: HEIGHT / 3.3, width: WIDTH / 2.5}}
                          />
                        </View>
                        <View style={{margin: 10}}>
                          <View style={{flexDirection: 'row', width: '100%'}}>
                            <View style={{width: '70%'}}>
                              <Text
                                style={{
                                  fontSize: 18,
                                  fontWeight: 'bold',
                                  color: '#000',
                                }}>
                                {item?.propertyName}
                              </Text>
                            </View>
                          </View>
                          <View
                            style={{
                              marginTop: 8,
                              marginBottom: 3,
                              padding: 3,
                              marginRight: '50%',
                            }}>
                            <Text style={{fontSize: 15}}>
                              {item?.propertyType}
                            </Text>
                          </View>
                          <View
                            style={{
                              backgroundColor: COLORS.lightGreen,
                              marginTop: 8,
                              // marginBottom: 3,
                              // marginRight: '70%',
                              padding: 3,
                              // justifyContent: 'space-around',
                              paddingLeft: 3,
                              width: '20%',
                            }}>
                            <Text style={{}}>{item?.numberOfRooms}</Text>
                          </View>
                          <View
                            style={{
                              marginTop: 15,
                              width: '100%',
                              paddingRight: '50%',
                              flexDirection: 'row',
                            }}>
                            <IonIcon
                              name="location-outline"
                              size={20}
                              color="#000"
                            />
                            <Text
                              style={{
                                color: '#000',
                              }}>
                              {item?.city}
                            </Text>
                          </View>
                          <View
                            style={{
                              marginTop: 15,
                              width: '100%',
                              paddingRight: '50%',
                            }}>
                            <Text
                              style={{
                                color: '#000',
                              }}>
                              {item?.additionalConditions}
                            </Text>
                          </View>
                          <View style={{marginTop: 20}}>
                            {item.rent == 'rent' ? (
                              <Text
                              style={{
                                fontSize: 16,
                                fontWeight: 'bold',
                                color: '#000',
                              }}>
                              {item?.price} / Month
                            </Text>
                            ) : (
                              <Text
                              style={{
                                fontSize: 16,
                                fontWeight: 'bold',
                                color: '#000',
                              }}>
                              {item?.price} / -
                            </Text>
                            )}
                            {/* <Text
                              style={{
                                fontSize: 16,
                                fontWeight: 'bold',
                                color: '#000',
                              }}>
                              {item?.price} / Month
                            </Text> */}
                          </View>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>
                )}
              />
            </View>
          </View>
        </>
      ) : (
        <View>
          <View style={{backgroundColor: COLORS.lightPink}}>
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
                  : 'info Not avaliable'}
              </Text>
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.infoText}>
                You don't have any results for given options
              </Text>
            </View>
            <View style={{margin: 20}}>
              <Text style={{color: '#000'}}>
                Click on back button to reapply the ilters
              </Text>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default SearchResults;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: 'black',
    justifyContent: 'space-around',
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 15,
    paddingRight: 15,
    fontSize: 15,
    textAlign: 'center',
    marginHorizontal: 10,
    flexDirection: 'row',
    marginVertical: 15,
    backgroundColor: '#EBF4E8',
  },
  BHKContainer: {
    borderColor: 'black',
    backgroundColor: '#EBF4E8',
    justifyContent: 'space-around',
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 15,
    paddingRight: 15,
    fontSize: 15,
    textAlign: 'center',
    flexDirection: 'row',
    marginVertical: 15,
  },
  verticalLine: {
    height: '100%',
    width: 1,
    backgroundColor: '#909090',
  },
  heyContainer: {
    marginTop: 20,
    marginLeft: 20,
  },
  heyText: {
    fontSize: 20,
    color: '#000',
  },
  infoContainer: {
    marginTop: 20,
    marginLeft: 20,
  },
  infoText: {
    fontSize: 34,
    fontWeight: 'bold',
  },
});
