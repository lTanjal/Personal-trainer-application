export const getCustomers=()=>{
    return fetch(import.meta.env.VITE_API_URL_CUSTOMERS)
                .then(response => {
                    if (!response.ok)
                        throw new Error("error in fetch: " + response.statusText);
                    return response.json();
                })
            }