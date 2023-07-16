import { Grid, Paper, Typography, Container, Button } from "@mui/material";
import CargasAdmin from "./cargasAdmin";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { endSession, getSession, isLoggedIn } from "../utils/session";
import SideNavTrapape from "../component/SideNavTrapape";

export default function User() {
  let navigate = useNavigate();

  const [email, setEmail] = useState("");

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate("/login");
    }

    let session = getSession();
    setEmail(session.email);

    console.log("Your access token is: " + session.user.stsTokenManager.accessToken);
  }, [navigate]);

  const onLogout = () => {
    endSession();
    navigate("/login");
  };

  return (
    <>
      <SideNavTrapape />
      <div className="p-4 sm:ml-64">
        <div className="p-4 rounded-md mt-14">
          <h1 className="text-left text-blue-800 uppercase">Cargas</h1>
          <CargasAdmin />
        </div>
      </div>
    </>
  );
}
