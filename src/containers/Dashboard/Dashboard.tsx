import Container from '@mui/material/Container';
import { FC, useEffect } from 'react';
import { PropertyProps, Status } from '../../types/types';
import PropertyList from '../../components/PropertyList';
import useFetch from '../../hooks/useFetch';

export const Dashboard: FC = () => {
  const {
    handleFetch: getProperties,
    state: {
      data: propertiesData,
      isLoading: PropertiesLoading,
      error: propertiesDataError,
    },
  } = useFetch<PropertyProps[]>();

  const {
    handleFetch: updateProperty,
    state: {
      data: updatePropertiesData,
      isLoading: updatePropertyLoading,
      error: updatePropertiesError,
    },
  } = useFetch<PropertyProps[]>();

  useEffect(() => {
    getProperties('/properties', {
      method: 'GET',
    });
  }, [getProperties, updatePropertiesData]);

  const handleTogglePropertyStatus = async (id: string, status: Status) => {
    updateProperty(`/properties/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        status: status === 'active' ? 'expired' : 'active',
      }),
    });
  };

  const isLoading = PropertiesLoading || updatePropertyLoading;

  if (isLoading) {
    return (
      <div style={{ marginTop: '100px' }}>
        <h1>...Loading</h1>
      </div>
    );
  }

  if (propertiesDataError || updatePropertiesError) {
    return (
      <div>
        {propertiesDataError?.message || updatePropertiesError?.message}{' '}
      </div>
    );
  }

  return (
    <Container>
      {!isLoading && propertiesData && propertiesData.length > 0 && (
        <PropertyList
          properties={propertiesData}
          togglePropertyStatus={handleTogglePropertyStatus}
        />
      )}
      {propertiesData && propertiesData.length < 1 && (
        <div>
          <h1 style={{ color: 'red' }}>Sorry there's no property to show</h1>
        </div>
      )}
    </Container>
  );
};
