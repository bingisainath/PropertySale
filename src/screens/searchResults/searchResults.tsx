import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';
import auth from '@react-native-firebase/auth';
import {HEIGHT, COLORS} from '../../constants/constants';
import styles from './searchResultsStyle';

const SearchResults = (props: any) => {
  const {navigation} = props;
  const user = auth().currentUser;
  const results = useSelector((state: any) => state.searchResults);
  const filterParameters = useSelector((state: any) => state.filterParameters);
  const [filterParameter, setFilterParameter] = useState(filterParameters);
  const [filteredResults, setFilteredResults] = useState(results); // New state for filtered results
  const [sortParameter, setSortParameter] = useState(false);

  useEffect(() => {
    if (sortParameter) {
      const sortDataAlphabetically = () => {
        setFilteredResults((prevResults: any) => {
          const sortedData = [...prevResults];
          sortedData.sort((a, b) =>
            a.propertyName.localeCompare(b.propertyName),
          );
          return sortedData;
        });
      };
      sortDataAlphabetically(); // Call the sortDataAlphabetically function
    }
  }, [sortParameter]);
  console.log('Results:', results);
  console.log('Filtered Results:', filteredResults);

  // render
  return (
    <View style={{backgroundColor:COLORS.lightPink}}>
      {results?.length != 0 ? (
        <View style={{backgroundColor: COLORS.lightPink,}}>
          <View
            style={{
              shadowOffset: {width: 0, height: 2},
              shadowOpacity: 0.5,
              shadowRadius: 2,
              elevation: 2,
              flexDirection: 'row',
              backgroundColor: 'white',
            }}>
            <TouchableOpacity onPress={() => setSortParameter(!sortParameter)}>
              <MaterialCommunityIcons
                name="filter"
                size={20}
                color={'black'}
                style={{margin: 15, marginTop: 20}}
              />
            </TouchableOpacity>
            <View style={styles.verticalLine} />
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              {filterParameter?.map((data1: any, index: any) =>
                data1?.map((data2: any, index2: any) => (
                  <View style={styles.container} key={`${index}-${index2}`}>
                    <Text style={{color: 'black', fontSize: 19}}>{data2}</Text>
                    <View style={{marginTop: 4}}></View>
                  </View>
                )),
              )}
            </ScrollView>
          </View>
          <Text
            style={{
              fontSize: 20,
              color: 'black',
              backgroundColor: COLORS.lightPink,
              paddingLeft: 20,
              padding: 10,
            }}>
            Result: {results?.length}
          </Text>
          <View
            style={{
              height: '85%',
              backgroundColor: COLORS.lightPink,
              // paddingTop: 10,
              marginLeft:5,marginRight:10,
            }}>
            <FlatList
              data={results}
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
                      // marginTop: 10,
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
                          style={{height: HEIGHT / 3.5, width: HEIGHT / 5}}
                        />
                      </View>
                      <View style={{margin: 10}}>
                        <View style={{flexDirection: 'row'}}>
                          <View style={{width: '50%'}}>
                            <Text
                              style={{
                                fontSize: 16,
                                fontWeight: 'bold',
                                color: '#000',
                              }}>
                              {item?.propertyName}
                            </Text>
                          </View>
                          <View></View>
                        </View>
                        <View>
                          <Text
                            style={{
                              backgroundColor: COLORS.lightPink,
                              marginTop: 8,
                              marginBottom: 3,
                              padding: 3,
                              marginRight: '60%',
                            }}>
                            {item?.propertyType}
                          </Text>
                        </View>
                        <View
                          style={{
                            backgroundColor: COLORS.lightGreen,
                            marginTop: 8,
                            marginBottom: 3,
                            width: '18%',
                            padding: 3,
                            justifyContent: 'space-around',
                            paddingLeft:3
                          }}>
                          <Text
                            style={{
                              // textAlign: 'center',
                            }}>
                            {item?.numberOfRooms}
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
            />
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
                You don't have any results for given options
              </Text>
            </View>
            <View style={{margin: 20}}>
              <Text style={{color: '#000'}}>
                Click on back button to re-apply the filters
              </Text>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default SearchResults;
