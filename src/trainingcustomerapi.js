export const getTrainingCustomer=()=>{
    return fetch(import.meta.env.VITE_API_URL_TRA_CUST)
                .then(response => {
                    if (!response.ok)
                        throw new Error("error in fetch: " + response.statusText);
                    return response.json();
                })
            }