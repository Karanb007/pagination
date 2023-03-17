import React,{useState,useEffect} from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [data,setData] = useState([])
  const [pageNo,setPageNo] = useState(1)


  const fetchData = async()=>{
    try{
        const res = await axios.get("https://fakestoreapi.com/products")
        const res1 = await axios.get("https://fakestoreapi.com/products")
        const res2 = [...res.data,...res1.data]
        if(res?.data?.length > 0){
          setData(res2)
          console.log(res.data)
        }
    }catch(error){
      throw new Error(error.message)
    }
  }
  useEffect(()=>{
    fetchData()
  },[])

  return (
    <>
    {pageNo}
    <div className="App" style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'20px'}}>
      {data?.length > 0 && data.slice(pageNo*10-10,pageNo*10).map((item,i)=>( 
  <div key={i}  style={{padding:'10px 40px',background:'silver'}}>
    <img src={item.image} alt={item.id} height="200px" width="200px"/>
    <div style={{display:'flex',justifyContent:'space-between'}}>
      <span>{item.title}</span><span>{item.rating.rate}</span>
      </div>
  </div>

      )) 
      }
    </div>
    {}
    <div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:'6px',cursor:'pointer'}}>
    {pageNo !== 1 && (
      <span onClick={()=>setPageNo(pageNo-1)}>Prev</span>
    )}
      {[...Array(Math.ceil(data.length/10))].map((item,i)=>(
      <span key={i} onClick={()=>setPageNo(i+1)}>{i+1}</span>  
      ))}
      {[...Array(Math.ceil(data.length/10))].length !== pageNo && (
        <span onClick={()=>setPageNo(pageNo+1)}>Next</span>
      ) }
      
    </div>
    </>
  );
}

export default App;
