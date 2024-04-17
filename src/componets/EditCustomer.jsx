import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from "@mui/material/IconButton";

export default function EditCustomer({data,updateCustomer}) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
    setCustomer({
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
        phone: data.phone,
        streetaddress: data.streetaddress,
        city: data.city,
        postcode: data.postcode
    })
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [customer, setCustomer] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    streetaddress: '',
    postcode: '',
    city: ''
})

const handleSave=()=>{
    updateCustomer(data._links.customer.href,customer);
    handleClose();
}

return (
    <>

                <IconButton aria-label="edit" size="small" onClick={handleClickOpen}>
                    <EditIcon fontSize="small" ></EditIcon>
                </IconButton>
  
        <Dialog
            open={open}
            onClose={handleClose}
        >
            <DialogTitle>Edit customer</DialogTitle>
            
            <DialogContent>

                <TextField
                    margin="dense"
                    label="First name"
                    value={customer.firstname}
                    onChange={e=>setCustomer({...customer, firstname:e.target.value})}
                    fullWidth
                    variant="standard"
      />
<TextField
                    margin="dense"
                    label="Last name"
                    value={customer.lastname}
                    onChange={e=>setCustomer({...customer, lastname:e.target.value})}
                    fullWidth
                    variant="standard"
      />    

<TextField
                    margin="dense"
                    label="Email"
                    value={customer.email}
                    onChange={e=>setCustomer({...customer, email:e.target.value})}
                    fullWidth
                    variant="standard"
      />

<TextField
                    margin="dense"
                    label="Phone"
                    value={customer.phone}
                    onChange={e=>setCustomer({...customer, phone:e.target.value})}
                    fullWidth
                    variant="standard"
      />
<TextField
                    margin="dense"
                    label="Address"
                    value={customer.streetaddress}
                    onChange={e=>setCustomer({...customer, streetaddress:e.target.value})}
                    fullWidth
                    variant="standard"
      />

<TextField
                    margin="dense"
                    label="City"
                    value={customer.city}
                    onChange={e=>setCustomer({...customer, city:e.target.value})}
                    fullWidth
                    variant="standard"
      />
<TextField
                    margin="dense"
                    label="Postcode"
                    value={customer.postcode}
                    onChange={e=>setCustomer({...customer, postcode:e.target.value})}
                    fullWidth
                    variant="standard"
      />

            </DialogContent>
            <DialogActions>
                <Button onClick={handleSave}>Save</Button>
                <Button onClick={handleClose}>Cancel</Button>
               
            </DialogActions>
        </Dialog>
    </>
);
}