import { factory, primaryKey } from '@mswjs/data';
import { PropertyProps } from '../types/types';

export const mockedProperties: PropertyProps[] = [
  {
    id: '1a',
    address: 'Red Deer Road, Cambuslang, Glasgow G72',
    askingPrice: 120000,
    isActive: true,
    bedroomsNumber: 3,
    imageUrl: `${process.env.PUBLIC_URL} assets/images/houseImg1a.jpeg`,
  },
  {
    id: '2a',
    address: `"Lockwood" at Mayfield Boulevard, East Kilbride, Glasgow G75`,
    askingPrice: 145000,
    isActive: false,
    bedroomsNumber: 5,
    imageUrl: `${process.env.PUBLIC_URL} assets/images/houseImg2a.jpeg`,
  },
  {
    id: '3a',
    address: `222 Nitshill Road, Glasgow G53`,
    askingPrice: 350000,
    isActive: true,
    bedroomsNumber: 2,
    imageUrl: `${process.env.PUBLIC_URL} assets/images/houseImg3a.jpeg`,
  },
];

export const db = factory({
  property: {
    id: primaryKey(String),
    address: String,
    askingPrice: Number,
    isActive: Boolean,
    bedroomsNumber: Number,
    imageUrl: String,
  },
});

mockedProperties.forEach((property) => db.property.create(property));
