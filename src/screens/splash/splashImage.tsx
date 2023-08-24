import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';


const SplashImage = (props:any) => {
  const {navigation}=props;
  useEffect(() => { 
    const timer = setTimeout(() => { navigation.navigate('IntroSlider0'); }, 2000)});
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/welcome.jpg')}
        style={styles.image}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '50%',
    height: '50%',
  },
});

export default SplashImage;
