import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import IonIcon from 'react-native-vector-icons/Ionicons';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import {HEIGHT, COLORS, WIDTH} from '../../constants/constants';
import {useIsFocused} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {getWishListDataRequest} from '../../redux/userActions';

const Wishlist = (props: any) => {
  const {navigation} = props;

  const user = auth().currentUser;

  const dispatch = useDispatch();

  const [isDataAva, setIsDataAva] = useState(false);

  const isFocused = useIsFocused();

  const location = useSelector((state: any) => state.location);

  const wishlistData = useSelector((state: any) => state.wishlistData);

  useEffect(() => {
    if (isFocused) {
      dispatch(getWishListDataRequest(user?.uid));
    }
  }, [isFocused, wishlistData]);

  const handleRemove = async (data: any) => {
    console.log(data);

    const res = await firestore()
      .collection('users')
      .doc(user?.uid)
      .collection('Wishlist')
      .doc(data)
      .delete();
  };

  //whishlist data

  return (
    <>
      {wishlistData?.length == 0 || wishlistData == undefined ? (
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
              You haven’t added any properties to the wish-list yet
            </Text>
          </View>
          <View style={{margin: 20}}>
            <Text style={{color: '#000'}}>
              Click on Search iCon below to explore
            </Text>
          </View>
        </View>
      ) : (
        <View style={{flex: 1, backgroundColor: COLORS.lightPink}}>
          <View style={{marginBottom: 10, marginTop: 10, marginRight: 10}}>
            <FlatList
              data={wishlistData}
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
                          <View style={{width: '46%'}}>
                            <Text
                              style={{
                                fontSize: 16,
                                fontWeight: 'bold',
                                color: '#000',
                              }}>
                              {item?.propertyName}
                            </Text>
                          </View>
                          <View style={{width: '45%'}}>
                            <TouchableOpacity
                              onPress={() => handleRemove(item?.propertyName)}
                              style={{
                                padding: 3,
                                marginBottom: -50,
                                marginTop: -15,
                              }}>
                              <IonIcon
                                name="close-circle-outline"
                                size={30}
                                color="#000"
                              />
                            </TouchableOpacity>
                          </View>
                        </View>
                        <View
                          style={{
                            marginTop: 8,
                            marginBottom: 3,
                            padding: 3,
                            marginRight: '50%',
                          }}>
                          <Text>{item?.propertyType}</Text>
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
                            width: '16%',
                          }}>
                          <Text
                            style={
                              {
                                // textAlign: 'center',
                              }
                            }>
                            {item?.numberOfRooms}
                          </Text>
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
                            style={{marginLeft:-4}}
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
                          <Text
                            style={{
                              fontSize: 16,
                              fontWeight: 'bold',
                              color: '#000',
                            }}>
                            {item?.price} / Month
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
        </View>
      )}
    </>
  );
};

export default Wishlist;

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
});
