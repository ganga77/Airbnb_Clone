import { useState, useEffect } from "react";
import AccountNav from "./AccountNav";
import axios from "axios";
import {format} from "date-fns"
export default function BookingsPage(){
    const [bookings, setBookings] = useState([])
    useEffect(()=>{
        axios.get('http://localhost:4000/bookings').then(({data}) =>{
            setBookings(data);
        })
    },[])
    return (
        <div>
            <AccountNav />
        <div>
            {bookings?.length > 0 && (
                bookings.map(booking =>(
                    <div className="flex gap-4 bg-gray-200 rounded-2xl overflow-hidden">
                        <div className="w-48">
                        <img  className="w-full h-64 object-cover" src={`http://localhost:4000/uploads/${booking.place.photos[0]}`} alt="photos" />
                    
                            </div>
                            
                        <div className="py-3">
                            <h2 className="text-xl">{booking.place.address}</h2>
                            {format(new Date(booking.checkIn), 'yyyy-MM-dd')} - {format(new Date(booking.checkOut), 'yyyy-MM-dd')}</div>

                            <div>
                                {booking.price}
                            </div>
                    </div>
                ))
            )}
        </div>

        </div>
    )
}