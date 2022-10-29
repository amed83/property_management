import { useMutation } from 'react-query';
import fetchHelper from '../../api';
import { PropertyProps } from '../../types/types';

const handleTogglePropertyStatus = async (id: string, isActive: boolean) => {
  try {
    const response = await fetchHelper(`/properties/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        isActive: !isActive,
      }),
    });
    return response as PropertyProps;
  } catch (err) {
    throw new Error('error');
  }
};

export const useUpdatePropertyStatus = () =>
  useMutation(({ id, isActive }: { id: string; isActive: boolean }) =>
    handleTogglePropertyStatus(id, isActive),
  );
