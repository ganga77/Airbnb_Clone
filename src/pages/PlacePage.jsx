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
        <h1>Hello - {title} - {description}</h1>
    )
}