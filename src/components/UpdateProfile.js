import { useState } from "react"
import { update, auth, resetPassword, _updateEmail } from "../firebase";
import { useDispatch, useSelector } from 'react-redux';
import { login } from "../store/auth";
import { toast } from "react-hot-toast";
import { useNavigate } from 'react-router-dom';

let initialState = {password:'', confirmPassword:''}

export default function UpdateProfile() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector(state => state.auth)
    const [displayName, setDisplayName]  = useState(user.displayName || '');
    const [avatar, setAvatar]  = useState(user.photoURL || '');
    const [password, setPassword] = useState(initialState)
    const [email, setEmail] = useState('');

    const handleDisplayNameandPhotoURLSubmit = async (e) => {
        e.preventDefault();

        try {
            await update({displayName, photoURL:avatar})
            dispatch(login(
                {
                    displayName:auth.currentUser.displayName,
                    email:auth.currentUser.email,
                    emailVerified:auth.currentUser.emailVerified,
                    photoURL:auth.currentUser.photoURL,
                    uid:auth.currentUser.uid
                }
            ))
            
        }catch (error) {
            return toast.error(error.message);
        }
    }

    const getPassword = (e) => {
        setPassword({...password, [e.target.name]:e.target.value})
    }

    const handleResetSubmit = async (e) => {
        e.preventDefault();

        try {
            const result = await resetPassword({password:password.password});
            if(result) {
                setPassword(initialState);
                localStorage.removeItem('user')
                navigate('/login', {
                    replace:true
                })
            }
        }catch (error) {
            toast.error(error.message);
        }

    }

    const handleEmailAddressSubmit = async (e) => {
        e.preventDefault();
        
        await _updateEmail(email);

        localStorage.removeItem('user');
        navigate('/login', {
            replace:true
        })
    }


    return (
        <div className="px-4">
            <form className="max-w-xl mx-auto grid gap-y-4 py-4" onSubmit={handleDisplayNameandPhotoURLSubmit}>
                <h1 className="text-xl font-bold mb-4">Update Profile</h1>
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Name - Surname
                    </label>
                    <div className="mt-1">
                        <input
                        type="text"
                        name="nameAndSurname"
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="John Doe"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        autoComplete="off"
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Photo
                    </label>
                    <div className="mt-1">
                        <input
                        type="text"
                        name="avatar"
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="John Doe"
                        value={avatar}
                        onChange={(e) => setAvatar(e.target.value)}
                        autoComplete="off"
                        />
                    </div>
                </div>
                <div>
                    <button 
                    className='disabled:opacity-20 cursor-pointer inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500' 
                    type='submit'
                    disabled={!displayName || !avatar}>
                        Update Profile
                    </button>
                </div>
            </form>

            <hr />

            <form className="max-w-xl mx-auto grid gap-y-4 py-4" onSubmit={handleResetSubmit}>
                <h1 className="text-xl font-bold mb-4">Reset Password</h1>
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        New Password
                    </label>
                    <div className="mt-1">
                        <input
                        type="password"
                        name="password"
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="******"
                        value={password.password}
                        onChange={(e) => getPassword(e)}
                        autoComplete="off"
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        New Password Again
                    </label>
                    <div className="mt-1">
                        <input
                        type="password"
                        name="confirmPassword"
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="******"
                        value={password.confirmPassword}
                        onChange={(e) => getPassword(e)}
                        autoComplete="off"
                        />
                    </div>
                </div>
                <div>
                    <button 
                    className='disabled:opacity-20 cursor-pointer inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500' 
                    type='submit'
                    disabled={!(password.password === password.confirmPassword && password.password && password.confirmPassword) ? true : false}>
                        Reset Password
                    </button>
                </div>
            </form>

            <hr />  

            <form className="max-w-xl mx-auto grid gap-y-4 py-4" onSubmit={handleEmailAddressSubmit}>
                <h1 className="text-xl font-bold mb-4">E-Mail Update </h1>
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        New E-Mail
                    </label>
                    <div className="mt-1">
                        <input
                        type="email"
                        name="mail"
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="YourNewEmail@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="off"
                        />
                    </div>
                </div>
                <div>
                    <button 
                    className='disabled:opacity-20 cursor-pointer inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500' 
                    type='submit'
                    disabled={!email ? true : false}>
                        Update E-Mail
                    </button>
                </div>
            </form>
        </div>
    )
}
