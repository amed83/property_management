import { Container, List } from '@mui/material';
import { FC } from 'react';
import { PropertyProps, Status } from '../../types/types';
import PropertyItem from '../PropertyItem';

interface PropertyListProps {
  togglePropertyStatus: (id: string, status: Status) => void;
  properties: PropertyProps[];
}

export const PropertyList: FC<PropertyListProps> = ({
  properties,
  togglePropertyStatus,
}) => (
  <Container>
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
  </Container>
);
