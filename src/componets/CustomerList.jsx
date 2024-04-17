import { useEffect, useState, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';
import AddCustomer from "./AddCustomer";
import EditCustomer from "./EditCustomer";
import AddTraining from "./AddTraining";
import GetAppIcon from '@mui/icons-material/GetApp';
import { getCustomers } from "../custapi";
  

export default function CustomerList() {
    const [customers, setCustomers] = useState([]);
    const [quickFilterText, setQuickFilterText] = useState('');
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

    const fetchCustomers = () => {
        getCustomers()
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
        fetch(import.meta.env.VITE_API_URL_CUSTOMERS, {
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
        fetch(import.meta.env.VITE_API_URL_TRAININGS, {
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
    const gridRef = useRef();

    const columnKeys = ['firstname', 'lastname', 'email', 'phone','streetaddress','city','postcode'];
    const exportToCsv = () => {
        const params = {
            columnKeys:columnKeys,
            fileName: 'customers.csv', // Specify the file name for the exported CSV file
        };
        gridRef.current.api.exportDataAsCsv(params);
    };


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
                    <IconButton aria-label="Download CSV export file" onClick={exportToCsv}>
                          <GetAppIcon />
                    </IconButton>
                    <AddCustomer addCustomer={addCustomer}/>
                </div>
            </div>
            <div className="ag-theme-material" style={{ height: 600 }}>
                    <AgGridReact
                    ref={gridRef}
                    rowData={customers}
                    columnDefs={colDefs}
                    pagination={true}
                    paginationAutoPageSize={true}
                    quickFilterText={quickFilterText}
                    suppressExcelExport={true}
                />
            </div>
           
        </>
    )

}

