import { useState } from "react";
import { Link } from "react-router-dom";

import API from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Login(){
    const navigate = useNavigate()
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")

    const handleLogin = async (e)=>{
        e.preventDefault()

        try {
            const res = await API.post('/auth/login',{
                email,
                password
            })

            localStorage.setItem("token",res.data.token)

            navigate("/")

        } catch (error) {
            alert("Login failed")
        }
    }

    return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <form
      onSubmit={handleLogin}
      className="bg-white p-8 rounded shadow w-96 space-y-4"
      >

        <h2 className="text-xl font-bold text-center">Login</h2>

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

        <button
        className="w-full bg-blue-600 text-white p-2 rounded"
        >
          Login
        </button>

        <p className="text-sm text-center text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-600 hover:underline font-medium"
          >
            Sign up
          </Link>
        </p>
        
      </form>

      

    </div>
  );
}