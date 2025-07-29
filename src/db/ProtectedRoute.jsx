import { Navigate, Outlet } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { supabase } from "./supabaseclient";
import {GlobalContext} from "../context/GlobalContext"
function ProtectedRoute() {

  const [loading, setLoading] = useState(true);
const { session, setSession } = useContext(GlobalContext);
  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
      setLoading(false);
    };
    checkSession();
  }, []);

  if (loading) return <div>Cargando...</div>;

  return session ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoute;