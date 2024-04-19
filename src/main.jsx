import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import CustomerList from './componets/CustomerList.jsx';
import Trainings from './componets/Trainings.jsx';
import Calendar from './componets/Calendar.jsx';
import Chart from './componets/Chart.jsx';

const router = createBrowserRouter([ 
  {
    path: "/PersonalTrainerApplication",
    element: <App />,
    children: [                       
      {
        element: <CustomerList />,
        index: true                   // index route does not need any path
      },
      {
        path: "trainings",                // path can be defined relative to the parent path
        element: <Trainings />,
      },
      {
        path: "calendar",                // path can be defined relative to the parent path
        element: <Calendar />,
      },
      {
        path: "chart",                // path can be defined relative to the parent path
        element: < Chart />,
      },
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
