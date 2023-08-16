import React, { useEffect, useState } from "react";
import { getSuccessstories } from "./API";

const SuccessStories = () => {
  const [successStories, setSuccessStories] = useState([]);

  useEffect(() => {
    fetchSuccessStories();
  }, []);

  const fetchSuccessStories = () => {
    getSuccessstories()
      .then((data) => {
        setSuccessStories(data);
      })
      .catch((error) => {
        console.error("Error fetching success stories:", error);
      });
  };

  return (
    <>
        <div className="success">
            {successStories.length <= 0 && <div className="loader"/>}
            {successStories.length > 0 && <h1 className="heading">Success Stories</h1>}
            <div className="success stories">
                {successStories.length > 0 && successStories.map((story,index) => {
                    return <div className="review" key={index}>
                        <img src={story.image} className="image" alt="avatar"/>
                        <div className="cover"/>
                        <span className="name">{story.username}</span>
                        {/* <span>course:{story.course}</span> */}
                        <span>{story.story_content}</span>
                    </div>
                })}
            </div>
        </div>
    </>
  );
};

export default SuccessStories;
