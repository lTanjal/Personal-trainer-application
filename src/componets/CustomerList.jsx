import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Training from "./Trainings";
import AddCustomer from "./AddCustomer";
import EditCustomer from "./EditCustomer";
import AddTraining from "./AddTraining";


export default function CustomerList() {
    const [customers, setCustomers] = useState([]);
    const [quickFilterText, setQuickFilterText] = useState('');

    const customersUrl = "https://customerrestservice-personaltraining.rahtiapp.fi/api/customers";
    const cmTrainingUrl= "https://customerrestservice-personaltraining.rahtiapp.fi/api/trainings";
    const [colDefs, setColDefs] = useState([
        {
            cellRenderer: params =>
                <IconButton aria-label="delete" size="small" onClick={() => deleteCustomer(params.data._links.customer.href)}>
                    <DeleteIcon fontSize="small" ></DeleteIcon>
                </IconButton>, width: 50
        },
        {
            cellRenderer: params => <EditCustomer data={params.data} updateCustomer={updateCustomer} />
            , width: 50
        },
        {
            cellRenderer: params => <AddTraining data={params.data._links.customer.href} addTraining={addTraining} />
            , width: 160
        },
      
        { headerName: "First name", field: 'firstname' },
        { headerName: "Last name", field: "lastname" },
        {
            headerName: "Email", field: "email", getQuickFilterText: params => {
                return '';
            }
        },
        {
            field: "phone", width: 150, getQuickFilterText: params => {
                return '';
            }
        },
        {
            headerName: "Address", field: "streetaddress", getQuickFilterText: params => {
                return '';
            }
        },
        { field: "city", width: 120 },
        { field: "postcode", width: 120, getQuickFilterText: params => { return ''; } },


    ])


    useEffect(() => { fetchCustomers() }, []);
//useEffect(() => { resetD() }, []);

    const resetD = () => {
        fetch('https://customerrestservice-personaltraining.rahtiapp.fi/reset', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        })
            .then(response => {
                if (!response.ok)
                    throw new Error('Network response was not ok');
                return response.json();
            })
            .then(data => {
                console.log('Response:', data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }


    const fetchCustomers = () => {
        fetch(customersUrl)
            .then(response => {
                if (!response.ok)
                    throw new Error("error in fetch: " + response.statusText);
                return response.json();
            })

            .then(customersData => setCustomers(customersData._embedded.customers))
            .catch(err => console.error(err))
    }


    const deleteCustomer = (url) => {
        if (window.confirm("Please confirm deletion")) {
            fetch(url, { method: 'DELETE' })
                .then(response => {
                    if (!response.ok)
                        throw new Error("error in fetch: " + response.statusText);
                    return response.json
                })
                .then(() => fetchCustomers())
                .catch(err => console.error(err))
        }
    }


    const addCustomer = (newCustomer) => {
        fetch(customersUrl, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(newCustomer)
        })
            .then(response => {
                if (!response.ok)
                    throw new Error('Error when adding a customer')
                return response.json()
            })
            .then(() => fetchCustomers())
            .catch(err => console.error(err))
    }
    
    const updateCustomer = (url, updateCustomer) => {
        fetch(url, {
            method: 'PUT',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(updateCustomer)
        })
            .then(response => {
                if (!response.ok)
                    throw new Error('Error when updating customer')
                return response.json()
            })
            .then(() => fetchCustomers())
            .catch(err => console.error(err))

    }

    const addTraining = (addTraining) => {
        fetch(cmTrainingUrl, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(addTraining)
            
        })
       
            .then(response => {
                console.log(response)
                if (!response.ok)
                    throw new Error('Error when adding new training')
                return response.json()
                
            })
            .then(() => fetchCustomers())
            .catch(err => console.error(err))

    }
    return (
        <>
            <div className="example-header">
                <h3>Customers</h3>
                
                {/* First or last name for quick filtering */}
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <input
                        type="text"
                        placeholder="Search..."
                        value={quickFilterText}
                        onChange={(e) => setQuickFilterText(e.target.value)}
                    />
                    <div style={{ flex: '1' }} />
                    <AddCustomer addCustomer={addCustomer}/>
                </div>
            </div>
            <div className="ag-theme-material" style={{ height: 600 }}>
                    <AgGridReact
                    rowData={customers}
                    columnDefs={colDefs}
                    pagination={true}
                    paginationAutoPageSize={true}
                    quickFilterText={quickFilterText}
                />
            </div>
        
        </>
    )

}

