/* eslint-disable react/react-in-jsx-scope */
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import BedIcon from '@mui/icons-material/Bed';
import { FC, useContext } from 'react';
import Grid from '@mui/material/Grid';
import { PropertyProps } from '../../types/types';
import { PropertyContext } from '../../containers/Dashboard/Dashboard';

export const PropertyItem: FC<PropertyProps> = ({
  imageUrl,
  id,
  address,
  askingPrice,
  isActive,
  bedroomsNumber,
}) => {
  const { togglePropertyStatus, isUpdatingStatus, updatedItemId } =
    useContext(PropertyContext);

  return (
    <ListItem
      sx={{
        marginBottom: '5px',
        border: 'solid #EDE9E9 1px',
        borderRadius: '5px',
      }}
    >
      <Grid container spacing={2}>
        <Grid item md={7} sm={12}>
          <img src={imageUrl} width="100%" alt="property" />
        </Grid>

        <Grid item md={5} sm={12}>
          <Box sx={{ paddingTop: '5px' }}>
            <Typography variant="h4">
              Price £ {askingPrice.toLocaleString('en-us')}
            </Typography>
          </Box>
          <Box display={'flex'}>
            <BedIcon />
            <Typography style={{ marginLeft: '5px' }} variant="subtitle1">
              {bedroomsNumber}
            </Typography>
          </Box>

          <Box>
            <Typography variant="h5"> {address}</Typography>
          </Box>

          <Box sx={{ marginTop: '4rem' }}>
            <Typography variant="h6" data-testid="property_status">
              Property status:{' '}
              <span style={{ color: isActive ? 'green' : 'red' }}>
                {isActive ? 'Active' : 'Expired'}
              </span>
            </Typography>

            <LoadingButton
              onClick={() => togglePropertyStatus(id, isActive)}
              loading={isUpdatingStatus && updatedItemId === id}
            >
              Change Status
            </LoadingButton>
          </Box>
        </Grid>
      </Grid>
    </ListItem>
  );
};
