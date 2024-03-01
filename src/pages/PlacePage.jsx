import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom"
import axios from "axios";
import BookingWidget from "./BookingWidget";


export default function PlacePage() {
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [description, setDescripton] = useState('');
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [guests, setGuests] = useState(1);
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [changePage, setChangePage] = useState(false);
    const [showAllPhotos, setShowAllPhotos] = useState(false)
    const [price, setPrice] = useState(0);
    const [place, setPlace] = useState(null)

    let { id } = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get('http://localhost:4000/places/' + id).then(response => {
            const { data } = response;
            console.log(data)
            setTitle(data.title);
            setAddress(data.address);
            setAddedPhotos(data.photos);
            setDescripton(data.description);
            setPerks(data.perks);
            setExtraInfo(data.extraInfo);
            setCheckIn(data.checkIn);
            setCheckOut(data.checkOut);
            setGuests(data.guests);
            setPrice(data.price);
            setPlace(data)
        })

    }, [id]);

    async function removePhoto(file) {
        try {
            const response = await axios.post(`http://localhost:4000/places/${id}/deletePhoto`, {
                file,
            });
            console.log(response.data);
            setChangePage(true);
        } catch (error) {
            console.error('Error removing photo:', error);

        }
    }

    useEffect(() => {
        if (changePage) {
            navigate('/account/places')
        }
    }, [changePage, navigate])


    if (showAllPhotos) {
        return (
            <div className="absolute inset-0 bg-white min-h-screen">
                <h2>Added photos for: {title}</h2>
                <Link to={'/'}>Go back to home screen</Link>
                <div className="p-8 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">

                    {addedPhotos.map((photo, index) => (
                        <img key={index} className="w-full h-64 object-cover" src={`http://localhost:4000/uploads/${photo}`} alt="photos" />
                    ))}
                </div>
            </div>
        )
    }


    return (
        <div className="mt-4 bg-gray-100 -mx-8 px-8 pt-8">
            <h1 className="text-3xl">{title}</h1>
            <a className="flex gap-1 my-3 block font-semibold underline" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`} target="_blank" rel="noopener noreferrer">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                </svg>
                {address}
            </a>
            <div className="relative">
                <div className="grid gap-2 grid-cols-[2fr_1fr] rounded-2xl overflow-hidden">
                    <div className="aspect-square overflow-hidden">
                        {addedPhotos?.[0] && (
                            <img className="w-full h-full object-cover" src={`http://localhost:4000/uploads/${addedPhotos[0]}`} alt="" />
                        )}
                    </div>
                    <div className="grid grid-rows-2 gap-2">
                        {addedPhotos?.[1] && (
                            <img className="aspect-square object-cover" src={`http://localhost:4000/uploads/${addedPhotos[1]}`} alt="" />
                        )}
                        <div className="overflow-hidden">
                            {addedPhotos?.[2] && (
                                <img className="aspect-square object-cover relative top-2" src={`http://localhost:4000/uploads/${addedPhotos[2]}`} alt="" />
                            )}
                        </div>

                    </div>
                </div>
                <button onClick={() => setShowAllPhotos(true)} className="flex gap-1 absolute bottom-2 right-2 py-2 px-4 bg-white rounded-2xl shadow shadow-md shadow-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                    </svg>Show more photos</button>
            </div>


            <div className="mt-8 grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]">
                <div>
                <div className="my-4">
                <h2 className="font-semibold text-2xl">Description</h2>
                {description}
            </div>

                    Check In  :{checkIn} <br />
                    Check Out :{checkOut} <br />
                    Max Guests allowed: {guests}
                    
                </div>
                <BookingWidget place={place}/>
            </div>
            <div className="bg-white -mx-8 px-8 py-8 border-t">
            <h2 className="font-semibold text-2xl">Extra Info</h2>
            <div className="mb-4 mt-2 text-sm text-gray-700 leading">
                        {extraInfo}
                    </div>
            </div>
        </div>

        
    );
}