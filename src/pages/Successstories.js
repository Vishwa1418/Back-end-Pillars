import React, { useEffect, useRef, useState } from "react";
import { getSuccessstories } from "./API";
import { useLocation } from "react-router";

const SuccessStories = () => {
  const [loader,setLoader] = useState(false)  
  const [successStories, setSuccessStories] = useState([]);
  const location = useLocation()
  const {role,public_id} = location.state
  const courseid = useRef()
  const story = useRef()

  useEffect(() => {
    fetchSuccessStories();
  }, []);

  const fetchSuccessStories = () => {
    setLoader(true)
    setSuccessStories([])
    getSuccessstories()
      .then((data) => {
        setLoader(false)
        setSuccessStories(data);
      })
      .catch((error) => {
        console.error("Error fetching success stories:", error);
      });
  };

  const submit = (event) => {
    event.preventDefault()
    const input = {
      user_id : public_id,
      course_id:courseid.current.value,
      story_content:story.current.value
    }
    fetchSuccessStories()
    console.log(input)
  }

  return (
    <>
        <div className="success">
        {role === 'Student' && <form className="admin-form" onSubmit={submit}>
                        <input type="text" ref={courseid} placeholder="course id" required/>
                        <input type="text" ref={story} placeholder="story" required/>
                        <input type="submit" value="+"/>
                    </form>}
            {loader && <div className="loader"/>}
            {successStories.length > 0 && <h1 className="heading">Success Stories</h1>}
            <div className="success stories">
                {successStories.length > 0 && successStories.map((story,index) => {
                    return <div className="review" key={index}>
                        <img src={story.image} className="image" alt="avatar"/>
                        <div className="cover"/>
                        <span className="name">{story.username}</span>
                        {/* <span>course:{story.course}</span> */}
                        <span className="content">{story.story_content}</span>
                    </div>
                })}
            </div>
        </div>
    </>
  );
};

export default SuccessStories;
