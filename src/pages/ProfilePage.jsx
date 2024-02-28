import { useContext, useState } from "react";
import { Navigate, useParams } from "react-router-dom"; 
import { UserContext } from "../store/UserContext";
import PlacesPage from "./PlacesPage";
import AccountNav from "./AccountNav";

export default function ProfilePage() {
    const { user, ready, setUser } = useContext(UserContext);
    const [redirect, setRedirect] =  useState(null)
    let { subpage } = useParams();
if (!subpage) {
  subpage = 'profile';
}


    function logout(){
        //await axios.post('/logout');
        fetch('http://localhost:4000/logout', {
            credentials: 'include',
            method: 'POST'
        })
        setUser(null)
        setRedirect('/')
        

    }


    if (!ready) {
        return 'Loading....';
    }

    if (ready && !user && !redirect) {
        return <Navigate to={'/login'} />;
    }

    
   
    
    if(redirect){
        return <Navigate to={redirect} />;
    }
    return (
        <div>
            <AccountNav />
            {subpage==='profile' && (
                <div className="text-center max-w-lg mx-auto">
                    Logged in as {user.name}- {user.email}
                    <button onClick={logout} className="primary max-w-sm mt-2">Logout</button>
                </div>
            )}
            {subpage==='places' && (
                <PlacesPage />
            )}
        </div>
    );
}