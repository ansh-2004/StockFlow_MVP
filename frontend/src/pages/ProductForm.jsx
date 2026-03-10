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
  },[id]);

const fetchProduct = async ()=>{
  const res = await API.get(`/products/${id}`);

  setProduct({
    name: res.data.name || "",
    sku: res.data.sku || "",
    quantity: res.data.quantity || 0,
    costPrice: res.data.costPrice || "",
    sellingPrice: res.data.sellingPrice || "",
    lowStockThreshold: res.data.lowStockThreshold || ""
  });
}
  const handleChange = (e)=>{
    setProduct({
      ...product,
      [e.target.name]:e.target.value
    });
  }

const handleSubmit = async(e)=>{
  e.preventDefault();

  const payload = {
    ...product,
    quantity: Number(product.quantity),
    costPrice: Number(product.costPrice),
    sellingPrice: Number(product.sellingPrice),
    lowStockThreshold: product.lowStockThreshold
      ? Number(product.lowStockThreshold)
      : null
  };

  if(id){
    await API.put(`/products/${id}`,payload);
  }else{
    await API.post("/products",payload);
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
className="space-y-5 max-w-md bg-white p-6 shadow rounded"
>

  <div>
    <label className="block text-sm font-medium mb-1">
      Product Name
    </label>
    <input
      name="name"
      className="border p-2 w-full rounded"
      value={product.name}
      onChange={handleChange}
      required
    />
  </div>

  <div>
    <label className="block text-sm font-medium mb-1">
      SKU
    </label>
    <input
      name="sku"
      className="border p-2 w-full rounded"
      value={product.sku}
      onChange={handleChange}
      required
    />
  </div>

  <div>
    <label className="block text-sm font-medium mb-1">
      Quantity
    </label>
    <input
      name="quantity"
      type="number"
      min="0"
      className="border p-2 w-full rounded"
      value={product.quantity}
      onChange={handleChange}
    />
  </div>

  <div>
    <label className="block text-sm font-medium mb-1">
      Cost Price
    </label>
    <input
      name="costPrice"
      type="number"
      min="0"
      className="border p-2 w-full rounded"
      value={product.costPrice}
      onChange={handleChange}
    />
  </div>

  <div>
    <label className="block text-sm font-medium mb-1">
      Selling Price
    </label>
    <input
      name="sellingPrice"
      type="number"
      min="0"
      className="border p-2 w-full rounded"
      value={product.sellingPrice}
      onChange={handleChange}
    />
  </div>

  <div>
    <label className="block text-sm font-medium mb-1">
      Low Stock Threshold
    </label>
    <input
      name="lowStockThreshold"
      type="number"
      min="0"
      className="border p-2 w-full rounded"
      value={product.lowStockThreshold}
      onChange={handleChange}
    />
    <p className="text-xs text-gray-500 mt-1">
      Leave empty to use organization default threshold
    </p>
  </div>

  <button
    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full"
  >
    Save Product
  </button>

</form>

      </div>

    </div>
  )
}