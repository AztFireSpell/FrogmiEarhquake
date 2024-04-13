import React, { useState, useEffect } from "react";
import { API_URL } from "../../constants";
import "./earthquake.css"
import EarthquakeDetails from "./EarthquakesDetails";

function EarhtquakesList() {
  const [earthquakes, setEarthquakes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [pagination, setPagination] = useState(null)
  const [currentPage, setCurrentPage] = useState(1);


  //Fetch registros de api

  useEffect(() => {
    async function loadEarthquakes() {
      try {
        const response = await fetch(`${API_URL}?page=${currentPage}`);
        if (response.ok) {
          const json = await response.json();
          setEarthquakes(json);
          setPagination(json.pagination);
        } else {
          throw response
        }
      } catch (e) {
        setError("Ocurrio un error obteniendo los registros");
        console.log("Ocurrio un error");
      } finally {
        setLoading(false);
      }
    }
    loadEarthquakes();
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const renderPageButtons = () => {
    const totalPages = pagination.total;
    const buttonsToShow = 8;

    let startPage = Math.max(1, currentPage - Math.floor(buttonsToShow / 2));
    let endPage = Math.min(totalPages, startPage + buttonsToShow - 1);

    if (endPage - startPage + 1 < buttonsToShow) {
      startPage = Math.max(1, endPage - buttonsToShow + 1);
    }

    const pages = [];
    if (totalPages > 1) {
      for (let i = startPage; i <= endPage; i++) {
        pages.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            disabled={currentPage === i}
          >
            {i}
          </button>
        );
      }
    }
    return pages;
  };

  const getMagnitudeColor = (magnitude) => {
    if (magnitude < 1) {
      return "green"; 
    } else if (magnitude < 2) {
      return "orange"; 
    } else {
      return "red"; 
    }
  }


  return (
    <div>
      
      <h2>Mostrando pagina numero : {currentPage}</h2>

      <div className="pagination">
        {pagination && (
          <div>
            <button
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Anterior
            </button>
            {renderPageButtons()}
            <button
              disabled={currentPage === pagination.total_pages}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Siguiente
            </button>
          </div>
        )}
      </div>


      <div className="data-earthquakes">

        {earthquakes.data && earthquakes.data.map((earthquake) => (
          <div key={earthquake.id} className="earthquake-element">

            <div className="eartquake-content1">
              <div className="earthquake-title">
                <h3>{earthquake.attributes.title}</h3>
              </div>

              <div className="earthquake-time">
                <h3>{earthquake.attributes.time}</h3>
              </div>

              <div className="earthquake-magtype">
                Magnitud Tipo: {earthquake.attributes.mag_type}
              </div>

              <div className="earthquake-tsunami">
              {earthquake.attributes.tsunami ? (
                <div>
                  <span role="img" aria-label="Tsunami">
                    🌊
                  </span>{" "}
                  Tsunami
                </div>
              ) : (
                <div>
                  <span role="img" aria-label="No Tsunami">
                    ❌
                  </span>{" "}
                  No Tsunami
                </div>
              )}
            </div>

              <div className="earthquake-magnitude"
                style={{
                  backgroundColor: getMagnitudeColor(
                    parseFloat(earthquake.attributes.magnitude)
                  ),
                }}
              >
                Magnitude: {earthquake.attributes.magnitude}
              </div>
            </div>


            <div className="eartquake-content2">
            <div className="earthquake-place">
              Place: {earthquake.attributes.place}
            </div>
            <div className="earthquake-externalid">
              ID UNIVERSAL: {earthquake.attributes.external_id}
            </div>
            <div className="earthquake-coordinates">
              <h3>Coordenadas</h3>
              <h2>{earthquake.attributes.coordinates.longitude}</h2>
              <h2>{earthquake.attributes.coordinates.latitude}</h2>
            </div>
            <div className="earthquake-urlexternal">
              <a href={earthquake.links.external_url}>Mas detalles</a>
            </div>
            </div>

            <EarthquakeDetails earthquake={earthquake} totalComments={0} />
          </div>

        ))}
      </div>
  

      

    </div>
  );
}

export default EarhtquakesList;