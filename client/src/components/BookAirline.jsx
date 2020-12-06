import React, { useState, useContext, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { AirlineContext } from "../context/AirlineContext";
import AirportFinder from "../apis/AirportFinder";

function makeid(length) {
   var result = '';
   var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   var charactersLength = characters.length;
   for( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}

function makeBook_ref(length) {
   var result = '';
   var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
   var charactersLength = characters.length;
   for( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}

const BookAirline = (props) => {
    const { id } = useParams();
    let history = useHistory();
    const { airline } = useContext(AirlineContext);
    const [Name, setName] = useState("");
    const [Address, setAddress] = useState("");
    const [Credit_Card, setCreditCard] = useState("");
    const [Email, setEmail] = useState("");
    const [Phone, setPhone] = useState("");

    useEffect(() => {
    const fetchData = async () => {
        const response = await AirportFinder.get(`/${id}`);
        console.log(response.data.data);
    };

    fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
		var ticket_no = makeid(13)
		var book_ref = makeBook_ref(6)
		var passenger_id = makeid(20)
        const BookAirline = await AirportFinder.put(`/${id}`, {
			ticket_no, book_ref, passenger_id, Name, Email, Phone, Address, Credit_Card
        });
        history.push(`/`);
    };

    return (
    <div>
        <form action="">
            <div className="form-group">
                <label htmlFor="Name">Name</label>
                <input
                    value={Name}
                    onChange={(e) => setName(e.target.value)}
                    id="Name"
                    className="form-control"
                    type="text"
                />
            </div>

            <div className="form-group">
                <label htmlFor="Address">Address</label>
                <input
                    value={Address}
                    onChange={(e) => setAddress(e.target.value)}
                    id="Address"
                    className="form-control"
                    type="text"
                />
            </div>
			
          <div className="form-group">
                <label htmlFor="Credit Card">Credit Card</label>
                <input
                    value={Credit_Card}
                    onChange={(e) => setCreditCard(e.target.value)}
                    id="Credit Card"
                    className="form-control"
                    type="text"
                />
            </div>

          <div className="form-group">
                <label htmlFor="Email">Email</label>
                <input
                    value={Email}
                    onChange={(e) => setEmail(e.target.value)}
                    id="Email"
                    className="form-control"
                    type="text"
                />
            </div>			
			
          <div className="form-group">
                <label htmlFor="Phone">Phone</label>
                <input
                    value={Phone}
                    onChange={(e) => setPhone(e.target.value)}
                    id="Phone"
                    className="form-control"
                    type="text"
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

export default BookAirline;