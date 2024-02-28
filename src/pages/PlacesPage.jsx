import axios from "axios";
import { Link, useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import AccountNav from "./AccountNav";

export default function PlacesPage(){
    
    const {action} = useParams(); 
    const [places, setPlaces] = useState([]);

    // fetching data of places from /get route
    useEffect(() =>{
        axios.get('http://localhost:4000/places').then(({data}) =>{
            setPlaces(data);
        })
    }, []);
 
    return (

        <div>
            <AccountNav />
            <div className="text-center">
                list of all places pages<br/>
            <Link className="bg-primary text-white py-2 px-6 rounded-full" 
             to={'new'}>Add a new place</Link>
             </div>
            
           
            
             <div className="mt-4">
                {places.length > 0 && places.map(place =>(
                    <Link to={'/account/places/'+place._id} className="flex cursor-pointer gap-4 bg-gray-100 p-4 rounded-2xl">
                        <div className="flex w-32 h-32 bg-gray-300 ">
                            {place.photos.length > 0 && (
                                <img className="object-cover w-full h-full" src={'http://localhost:4000/uploads/'+place.photos[0]} alt=""/>
                            )}
                        </div>
                        <div className="grow-0 shrink">
                        <h2 className="text-xl">{place.title}</h2>
                        <p className="text-sm mt-2">{place.description}</p>
                        </div>
                        </Link>
                ))}
             </div>
        </div>
       
    )
}