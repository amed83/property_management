import { useQuery } from 'react-query';
import fetchHelper from '../../api';
import { PropertyProps } from '../../types/types';

const fetchPropertiesData = async () => {
  try {
    const response = await fetchHelper<PropertyProps[]>('/properties', {
      method: 'GET',
    });
    return response;
  } catch (err) {
    throw new Error('error');
  }
};

export const useGetPropertiesData = () =>
  useQuery<PropertyProps[], string>('properties', fetchPropertiesData);
