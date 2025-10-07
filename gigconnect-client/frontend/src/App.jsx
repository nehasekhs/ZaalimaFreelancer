import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";

// Pages
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Projects from "./pages/Projects";
import PostProject from "./pages/PostProject";
import Home from "./pages/Home";
import ChatList from "./pages/ChatList";
import Chat from "./pages/Chat";
import UpdateProfile from "./pages/UpdateProfile";
import Categories from "./pages/Categories";
import Freelancer from "./pages/Freelancer";
import FreelancerProfile from "./pages/FreelancerProfile";
import ClientDashboard from "./pages/ClientDashboard";
import About from "./pages/About";
import Features from "./pages/Features";
import Contact from "./pages/Contact";

function App() {
  // ✅ Check if user is logged in
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      <Navbar />
      <Routes>
        
        <Route index element={ <Home />} />

        {/* Main routes */}
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/post-project" element={<PostProject />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/freelancer" element={<Freelancer />} />
        <Route path="/freelancer/:id" element={<FreelancerProfile />} /> {/* NEW */}
        <Route path="/dashboard" element={<ClientDashboard />} />

        {/* Landing info pages */}
        <Route path="/about" element={<About />} />
        <Route path="/features" element={<Features />} />
        <Route path="/contact" element={<Contact />} />

        {/* Chat */}
        <Route path="/chats" element={<ChatList />} />
        <Route path="/chat/:id" element={<Chat />} />

        {/* Profile update */}
        <Route path="/update-profile" element={<UpdateProfile />} />

        {/* 404 */}
        <Route path="*" element={<h2 className="text-center mt-10 text-white">Page Not Found</h2>} />
      </Routes>
    </>
  );
}

export default App;
