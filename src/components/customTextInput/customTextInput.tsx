import {View, Text, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {HEIGHT, WIDTH} from '../../constants/constants';
import {TextInput} from 'react-native-element-textinput';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

const CustomTextInput = (props: any) => {
  const {placeholder,onChange, value, viewHeight, error, errorText} = props;
  const [height, setHeight] = useState(50);
  const [isFocus, setIsFocused] = useState(false);
  const [visible, setVisible] = useState(false)

  const handleInputChange = (text:any) => {
    if (onChange) {
      onChange(text);
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const leftIcon = () => {
    if (visible) {
      return (
        <Icon
          name="eye-slash"
          size={22}
          color="grey"
          onPress={() => setVisible(false)}
        />
      );
    } else {
      return (
        <Icon
          name="eye"
          size={22}
          color="grey"
          onPress={() => setVisible(true)}
        />
      );
    }
  };

  return (
    <View>
      <View
        style={[
          styles.container,
          {
            borderColor: error
              ? 'red'
              : isFocus
              ? 'blue'
              : props.borderColor || 'gray',
          },
        ]}>
        <TextInput
          {...props}
          style={[styles.input, {height: viewHeight ? viewHeight : height}]}
          placeholderTextColor="grey"
          onChangeText={handleInputChange}
          value={value}
          onFocus={handleFocus}
          onBlur={handleBlur}
          renderRightIcon={placeholder == 'Password' ? leftIcon : null}
          secureTextEntry={
            placeholder == 'Password' || placeholder == '_ _ _ _ _ _'
              ? !visible
              : false
          }
        />
      </View>
      {error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{errorText}</Text>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    marginHorizontal: WIDTH / 25,
    margin: WIDTH / 40,
    // borderRadius: WIDTH / 12,
    padding: -2,
    backgroundColor:'#FFFF'
  },
  input: {
    paddingHorizontal: WIDTH / 16,
    alignSelf: 'flex-start',
  },
  errorContainer: {
    // backgroundColor: '#f7dfdf',
    paddingLeft: WIDTH / 30,
    padding: 3,
    marginHorizontal: WIDTH / 80,
    borderRadius: WIDTH / 12,
    flexDirection: 'row',
  },
  errorText: {
    color: 'red',
    fontWeight: '500',
    fontSize: 12,
  },
});

export default CustomTextInput;
