import { useState,useEffect } from "react";
import { useNavigate,useParams } from "react-router-dom";
import API from "../api/api";
import Navbar from "../components/Navbar";

export default function ProductForm(){

  const navigate = useNavigate();
  const {id} = useParams();

  const [product,setProduct] = useState({
    name:"",
    sku:"",
    quantity:0,
    costPrice:"",
    sellingPrice:"",
    lowStockThreshold:""
  });

  useEffect(()=>{
    if(id){
      fetchProduct();
    }
  },[]);

  const fetchProduct = async ()=>{
    const res = await API.get(`/products/${id}`);
    setProduct(res.data);
  }

  const handleChange = (e)=>{
    setProduct({
      ...product,
      [e.target.name]:e.target.value
    });
  }

  const handleSubmit = async(e)=>{
    e.preventDefault();

    if(id){

      await API.put(`/products/${id}`,product);

    }else{

      await API.post("/products",product);

    }

    navigate("/products");
  }

  return(

    <div>

      <Navbar/>

      <div className="p-6">

        <h1 className="text-2xl font-bold mb-4">

          {id ? "Edit Product" : "Add Product"}

        </h1>

        <form
        onSubmit={handleSubmit}
        className="space-y-4 max-w-md"
        >

          <input
          name="name"
          placeholder="Name"
          className="border p-2 w-full"
          value={product.name}
          onChange={handleChange}
          required
          />

          <input
          name="sku"
          placeholder="SKU"
          className="border p-2 w-full"
          value={product.sku}
          onChange={handleChange}
          required
          />

          <input
          name="quantity"
          type="number"
          placeholder="Quantity"
          className="border p-2 w-full"
          value={product.quantity}
          onChange={handleChange}
          />

          <input
          name="costPrice"
          type="number"
          placeholder="Cost Price"
          className="border p-2 w-full"
          value={product.costPrice}
          onChange={handleChange}
          />

          <input
          name="sellingPrice"
          type="number"
          placeholder="Selling Price"
          className="border p-2 w-full"
          value={product.sellingPrice}
          onChange={handleChange}
          />

          <input
          name="lowStockThreshold"
          type="number"
          placeholder="Low Stock Threshold"
          className="border p-2 w-full"
          value={product.lowStockThreshold}
          onChange={handleChange}
          />

          <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Save
          </button>

        </form>

      </div>

    </div>
  )
}