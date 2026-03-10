import { useEffect, useState } from "react";
import API from "../api/api";
import Navbar from "../components/Navbar";

export default function Settings(){

  const [threshold,setThreshold] = useState("");

  useEffect(()=>{
    fetchSettings();
  },[]);

  const fetchSettings = async ()=>{
    try{
      const res = await API.get("/settings");
      setThreshold(res.data.defaultLowStockThreshold);
    }catch(err){
      console.log(err);
    }
  };

  const handleSubmit = async(e)=>{
    e.preventDefault();

    try{

      await API.put("/settings",{
        defaultLowStockThreshold:Number(threshold)
      });

      alert("Settings updated");

    }catch(err){
      alert("Update failed");
    }
  };

  return(

    <div>

      <Navbar/>

      <div className="p-6 max-w-md">

        <h1 className="text-2xl font-bold mb-4">
          Settings
        </h1>

        <form
        onSubmit={handleSubmit}
        className="space-y-4"
        >

          <label className="block font-semibold">
            Default Low Stock Threshold
          </label>

          <input
          type="number"
          className="border p-2 w-full"
          value={threshold}
          onChange={(e)=>setThreshold(e.target.value)}
          />

          <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Save Settings
          </button>

        </form>

      </div>

    </div>
  );
}