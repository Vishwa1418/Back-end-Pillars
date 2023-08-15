import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getCourses } from './API';

function CourseList() {
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState({
    course_name: '',
    course_description: '',
    user_id: '',
    course_duration: '',
    enrollment_fee: '',
  });

  const fetchCourses = async () => {
    try {
      const response = await getCourses();
      setCourses(response);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const addCourse = async () => {
    try {
      await axios.post('/courses', newCourse);
      fetchCourses();
      setNewCourse({
        course_name: '',
        course_description: '',
        user_id: '',
        course_duration: '',
        enrollment_fee: '',
      });
    } catch (error) {
      console.error('Error adding course:', error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div className='course-list-container'>
      <h2>Course List</h2>
      <ul className='course-cards'>
        {courses.map(course => (
          <li key={course.course_id} className='course-card'>
            <p>Course Name: {course.course_name}</p>
            <p>Description: {course.course_description}</p>
            {/* Display other course details */}
            <button className='edit-button'>Edit</button>
            <button className='delete-button'>Delete</button>
          </li>
        ))}
      </ul>
      <h2>Add New Course</h2>
      <input
        type="text"
        placeholder="Course Name"
        value={newCourse.course_name}
        onChange={e => setNewCourse({ ...newCourse, course_name: e.target.value })}
      />
      {/* Add input fields for other course details */}
      <button className='add-button' onClick={addCourse}>Add Course</button>
    </div>
  );
}

export default CourseList;