import React, { FC } from 'react';
import PropertyList from '../../components/PropertyList';
import { useQueryClient } from 'react-query';
import { useGetPropertiesData } from '../../hooks/services/useGetPropertiesData';
import { useUpdatePropertyStatus } from '../../hooks/services/useUpdatePropertyStatus';

export const Dashboard: FC = () => {
  const queryClient = useQueryClient();
  const {
    data: propertiesData,
    isLoading,
    error: queryError,
    isFetching,
  } = useGetPropertiesData();

  const { mutate, isLoading: updateIsLoading } = useUpdatePropertyStatus();

  const togglePropertyStatus = (id: string, isActive: boolean) => {
    console.log('calling toggle');
    return mutate(
      { id, isActive },
      {
        onSuccess: () => {
          return queryClient.invalidateQueries('properties');
        },
      },
    );
  };

  if (isLoading || updateIsLoading || isFetching) {
    return (
      <div style={{ marginTop: '100px' }}>
        <h1>...Loading</h1>
      </div>
    );
  }

  if (queryError) {
    return <div>Something went wrong</div>;
  }

  return (
    <div>
      {!isLoading &&
        !updateIsLoading &&
        propertiesData &&
        propertiesData.length > 0 && (
          <PropertyList
            properties={propertiesData}
            togglePropertyStatus={togglePropertyStatus}
          />
        )}
      {!isLoading && propertiesData && propertiesData.length < 1 && (
        <div>
          <h1 style={{ color: 'red' }}>
            Sorry there&apos;s no property to show
          </h1>
        </div>
      )}
    </div>
  );
};
