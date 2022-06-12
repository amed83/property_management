import Container from '@mui/material/Container';
import { FC, useEffect, useState } from 'react';
import { PropertyProps, Status } from '../../types/types';
import PropertyList from '../../components/PropertyList';
import { fetchHelper } from '../../api/fetchHelper';

export const Dashboard: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [propertiesData, setPropertiesData] = useState<
    PropertyProps[] | undefined
  >(undefined);
  const [error, setError] = useState<string>('');

  const fetchPropertiesData = async () => {
    setIsLoading(true);
    try {
      const response = await fetchHelper<PropertyProps[]>('/properties', {
        method: 'GET',
      });
      setPropertiesData(response);
      setIsLoading(false);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Something went wrong');
      }
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPropertiesData();
  }, []);

  const handleTogglePropertyStatus = async (id: string, status: Status) => {
    try {
      setIsLoading(true);
      await fetchHelper(`/properties/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: status === 'active' ? 'expired' : 'active',
        }),
      });

      fetchPropertiesData();
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Something went wrong');
      }
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div style={{ marginTop: '100px' }}>
        <h1>...Loading</h1>
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Container>
      {!isLoading && propertiesData && propertiesData.length > 0 && (
        <PropertyList
          properties={propertiesData}
          togglePropertyStatus={handleTogglePropertyStatus}
        />
      )}
      {!isLoading && propertiesData && propertiesData.length < 1 && (
        <div>
          <h1 style={{ color: 'red' }}>Sorry there's no property to show</h1>
        </div>
      )}
    </Container>
  );
};
