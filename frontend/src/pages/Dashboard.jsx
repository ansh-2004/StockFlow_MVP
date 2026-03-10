import { useEffect,useState } from "react";
import API from "../api/api";

import Navbar from "../components/Navbar";

export default function Dashboard(){
    const [data,setData] = useState(null)
    const fetchDashboard = async () =>{
        const res = await API.get('/dashboard')
        setData(res.data)
    }

    useEffect(()=>{
        fetchDashboard()
    },[])

    if(!data) return <div>Loading...</div>

  return(

    <div>

      <Navbar/>

      <div className="p-6 space-y-6">

        <h1 className="text-2xl font-bold">
          Dashboard
        </h1>

        <div className="grid grid-cols-2 gap-4">

          <div className="bg-white p-4 shadow">
            <h3>Total Products</h3>
            <p className="text-2xl">
              {data.totalProducts}
            </p>
          </div>

          <div className="bg-white p-4 shadow">
            <h3>Total Quantity</h3>
            <p className="text-2xl">
              {data.totalQuantity}
            </p>
          </div>

        </div>

        <div>

          <h2 className="text-xl font-bold mb-2">
            Low Stock Items
          </h2>

          <table className="w-full border">

            <thead className="bg-gray-200">

              <tr>
                <th className="border p-2">Name</th>
                <th className="border p-2">SKU</th>
                <th className="border p-2">Quantity</th>
                <th className="border p-2">Threshold</th>
              </tr>

            </thead>

            <tbody>

              {data.lowStockItems.map((p)=>(
                <tr key={p.sku}>

                  <td className="border p-2">{p.name}</td>

                  <td className="border p-2">{p.sku}</td>

                  <td className="border p-2">{p.quantity}</td>

                  <td className="border p-2">
                    {p.threshold}
                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}    
