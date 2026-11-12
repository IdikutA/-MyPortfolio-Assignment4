import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home";
import About from "./components/About";
import Project from "./components/Project";
import Education from "./components/Education";
import Services from "./components/Services";
import Contact from "./components/Contact";

 const MainRouter = () => {
  return ( 
        <div>
            
            <Routes>
                <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="about" element={<About />} />
                <Route path="project" element={<Project />} />
                <Route path="education" element={<Education />} />
                <Route path="services" element={<Services />} />
                <Route path="contact" element={<Contact />} />
                </Route>
            </Routes>

        </div>
  );
}

export default MainRouter;