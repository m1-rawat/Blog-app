import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import {auth,db} from  "../Firebase"
import { onSnapshot,collection,doc,deleteDoc,getDoc } from 'firebase/firestore'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './Footer'

const Blogs = () => {
  const [allBlogs, setAllBlogs] = useState([])
  const collRef=collection(db, 'blog')

  useEffect(() => {
    const getdata=async()=>{

      await onSnapshot(collRef,(snapshot)=>{
        setAllBlogs(snapshot.docs.map((doc) => ({
          ...doc.data(),id:doc.id
    })))
    })
  }

  getdata()
  console.log(allBlogs)
  }, [])


  const deleteBlog=async (id)=> {
    alert("your document is permanently deleted");
    const deletedata =doc(db,'blog', id);
    await deleteDoc(deletedata);

    toast.success('Your blog is deleted!', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });

}

const getsingleDoc = async (id)=>{
  // console.log(id)
  const data = doc(db, "blog", id)
  getDoc(data).then((doc)=>console.log(doc.data()))
  // console.log(data2);

}
  
  return (
    <>
    <ToastContainer
position="top-right"
autoClose={4998}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"
/>
      <Navbar/>

      { allBlogs.map((data)=>{
        return(
          <>
      <div className="container my-3">
          <div className='d-flex justify-content-center align-items-center flex-column' >

      <div className="author d-flex justify-content-center align-items-center" style={{width:"60%"}}>
      
      <img src={data.authorImg} alt="" style={{width:'4%' , borderRadius:'50%' , margin:'1rem'}}/>
      <h3>{data.authorName}</h3>
      </div>
    </div>
      <div class="card mb-3 bg-secondary" style={{maxWidth: '700px'}}>
  <div class="row g-0">
    <div class="col-md-4 d-flex justify-content-center align-items-center">
      <img src={data.img} class="img-fluid rounded-start" alt="..." style={{width:"60%"}}/>
    </div>
    <div class="col-md-8">
      <div class="card-body text-center text-white">
        <h2 class="card-title">{data.title}</h2>
        <h3 class="card-text">{data.shortDesc}</h3>
        <p class="card-text"><small class="text-body-secondary">Last updated 3 mins ago</small></p>

      <Link to={`/blogs/${data.id}`} 
      className='btn btn-primary mx-3'>View More</Link>
      <button
      onClick={()=>deleteBlog(data.id)}
      className='btn btn-danger'>Delete</button>
      </div>
    </div>
  </div>
</div>
      </div>

          </>
        )
      })
      }
      <Footer/>

    </>
  )
}

export default Blogs