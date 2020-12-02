import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AirlineContext } from "../context/AirlineContext";
import AirportFinder from "../apis/AirportFinder";
import StarRating from "../components/StarRating";
import Reviews from "../components/Reviews";
import AddReview from "../components/AddReview";

const AirlineDetailPage = () => {
    const { id } = useParams();
    const { selectedAirline, setSelectedAirline } = useContext(AirlineContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await AirportFinder.get(`/${id}`);
				console.log(response);

                setSelectedAirline(response.data.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, []);
    return (
        <div>
            {selectedAirline && (
            <>
                <h1 className="text-center display-1">
                    {selectedAirline.airline.name}
                </h1>
                <div className="text-center">
                    <StarRating rating={selectedAirline.airline.average_rating} />
                    <span className="text-warning ml-1">
                        {selectedAirline.airline.count
                        ? `(${selectedAirline.airline.count})`
                        : "(0)"}
                    </span>
                </div>
                <div className="mt-3">
                    <Reviews reviews={selectedAirline.reviews} />
                </div>
                //<AddReview />
            </>
        )}
    </div>
    );
};

export default AirlineDetailPage;