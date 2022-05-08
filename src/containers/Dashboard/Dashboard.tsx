import Container from "@mui/material/Container";
import { FC } from "react";
import { useQuery, useQueryClient, useMutation } from "react-query";
import api from "../../api";
import { PropertyProps, Status } from "../../types/types";
import PropertyList from "../../components/PropertyList";

const updateList = async (id: string, status: Status) => {
  await api(`/properties/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
  });
};

export const Dashboard: FC = () => {
  const {
    isLoading,
    data: properties,
    isError,
  } = useQuery<PropertyProps[]>(
    "properties",
    async () => await api(`/properties/`, { method: "GET" })
  );

  const queryClient = useQueryClient();
  const updatePropertiesMutation = useMutation(
    ({ id, status }: { id: string; status: Status }) => updateList(id, status),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("properties");
      },
    }
  );

  const togglePropertyStatus = async (id: string, status: Status) => {
    updatePropertiesMutation.mutate({
      id,
      status: status === "active" ? "expired" : "active",
    });
  };

  if (isError) {
    return <div>Error</div>;
  }
  if (isLoading) {
    return <div>...Loading</div>;
  }

  return (
    <Container>
      {properties && properties.length > 0 ? (
        <PropertyList
          properties={properties}
          togglePropertyStatus={togglePropertyStatus}
        />
      ) : (
        <div>Sorry, no properties to show at the moment</div>
      )}
    </Container>
  );
};
