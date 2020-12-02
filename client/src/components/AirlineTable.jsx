import React, {useEffect} from 'react'
import AirportFinder from "../apis/AirportFinder";
import { AirlineContext } from "../context/AirlineContext";

const AirlineTable = (props) => {
	const {airlines, setAirline} = useContext(AirlineContext)
	useEffect(() => {
		const fetchTableData = async() => {
			try{
				const tableResponse = await AirportFinder.get("/");
				console.log(tableResponse);
			} catch(err){}
		};
		
		fetchTableData();
	},[]);
	
	return(
		<div className="list-group">
			<table className="table table-hover table-dark">
				<tbody>
				
				</tbody>
			</table>
		</div>
	)
}

export default AirlineTable