import axios from 'axios';
import { API_BASE, TOKEN } from '@env';

export interface IPhotoRandom {
  id: string;
  userName: string;
  userPhoto: string;
  description: string;
  imageURL: string;
  likes: number;
}
export const fetchPhotosRandom = async (page: number) => {
  const configurationObject = {
    method: 'get',
    url: `${API_BASE}/photos/?client_id=${TOKEN}&per_page=30&page=${page}`,
  };

  try {
    const { data } = await axios(configurationObject);

    const photos: Array<IPhotoRandom> = data.map((res: any) => {
      const photo: IPhotoRandom = {
        id: res.id,
        userName: res.user.username || '',
        userPhoto: res.user.profile_image.medium || '',
        description: res.description || '',
        imageURL: res.urls.regular || '',
        likes: res.likes || 0,
      };
      return photo;
    });

    return photos;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw Error(error.message);
    }
    throw Error('Algo inesperado ocorreu!');
  }
};
