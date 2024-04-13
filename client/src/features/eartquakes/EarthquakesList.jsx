import React, { useState, useEffect } from "react";
import { API_URL } from "../../constants";
import { Link } from "react-router-dom";
import "./earthquake.css";

function EarhtquakesList() {
  const [earthquakes, setEarthquakes] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [totalRows, setTotalRows] = useState(0)
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [perPage, setPerPage] = useState(10);

  useEffect(() => {
    async function loadEarthquakes() {
      try {

        let url = `${API_URL}?per_page=${perPage}&page=${currentPage}`;

        if (selectedFilters.length > 0) {
          const filtersParam = selectedFilters.join(",");
          url += `&mag_type=${filtersParam}`;
        }

        const response = await fetch(url);
        if (response.ok) {
          const json = await response.json();
          setEarthquakes(json);
          setPagination(json.pagination);
          setTotalRows(json.pagination.total)
        } else {
          throw response;
        }
      } catch (e) {
        setError("Ocurrio un error obteniendo los registros");
      }
    }
    loadEarthquakes();
  }, [currentPage, selectedFilters, perPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleFilterChange = (filter) => {
    if (selectedFilters.includes(filter)) {
      setSelectedFilters(selectedFilters.filter((f) => f !== filter));
    } else {
      setSelectedFilters([...selectedFilters, filter]);
    }
  };

  const handlePerPageChange = (e) => {
    setPerPage(e.target.value);
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
  };


  return (
    <div>

      <div className="perpage-controls">
        <label htmlFor="perPageInput">Valores por página: </label>
        <input
          id="perPageInput"
          type="number"
          min="1"
          value={perPage}
          onChange={handlePerPageChange}
        />

      </div>

      <h2>Filtros seleccionados: {selectedFilters.join(", ")}</h2>
      <div className="filter-control">

        
        <button
          onClick={() => handleFilterChange("md")}
          className={selectedFilters.includes("md") ? "selected" : ""}
        >
          MD
        </button>
        <button
          onClick={() => handleFilterChange("ml")}
          className={selectedFilters.includes("ml") ? "selected" : ""}
        >
          ML
        </button>
        <button
          onClick={() => handleFilterChange("ms")}
          className={selectedFilters.includes("ms") ? "selected" : ""}
        >
          MS
        </button>
        <button
          onClick={() => handleFilterChange("mw")}
          className={selectedFilters.includes("mw") ? "selected" : ""}
        >
          MW
        </button>
        <button
          onClick={() => handleFilterChange("me")}
          className={selectedFilters.includes("me") ? "selected" : ""}
        >
          ME
        </button>
        <button
          onClick={() => handleFilterChange("mi")}
          className={selectedFilters.includes("mi") ? "selected" : ""}
        >
          MI
        </button>
        <button
          onClick={() => handleFilterChange("mb")}
          className={selectedFilters.includes("mb") ? "selected" : ""}
        >
          MB
        </button>
        <button
          onClick={() => handleFilterChange("mlg")}
          className={selectedFilters.includes("mlg") ? "selected" : ""}
        >
          MLG
        </button>
      </div>


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

      <h2>Total de registros: {totalRows}</h2>
      <div className="data-earthquakes">
        {earthquakes.data &&
          earthquakes.data.map((earthquake) => (
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
                <div className="earthquake-comments">
                  <button><Link to={`/comments/${earthquake.id}`}>Ver comentarios</Link></button>
                </div>


                <div
                  className="earthquake-magnitude"
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
            </div>
          ))}
      </div>
    </div>
  );
}

export default EarhtquakesList;
