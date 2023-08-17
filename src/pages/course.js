import React from 'react';
// import './App.css'; // Import the CSS file
import bgImage from './bgimage1.jpg';
import bgImage1 from './bgimage2.jpg';

function CourseList() {
  const data = [
    { id: 1, Course: 'TNPSE', Duration: '3 months', Link: 'https://www.tnpsc.gov.in/' },
    { id: 2, Course: 'Group 1', Duration: '6 months', Link: 'https://www.adda247.com/ta/jobs/tnpsc-group-1-previous-year-question-papers/' },
    { id: 3, Course: 'Group 2', Duration: '5 months', Link: 'https://www.adda247.com/ta/jobs/tnpsc-group-2-question-paper/' },
    { id: 4, Course: 'Group 3', Duration: '4 months', Link: 'https://testbook.com/tnpsc-group-3/previous-year-papers/' },
    { id: 5, Course: 'Group 4', Duration: '7 months', Link: 'https://www.adda247.com/ta/jobs/tnpsc-group-4-question-paper/amp/' },
    { id: 6, Course: 'IBPS clerk', Duration: '3 months', Link: 'https://www.adda247.com/ta/jobs/tnpsc-group-4-question-paper/amp/' },
    { id: 7, Course: 'IBPS PO', Duration: '4 months', Link: 'https://www.adda247.com/jobs/ibps-po-previous-year-question-paper/' },
    { id: 8, Course: 'IBPS RRB', Duration: '6 months', Link: 'https://www.adda247.com/jobs/ibps-rrb-previous-year-question-paper/amp/' },
    { id: 9, Course: 'SBI clerk', Duration: '3 months', Link: 'https://www.adda247.com/jobs/sbi-clerk-previous-year-question-paper/amp/' }
  ];

  return (
    <>
      <header className="App-header"> 
        <h1>Ready to learn !!...</h1>
        
      </header>
      <div className="vision-mission">
        <div className="vision-box box">
          <h3>Vision</h3>
          <p>As per the Constitution of India, the Tamil Nadu Public Service Commission (TNPSC) strives to establish and cultivate a public service that is independent, impartial, ethical, effective, and capable. This service must be well-equipped to address new government challenges and responsive to the increasing expectations of the general public, including marginalized communities.</p>
        </div>
        <div className="mission-box box">
          <h3>Mission</h3>
          <ul>
            <li>Ensure a free, fair, and transparent recruitment process for the state civil services, by leveraging information technology solutions.</li>
            <li>Constantly update its recruitment methodology.</li>
            <li>Suitably advise the government on all the matters relating to the service conditions of the public servants.</li>
            <li>Safeguard the interest and integrity of public servants.</li>
          </ul>
        </div>
       
      </div>
      <div className="fun-text"> {/* Use appropriate class name */}
          <img src={bgImage} alt="Image Description" height='200' width='300' />
          <p><h1>"Learning never exhausts the mind"</h1> </p>
        </div>
        <div className="fun-text1"> {/* Use appropriate class name */}
          <img src={bgImage1} alt="Image Description" height='200' width='300' />
          <p><h1>"Where can we find the courage to act in spite of fear"</h1> </p>
        </div>
      <div className="exam-table">
        <h2>Course Table</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Course</th>
              <th>Duration</th>
              <th>Link</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.Course}</td>
                <td>{item.Duration}</td>
                <td><a href={item.Link} target="_blank" rel="noopener noreferrer">Click Here</a></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
        <div className="course-container">
            <h2>Choose your plan</h2>
            <div className="price-row">
                <div className="price-col">
                    <p>Starter</p>
                    <h3>₹30,000 <span>/ 6 Month</span></h3>
                    <ul>
                        <li>1 Website</li>
                        <li>10 GB Disk Space</li>
                        <li>Free Email Address</li>
                        <li>Basic Web Builder</li>
                        <li>No SSL certificat</li>
                        <li>Limited support</li>
                    </ul>
                    <button>Pay Now</button>
                </div>
                <div className="price-col">
                    <p>Advanced</p>
                    <h3>₹60,000 <span>/ 6 Month </span></h3>
                    <ul>
                        <li>10 Website</li>
                        <li>50 GB Disk Space</li>
                        <li>Free Email Address</li>
                        <li>Advanced Web Builder</li>
                        <li>Free SSL certificat</li>
                        <li>Limited support</li>
                    </ul>
                    <button>Pay Now</button>
                </div>
                <div className="price-col">
                    <p>Premium</p>
                    <h3>₹90,000 <span>/ 6 Month</span></h3>
                    <ul>
                        <li>100 Website</li>
                        <li>100 GB Disk Space</li>
                        <li>Free Email Address</li>
                        <li>Advanced Web Builder</li>
                        <li>Free SSL certificat</li>
                        <li>Unlimited support</li>
                    </ul>
                    <button>Pay Now</button>
                </div>
            </div>
        </div>

    </>
  );
}

export default CourseList;
