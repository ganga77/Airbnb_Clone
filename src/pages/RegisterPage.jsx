import { Link, Navigate } from "react-router-dom"
import { useContext, useState } from "react"
import axios from "axios";
import { UserContext } from "../store/UserContext";
export default function RegisterPage(){
    const {setUser} = useContext(UserContext);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [registered, setIsRegistered] = useState(false);
    // This function will send data to backend /register
    async function registerUser(ev){
        ev.preventDefault();
        try{
        //     await axios.post('http://localhost:4000/register', {
        //     name, 
        //     email,
        //     password
        // });
        await fetch('http://localhost:4000/register', {
            method: 'POST',
            body: JSON.stringify({name, email, password}),
            headers: {'Content-Type': 'application/json'}
        })
        const response = await fetch('http://localhost:4000/login', {
                email,
                password
            }, { withCredentials: true });

            const userInfo = response.data;
            setUser(userInfo);

        setIsRegistered(true);
        
        alert('Registration Successful. You can now login')
        }catch (err){
            alert('Registration Failed! Please try again later')
        }
    }
    if (registered) {
        return <Navigate to={'/'} />;
    }
    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-64">
            <h1 className="text-4xl text-center mb-4">Register</h1>
            <form className="max-w-md mx-auto" onSubmit={registerUser}>
            <input type="text" 
            placeholder={'Ganga Singh'} 
            value={name} 
            onChange={ev => setName(ev.target.value)}/>

                <input type="email" 
                placeholder={'your@email.com'}
                value={email}
                onChange={ev => setEmail(ev.target.value)} />

                <input type="password" 
                placeholder="password"
                value={password}
                onChange={ev => setPassword(ev.target.value)}/>

                <button className="primary">Register</button>
                <div className="text-center py-2 text-gray-500">Already have an account??
                    <Link className="underline text-black" to={'/login'}> Login Now</Link>
                </div>
            </form>
            </div>
        </div>
    )
}