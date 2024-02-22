import { Link, Navigate } from "react-router-dom";
import { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../store/UserContext";

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);

    const { setUser } = useContext(UserContext);

    async function handleLoginUser(evt) {
        evt.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/login', {
                email,
                password
            }, {withCredentials : true});

            const userInfo = response.data; // Assuming user information is in response.data
            setUser(userInfo);
            setLoggedIn(true);
        } catch (err) {
            alert('Login Failed! Please try again later');
        }
    }

    if (loggedIn) {
        return <Navigate to={'/'} />;
    }

    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-64">
                <h1 className="text-4xl text-center mb-4">Login</h1>
                <form className="max-w-md mx-auto" onSubmit={handleLoginUser}>
                    <input
                        type="email"
                        placeholder={'your@email.com'}
                        value={email}
                        onChange={ev => setEmail(ev.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="password"
                        value={password}
                        onChange={ev => setPassword(ev.target.value)}
                    />
                    <button className="primary">Login</button>
                    <div className="text-center py-2 text-gray-500">
                        Don't have an account yet?
                        <Link className="underline text-black" to={'/register'}> Register Now</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
