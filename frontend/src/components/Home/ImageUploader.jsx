import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getImage, uploadImage } from '../../utils/ApiRoutes';
import {Slide as Slider} from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import "./SlideShow.css"

const ImageUploader = () => {
    const [file,setFile] = useState(null);
    const [img,setImg] = useState([]);
    
    useEffect(() => {
        gettingimage();
    },[]);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUpload = async (e) =>{
        e.preventDefault();
        if (img.length >= 10) {
          alert('You can only upload up to 10 images');
          return;
        }
        const formdata = new FormData()
        formdata.append('image',file)
        axios.post(uploadImage,formdata)
        .then(res => {
            gettingimage();
            setFile(null);
        })
        .catch(err => console.log(err))
    }

    const gettingimage = async() => {
        const result=await axios.get(getImage)
        console.log(result)
        setImg(result.data.images)
    }

    const slideImages = img.map((images) => (
      <div className="each-slide" key={images.image}>
        <img src={`http://localhost:8000/temp/${images.image}`}  className="w-full h-auto" />
      </div>
    ));
  
    const slideProperties = {
      duration: 2000,
      transitionDuration: 500,
      infinite: true,
      indicators: true,
      arrows: false,
    };
  
    return (
      <div>
        <form onSubmit={handleUpload}>
          <input type="file" accept="image/*" onChange={handleFileChange} />
          <button type="submit" className="text-white">
            Submit
          </button>
        </form>
        <Slider {...slideProperties}>{slideImages}</Slider>
      </div>
    );
// return (
//     <div>
//       <form onSubmit={handleUpload}>
//         <input type="file" accept="image/*" onChange={handleFileChange}></input>
//         <button type="submit" className='text-white'>Submit</button>
//       </form>
//       <div className='flex'>
//       {img == null
//         ? ""
//         : img.map((images) => {
//             return (
//               <img
//                 // src={require(`../public/temp/${images.image}`)}
//                 src= {`http://localhost:8000/temp/${images.image}`}
//                 height={50}
//                 width={50}
//               />
//             );
//           })}
//     </div>
//     </div>
//   );
}
export default ImageUploader;
