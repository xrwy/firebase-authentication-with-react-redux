import { Link } from "react-router-dom"
import { useSelector } from 'react-redux'; 
import { logout, emailVerification } from '../firebase';
import { useDispatch } from 'react-redux';
import { logout as logoutHandle } from "../store/auth";
import { useNavigate } from "react-router-dom";
import UpdateProfile from "../components/UpdateProfile";

export default function Home() {
    
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth);
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        
        dispatch(logoutHandle())

        navigate('/login', {
            replace:true
        })
        
    }

    const handleVerification = async () => {
        await emailVerification();
    }

    if(user) {
        return (
            <div className="max-w-2xl mx-auto py-4">
                <h1 className="flex gap-x-4 items-center px-4 flex-wrap gap-y-1.5">
                    {
                        user.photoURL && <img className="w-7 h-7 rounded-full" src={user.photoURL} alt=""/>
                    }
                    <span style={{wordBreak:'break-all'}}>You are logged in. ({user.email})</span>
                    <button onClick={handleLogout} className="py-2 full rounded px-4 text-sm text-white bg-indigo-700">
                        Log out
                    </button>
                    {
                        !user.emailVerified &&
                        <button onClick={handleVerification} className="py-2 rounded px-4 text-sm text-white bg-indigo-700">
                            Confirm Email
                        </button>
                    }
                </h1>
                <UpdateProfile />
            </div>
        )
    }

    return (
        <div className="py-4 px-4">
            <Link to={"/register"} className="px-3 py-3 inline-block disabled:opacity-20 cursor-pointer inline-flex items-center border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Sign up</Link>
            <Link to={"/login"} className="px-3 py-3 ml-4 inline-block disabled:opacity-20 cursor-pointer inline-flex items-center border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Login</Link>
        </div>
    )
}