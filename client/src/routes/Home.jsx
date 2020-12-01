import React from "react";
import AddAirline from "../components/AddAirline";
import Header from "../components/Header";
import AirlineList from "../components/AirlineList";

const Home = () => {
    return (
        <div>
            <Header />
            <AddAirline />
            <AirlineList />
        </div>
    );
};

export default Home;
