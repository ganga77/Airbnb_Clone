import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import axios from "axios";


export default function PlacePage(){
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [description, setDescripton] = useState('');
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [guests, setGuests] = useState(1);
    const [addedPhotos, setAddedPhotos] = useState([]);
    
    
    let {id} = useParams();
    useEffect(() =>{
        if(!id){
            return;
        }
        axios.get('http://localhost:4000/places/'+id).then(response =>{
            const {data} = response;
            setTitle(data.title);
            setAddress(data.address);
            setAddedPhotos(data.photos);
            setDescripton(data.description);
            setPerks(data.perks);
            setExtraInfo(data.extraInfo);
            setCheckIn(data.checkIn);
            setCheckOut(data.checkOut);
            setGuests(data.guests);
        })
        
    }, [id])
    return (
        <div className="container mx-auto mt-8">
            <h1 className="text-3xl font-bold mb-4">{title}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div>
                    <img
                        className="w-full h-64 object-cover mb-4"
                        src={`http://localhost:4000/uploads/${addedPhotos[0]}`}
                        alt="Place"
                    />
                </div>
                <div>
                    <p className="text-gray-600 mb-2">{description}</p>
                    <p className="text-gray-700 mb-2">{address}</p>
                    <p className="text-gray-700 mb-2">Perks: {perks.join(", ")}</p>
                    <p className="text-gray-700 mb-2">Extra Info: {extraInfo}</p>
                </div>
                <div>
                    <p className="text-gray-700 mb-2">Check-in: {checkIn}</p>
                    <p className="text-gray-700 mb-2">Check-out: {checkOut}</p>
                    <p className="text-gray-700 mb-2">Guests: {guests}</p>
                </div>
            </div>
        </div>
    );
}