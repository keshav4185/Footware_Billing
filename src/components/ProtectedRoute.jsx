import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children, type = 'employee' }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const isEmployeeLoggedIn = localStorage.getItem('isSignedIn') === 'true';
    const isAdminLoggedIn = localStorage.getItem('adminLoggedIn') === 'true';

    if (type === 'employee' && !isEmployeeLoggedIn) {
      navigate('/Account');
    } else if (type === 'admin' && !isAdminLoggedIn) {
      navigate('/Account');
    }
  }, [navigate, type]);

  return children;
};

export default ProtectedRoute;