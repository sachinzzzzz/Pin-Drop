import {useState} from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import InfoIcon from '@mui/icons-material/Info';
import HelpIcon from '@mui/icons-material/Help';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PinDropIcon from '@mui/icons-material/PinDrop';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography'
import {Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Popup from '../utils/popup';

const CustomBottomNavigation = styled(BottomNavigation)`
  background-color: #1F2933;
  color: white;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

export default function LabelBottomNavigation() {
  const [value, setValue] = useState('map');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const navigate = useNavigate();

  return (
    <CustomBottomNavigation sx={{ width: '100%' }} value={value} onChange={handleChange}>
      
        <Link to="/">
      <Box sx={{ display: 'flex', alignItems: 'center', color: '#d62237' }}>
        <PinDropIcon sx={{ fontSize: 40, mr: 1 }} /> {/* Increased font size */}
        <Typography variant="h6" component="span" sx={{ color: 'white', fontWeight: 'bold' }}>
          Pin-Drop
        </Typography>
      </Box>
      </Link>

      
     
      <BottomNavigationAction
        label="Map"
        value="map"
        icon={<LocationOnIcon />}
        sx={{ color: 'white' }}
        onClick={() => navigate('/')}
      />
      <Popup>
      <BottomNavigationAction
        label="Recents"
        value="recents"
        icon={<HelpIcon />}
        sx={{ color: 'white' }}
      />
      </Popup>      
      <BottomNavigationAction 
        label="Folder" 
        value="folder" 
        icon={<InfoIcon />} 
        sx={{ color: 'white' }}
        onClick={() => navigate('/about')}
      />
    </CustomBottomNavigation>
  );
}
