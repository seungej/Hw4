import React, { useState, useContext, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { AirlineContext } from "../context/AirlineContext";
import AirportFinder from "../apis/AirportFinder";

const UpdateAirline = (props) => {
    const { id } = useParams();
    let history = useHistory();
    const { airline } = useContext(AirlineContext);
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [priceRange, setPriceRange] = useState("");

    useEffect(() => {
    const fetchData = async () => {
        const response = await AirportFinder.get(`/${id}`);
        console.log(response.data.data);
        setName(response.data.data.airline.name);
        setLocation(response.data.data.airline.location);
        setPriceRange(response.data.data.airline.price_range);
    };

    fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const UpdateAirline = await AirportFinder.put(`/${id}`, {
            name,
            location,
            price_range: priceRange,
        });
        history.push("/");
    };

    return (
    <div>
        <form action="">
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    id="name"
                    className="form-control"
                    type="text"
                />
            </div>

            <div className="form-group">
                <label htmlFor="location">Location</label>
                <input
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    id="location"
                    className="form-control"
                    type="text"
                />
            </div>
            <div className="form-group">
                <label htmlFor="price_range">Price Range</label>
                <input
                    value={priceRange}
                    onChange={(e) => setPriceRange(e.target.value)}
                    id="price_range"
                    className="form-control"
                    type="number"
                />
            </div>
            <button
                type="submit"
                onClick={handleSubmit}
                className="btn btn-primary"
            >
                Submit
            </button>
        </form>
    </div>
    );
};

export default UpdateAirline;