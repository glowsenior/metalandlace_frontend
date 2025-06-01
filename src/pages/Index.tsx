
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect to the HomePage component
    navigate("/", { replace: true });
  }, [navigate]);
  
  // This component won't render as it immediately redirects
  return null;
};

export default Index;
