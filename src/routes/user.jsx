import {Button, Container, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {endSession, getSession, isLoggedIn} from "../utils/session";
import NavbarTrapape from "../component/NavbarTrapape";

export default function User() {
  let navigate = useNavigate();

  const [email, setEmail] = useState("");

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate("/login");
    }
  
    let session = getSession();
    console.log(session);
    setEmail(session.email);
  }, [navigate]);
  
  const onLogout = () => {
    endSession();
    navigate("/login");
  }

  const cargas = () => {
    navigate("/cargas");
  }


  return (
    <Container sx={{mt: 2}}>
      <NavbarTrapape/>
      <Typography variant="h6" component="h1" textAlign="center" gutterBottom>
        You're logged in as:
      </Typography>
      <Typography variant="h5" component="h1" textAlign="center" gutterBottom>
        {email}
      </Typography>
      <Typography variant="p" component="p" textAlign="center" gutterBottom>
        Check the console for your (access/session) token.
      </Typography>
      <Button variant="contained" color="error" onClick={onLogout} sx={{mt: 3}} fullWidth>
        Log out
      </Button>
      <Button variant="contained" color="error" onClick={cargas} sx={{mt: 3}} fullWidth>
        MIS CARGAS
      </Button>
    </Container>
  )
  }