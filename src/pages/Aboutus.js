import React from 'react';
import "./Aboutus.css";
import OurServiceImg from "../assets/ourserviceimg.jpg";
import syntax from "../assets/syntax.png";
import { TiTick } from "react-icons/ti";
import { FaFacebook } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import profile_image from "../assets/profile_image.jpeg";

const Aboutus = () => {
  return (
    <div classNameName="aboutus-page">
         {/* Our Services Section */}
         <section className="section">
             <div className="content">
                 <h2>Our Service</h2>
                 <p>We provide a fast and efficient URL shortening service, reducing long web links into compact, easy-to-share URLs. Our system ensures reliability, security, and seamless redirection to your desired destinations.</p>
                 <ul>
                     <li><TiTick className="TiTick" />Track your URL’s performance with real-time analytics</li>
                     <li><TiTick className="TiTick" />Interactive graphs display click data across various timeframes</li>
                     <li><TiTick className="TiTick" />Data-driven insights to optimize marketing campaigns</li>
                 </ul>
             </div>
             <div className="image-container">
                 <img src={OurServiceImg} alt="Analytics dashboard" />
             </div>
         </section>
         
         {/* Our Project Section */}
         <section className="section alternate-bg">
             <div className="image-container">
                 <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9zKblVH06Ep05dz0tbobsN606hgQogpdk9g&s" alt="Coding workspace"/>
             </div>
             <div className="content">
                 <h2>Our Project</h2>
                 <p>Our URL shortener is designed for speed, efficiency, and security. Whether you're an individual or a business, we offer a seamless way to manage and track links with advanced analytics. Built with cutting-edge technology, our platform ensures enterprise-grade reliability while maintaining simplicity for casual users.</p>
             </div>
         </section>
         
         {/* Developers Team Section  */}
         <section className="section">
             <div className="content">
                 <h2>Meet Our Developers</h2>
                 <p>Our dedicated team specializes in web technologies, ensuring a smooth and user-friendly experience. With expertise in backend optimization and UI/UX design, we continuously enhance our platform to meet evolving digital needs. We combine technical excellence with user-centric design principles to deliver exceptional results.</p>
             </div>
             <div className="image-container">
                 <img src={syntax} alt="Development team" style={{width: '350px', 'margin-left': '150px'}}/>
             </div>
         </section>

         <section className="team-section">
        <div className="section-heading">
            <h2>Our Creative Team</h2>
            <p>We are a team of professional and enthusiastic people ready to make your ideas come true</p>
        </div>

        {/* First Row */}
        <div className="team-grid">
            <div className="team-member">
                <div className="member-image">
                    <img src="https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg" alt="Team Member" />
                </div>
                <div className="member-info">
                    <h3 className="member-name">John Anderson</h3>
                    <p className="member-role">CEO & Founder</p>
                    <div className="social-links">
                        <a href="/"><FaFacebook /></a>
                        <a href="/"><FaGithub /></a>
                        <a href="/"><FaLinkedinIn /></a>
                    </div>
                </div>
            </div>

            <div className="team-member">
                <div className="member-image">
                    <img src={profile_image} alt="Team Member" />
                </div>
                <div className="member-info">
                    <h3 className="member-name">Sarah Johnson</h3>
                    <p className="member-role">Project Manager</p>
                    <div className="social-links">
                        <a href="/"><FaFacebook /></a>
                        <a href="/"><FaGithub /></a>
                        <a href="/"><FaLinkedinIn /></a>
                    </div>
                </div>
            </div>

            <div className="team-member">
                <div className="member-image">
                    <img src="https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg" alt="Team Member" />
                </div>
                <div className="member-info">
                    <h3 className="member-name">Mike Roberts</h3>
                    <p className="member-role">Lead Developer</p>
                    <div className="social-links">
                        <a href="/"><FaFacebook /></a>
                        <a href="/"><FaGithub /></a>
                        <a href="/"><FaLinkedinIn /></a>
                    </div>
                </div>
            </div>
        </div>

        {/* Second Row */}
        <div className="team-grid two-column">
            <div className="team-member">
                <div className="member-image">
                    <img src="https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg" alt="Team Member" />
                </div>
                <div className="member-info">
                    <h3 className="member-name">Emily Wilson</h3>
                    <p className="member-role">Marketing Director</p>
                    <div className="social-links">
                        <a href="/"><FaFacebook /></a>
                        <a href="/"><FaGithub /></a>
                        <a href="/"><FaLinkedinIn /></a>
                    </div>
                </div>
            </div>

            <div className="team-member">
                <div className="member-image">
                    <img src={profile_image} alt="Team Member" />
                </div>
                <div className="member-info">
                    <h3 className="member-name">David Thompson</h3>
                    <p className="member-role">UI/UX Designer</p>
                    <div className="social-links">
                        <a href="/"><FaFacebook /></a>
                        <a href="/"><FaGithub /></a>
                        <a href="/"><FaLinkedinIn /></a>
                    </div>
                </div>
            </div>
        </div>
    </section>
    </div>
  );
}

export default Aboutus;

// https://cdn.pixabay.com/photo/2015/07/17/22/43/student-849822_1280.jpg