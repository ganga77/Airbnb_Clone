import axios from "axios";
import { Link, Navigate, useParams } from "react-router-dom"
import { useState } from "react";
export default function PlacesPage(){
    
    const {action} = useParams();
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [description, setDescripton] = useState('');
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [guests, setGuests] = useState(1);
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [redirect, setRedirect] = useState('');

    // function uploadPhoto(ev){
    //     const files = ev.target.files;
    //     const data = new FormData();
    //     for(let i=0; i<files.length; i++){
    //         data.append('photos', files[i]);
    //     }
        
    //     axios.post('/upload', data, {
    //         headers: { 'Content-type': 'multipart/form-data' }
    //     }).then(response =>{
    //         const {data:filename} = response;
    //         setAddedPhotos(prev =>{
    //             return [...prev, filename]
    //         })
    //     })
    // }

    function handleCbClick(ev){
        const {checked, name} = ev.target;
        if(checked){
            setPerks(prevPerks =>{
                return [...prevPerks, name]
            })
        }else{
            setPerks(prevPerks => prevPerks.filter(selectedName => selectedName !== name));
        }
    }

    async function addnewPlace(ev){
        ev.preventDefault();
        const response = await axios.post('http://localhost:4000/places', {
            title, address, description,
            perks, extraInfo, checkIn, checkOut, guests
        });
        const placeInfo = response.data;
        console.log(placeInfo);
    }

    
    return (
        <div className="text-center">
            <Link className="bg-primary text-white py-2 px-6 rounded-full" 
             to={'new'}>Add a new place</Link>
             {action === 'new' && (
                <div>
                    <form onSubmit={addnewPlace}>
                        <h2 className="text-xl mt-4">Title</h2>
                        <input type="text" value={title} onChange={ev => setTitle(ev.target.value)} placeholder="title, for example my lovely apartment" />
                        <h2 className="text-xl mt-4">Address</h2>
                        <input type="text" value={address} onChange={ev => setAddress(ev.target.value) } placeholder="address" />

                         
                        {/* <h2 className="text-xl mt-4">Photos</h2>
                        <div className="flex gap-2">
                        <input type="text" placeholder="Add using a link.... jpg"></input>
                        <button className="bg-gray-200 px-4 rounded-2xl">Add Photo</button>
                        </div>
                        
                        <div className="mt-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                        
                        <label className="cursor-pointer border bg-transparent rounded-2xl p-8 text-2xl text-gray-600">Upload
                            <input type="file" multiple className="hidden" onChange={uploadPhoto}/>
                        </label>

                        </div> */}

                        <h2 className="text-2xl mt-4">Description</h2>
                        <p className="text-gray-500 text-sm">Description of the place</p>
                        <textarea value={description} onChange={ev => setDescripton(ev.target.value)}/>

                        <h2 className="text-2xl mt-4">Perks</h2>
                        <p className="text-gray-500 text-sm">Select operks of your choice</p>
                        <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
                            <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                                <input type="checkbox" name="wifi" onChange={handleCbClick}/>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M8.288 15.038a5.25 5.25 0 0 1 7.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 0 1 1.06 0Z" />
</svg>

                                <span > Wifi</span>
                            </label>
                            <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                

                                <input type="checkbox" name="tv" onChange={handleCbClick}/>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
</svg>
                                <span> TV</span>
                            </label>
                            <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                                <input type="checkbox" />
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
</svg>

                                <span> Parking</span>
                            </label>
                            <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                                <input type="checkbox" name="entrance" onChange={handleCbClick}/>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 4.5-15 15m0 0h11.25m-11.25 0V8.25" />
</svg>

                                <span> Entrance</span>
                            </label>
                            <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                                <input type="checkbox" name="pets" onChange={handleCbClick}/>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z" />
</svg>

                                <span> Pets</span>
                            </label>
                        </div>

                        <h2 className="text-2xl mt-4">Extra Info</h2>
                        <p className="text-gray-500 text-sm">house rules, etc</p>
                        <textarea value={extraInfo} onChange={ev => setExtraInfo(ev.target.value)}/>

                        <h2 className="text-2xl mt-4">Checkin & Checkout timing</h2>
                        <p className="text-gray-500 text-sm">add check in and out times, remember to give some time for other guests</p>
                        <div className="grid gap-2 sm:grid-cols-3 items-center">
                            <div className="mt-2 -mb-1">
                                <h3>Checkin Time</h3>
                            <input type="text" value={checkIn} onChange={ev => setCheckIn(ev.target.value)} placeholder="14:00"/>
                            </div>
                            
                            <div className="mt-2 -mb-1">
                            <h3>Checkout Time</h3>
                            <input type="text" value={checkOut} onChange={ev => setCheckOut(ev.target.value)} placeholder="19:00"/>
                            </div>

                            <div className="mt-2 -mb-1">
                            <h3>Max Guests</h3>
                            <input type="number" value={guests} onChange={ev => setGuests(ev.target.value)} placeholder="3"/>
                            </div>
                            
                            <div>
                                <button className="primary my-4">Save</button>
                            </div>
                        </div>
                    </form>
                </div>
             )}
        </div>
    )
}