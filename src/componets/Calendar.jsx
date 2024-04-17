import { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { getTrainingCustomer } from "../trainingcustomerapi";

const localizer = momentLocalizer(moment)

export default function Trainings() {
    const [trainings, setTrainings] = useState([]);  
    

   useEffect(() => { fetchTrainings() }, []);

    const fetchTrainings = () => {
        getTrainingCustomer()
            .then(trainingsData => {
            const formattedTrainings = trainingsData.map(training => {
                const startDate = new Date(training.date);
                const endDate = new Date(startDate.getTime() + training.duration * 60000);
                
                return {
                    id: training.id,
                    title:`${ training.activity} / ${training.customer.firstname} ${training.customer.lastname}`,
                    start: startDate,
                    end: endDate                    
                 };
            });
            // Set the formatted trainings data to state
            setTrainings(formattedTrainings);
        })
        .catch(error => console.error(error));
};

            

return (
        <>   
         <div style={{ height: 30 }}></div>
            <div className="" style={{ minHeight: 580 }}>
           
                <Calendar
                localizer={localizer}
                events={trainings}
                step={60}
                showMultiDayTimes
                defaultDate={new Date()}
                style={{ minHeight: 580 }}
                
                />
             
          </div>

      </>
    )
  
}


