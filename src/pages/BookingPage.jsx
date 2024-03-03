import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import axios from "axios";
import BookingDates from "./BookingDates";

export default function BookingPage(){
    const {id} = useParams();
    const [booking, setBooking] = useState(null);

    useEffect(()=>{
        if(id){
            axios.get('http://localhost:4000/bookings').then(response =>{
                const foundBooking = response.data.find(({_id})=> _id === id); 
                if(foundBooking){
                    setBooking(foundBooking)
                }
            })
        }
    }, [id]);

    if(!booking){
        return '';
    }

    return (
        <div className="my-8">
            <h1 className="text-3xl">{booking.place.title}</h1>
            <a className="flex gap-1 my-3 block font-semibold underline" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(booking.place.address)}`} target="_blank" rel="noopener noreferrer">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                </svg>
                {booking.place.address}
            </a>

            <div className="bg-gray-200 p-4 mb-4 rounded-2xl">
                <h2 className="text-xl">Your Booking Information:</h2>
                <BookingDates booking={booking}/>

                <div className="flex bg-primary p-4 text-white rounded-2xl gap-1 py-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
                                        </svg>

                                        Total price: ${booking.price}
                                    </div>
            </div>

            <div className="grid gap-2 grid-cols-[2fr_1fr] rounded-2xl overflow-hidden">
                    <div className="aspect-square overflow-hidden">
                        {booking.place.photos?.[0] && (
                            <img className="w-full h-full object-cover" src={`http://localhost:4000/uploads/${booking.place.photos[0]}`} alt="" />
                        )}
                    </div>
                    <div className="grid grid-rows-2 gap-2">
                        {booking.place.photos?.[1] && (
                            <img className="aspect-square object-cover" src={`http://localhost:4000/uploads/${booking.place.photos[1]}`} alt="" />
                        )}
                        <div className="overflow-hidden">
                            {booking.place.photos?.[2] && (
                                <img className="aspect-square object-cover relative top-2" src={`http://localhost:4000/uploads/${booking.place.photos[2]}`} alt="" />
                            )}
                        </div>

                    </div>
                </div>

        </div>
    )
}