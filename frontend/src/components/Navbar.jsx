import {Link, useNavigate} from "react-router-dom"

export default function Navbar(){
    const navigate = useNavigate()

    const logout = ()=>{
        localStorage.removeItem("token")
        navigate("/login")
    }

    return (
        <div className="bg-gray-800 text-white p-4 flex justify-between">
            <div className="space-x-4">
                <Link to = '/'>Dashboard</Link>
                <Link to = '/products'>Products</Link>
                <Link to = '/settings'> Settings</Link>
            </div>

            <button onClick={logout}>
                Logout
            </button>
        </div>
    )
}