import React from "react";

import {Route, Routes} from "react-router-dom"

import EarhtquakesList from "../features/eartquakes/EarthquakesList";
import Comments from "../features/eartquakes/Comments";

function AppRoutes () {
    return (
        <Routes>
            <Route path="/" element={<EarhtquakesList />} />
            <Route path="comments/:id" element={<Comments />} />
        </Routes>
    )
}

export default AppRoutes