import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';
import dayjs from "dayjs";


export default function Trainings() {
    const [trainings, setTrainings] = useState([]);

    const [quickFilterText, setQuickFilterText] = useState('');

    const trainingsUrl = "https://customerrestservice-personaltraining.rahtiapp.fi/gettrainings";

    const [colDefs, setColDefs] = useState([
        {
            cellRenderer: params =>
                <IconButton aria-label="delete" size="small" onClick={() => deleteTraining(params.data.id)}>
                    <DeleteIcon fontSize="small" ></DeleteIcon>
                </IconButton>, width: 50
        },
        { headerName: "Activity", field: "activity" },
        { headerName: "Date", field: "date",  valueFormatter: params => dayjs(params.value).format("DD.MM.YYYY HH:mm")},
        { headerName: "Duration (min)", field: "duration", getQuickFilterText: params => { return ''; } },
        {
            headerName: "Customer", field: "customer",
            valueGetter: params => params.data.customer.firstname + " " + params.data.customer.lastname
        }
    ])


    useEffect(() => { fetchTrainings() }, []);

    const fetchTrainings = () => {
        fetch(trainingsUrl)
            .then(response => {
                if (!response.ok)
                    throw new Error("error in fetch: " + response.statusText);
                return response.json();
            })

            .then(trainingsData => 
                setTrainings(trainingsData))

            .catch (error => console.error(error))    
            }    

    const deleteTraining = (url) => {
        console.log(url)
        if (window.confirm("Please confirm deletion")) {
            fetch("https://customerrestservice-personaltraining.rahtiapp.fi/api/trainings/"+ url, { method: 'DELETE' })
                .then(response => {
                    if (!response.ok)
                        throw new Error("error in fetch: " + response.statusText);
                    return response.json
                })
                .then(() => fetchTrainings())
                .catch(err => console.error(err))
        }
    }



    return (
        <>
            <div className="example-header">
                <h3>Trainings</h3>
                {/* Data for quick filtering */}
                <input
                    type="text"
                    placeholder="Search..."
                    value={quickFilterText}
                    onChange={(e) => setQuickFilterText(e.target.value)}
                />
            </div>

            <div className="ag-theme-material" style={{ height: 600 }}>
                <AgGridReact
                    rowData={trainings}
                    columnDefs={colDefs}
                    pagination={true}
                    paginationAutoPageSize={true}
                    quickFilterText={quickFilterText}
                />
            </div>
        </>
    )

}

