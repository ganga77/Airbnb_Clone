import { useContext, useEffect, useState } from "react"
import { differenceInCalendarDays } from "date-fns";
import { Navigate } from "react-router-dom";
import { UserContext } from "../store/UserContext";

export default function BookingWidget({ place }) {
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [numOfGuests, setNumOfGuests] = useState(1);
    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');
    const [redirect, setRedirect] = useState('');

    const {user} = useContext(UserContext);

    useEffect(() => {
        if (user && user.name) {
            setName(user.name);
        }
    }, [user]);
    
    
    let numberOfDays = 0;
    if (checkIn && checkOut) {
        numberOfDays = differenceInCalendarDays(new Date(checkOut), new Date(checkIn))
    }

    async function bookThisPlace() {
        const data = {
            place: place._id,
            checkIn,
            checkOut,
            numOfGuests,
            name,
            mobile,
            price: numberOfDays * place.price
        };
    
        try {
            const response = await fetch('http://localhost:4000/booking', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
                credentials: 'include',
            });
    
            if (response.ok) {
                const bookingDoc = await response.json();
                console.log('Booking created successfully:', bookingDoc._id);
                setRedirect(`/account/bookings/${bookingDoc._id}`);
            } else {
                console.error('Booking creation failed:', response.statusText);
            }
        } catch (error) {
            console.error('Error creating new booking:', error);
        }
    }
     

    if(redirect){
        return <Navigate to={redirect}/>
    }

    return (
        <div>
            <div className="bg-white shadow p-4 rounded-2xl">
                <div className="text-2xl text-center">
                Price: ${place ? place.price : 0}/ per night
                </div>

                <div className="border rounded-xl">
                    <div className="flex">
                        <div className="py-4 px-4">
                            <label>Check In:</label>
                            <input type="date" value={checkIn} onChange={ev => setCheckIn(ev.target.value)} />
                        </div>

                        <div className="py-4 px-4 border-l">
                            <label>Check Out:</label>
                            <input type="date" value={checkOut} onChange={ev => setCheckOut(ev.target.value)} />
                        </div>

                    </div>


                    <div className="py-4 px-4 border-t">
                        <label>Guests: </label>
                        <input type="number" value={numOfGuests} onChange={ev => setNumOfGuests(ev.target.value)} />
                    </div>

                    {numberOfDays > 0 && (

                        <div className="py-4 px-4">
                            <label>Your full name</label>
                            <input type="text" value={name}
                                placeholder="Enter your full name"
                                onChange={ev => setName(ev.target.value)} 
                                />

                            <label>Your phone number</label>
                            <input type="tel" 
                            value={mobile}
                                
                                onChange={ev => setMobile(ev.target.value)} />
                        </div>



                    )}
                </div>

                <button onClick={bookThisPlace} className="primary mt-4">Book this place
                    {numberOfDays > 0 && (
                        <span>{numberOfDays * place.price}</span>
                    )}</button>
            </div>
        </div>
    )
}