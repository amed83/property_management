/* eslint-disable react/react-in-jsx-scope */
import Container from '@mui/material/Container';
import { FC, useEffect } from 'react';
import { PropertyProps, Status } from '../../types/types';
import PropertyList from '../../components/PropertyList';
import useFetch from '../../hooks/useFetch';

export const Dashboard: FC = () => {
  const {
    handleFetch: getProperties,
    state: { data: propertiesData, isLoading, error },
  } = useFetch<PropertyProps[]>();

  const { handleFetch: updateProperty, state: updateListState } =
    useFetch<PropertyProps[]>();

  useEffect(() => {
    getProperties('/properties', {
      method: 'GET',
    });
  }, [getProperties, updateListState]);

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

  if (isLoading || updateListState.isLoading) {
    return (
      <div style={{ marginTop: '100px' }}>
        <h1>...Loading</h1>
      </div>
    );
  }

  if (error || updateListState.error) {
    return <div> {error?.message || updateListState.error?.message} </div>;
  }

  return (
    <Container>
      {propertiesData && propertiesData.length > 0 ? (
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
