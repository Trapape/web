import {
  Alert,
  Box,
  Button,
  Container,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { createUser } from "../utils/firebase";
import { startSession } from "../utils/session";
import { writeData } from "../utils/firebaseService";

export default function Register() {
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [nombreCompleto, setNombreCompleto] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [activity, setActivity] = useState(""); // Nueva variable para tipo de actividad
  const [profile, setProfile] = useState(""); // Nueva variable para perfil
  const [role, setRole] = useState(""); // Nueva variable para rol
  const [companyName, setCompanyName] = useState(""); // Nueva variable para razón social
  const [rfc, setRfc] = useState(""); // Nueva variable para RFC

  const onSubmit = async (event) => {
    event.preventDefault();

    // Validar los campos
    if (
      !nombreCompleto ||
      !email ||
      !password ||
      !repeatPassword ||
      !activity ||
      !profile
    ) {
      setError("Por favor, complete todos los campos.");
      return;
    }
    if (password !== repeatPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    // Limpiar los errores
    setError("");

    // TODO: enviar la solicitud de registro
    console.log("Registrando...");

    try {
      let registerResponse = await createUser(email, password);

      // Aquí puedes guardar la información a la base de datos

      const path =
        profile === "consignante"
          ? "/projects/proj_meqjHnqVDFjzhizHdj6Fjq/apps/app_vjubyyTnE5REBNbo1HHscW/members/"
          : profile === "transportista"
          ? "/projects/proj_meqjHnqVDFjzhizHdj6Fjq/apps/app_1pAvW9AC5LiQYhzw2dpdJw/members/"
          : null;

      // transportistas /projects/proj_meqjHnqVDFjzhizHdj6Fjq/apps/app_1pAvW9AC5LiQYhzw2dpdJw/members
      // consignatarios /projects/proj_meqjHnqVDFjzhizHdj6Fjq/apps/app_vjubyyTnE5REBNbo1HHscW/members
      const additionalData = {
        cloudMessagingTokens: [],
        customData: {
          CargaAsignada: false,
          calificacion: "N/A",
          comision: "1.16",
          estatus: "Sin verificar",
          razonSocial: companyName,
          rol: role,
          profile: profile
        },
        email: email,
        name: nombreCompleto,
        phone: telefono,
      };

      // Agregar datos adicionales a Realtime Database
      await writeData(`${path}${registerResponse.user.uid}`, additionalData);

      // Aquí puedes guardar la información adicional en la sesión
      startSession(registerResponse.user, {
        nombreCompleto,
        telefono,
        activity,
        profile,
        role,
        companyName,
        rfc,
      });

      navigate("/user");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 2 }}>
      <Typography variant="h5" component="h1" gutterBottom textAlign="center">
        Register
      </Typography>
      {error && (
        <Alert severity="error" sx={{ my: 2 }}>
          {error}
        </Alert>
      )}
      <Box component="form" onSubmit={onSubmit}>
        <TextField
          label="Nombre completo"
          variant="outlined"
          autoComplete="nombre-completo"
          value={email}
          onChange={(e) => setNombreCompleto(e.target.value)}
          sx={{ mt: 1 }}
          fullWidth
        />
        <TextField
          label="Teléfono"
          variant="outlined"
          autoComplete="telefono"
          value={email}
          onChange={(e) => setTelefono(e.target.value)}
          sx={{ mt: 1 }}
          fullWidth
        />
        <TextField
          label="Email"
          variant="outlined"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ mt: 1 }}
          fullWidth
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ mt: 3 }}
          fullWidth
        />
        <TextField
          label="Repeat password"
          variant="outlined"
          type="password"
          autoComplete="repeat-new-password"
          value={repeatPassword}
          onChange={(e) => setRepeatPassword(e.target.value)}
          sx={{ mt: 3 }}
          fullWidth
        />

        {/* Nueva sección para perfil */}
        <Typography variant="h6" sx={{ mt: 3 }}>
          ¿Cuál es tu perfil?
        </Typography>
        <div>
          <Button
            variant={profile === "consignante" ? "contained" : "outlined"}
            onClick={() => setProfile("consignante")}
            sx={{ mt: 1, mr: 2 }}
          >
            Consignante
          </Button>
          <Button
            variant={profile === "transportista" ? "contained" : "outlined"}
            onClick={() => setProfile("transportista")}
            sx={{ mt: 1 }}
          >
            Transportista
          </Button>
        </div>

        {/* Nueva sección para rol (solo si es transportista) */}
        {profile === "transportista" && (
          <>
            <Typography variant="h6" sx={{ mt: 3 }}>
              ¿Qué rol tienes?
            </Typography>
            <div>
              <Button
                variant={role === "transportista" ? "contained" : "outlined"}
                onClick={() => setRole("transportista")}
                sx={{ mt: 1, mr: 2 }}
              >
                Transportista
              </Button>
              <Button
                variant={role === "operador" ? "contained" : "outlined"}
                onClick={() => setRole("operador")}
                sx={{ mt: 1, mr: 2 }}
              >
                Operador
              </Button>
              <Button
                variant={role === "hombre-camion" ? "contained" : "outlined"}
                onClick={() => setRole("hombre-camion")}
                sx={{ mt: 1 }}
              >
                Hombre Camión
              </Button>
            </div>
          </>
        )}

        {/* Nueva sección para tipo de actividad */}
        <Typography variant="h6" sx={{ mt: 3 }}>
          ¿Qué tipo de actividad realizas?
        </Typography>
        <div>
          <Button
            variant={activity === "persona-moral" ? "contained" : "outlined"}
            onClick={() => setActivity("persona-moral")}
            sx={{ mt: 1, mr: 2 }}
          >
            Persona Moral
          </Button>
          <Button
            variant={activity === "persona-fisica" ? "contained" : "outlined"}
            onClick={() => setActivity("persona-fisica")}
            sx={{ mt: 1 }}
          >
            Persona Física
          </Button>
        </div>

        {/* Nueva sección para razón social y RFC (solo si es persona moral) */}

        <>
          <TextField
            label="Razón Social"
            variant="outlined"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            sx={{ mt: 3 }}
            fullWidth
          />
          <TextField
            label="RFC"
            variant="outlined"
            value={rfc}
            onChange={(e) => setRfc(e.target.value)}
            sx={{ mt: 3 }}
            fullWidth
          />
        </>

        <Button variant="contained" type="submit" sx={{ mt: 3 }} fullWidth>
          Register
        </Button>
        <Box sx={{ mt: 2 }}>
          Already have an account? <Link href="/login">Login</Link>
        </Box>
      </Box>
    </Container>
  );
}
