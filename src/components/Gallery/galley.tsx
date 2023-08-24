import React, { PureComponent } from "react";
import { Alert } from "react-native";
import ImagePicker from "react-native-image-crop-picker";

const takeFromGallery = async (mediaType: any) => {
  try {
    const imgs = await ImagePicker.openPicker({
      mediaType: mediaType,
      multiple: true,
    });

    let img;
    if (Array.isArray(imgs)) {
      img = imgs;
    } else {
      img = [imgs];
    }
    let images = img.map((i, index) => {
      const imageId = "id" + "-" + Date.now();
      let ID = imageId + "-" + index;
      return {
        path: i.path,
        type: i.mime,
        name: i.path.substring(i.path.lastIndexOf("/") + 1),
        imageId: ID,
      };
    });

    return images;
  } catch (e:any) {
    Alert.alert(e.message);
  }
};

export default takeFromGallery;