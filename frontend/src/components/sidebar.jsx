import { Box, Typography, Button, IconButton, Drawer, styled } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

function Sidebar({ markers, handlePinClick, handlePinDelete, isDrawerOpen, setIsDrawerOpen }) {

    const Heading = styled(Typography)`
    text-decoration: underline;
    color: #d7dce6;
`;


    const toggleDrawer = () => {
        setIsDrawerOpen((prev) => !prev);
    };

    const onMarkerClick = (marker) => {
        handlePinClick(marker);
        setIsDrawerOpen(false);
    };

    const SidebarContent = (
        <Box sx={{
            width: { xs: '100vw', sm: '100%' },
            padding: '7px',
            background: '#1F2933',
            height: '100vh',
            overflowY: 'auto',
            color: 'white'
        }}
        >
            <Typography variant="h6" component="h3">Saved Pins</Typography>
            <ul className="pin-list">
                {markers.map((marker) => (
                    <li className="pin-item" key={marker.id}>
                        <Box onClick={() => onMarkerClick(marker)}>
                            <Heading>Location:</Heading>
                            <strong>{marker.title || `Pin ${marker.id}`}</strong>
                            <Heading>Remark:</Heading>
                            <p>{marker.remark}</p>
                        </Box>
                        <Button onClick={() => handlePinDelete(marker.id)} variant="outlined" color="error">
                            Delete
                        </Button>
                    </li>
                ))}
            </ul>
        </Box>
    );

    return (
        <>
            <IconButton
                onClick={toggleDrawer}
                sx={{
                    display: { xs: 'block', sm: 'none' },
                    position: 'absolute',
                    top: 60,
                    right: 10,
                    zIndex: 1300,
                    color: 'black',
                    border: '0.5px solid white',
                    borderRadius: '5px',
                    padding: '4px'
                }}
            >
                <MenuIcon />
            </IconButton>

            <Box
                className="sidebar"
                sx={{
                    display: { xs: 'none', sm: 'block' },
                    width: '30%',
                    paddingTop: '2rem',
                    height: '100vh',
                    backgroundColor: '#1F2933',
                    color: 'white',
                    overflowY: 'hidden',
                    padding: '10px',
                }}
            >
                {SidebarContent}
            </Box>

            <Drawer
                anchor="left"
                open={isDrawerOpen}
                onClose={toggleDrawer}
                ModalProps={{
                    keepMounted: true,
                }}
                sx={{
                    display: { xs: 'block', sm: 'none' },
                }}
            >
                {SidebarContent}
            </Drawer>
        </>
    );
}

export default Sidebar;
