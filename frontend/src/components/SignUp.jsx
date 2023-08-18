// import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Checkbox from "@mui/material/Checkbox";
// import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link, useNavigate } from "react-router-dom";
import { RegExHelper } from "../helpers/regex.helper";
import { useState } from "react";

// function Copyright(props) {
//   return (
//     <Typography
//       variant="body2"
//       color="text.secondary"
//       align="center"
//       {...props}
//     >
//       {"Copyright © "}
//       <Link color="inherit" href="https://mui.com/">
//         Your Website
//       </Link>{" "}
//       {new Date().getFullYear()}
//       {"."}
//     </Typography>
//   );
// }

// TODO remove, this demo shouldn't need to reset the theme.

// const defaultTheme = createTheme();

export default function SignUp() {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // console.log({
    //   email: data.get("email"),
    //   password: data.get("password"),
    // });
    const cadastro = {
      userEmail: data.get("email"),
      password: data.get("password"),
      userName: data.get("firstName"),
      userLastName: data.get("lastName"),
      userPost: data.get("cargo"),
    };
    // console.log(cadastro.userName, cadastro.userLastName);

    const emailError = !cadastro.userEmail.match(RegExHelper.emailMatch);
    const passwordError = !cadastro.password.match(RegExHelper.passwordMatch);
    const nameError =
      cadastro.userName.trim().length === 0 ||
      cadastro.userLastName.trim().length === 0;
    
    const confirmPasswordError = cadastro.password !== data.get('confirmPassword')

    // console.log("nameError");
    // console.log(nameError);

    if (confirmPasswordError) {
      setIsError((pastError) => {
        return {
          ...pastError,
          confirmPassword: 'As senhas devem ser iguais'
        }
      })
    }

    if (!confirmPasswordError) {
      setIsError((pastError) => {
        return {
          ...pastError,
          confirmPassword: 'As senhas devem ser iguais'
        }
      })
    }

    if (emailError) {
      setIsError((pastError) => {
        return {
          ...pastError,
          email: "Favor inserir um email válido",
        };
      });
    }
    if (!emailError) {
      setIsError((pastError) => {
        return {
          ...pastError,
          email: null,
        };
      });
    }
    if (nameError) {
      setIsError((pastError) => {
        return {
          ...pastError,
          name: "Favor inserir um nome e/ou sobrenome",
        };
      });
    }
    if (!nameError) {
      setIsError((pastError) => {
        return {
          ...pastError,
          name: null,
        };
      });
    }
    if (passwordError) {
      setIsError((pastError) => {
        return {
          ...pastError,
          password:
            "Favor inserir uma senha que possua letras maiúsculas, minúsculas, números e caractere especial, com no minimo 7 caracteres",
        };
      });
    }
    if (!passwordError) {
      setIsError((pastError) => {
        return {
          ...pastError,
          password: null,
        };
      });
    }

    if (emailError || passwordError || nameError) {
      return;
    }

    setIsError(false);

    setIsLoading(true);
    const response = await fetch("http://localhost:3000/usuario", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cadastro),
    });

    if (response.status === 409) {
      console.log(response.error);
      setIsError({ message: "Email Já existente, favor inserir outro" });
      setIsLoading(false);
      return;
      // throw new Error({ message: "Email/Senha inválidos" });
    }

    if (!response.ok) {
      setIsError({ message: "Erro com a conexão backend" });
      setIsLoading(false);
      return;
      // throw json({ message: "Could not authenticate user." }, { status: 500 });
    }

    const resData = await response.json();
    console.log(resData);
    setIsError({ message: "Cadastrado com sucesso" });
    setIsLoading(false);
    navigate('/auth')
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Cadastro de Usuario
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="Nome"
                autoFocus
                color="secondary"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Sobrenome"
                name="lastName"
                autoComplete="family-name"
                color="secondary"
              />
            </Grid>
            {isError.name && (
              <Grid item xs={12} sx={{ marginTop: "-10px" }}>
                <Typography component="p" sx={{ color: "red" }}>
                  {isError.name}
                </Typography>
              </Grid>
            )}
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                color="secondary"
              />
            </Grid>
            {isError.email && (
              <Grid item xs={12} sx={{ marginTop: "-10px" }}>
                <Typography component="p" sx={{ color: "red" }}>
                  {isError.email}
                </Typography>
              </Grid>
            )}
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Senha"
                type="password"
                id="password"
                autoComplete="new-password"
                color="secondary"
              />
            </Grid>
            {isError.password && (
              <Grid item xs={12} sx={{ marginTop: "-10px" }}>
                <Typography component="p" sx={{ color: "red" }}>
                  {isError.password}
                </Typography>
              </Grid>
            )}
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="confirmPassword"
                label="Confirmar Senha"
                type="password"
                id="confirmPassword"
                autoComplete="confirm-new-password"
                color="secondary"
              />
            </Grid>
            {isError.confirmPassword && (
              <Grid item xs={12} sx={{ marginTop: "-10px" }}>
                <Typography component="p" sx={{ color: "red" }}>
                  {isError.confirmPassword}
                </Typography>
              </Grid>
            )}
            <Grid item xs={12}>
              <TextField
                // required
                fullWidth
                name="cargo"
                label="Cargo na empresa"
                type="text"
                id="cargo"
                color="secondary"
              />
            </Grid>
            {/* <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid> */}
            {isError.message && (
              <Grid item xs={12}>
                {isError.message}
              </Grid>
            )}
            {isLoading && (
              <Grid item xs={12}>
                Loading...
              </Grid>
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Cadastrar-se
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/auth" variant="body2">
                Já possui uma conta? Faça o login
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      {/* <Copyright sx={{ mt: 5 }} /> */}
    </Container>
  );
}
