import { useState } from 'react'
import { AppBar, Container, Toolbar, Typography, IconButton, InputBase } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link, Outlet } from 'react-router-dom';
import GroupsIcon from '@mui/icons-material/Groups';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import BarChartIcon from '@mui/icons-material/BarChart';


function App() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  return (
    <>
      <Container maxWidth="xl">
        <AppBar position='fixed'>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
              onClick={handleClick}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
                  <MenuItem component={Link} to="/PersonalTrainerApplication" onClick={handleClose}>
                    <GroupsIcon />
                    <span style={{ marginLeft: '8px' }}>Custumer list
                    </span>
                  </MenuItem>

                  <MenuItem component={Link} to="/PersonalTrainerApplication/trainings" onClick={handleClose}>
                    <FitnessCenterIcon />
                    <span style={{ marginLeft: '8px' }}>Trainings
                    </span>
                  </MenuItem>
                
                  <MenuItem component={Link} to="/PersonalTrainerApplication/calendar" onClick={handleClose}>
                    <CalendarMonthIcon/>
                    <span style={{ marginLeft: '8px' }}>Calendar
                    </span>
                  </MenuItem>


                  <MenuItem component={Link} to="/PersonalTrainerApplication/chart" onClick={handleClose}>
                    <BarChartIcon/>
                    <span style={{ marginLeft: '8px' }}>Activity Chart
                    </span>
                  </MenuItem>

            </Menu>

            <Typography variant='h6'
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
            > Personal trainer
            </Typography>
          </Toolbar>
        </AppBar>
      </Container>

      <Outlet />
    </>
  )
}

export default App
