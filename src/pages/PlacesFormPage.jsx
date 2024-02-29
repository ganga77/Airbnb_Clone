import { useState, useEffect } from "react";
import PhotoUploader from "./PhotosUploader";
import Perks from "./Perks";
import AccountNav from "./AccountNav";
import { Navigate } from "react-router-dom";
export default function PlacesFormPage(){


    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [description, setDescripton] = useState('');
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [guests, setGuests] = useState(1);
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [redirect, setRedirect] = useState(false);
    const [price, setPrice] = useState(100);

    async function addNewPlace(ev) {
        ev.preventDefault();
    
        const placeData = {
            title,
            address,
            description,
            perks,
            addedPhotos,
            extraInfo,
            checkIn,
            checkOut,
            guests,
            price
        };
    
        try {
            const response = await fetch('http://localhost:4000/places', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(placeData),
                credentials: 'include',
            });
    
            if (response.ok) {
                const placeDoc = await response.json();
                console.log('Place created successfully:', placeDoc);
                setRedirect(true)
                
            } else {
                
                console.error('Place creation failed:', response.statusText);
            }
        } catch (error) {
            
            console.error('Error adding new place:', error);
        }
    }

    if(redirect){
        return <Navigate to={'/account/places'} />
    }

    return (
        <>
        <div>
            <AccountNav />
                    <form onSubmit={addNewPlace}>
                        <h2 className="text-xl mt-4">Title</h2>
                        <input type="text" value={title} onChange={ev => setTitle(ev.target.value)} placeholder="title, for example my lovely apartment" />
                        <h2 className="text-xl mt-4">Address</h2>
                        <input type="text" value={address} onChange={ev => setAddress(ev.target.value) } placeholder="address" />

                        <PhotoUploader setAddedPhotos={setAddedPhotos}/>
                        
                        <h2 className="text-2xl mt-4">Description</h2>
                        <p className="text-gray-500 text-sm">Description of the place</p>
                        <textarea value={description} onChange={ev => setDescripton(ev.target.value)}/>

                        <Perks setPerks={setPerks}/>

                        <h2 className="text-2xl mt-4">Extra Info</h2>
                        <p className="text-gray-500 text-sm">house rules, etc</p>
                        <textarea value={extraInfo} onChange={ev => setExtraInfo(ev.target.value)}/>

                        <h2 className="text-2xl mt-4">Checkin & Checkout timing</h2>
                        <p className="text-gray-500 text-sm">add check in and out times, remember to give some time for other guests</p>
                        <div className="grid gap-2 grid-cols-2 md:grid-cols-4 ">
                            <div className="mt-2 -mb-1">
                                <h3>Checkin Time</h3>
                            <input type="text" value={checkIn} onChange={ev => setCheckIn(ev.target.value)} placeholder="14:00"/>
                            </div>
                            
                            <div className="mt-2 -mb-1">
                            <h3>Checkout Time</h3>
                            <input type="text" value={checkOut} onChange={ev => setCheckOut(ev.target.value)} placeholder="19:00"/>
                            </div>

                            <div >
                            <h3 className="mt-2 -mb-1">Max Guests</h3>
                            <input type="number" value={guests} onChange={ev => setGuests(ev.target.value)} />
                            </div>

                            <div >
                            <h3 className="mt-2 -mb-1">Price per night</h3>
                            <input type="number" value={price} onChange={ev => setPrice(ev.target.value)} />
                            </div>

                            </div>


                            <div>
                                <button className="primary my-4">Save</button>
                            </div>
                        
                    </form>
                </div>
        </>
    )
}