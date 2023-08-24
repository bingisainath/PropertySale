import React from 'react';
import {View, Text} from 'react-native';
import {Controller} from 'react-hook-form';
import CustomTextInput from '../customTextInput/customTextInput';
import {
  HEIGHT,
  WIDTH,
  COLORS,
  phoneNumberOptions,
} from '../../constants/constants';

interface TextInputProps {
  control: any;
  name: string;
  rules: any;
  placeHolder?: string;
  defaultValue?: string;
  numeric?: boolean
}
const TextInput = ({control, name, rules, placeHolder,defaultValue,numeric}: TextInputProps) => {
  // render
  return (
    <View>
      <Controller
        name={name}
        defaultValue={defaultValue}
        control={control}
        rules={rules}
        render={({
          field: {onChange, value},
          formState: {isSubmitted, errors},
          fieldState: {error},
        }) => {
          return (
            <>
              <CustomTextInput
                placeholder={placeHolder ? placeHolder : ''}
                color={COLORS.white}
                backgroundColor={COLORS.white}
                borderColor={isSubmitted && error ? 'red' : 'grey'}
                viewHeight={undefined}
                onChange={(data) => {
                  numeric ? onChange(parseInt(data,10)) : onChange(data)
                }}
                value={value}
              />
              {isSubmitted && error && (
                <Text
                  style={{color: 'red', alignSelf: 'stretch', marginLeft: 14}}>
                  {error?.message}
                </Text>
              )}
            </>
          );
        }}
      />
    </View>
  );
};

export default TextInput;
