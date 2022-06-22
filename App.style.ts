import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
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
