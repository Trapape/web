import { Grid, Paper, Typography, Container, Button } from "@mui/material";
import CargasAdmin from "./cargasAdmin";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { endSession, getSession, isLoggedIn } from "../utils/session";
import SideNavTrapape from "../component/SideNavTrapape";
import FormCargaNueva from "./formCargaNueva";

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
        <div className="mt-14 m-4">
          <div className="w-full p-4">
            <h1 className="text-left text-blue-800 uppercase text-xl">Nueva Carga</h1>
          </div>
          <FormCargaNueva />
        </div>
      </div>
    </>
  );
}
