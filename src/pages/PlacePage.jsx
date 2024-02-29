import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom"
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
    const [changePage, setChangePage] = useState(false);
    
    let {id} = useParams();
    const navigate = useNavigate();
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

    useEffect(()=>{
        if(changePage){
            navigate('/account/places')
        }
    }, [changePage, navigate])
    
    
    return (
        <div className="container mx-auto mt-8">
            <h1 className="text-3xl font-bold mb-4">{title}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div>
    {addedPhotos.map((photo, index) => (
        <div key={index} className="relative">
            <img
                className="w-full h-64 object-cover mb-4 rounded-lg"
                src={`http://localhost:4000/uploads/${photo}`}
                alt="Place"
            />
            <button onClick={() =>removePhoto(photo)} className="absolute bottom-4 right-4 cursor-pointer text-white bg-black bg-opacity-50 rounded-2xl">
                
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
</svg>

            </button>
        </div>
    ))}
</div>





                <div className="space-y-4">
                    <p className="text-gray-600">{description}</p>
                    <p className="text-gray-700">Address: {address}</p>
                    <p className="text-gray-700">Perks: {perks.join(", ")}</p>
                    <p className="text-gray-700">Extra Info: {extraInfo}</p>
                </div>
                <div className="space-y-4">
                    <p className="text-gray-700">Check-in: {checkIn}</p>
                    <p className="text-gray-700">Check-out: {checkOut}</p>
                    <p className="text-gray-700">Guests: {guests}</p>
                    <Link to={'/account/places'} className="text-blue-500 hover:underline">
                        Back to Your Listings
                    </Link>
                </div>
            </div>
        </div>
    );
}