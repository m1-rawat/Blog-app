import React, { useState } from 'react'
import Navbar from './Navbar'
import { useNavigate } from 'react-router-dom'
import { getAuth } from 'firebase/auth'
import {db} from '../Firebase'
import { addDoc, collection } from 'firebase/firestore'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddBlog = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [data, setdata] = useState({
    title: '',
    shortDesc: '',
    fullDesc: '',
    img : '',
    authorName: auth.currentUser.displayName,
    authorImg: auth.currentUser.photoURL
  });

  const handleChange = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value })

  }

  const formRef = collection(db, "blog");

  const submitHandler = async (e) => {
    e.preventDefault();

    await addDoc(formRef, data);

    setTimeout(() => {
      navigate('/blogs')
    }, 2000);

    setdata({
      title: "",
      shortDesc: "",
      fullDesc: "",
      img: "",
    });

    toast.success('Data is Submitted!', {
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

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <Navbar />
      <div className="container my-3" style={{ padding: '2rem', width: '50%' }}>
                <form onSubmit={submitHandler}>
                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Title</label>
                        <input
                            value={data.title}
                            name="title"
                            type="text"
                            required
                            onChange={handleChange}
                            class="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp" />

                    </div>

                    <div class="mb-3">
                        <label for="text" class="form-label">Short Description</label>
                        <input
                            value={data.shortDesc}
                            name="shortDesc"
                            type="text"
                            required
                            onChange={handleChange}
                            class="form-control"
                            id="exampleInputPassword1" />
                    </div>

            <div class="mb-3">
              <label for="exampleFormControlTextarea1" class="form-label">
                Full Description
              </label>
              <textarea
                value={data.fullDesc}
                name="fullDesc"
                onChange={handleChange}
                class="form-control"
                id="exampleFormControlTextarea1"
                rows="3"
              ></textarea>
            </div>

            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">
                Img Url</label>
              <input
                value={data.img}
                name="img"
                onChange={handleChange}
                type="text"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
            </div>

            <div class="mb-3">
              <button type="submit" class="btn btn-primary btn-lg">
                Add Blog
              </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddBlog;
