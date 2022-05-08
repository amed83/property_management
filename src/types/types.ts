export type Status = "active" | "expired";

export interface PropertyProps {
  id: string;
  imageUrl: string;
  bedroomsNumber: number;
  address: string;
  askingPrice: number;
  status: Status;
}
