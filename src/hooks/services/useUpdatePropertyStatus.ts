import { useMutation } from 'react-query';
import fetchHelper from '../../api';

const handleTogglePropertyStatus = async (id: any, isActive: boolean) => {
  try {
    await fetchHelper(`/properties/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        isActive: !isActive,
      }),
    });
  } catch (err) {
    throw new Error('error');
  }
};

export const useUpdatePropertyStatus = () =>
  useMutation(({ id, isActive }: { id: string; isActive: boolean }) =>
    handleTogglePropertyStatus(id, isActive),
  );
