import { UrlState } from "@/context";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BarLoader } from "react-spinners";

function RequiredAuth({ children }) {
  const navigate = useNavigate();
  const { loading, isAuthenticated } = UrlState(); // Fixed spelling

  useEffect(() => {
    if (!isAuthenticated && loading===false) {
      navigate("/auth");
    }
  }, [isAuthenticated, loading, navigate]); 

  if (loading) {
    return <BarLoader width={"100%"} color="#36d7b7" />;
  }

  if (isAuthenticated) {
    return children; // Don't show children when not authenticated
  }

//   return children; // Show children only when authenticated
}

export default RequiredAuth;
