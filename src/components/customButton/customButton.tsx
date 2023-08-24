import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {WIDTH, HEIGHT} from '../../constants/constants';
// import Icon from 'react-native-vector-icons/dist/AntDesign';


const CustomButton = (props: any) => {
  const {
    onPress,
    title,
    backgroundColor,
    borderColor,
    textColor,
    paddingVertical,
    paddingHorizontal,
    marginVertical,
    marginHorizontal,
    fontSize,
    fontWeight,
    icon,
  } = props;

  // const [iconString, setIconString] = useState('../../assets/call-end.jpg');

  // useEffect(() => {
  //   setIconString(`../../assets/${icon}.jpg`);
  //   // console.log(iconString);
  // }, [iconString]);

  // console.log('=================== iconstring =================');
  // console.log(icon);
  // console.log('====================================');

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        {
          backgroundColor: backgroundColor ? backgroundColor : '#E6E8E7',
          paddingVertical: HEIGHT / paddingVertical,
          paddingHorizontal: WIDTH / paddingHorizontal,
          marginVertical: HEIGHT / marginVertical,
          marginHorizontal: WIDTH / marginHorizontal,
          borderColor: borderColor ? borderColor : 'black',
        },
      ]}>
      {
        icon ? (
          <View style={{padding: 10}}>
            <Image source={icon} style={{height: 16, width: 16,}} />
          </View>
        ) : null
        // <View style={{padding: 10}}>
        //   <Text>No icon</Text>
        //   <Image source={require('../../assets/call-end.jpg')} style={{height: 15, width: 15}} />
        // </View>
      }

      <Text
        style={[
          styles.text,
          {
            color: textColor ? textColor : 'black',
            fontSize: fontSize,
            fontWeight: fontWeight,
          },
        ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: HEIGHT / 25,
    paddingHorizontal: WIDTH / 20,
    marginVertical: HEIGHT / 25,
    marginHorizontal: WIDTH / 20,
    alignItems: 'center',
    margin: '13%',
    justifyContent: 'center',
    flexDirection: 'row',
    borderWidth: 1,
  },
  text: {
    fontFamily: 'Montserrat-Regular',
  },
});

export default CustomButton;
