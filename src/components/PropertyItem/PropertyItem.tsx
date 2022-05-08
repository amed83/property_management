import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import BedIcon from "@mui/icons-material/Bed";
import { FC } from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { PropertyProps, Status } from "../../types/types";

export interface PropertyItemProps extends PropertyProps {
  togglePropertyStatus: (id: string, status: Status) => void;
}

export const PropertyItem: FC<PropertyItemProps> = ({
  imageUrl,
  id,
  address,
  askingPrice,
  status,
  bedroomsNumber,
  togglePropertyStatus,
}) => (
  <ListItem
    sx={{
      marginBottom: "5px",
      border: "solid #EDE9E9 1px",
      borderRadius: "5px",
    }}
  >
    <Grid container spacing={2}>
      <Grid item md={7} sm={12}>
        <img src={imageUrl} width={500} alt="property" />
      </Grid>

      <Grid item md={5} sm={12}>
        <Box sx={{ paddingTop: "5px" }}>
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

        <Box sx={{ marginTop: "4rem" }}>
          <Typography variant="h6" data-testid="property_status">
            Property status:{" "}
            <span style={{ color: status === "active" ? "green" : "red" }}>
              {status}
            </span>
          </Typography>
          <Button onClick={() => togglePropertyStatus(id, status)}>
            Change Status
          </Button>
        </Box>
      </Grid>
    </Grid>
  </ListItem>
);
