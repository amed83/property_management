/* eslint-disable react/react-in-jsx-scope */
import Container from '@mui/material/Container';
import { FC, useEffect } from 'react';
import { PropertyProps, Status } from '../../types/types';
import PropertyList from '../../components/PropertyList';
import useFetch from '../../hooks/useFetch';

export const Dashboard: FC = () => {
  const {
    handleFetch: getProperties,
    data: propertiesData,
    loading: isLoadingProperties,
    error: errorFetchingProperties,
  } = useFetch<PropertyProps[]>();

  const {
    handleFetch: updateProperty,
    error: errorUpdatingProperties,
    data: updatedPropertiesData,
    loading: isLoadingUpdateProperties,
  } = useFetch<PropertyProps[]>();

  useEffect(() => {
    getProperties('/properties/', {
      method: 'GET',
    });
  }, [getProperties, updatedPropertiesData]);

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

  if (isLoadingProperties || isLoadingUpdateProperties) {
    return (
      <div style={{ marginTop: '100px' }}>
        <h1>...Loading</h1>
      </div>
    );
  }

  if (errorFetchingProperties || errorUpdatingProperties) {
    return <div>Something went wrong </div>;
  }

  return (
    <Container>
      {!isLoadingProperties && propertiesData && propertiesData.length > 0 ? (
        <PropertyList
          properties={propertiesData}
          togglePropertyStatus={handleTogglePropertyStatus}
        />
      ) : (
        <div>
          <h5>Sorry, no properties to show at the moment</h5>
        </div>
      )}
    </Container>
  );
};
