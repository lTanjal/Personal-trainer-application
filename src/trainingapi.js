export const getTrainings=()=>{
    return fetch(import.meta.env.VITE_API_URL_TRAININGS)
                .then(response => {
                    if (!response.ok)
                        throw new Error("error in fetch: " + response.statusText);
                    return response.json();
                })
            }