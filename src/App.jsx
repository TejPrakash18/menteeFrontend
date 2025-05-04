import './App.css';

import { Route, Routes } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import WhyChooseUs from "./components/WhyChooseUs";
import Instructor from "./components/Instructor";
import Footer from "./components/Footer";
import RegisterPage from "./pages/RegisterPage";
import ProjectPage from "./pages/ProjectPage";
import CoursesPage from "./pages/CoursesPage";
import DSAPage from "./pages/DSAPage";
import CompilerPage from "./pages/CompilerPage";

function App() {
    return (
        <div className="min-h-screen bg-black pt-6">
            {/* Define the Routes for different components */}
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/compiler" element={<CompilerPage />} />
                <Route path="/courses" element={<CoursesPage />}/>
                    {/*<Route path="/courses/:id" element={}/>*/}
                    {/*<Route path="/courses/:id/:name" element={}/>*/}
                <Route path="/dsa" element={<DSAPage />}/>
                <Route path="/project" element={<ProjectPage />} />
                <Route
                    path="/"
                    element={
                        <>
                            <Navbar />
                            <HeroSection />
                            <WhyChooseUs />
                            <Instructor />
                            <Footer />
                        </>
                    }
                />
            </Routes>
        </div>
    );
}

export default App;
