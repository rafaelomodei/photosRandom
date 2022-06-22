import { API_BASE, TOKEN } from '@env';
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

export default function App() {
  const [photosRandom, setPhotosRandom] = useState<Array<IPhotoRandom>>();
  const [indexPhoto, setIndexPhoto] = useState<number>(0);
  const [page, setPage] = useState<number>(1);

  // const icon = ;

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
    // uri: 'https://images.unsplash.com/photo-1644906965770-f1bdeaffd17f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
    uri: photosRandom && photosRandom[indexPhoto].imageURL,
  };

  const imageAvatar = {
    // uri: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=461&q=80',
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
  },
  containerUser: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  containerLike: {
    alignItems: 'center',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'flex-end',
    width: '100%',
    height: '100%',
  },
  imageAvatar: {
    resizeMode: 'cover',
    justifyContent: 'center',
    width: 62,
    height: 62,
    borderRadius: 62,
  },
  imageLike: {
    width: 30,
    height: 30,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    padding: 32,
  },
  shadow: {
    shadowColor: '#171717',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
  },
  textShadow: {
    textShadowColor: '#171717',
    textShadowOffset: { width: 0, height: 4 },
    textShadowOpacity: 0.4,
    textShadowRadius: 10,
  },
  textUserName: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
    padding: 16,
  },
  textTotalLike: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
    padding: 4,
  },
});
