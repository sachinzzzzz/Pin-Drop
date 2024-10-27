import * as React from 'react';
import Typography from '@mui/material/Typography';
import Popper from '@mui/material/Popper';
import PopupState, { bindToggle, bindPopper } from 'material-ui-popup-state';
import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

function Popup({ children }) {
  return (
    <PopupState variant="popper" popupId="recents-popup-popper">
      {(popupState) => (
        <>
          {/* Clone child element to add toggle functionality */}
          {React.cloneElement(children, { ...bindToggle(popupState) })}

          <Popper {...bindPopper(popupState)} transition>
            {({ TransitionProps }) => (
              <Fade {...TransitionProps} timeout={350}>
                <Paper sx={{ p: 2, backgroundColor: '#1F2933', boxShadow: 3 }}>
                  <Typography variant="body2" sx={{ color: '#d7dce6' }}>
                    <ul>
                        <li>Click Anywhere on the map to drop a pin.</li>
                        <li>The click will ask for a remark for the location.</li>
                        <li>Click on Add pin to confirm the pin. </li>
                        <li>The saved pin will show on right side.</li>
                        <li>Click on delete to delete the pin.</li>
                    </ul>
                  </Typography>
                  <Box
                    sx={{
                      textAlign: 'right',
                      mt: 1,
                      cursor: 'pointer',
                      color: '#d62237',
                      fontWeight: 'bold',
                    }}
                    onClick={popupState.close}
                  >
                    Close
                  </Box>
                </Paper>
              </Fade>
            )}
          </Popper>
        </>
      )}
    </PopupState>
  );
}

export default Popup;
