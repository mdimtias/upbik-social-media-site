import React, { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { AuthContext } from "../../../context/AuthProvider";
import { ImgUpload } from "../../../hooks/ImgUpload";
import Loader from "../../SharePage/Loader/Loader";

const CreatePost = () => {
  const {user} = useContext(AuthContext)
  const [paragraph, setParagraph] = useState();
  const [image, setImage] = useState();
  const [openModal, setOpenModal] = useState(true)
  const [loading, setLoading] = useState(false);
  
  const handlePost = async ()=>{
    setLoading(true)
    if(!paragraph && !image ){
      setLoading(false)
      return toast.error("Please add text or image")
    }
    if(loading){
      <Loader></Loader>
    }
    const formData = new FormData();
    formData.append("image", image);
    let imageUploadServer;
    if(image){
       imageUploadServer = await ImgUpload(formData);
    }else{
       imageUploadServer = "";
    }
 const data = {displayName: user?.displayName, email: user?.email, photoURL: user?.photoURL, userLiked: [], like: 0, comment:0, share:0, paragraph, postImage: imageUploadServer, created: new Date()};

      fetch("https://social-media-site-server.vercel.app/posts/", {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        authorization: `token ${localStorage.getItem("token")}`,
        body: JSON.stringify(data)
      })
      .then(res=> res.json())
      .then((data)=>{
        if(data.acknowledged){
          setOpenModal(false)
          toast.success("Created Post Successful");
          setParagraph("");
          setImage("");
          setLoading(false)
        }
      })
      .catch(()=>{
        setLoading(false)
        toast.error("Create Post Fail")
      })
      
  }
  return (
    <section className="create-post-section">
      <div className="container mx-auto">
        <div className="create-post flex gap-5 p-5">
          <div className="user-img">
            <img
              className="w-14 h-14 rounded-[50%]"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSK_vjpKVAjkub5O0sFL7ij3mIzG-shVt-6KKLNdxq4&s"
              alt=""
            />
          </div>
          <div className="create-post-box">
            <label htmlFor="create-post-modal" onClick={()=>setOpenModal(true)} className="btn border-none bg-[#F0F2F5] text-[#797B7F] hover:bg-[#E4E6E9] rounded-[50px] md:w-[450px]">
              What's on your mind, Md?
            </label>
          </div>

          <input
            type="checkbox"
            id="create-post-modal"
            className="modal-toggle"
          />
        {openModal &&
        <div className="modal">
            <div className="modal-box w-full p-0">
              <div className="flex items-center">
                <div className="container mx-auto bg-white shadow-xl border rounded-lg">
                  <div className="post-header border-b border-solid border-slate-300 flex justify-between items-center">
                    <div></div>
                    <h2 className="text-black font-bold text-xl py-2">
                      Create Post
                    </h2>
                    {/* <div className="modal-action"> */}
                    <label
                      htmlFor="create-post-modal"
                      className="btn mx-5 bg-[#E4E6EB] text-black hover:text-white border-none min-h-8 h-8 w-8 rounded-[50%] text-lg"
                    >
                      X
                    </label>
                    {/* </div> */}
                  </div>
                  <div className="post-content">
                    <div className="user-info flex justify-start items-center gap-3 px-5 py-2">
                      <div className="user-image">
                        <img
                          className="w-20 h-20 border rounded-[50%]"
                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSK_vjpKVAjkub5O0sFL7ij3mIzG-shVt-6KKLNdxq4&s"
                          alt=""
                        />
                      </div>
                      <div className="user-name">
                        <h3 className="text-[#050505] text-lg font-medium">
                          Md Imtias
                        </h3>
                      </div>
                    </div>
                    <div className="write-your-post py-2 px-5">
                      <textarea
                        className="border-none w-full p-5 focus:outline-none placeholder:text-[#CACBCC] text-lg"
                        name="paragraph"
                        id=""
                        cols="30"
                        rows="5"
                        placeholder="What's on your mind, Md?"
                        onChange={(e)=>setParagraph(e.target.value)}
                        required
                      ></textarea>
                    </div>
                    <div className="add-your-post-image px-5">
                      <input
                        type="file"
                        name="image"
                        className="file-input file-input-bordered w-full max-w-xs"
                        onChange={(e)=>setImage(e.target.files[0])}
                      />
                    </div>
                  </div>
                  <div className="publish-post p-5">
                      <button className="p-3 rounded-lg w-full bg-[#1A6ED8] text-white font-medium" onClick={handlePost}>
                        {loading ? "Creating Post...": "Post"}
                      </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
        </div>
      </div>
    </section>
  );
};

export default CreatePost;
