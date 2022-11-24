import { createContext, FC, useState } from 'react';
import { useQueryClient } from 'react-query';
import PropertyList from '../../components/PropertyList';
import { useGetPropertiesData } from '../../hooks/services/useGetPropertiesData';
import { useUpdatePropertyStatus } from '../../hooks/services/useUpdatePropertyStatus';

interface ContextProps {
  togglePropertyStatus: (id: string, isActive: boolean) => void;
  isUpdatingStatus: boolean;
  updatedItemId: string | null;
}

export const PropertyContext = createContext<
  ContextProps | Record<string, never>
>({});

export const Dashboard: FC = () => {
  const queryClient = useQueryClient();
  const {
    data: propertiesData,
    isLoading,
    error: queryError,
    isFetching,
  } = useGetPropertiesData();

  const { mutate, isLoading: isUpdating } = useUpdatePropertyStatus();
  const [updatedItemId, setUpdatedItemId] = useState<string | null>(null);

  const togglePropertyStatus = (id: string, isActive: boolean) => {
    setUpdatedItemId(id);
    return mutate(
      { id, isActive },
      {
        onSuccess: () => queryClient.invalidateQueries('properties'),
      },
    );
  };

  if (isLoading) {
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
      {!isLoading && propertiesData && propertiesData.length > 0 && (
        <PropertyContext.Provider
          value={{
            updatedItemId,
            togglePropertyStatus,
            isUpdatingStatus: isFetching || isUpdating,
          }}
        >
          <PropertyList properties={propertiesData} />
        </PropertyContext.Provider>
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
