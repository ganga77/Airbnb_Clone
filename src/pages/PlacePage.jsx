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
    const [price, setPrice] = useState(0)

    let { id } = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get('http://localhost:4000/places/' + id).then(response => {
            const { data } = response;
            setTitle(data.title);
            setAddress(data.address);
            setAddedPhotos(data.photos);
            setDescripton(data.description);
            setPerks(data.perks);
            setExtraInfo(data.extraInfo);
            setCheckIn(data.checkIn);
            setCheckOut(data.checkOut);
            setGuests(data.guests);
            setPrice(data.price)
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


    //     return (
    //         <div className="container mx-auto mt-8">
    //             <h1 className="text-3xl font-bold mb-4">{title}</h1>
    //             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    //             <div>
    //     {addedPhotos.map((photo, index) => (
    //         <div key={index} className="relative">
    //             <img
    //                 className="w-full h-64 object-cover mb-4 rounded-lg"
    //                 src={`http://localhost:4000/uploads/${photo}`}
    //                 alt="Place"
    //             />
    //             <button onClick={() =>removePhoto(photo)} className="absolute bottom-4 right-4 cursor-pointer text-white bg-black bg-opacity-50 rounded-2xl">

    //                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    //   <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
    // </svg>

    //             </button>
    //         </div>
    //     ))}
    // </div>





    //                 <div className="space-y-4">
    //                     <p className="text-gray-600">{description}</p>
    //                     <p className="text-gray-700">Address: {address}</p>
    //                     <p className="text-gray-700">Perks: {perks.join(", ")}</p>
    //                     <p className="text-gray-700">Extra Info: {extraInfo}</p>
    //                 </div>
    //                 <div className="space-y-4">
    //                     <p className="text-gray-700">Check-in: {checkIn}</p>
    //                     <p className="text-gray-700">Check-out: {checkOut}</p>
    //                     <p className="text-gray-700">Guests: {guests}</p>
    //                     <Link to={'/account/places'} className="text-blue-500 hover:underline">
    //                         Back to Your Listings
    //                     </Link>
    //                 </div>
    //             </div>
    //         </div>
    //     );
    // }

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
                <BookingWidget price={price}/>
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