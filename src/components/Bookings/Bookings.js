
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';

const Bookings = () => {
    const [bokkings, setBookings] = useState([]);
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    useEffect(()=>{
        fetch('http://localhost:4000/bookings?email='+loggedInUser.email)
        .then(res=>res.json())
        .then(data=>{
            setBookings(data);
        })
    },[])
    return (
        <div>
            <h3>{bokkings.length}</h3>
            {
            bokkings.map(book=> <li>{book.name} From: {new Date(book.checkIn).toDateString('dd/MM/yyyy')} To: {new Date(book.checkOut).toDateString('dd/MM/yyyy')}</li>)
            }
        </div>
    );
};

export default Bookings;