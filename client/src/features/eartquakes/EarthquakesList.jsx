import React, { useState, useEffect } from "react";
import { API_URL } from "../../constants";


function EarhtquakesList() {
    const [earthquakes,setEarthquakes] = useState([]);
    const [, setLoading] = useState(true);
    const [, setError] = useState(null);

    //Fetch registros de api

    useEffect(() => {
        async function loadEarthquakes(){
            try {
                const response = await fetch(API_URL);
                if(response.ok){
                    const json = await response.json();
                    setEarthquakes(json);
                }else{
                    throw response
                }
            }catch (e) {
                setError("Ocurrio un error No se que...");
                console.log("Ocurrio un error");
            } finally {
                setLoading(false);
            }
        }
        loadEarthquakes();
    }, []);

    return (
        <div>
            {earthquakes.data && earthquakes.data.map((earthquake) => (
                <div key={earthquake.id} className="earthquake-container">
                    <h2>{earthquake.attributes.title}</h2>
                </div>
            ))}
        </div>
    );
}

export default EarhtquakesList;