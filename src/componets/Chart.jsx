import { useEffect, useState } from "react";
import { getTrainingCustomer } from "../trainingcustomerapi";
import {Bar, BarChart, CartesianGrid, XAxis, YAxis} from 'recharts';

export default function Chart() {

    const [chartData, setChartData]=useState([]);

    useEffect(() => { fetchChartData() }, []);

    const fetchChartData= ()=>{
        getTrainingCustomer()
        .then(trainingsData =>{

            const groupData = trainingsData.reduce((groupping, curValue) => {

                const existingActivity=groupping.find(item=>item.activity===curValue.activity);

                if (existingActivity) {
                    existingActivity.duration += curValue.duration;
                } else {
                    // If the activity doesn't exist, add it to the groupping array
                    groupping.push({
                        activity: curValue.activity,
                        duration: curValue.duration
                    });
                }
            
                return groupping;
            }, []);
            // Set the processed data in the state
            setChartData(groupData);
           
           
        })
        .catch(error => console.log(error));
}
    
console.log(chartData)
    return (
        <>
        <div style={{ height: 80}}></div>
        <span style={{ display: 'block', marginBottom: '1px'}}>Duration (min)</span>
        <BarChart 
            width={1000} 
            height={600} 
            data={chartData}
            margin={{
                top: 20,
                right: 40,
                left: 20,
                bottom: 5,
            }}>
             <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="activity" />
            <YAxis />
            <Bar dataKey="duration" fill="#963e20"/>
            </BarChart>
 

        </>
    );
}