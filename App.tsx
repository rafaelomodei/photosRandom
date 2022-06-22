import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  ImageBackground,
} from 'react-native';
import { fetchPhotosRandom, IPhotoRandom } from './axios';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { styles } from './App.style';

export default function App() {
  const [photosRandom, setPhotosRandom] = useState<Array<IPhotoRandom>>();
  const [indexPhoto, setIndexPhoto] = useState<number>(0);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    getPhotoRandom(page);
  }, []);

  useEffect(() => {
    if (indexPhoto === 29) {
      getPhotoRandom(page + 1);
      setIndexPhoto(0);
      setPage(page + 1);
    }
  }, [indexPhoto]);

  const getPhotoRandom = async (page: number) => {
    try {
      const response: Array<IPhotoRandom> | string = await fetchPhotosRandom(
        page
      );
      if (response) setPhotosRandom(response);
    } catch (error) {
      console.error('getPhotoRandom::error: ', error);
    }
  };

  const image = {
    uri: photosRandom && photosRandom[indexPhoto].imageURL,
  };

  const imageAvatar = {
    uri: photosRandom && photosRandom[indexPhoto].userPhoto,
  };

  return (
    <Pressable
      onPress={() => setIndexPhoto(indexPhoto + 1)}
      style={styles.container}
    >
      <StatusBar style='auto' />

      <ImageBackground style={styles.image} source={image}>
        <View style={styles.footer}>
          <View style={styles.containerUser}>
            <View style={[styles.imageAvatar, styles.shadow]}>
              <Image style={styles.imageAvatar} source={imageAvatar} />
            </View>

            <Text style={[styles.textUserName, styles.textShadow]}>
              {photosRandom && photosRandom[indexPhoto]?.userName}
            </Text>
          </View>
          <View style={styles.containerLike}>
            <FontAwesome5
              name={'heart'}
              solid={false}
              color={'#fff'}
              size={24}
            />
            <Text style={[styles.textTotalLike, styles.textShadow]}>
              {photosRandom && photosRandom[indexPhoto].likes}
            </Text>
          </View>
        </View>
      </ImageBackground>
    </Pressable>
  );
}
