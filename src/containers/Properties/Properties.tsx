import Container from "@mui/material/Container";
import List from "@mui/material/List";
import { FC } from "react";
import { useQuery, useQueryClient, useMutation } from "react-query";
import api from "../../api";

import PropertyItem from "../PropertyItem";

type Status = "active" | "expired";

export interface PropertyProps {
  id: string;
  imageUrl: string;
  bedroomsNumber: number;
  address: string;
  askingPrice: number;
  status: "active" | "expired";
}

const updateList = async (id: string, status: Status) => {
  await api(`/properties/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
  });
};

export const Properties: FC = () => {
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

  const togglePropertyStatus = async (
    id: string,
    status: "active" | "expired"
  ) => {
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
      {properties && properties.length > 0 && (
        <List>
          {properties.map((prop) => (
            <PropertyItem
              key={prop.id}
              id={prop.id}
              imageUrl={prop.imageUrl}
              address={prop.address}
              askingPrice={prop.askingPrice}
              status={prop.status}
              bedroomsNumber={prop.bedroomsNumber}
              togglePropertyStatus={togglePropertyStatus}
            />
          ))}
        </List>
      )}
    </Container>
  );
};
