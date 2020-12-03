import React, {useEffect, useContext} from 'react'
import AirportFinder from "../apis/AirportFinder";
import { AirlineContext } from "../context/AirlineContext";

const AirlineTable = (props) => {
	const {airlines, setAirline} = useContext(AirlineContext);
	useEffect(() => {
		const fetchTableData = async() => {
			try{
				const tableResponse = await AirportFinder.get("/");
				setAirline(tableResponse.data.data.airlines)
			} catch(err){}
		};
		
		fetchTableData();
	},[]);
	
	return(
		<div className="list-group">
			<table className="table table-hover table-dark">
			  <thead>
				<tr className="bg-secondary">
					<th scope="col">Flight#</th>
					<th scope="col">From</th>
					<th scope="col">To</th>
					<th scope="col">Departure</th>
					<th scope="col">Arrival</th>
					<th scope="col">Seats Available</th>
					<th scope="col">Book</th>
				</tr>
			  </thead>
				<tbody>
					{airlines && airlines.map((airline) => {
						return(
						<tr key={airline.flight_id}>
							<td>{airline.flight_no}</td>
							<td>{airline.departure_airport}</td>
							<td>{airline.arrival_airport}</td>
							<td>{airline.scheduled_departure}</td>
							<td>{airline.scheduled_arrival}</td>
							<td>{airline.seats_available}</td>
							<td>
							    <button className="btn btn-secondary">
								Book
								</button>
							</td>
						</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};

export default AirlineTable;