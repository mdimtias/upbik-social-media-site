import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { AuthContext } from "../../../context/AuthProvider";

const EditProfileModal = ({ modal, setModal }) => {
  const { user } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState([]);
  useEffect(() => {
    fetch(`https://social-media-site-server.vercel.app/users/${user?.email}`, {
      headers: {
        authorization: `${localStorage.getItem("token")}`,
    }
    })
      .then((res) => res.json())
      .then((data) => setUserInfo(data[0]));
  }, [user?.email]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const github = form.github.value;
    const website = form.website.value;
    const linkedin = form.linkedin.value;
    const twitter = form.twitter.value;

    const data = {
      displayName: name,
      github,
      website,
      linkedin,
      twitter,
      updated: new Date(),
    };
    console.log(data);
    fetch(`https://social-media-site-server.vercel.app/users/${user?.email}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        authorization: `${localStorage.getItem("token")}`,
      },
      authorization: `token ${localStorage.getItem("token")}`,
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          toast.success("Updated Profile Successful");
          setModal(false);
        }
      })
      .catch(() => {
        toast.error("Updated Profile Fail");
        setModal(false);
      });
  };
  return (
    <div>
      {/* Put this part before </body> tag */}
      <input type="checkbox" id="profile-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <div className="flex justify-between pb-2">
            <div></div>
            <label
              htmlFor="profile-modal"
              className="btn mx-5 bg-[#E4E6EB] text-black hover:text-white border-none min-h-8 h-8 w-8 rounded-[50%] text-lg"
            >
              X
            </label>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <input
                type="text"
                name="name"
                defaultValue={userInfo?.name}
                className={
                  "form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                }
                placeholder="Full Name"
              />
            </div>
            <div className="mb-6">
              <input
                type="text"
                name="github"
                defaultValue={userInfo?.github}
                className={
                  "form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                }
                placeholder="Github"
              />
            </div>
            <div className="mb-6">
              <input
                type="text"
                name="website"
                defaultValue={userInfo?.website}
                className={
                  "form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                }
                placeholder="Website Link"
              />
            </div>
            <div className="mb-6">
              <input
                type="text"
                name="linkedin"
                defaultValue={userInfo?.linkedin}
                className={
                  "form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                }
                placeholder="Linkedin"
              />
            </div>
            <div className="mb-6">
              <input
                type="text"
                name="twitter"
                defaultValue={userInfo?.twitter}
                className={
                  "form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                }
                placeholder="Twitter"
              />
            </div>
            <button
              type="submit"
              className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
              data-mdb-ripple="true"
              data-mdb-ripple-color="light"
            >
              Update Profile
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;
