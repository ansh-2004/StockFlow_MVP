import { useEffect, useState } from "react";
import API from "../api/api";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

export default function Products(){

  const [products,setProducts] = useState([]);
  const [search,setSearch] = useState("");

  const fetchProducts = async () =>{
    const res = await API.get("/products");
    setProducts(res.data);
  }

  useEffect(()=>{
    fetchProducts();
  },[]);

  const deleteProduct = async(id)=>{
    const confirmDelete = window.confirm("Delete this product?");

    if(!confirmDelete) return;

    await API.delete(`/products/${id}`);

    fetchProducts();
  }

  const filteredProducts = products.filter((p)=>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.sku.toLowerCase().includes(search.toLowerCase())
  );

  return(

    <div>

      <Navbar/>

      <div className="p-6 space-y-4">

        <div className="flex justify-between items-center">

          <h1 className="text-2xl font-bold">
            Products
          </h1>

          <Link
          to="/products/new"
          className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Add Product
          </Link>

        </div>

        <input
        type="text"
        placeholder="Search by name or SKU"
        className="border p-2 w-full"
        value={search}
        onChange={(e)=>setSearch(e.target.value)}
        />

        <table className="w-full border">

          <thead className="bg-gray-200">

            <tr>
              <th className="border p-2">Name</th>
              <th className="border p-2">SKU</th>
              <th className="border p-2">Quantity</th>
              <th className="border p-2">Selling Price</th>
              <th className="border p-2">Low Stock</th>
              <th className="border p-2">Actions</th>
            </tr>

          </thead>

          <tbody>

            {filteredProducts.map((p)=>{

              const threshold = p.lowStockThreshold ?? 5;

              const isLowStock = p.quantity <= threshold;

              return(

                <tr key={p.id}>

                  <td className="border p-2">{p.name}</td>

                  <td className="border p-2">{p.sku}</td>

                  <td className="border p-2">{p.quantity}</td>

                  <td className="border p-2">
                    {p.sellingPrice}
                  </td>

                  <td className="border p-2">

                    {isLowStock ? (
                      <span className="text-red-600 font-semibold">
                        Low
                      </span>
                    ) : (
                      <span className="text-green-600">
                        OK
                      </span>
                    )}

                  </td>

                  <td className="border p-2 space-x-2">

                    <Link
                    to={`/products/edit/${p.id}`}
                    className="text-blue-600"
                    >
                      Edit
                    </Link>

                    <button
                    onClick={()=>deleteProduct(p.id)}
                    className="text-red-600"
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              )
            })}

          </tbody>

        </table>

      </div>

    </div>
  )
}