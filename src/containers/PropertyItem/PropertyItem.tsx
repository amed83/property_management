import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import BedIcon from "@mui/icons-material/Bed";
import { FC } from "react";
import { PropertyProps } from "../Properties/Properties";
import Button from "@mui/material/Button";

export interface PropertyItemProps extends PropertyProps {
  togglePropertyStatus: (id: string, status: "active" | "expired") => void;
}

export const PropertyItem: FC<PropertyItemProps> = ({
  imageUrl,
  id,
  address,
  askingPrice,
  status,
  bedroomsNumber,
  togglePropertyStatus,
}) => {
  return (
    <ListItem>
      <Card sx={{ display: "flex" }}>
        <Box>
          <img src={imageUrl} alt="property image" width="500" height={400} />
        </Box>
        <Container sx={{ width: "50rem" }}>
          <Box sx={{ paddingTop: "2rem" }}>
            <Box>
              <Typography variant="h4">
                Price £ {askingPrice.toLocaleString("en-us")}
              </Typography>
            </Box>
            <Box display={"flex"}>
              <BedIcon />
              <Typography style={{ marginLeft: "5px" }} variant="subtitle1">
                {bedroomsNumber}
              </Typography>
            </Box>

            <Box>
              <Typography variant="h5"> {address}</Typography>
            </Box>
          </Box>
          <Box sx={{ marginTop: "4rem" }}>
            <Typography variant="h6">
              Property status:{" "}
              <span style={{ color: status === "active" ? "green" : "red" }}>
                {status}
              </span>{" "}
            </Typography>
            <Button onClick={() => togglePropertyStatus(id, status)}>
              Change Status
            </Button>
          </Box>
        </Container>
      </Card>
    </ListItem>
  );
};
