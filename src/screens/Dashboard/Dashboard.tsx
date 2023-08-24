import React, {useCallback, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
  FlatList,
  StyleSheet,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';

import {HEIGHT, WIDTH} from '../../constants/constants';
import {COLORS} from '../../constants/constants';
import CustomButton from '../../components/customButton/customButton';
import {getDashboardRequest} from '../../redux/userActions';
import {useDispatch, useSelector} from 'react-redux';

import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';

const Dashboard = (props: any) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const {navigation} = props;
  const user = auth().currentUser;

  const dashboardData = useSelector((state: any) => state.dashboardData);

  useCallback(() => {
    dispatch(getDashboardRequest(user?.uid));
  }, [navigation,isFocused]);


  useEffect(() => {
    dispatch(getDashboardRequest(user?.uid));
  })


  return (
    <>
      {dashboardData.length != 0 ? (
        <View
          style={{
            flex: 1,
            // marginHorizontal: 12,
            backgroundColor: COLORS.lightPink,
          }}>
          <View>
            <Text
              style={{
                flex: 1,
                marginTop: 15,
                marginBottom: 10,
                marginHorizontal: 10,
                borderRadius: 10,
                fontSize: 18,
                color: COLORS.black,
                fontWeight: '600',
              }}>
              See Latest Updates on your property
            </Text>
            <View style={{marginBottom: 60}}>
              <FlatList
                data={dashboardData}
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
                    <View
                      style={{
                        // marginTop: 10,
                        backgroundColor: COLORS.lightBlue,
                        // marginHorizontal: 10,
                        borderRadius: 12,
                      }}>
                      <View style={{}}>
                        <View
                          style={{
                            overflow: 'hidden',
                            borderTopLeftRadius: 10,
                            borderTopRightRadius: 10,
                          }}>
                          <ImageBackground
                            source={{uri: item?.imageData[0]}}
                            style={{
                              height: HEIGHT / 4,
                              flexDirection: 'column-reverse',
                            }}>
                            <View
                              style={{
                                marginTop: 8,
                                backgroundColor: COLORS.lightPink,
                                width:
                                  item?.propertyType.length <= 4
                                    ? item?.propertyType.length * 14
                                    : item?.propertyType.length * 10,
                              }}>
                              <Text
                                style={{
                                  paddingLeft: 6,
                                  paddingVertical: 3,
                                  fontSize: 14,
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
                                  fontSize: 14,
                                }}>
                                {item?.numberOfRooms}
                              </Text>
                            </View>
                          </ImageBackground>
                        </View>

                        <View style={{margin: 10}}>
                          <View style={{marginTop: 5, marginLeft: 10}}>
                            <Text
                              style={{
                                color: 'black',
                                fontWeight: 'bold',
                                fontSize: 20,
                              }}>
                              {item?.propertyName}
                            </Text>
                          </View>

                          <View style={{flexDirection: 'row', margin: 10}}>
                            <View style={{width: '55%'}}>
                              <Text
                                style={{
                                  color: 'black',
                                  fontSize: 16,
                                }}>
                                {item?.city}
                              </Text>
                            </View>
                            <View style={{marginLeft: 50}}>
                              {item.rent == 'rent' ? (
                                <Text
                                  style={{color: 'black', fontWeight: 'bold'}}>
                                  {' '}
                                  {item.price} / Month
                                </Text>
                              ) : (
                                <Text
                                  style={{color: 'black', fontWeight: 'bold'}}>
                                  {' '}
                                  {item.price} / -
                                </Text>
                              )}
                            </View>
                          </View>
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                            }}>
                            <CustomButton
                              title="View"
                              backgroundColor={COLORS.white}
                              textColor={COLORS.black}
                              paddingVertical={95}
                              paddingHorizontal={10}
                              marginVertical={HEIGHT / 10}
                              marginHorizontal={WIDTH / 4}
                              fontsize={16}
                              fontWeight={900}
                              borderColor={COLORS.black}
                              icon={require('../../assets/open-eye.png')}
                              onPress={() =>
                                navigation.navigate('ViewScreen', {data: item})
                              }
                            />
                            <CustomButton
                              title="Edit"
                              backgroundColor={COLORS.white}
                              textColor={COLORS.black}
                              paddingVertical={95}
                              paddingHorizontal={9}
                              marginVertical={HEIGHT / 10}
                              marginHorizontal={WIDTH / 5}
                              fontsize={16}
                              fontWeight={900}
                              borderColor={COLORS.black}
                              icon={require('../../assets/edit-text.png')}
                              onPress={() =>
                                navigation.navigate('EditSaleProperty0', {
                                  data: item,
                                })
                              }
                            />
                          </View>
                          {/* <View
                            style={{
                              marginHorizontal: 6,
                              marginVertical: 10,
                            }}>
                            <Text
                              style={{
                                marginTop: 5,
                                marginBottom: 5,
                                marginHorizontal: 10,
                                borderRadius: 10,
                                fontSize: 16,
                                color: COLORS.black,
                              }}>
                              Quotations Received 21
                            </Text>
                            <CustomButton
                              title="Delist property"
                              backgroundColor={COLORS.white}
                              textColor={COLORS.black}
                              paddingVertical={95}
                              paddingHorizontal={25}
                              marginVertical={HEIGHT / 10}
                              marginHorizontal={WIDTH / 25}
                              fontsize={16}
                              fontWeight={900}
                              borderColor={COLORS.black}
                              icon={require('../../assets/delete.png')}
                              // onPress={() => handleResults()}
                            />
                          </View> */}
                        </View>
                      </View>
                    </View>
                  </View>
                )}
              />
            </View>
          </View>
        </View>
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
                You haven't uploaded any properties
              </Text>
            </View>
          </View>
        </View>
      )}
    </>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
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
