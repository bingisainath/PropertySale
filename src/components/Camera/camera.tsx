import React, { PureComponent } from 'react';
import { Alert } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

const  openCamera = async (mediaType: any) => {
    try {
      const image = await ImagePicker.openCamera({
        width: 500,
        height: 500,
        includeBase64: true,
        includeExif: true,
        mediaType,
      });

      const ID = "id" + "-" + Date.now();
      let images = [
        {
          path: image.path,
          type: image.mime,
          name: image.path.substring(image.path.lastIndexOf("/") + 1),
          imageId: ID,
        },
      ];

      return images;

    } catch (e:any) {
      Alert.alert(e.message);
    }
   
  };

export default openCamera;