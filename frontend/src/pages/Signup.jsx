import { useState } from "react";

import API from "../api/api";
import { useNavigate,Link } from "react-router-dom";

export default function Signup(){
    const navigate = useNavigate()
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [confirmPassword,setConfirmPassword] = useState("")
    const [organizationName , setOrganizationName] = useState("")

    const handleSignup = async (e)=>{
        e.preventDefault()

        if(password != confirmPassword){
            alert("Passwords do not match")
            return;
        }

        try {
            const res = await API.post('/auth/signup',{
                email,
                password,
                organizationName
            })

            alert("Signup successful")

            localStorage.setItem("token",res.data.token)

            navigate("/")            

        } catch (error) {
            alert("Signup failed")
        }
    }

  return(

    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <form
      onSubmit={handleSignup}
      className="bg-white p-8 rounded shadow w-96 space-y-4"
      >

        <h2 className="text-xl font-bold text-center">
          Signup
        </h2>

        <input
        type="text"
        placeholder="Organization Name"
        className="w-full border p-2"
        value={organizationName}
        onChange={(e)=>setOrganizationName(e.target.value)}
        />

        <input
        type="email"
        placeholder="Email"
        className="w-full border p-2"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
        />

        <input
        type="password"
        placeholder="Password"
        className="w-full border p-2"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
        />

        <input
        type="password"
        placeholder="Confirm Password"
        className="w-full border p-2"
        value={confirmPassword}
        onChange={(e)=>setConfirmPassword(e.target.value)}
        />

        <button className="w-full bg-blue-600 text-white p-2 rounded">
          Signup
        </button>

        
        <p className="text-sm text-center text-gray-600">
         Already have an account?{" "}
          <Link
            to="/Login"
            className="text-blue-600 hover:underline font-medium"
          >
            Login
          </Link>
        </p>

      </form>

    </div>
  );
}