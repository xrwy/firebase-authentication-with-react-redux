import { useState } from "react";
import { login } from "../firebase";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';


let initialState = {email:"",password:""};

export default function Login() {

    const navigate = useNavigate();
    const [ emailAndPassword, setEmailAndPassword ] = useState(initialState);

    const getEmailAndPassword = (e) => {
      setEmailAndPassword({...emailAndPassword, [e.target.name]:e.target.value})
    }
  
    const submitEmailAndPassword = async (e) => {
      e.preventDefault();
  
      try {
        const user = await login(emailAndPassword.email, emailAndPassword.password);

        if(user) {
          setEmailAndPassword(initialState);

          navigate('/', {
            replace:true
          })
        }

      }catch {
        setEmailAndPassword(initialState)
      }
    }

    return (
        <div className="grid h-screen place-items-center">
          <form className="max-w-xl mx-auto grid gap-y-4 py-4 px-4 w-full" onSubmit={submitEmailAndPassword}>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                E-Mail
              </label>
              <div className="mt-1">
                <input
                type="email"
                name="email"
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 w-full sm:text-sm border-gray-300 rounded-md"
                placeholder="Your@example.com"
                value={emailAndPassword.email}
                onChange={(e) => getEmailAndPassword(e)}
                autoComplete="off"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
                <input
                type="password"
                name="password"
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 w-full sm:text-sm border-gray-300 rounded-md"
                placeholder="******"
                value={emailAndPassword.password}
                onChange={(e) => getEmailAndPassword(e)}
                />
              </div>
            </div>
            <button disabled={!emailAndPassword.email || !emailAndPassword.password} 
            className='disabled:opacity-20 cursor-pointer inline-block items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500' 
            type='submit'>
                Log in
            </button>
            <div className="py-2 flex justify-evenly items-center border">
              Don't have an account ? <Link to="/register" className='disabled:opacity-20 cursor-pointer inline-block items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>Sign Up</Link>
            </div>
          </form>
        </div>
    )
}


/*
const getEmailAndPassword = (e) => {
  setEmailAndPassword((emailAndPassword) => {
        return {
          ...emailAndPassword, [e.target.name]:e.target.value
        }
      })
    }
*/