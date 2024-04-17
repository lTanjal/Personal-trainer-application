import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export default function AddTraining({data,addTraining}) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
    setTraining({
        date: '',
        activity: '',
        duration: '',
        customer: data,
    })
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [training, setTraining] = useState({
    date: '',
    activity: '',
    duration: '',
    customer: '',
   })

   const handleSave=()=>{
   
      const formattedDate = dayjs(training.date, 'DD.MM.YYYY HH:mm').toISOString();
 
      addTraining({...training, date: formattedDate});
      handleClose();

};

return (
    <>

        <Button variant="outlined" onClick={handleClickOpen}>
            Add training
         </Button>
  
        <Dialog
            open={open}
            onClose={handleClose}
        >
            <DialogTitle>New training</DialogTitle>
            
            <DialogContent>

                 <LocalizationProvider dateAdapter={AdapterDayjs}>
                   <DateTimePicker
                        format="DD.MM.YYYY HH:mm"
                        value={dayjs(training.date)}
                        onChange={date=>setTraining({...training, date: date})}
                                           
                    />
                </LocalizationProvider>

               
<TextField
                    margin="dense"
                    label="Activity"
                    value={training.activity}
                    onChange={e=>setTraining({...training, activity:e.target.value})}
                    fullWidth
                    variant="standard"
      />    

<TextField
                    margin="dense"
                    label="Duration"
                    value={training.duration}
                    onChange={e=>setTraining({...training, duration:e.target.value})}
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