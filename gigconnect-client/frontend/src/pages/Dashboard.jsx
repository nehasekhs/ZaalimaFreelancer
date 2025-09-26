import React, { useEffect, useState } from "react";
import api from "../utils/api";

export default function Dashboard(){
  const [projects,setProjects] = useState([]);
  const [loading,setLoading] = useState(true);

  useEffect(()=>{
    const fetch = async ()=>{
      try{
        const { data } = await api.get("/projects");
        setProjects(data);
      }catch(err){
        console.error("Fetch projects error:", err);
      }finally{ setLoading(false); }
    };
    fetch();
  },[]);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Your Projects</h1>
      {loading ? (
        <p className="text-gray-400">Loading...</p>
      ) : projects.length === 0 ? (
        <p className="text-gray-400">No projects yet. Post one!</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {projects.map(p=>(
            <div key={p._id} className="bg-gray-900 p-4 rounded-lg border border-gray-800">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-lg">{p.title}</h3>
                  <p className="text-gray-400 text-sm mt-2">{p.description}</p>
                </div>
                <div className="text-right">
                  <div className="text-green-400 font-semibold">${p.budget}</div>
                  <div className="text-xs text-gray-500 mt-2">{new Date(p.createdAt).toLocaleDateString()}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
