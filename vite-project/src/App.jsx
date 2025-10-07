import React from 'react';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";

import HeroSection from './Components/HeroSection';
import NavBar from './Components/NavBar';
import About from './Components/About';


import HowItWorks from './Components/HowItWorks';
import FreelancerSection from './Components/FreelancerSection';
import Footer from './Components/Footer';
import Categories from './Components/Categories';

import FreelanceDashboard from './Components/FreelancerDashboard';

import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Contact from './Pages/Contact';
import LearnMore from './Pages/LearnMore';

import Profile from './Pages/Profile';
import FindWork from './Pages/FindWork';
import Proposals from './Pages/Proposals';
import Messages from './Pages/Messages';
import Wallet from './Pages/Wallet';
import Reports from './Pages/Reports';
import Settings from './Pages/Settings';

import FreelancerDashboardLayout from './Layouts/FreelancerDashboardLayout';
import AboutUs from './Pages/AboutUs';
import Careers from './Pages/Careers';
import Blog from './Pages/Blog';
import ContactUs from './Pages/ContactUs';
import HelpCenter from './Pages/HelpCenter';
import PrivacyPolicy from './Pages/PrivacyPolicy';
import TermsOfService from './Pages/TermsOfService';

function App() {
  

  return (
  <Router>
    <Routes>
      {/* landing pages */}
<Route path="/" element ={
 <>
<NavBar/>
<HeroSection/>
<About/>
<Categories/>

<FreelancerSection/>
<HowItWorks/>
<Footer/>



 </>
}
  />


{/* Dashboard page */}
 
{/* Dashboard Layout with nested routes */}
<Route path="/freelancer" element={<FreelancerDashboardLayout />}>
  <Route index element={<Profile />} />
  <Route path="profile" element={<Profile />} />
  <Route path="find-work" element={<FindWork />} />
  <Route path="proposals" element={<Proposals />} />
  <Route path="messages" element={<Messages />} />
  <Route path="wallet" element={<Wallet />} />
  <Route path="reports" element={<Reports />} />
  <Route path="settings" element={<Settings />} />
</Route>


    <Route path="/contact" element = {<Contact/>} />
      <Route path="/Login" element = {<Login/>} />
        <Route path="/signup" element = {<Signup/>} />
        <Route path="/LearnMore" element = {<LearnMore/>} />
       

        <Route path="/about-us" element = {<AboutUs/>}/>
         <Route path="/careers" element = {<Careers/>}/>
             <Route path="/blog" element = {<Blog/>}/>
                 <Route path="/contact" element = {<ContactUs/>}/>
                     <Route path="/help-center" element = {<HelpCenter/>}/>
                         <Route path="/privacy-policy" element = {<PrivacyPolicy/>}/>
                             <Route path="/terms-of-service" element = {<TermsOfService/>}/>
                                

  </Routes>
</Router>
       




  );
} 

export default App;

