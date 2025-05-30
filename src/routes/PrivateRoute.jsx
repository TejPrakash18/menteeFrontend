import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';


const PrivateRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
