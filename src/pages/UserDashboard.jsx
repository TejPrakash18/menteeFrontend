import SidebarProfile from '../components/SidebarProfile';
import ProgressBar from "../components/ProgressBar";
import Navbar from '../components/Navbar';

const DashboardPage = () => {
    return (
        <>
        <Navbar/>
        <div className="flex flex-col lg:flex-row gap-6 p-4 lg:p-10 mx-10">
            {/* Sidebar on top (mobile) or left (desktop) */}

            <SidebarProfile />

            {/* Main Dashboard */}
            <div className="flex-1">
                <ProgressBar />
            </div>
        </div>
        </>
    );
};

export default DashboardPage;
