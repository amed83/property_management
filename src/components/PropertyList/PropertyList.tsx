/* eslint-disable react/react-in-jsx-scope */
import { Container, List } from '@mui/material';
import { FC } from 'react';
import { PropertyProps } from '../../types/types';
import PropertyItem from '../PropertyItem';

interface PropertyListProps {
  properties: PropertyProps[];
}

export const PropertyList: FC<PropertyListProps> = ({ properties }) => (
  <Container>
    <List>
      {properties.map((prop) => (
        <PropertyItem
          key={prop.id}
          id={prop.id}
          imageUrl={prop.imageUrl}
          address={prop.address}
          askingPrice={prop.askingPrice}
          isActive={prop.isActive}
          bedroomsNumber={prop.bedroomsNumber}
        />
      ))}
    </List>
  </Container>
);
