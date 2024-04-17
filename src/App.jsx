import { useState } from 'react'
import { AppBar, Container, Toolbar, Typography, IconButton, InputBase } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link, Outlet } from 'react-router-dom';


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
        <AppBar position='static'>
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
            <MenuItem component={Link} to="/" onClick={handleClose}>Custumer list</MenuItem>
            <MenuItem component={Link} to="/trainings" onClick={handleClose}>Trainings</MenuItem>
            <MenuItem component={Link} to="/calendar" onClick={handleClose}>Calendar</MenuItem>
         
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
