import { factory, primaryKey } from "@mswjs/data";
import { PropertyProps } from "../containers/Properties/Properties";

export const mockedProperties: PropertyProps[] = [
  {
    id: "1a",
    address: "Red Deer Road, Cambuslang, Glasgow G72",
    askingPrice: 120000,
    status: "active",
    bedroomsNumber: 3,
    imageUrl: `${process.env.PUBLIC_URL} assets/images/houseImgOne.jpeg`,
  },
  {
    id: "2a",
    address: `"Lockwood" at Mayfield Boulevard, East Kilbride, Glasgow G75`,
    askingPrice: 145000,
    status: "expired",
    bedroomsNumber: 5,
    imageUrl: `${process.env.PUBLIC_URL} assets/images/houseImgTwo.jpeg`,
  },
];

export const db = factory({
  property: {
    id: primaryKey(String),
    address: String,
    askingPrice: Number,
    status: String,
    bedroomsNumber: Number,
    imageUrl: String,
  },
});

mockedProperties.forEach((property) => db.property.create(property));
