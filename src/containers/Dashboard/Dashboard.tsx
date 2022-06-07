import Container from '@mui/material/Container';
import { FC, useEffect } from 'react';
import { PropertyProps, Status } from '../../types/types';
import PropertyList from '../../components/PropertyList';
import useFetch from '../../hooks/useFetch';

export const Dashboard: FC = () => {
  const {
    handleFetch: getProperties,
    state: {
      data: getPropertiesData,
      isLoading: getPropertiesLoading,
      error: getPropertiesError,
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

  if (getPropertiesLoading || updatePropertyLoading || !getPropertiesData) {
    return (
      <div style={{ marginTop: '100px' }}>
        <h1>...Loading</h1>
      </div>
    );
  }

  console.log('getPropertiesError', getPropertiesError);
  console.log('getPropertiesData', getPropertiesData);

  if (getPropertiesError || updatePropertiesError) {
    return (
      <div>
        {getPropertiesError?.message || updatePropertiesError?.message}{' '}
      </div>
    );
  }

  // const foo = () => {
  //   console.log('hello foo');
  //   return 'diokan';
  // };

  return (
    <Container>
      {getPropertiesData && getPropertiesData.length > 0 ? (
        <PropertyList
          properties={getPropertiesData}
          togglePropertyStatus={handleTogglePropertyStatus}
        />
      ) : (
        <div>
          <h1 style={{ color: 'red' }}>Sorry there's no property to show</h1>
          {/* {foo()} */}
        </div>
      )}
    </Container>
  );
};
