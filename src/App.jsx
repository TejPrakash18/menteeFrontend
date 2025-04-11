import './App.css';

import { Route, Routes } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import WhyChooseUs from "./components/WhyChooseUs";
import Instructor from "./components/Instructor";
import Footer from "./components/Footer";
import RegisterPage from "./pages/RegisterPage";
// import PlaygroundPage from "./pages/PlaygroundPage";
// import CompilerPage from "./pages/CompilerPage";

function App() {
    return (
        <div className="min-h-screen bg-black pt-6">
            {/* Define the Routes for different components */}
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                {/*<Route path="/compiler" element={<PlaygroundPage />} />*/}
                {/*<Route path="/compiler/:langId" element={<CompilerPage />} />*/}
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
