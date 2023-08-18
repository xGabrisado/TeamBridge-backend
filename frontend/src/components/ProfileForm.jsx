import {
  Box,
  Container,
  Typography,
  CssBaseline,
  Button,
  Grid,
  TextField,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useState } from "react";
import { Form, useLoaderData, useNavigate } from "react-router-dom";
import {
  getTokenId,
  getAuthenticationToken,
} from "../helpers/functions.helper";

const ProfileForm = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isError, setIsError] = useState(null);
  const navigate = useNavigate();

  const { nome, sobrenome, cargo, permission, email } = useLoaderData();

  const role = permission === "c" ? "Comum" : "Admin";

  const toggleEditHandler = () => {
    setIsEditing((prevstate) => !prevstate);
  };

  const disableAccountHandler = async () => {
    const confirmDelete = window.confirm(
      "Depois disso, nao haverá como recuperar a conta, tem certeza?"
    );

    if (!confirmDelete) {
      return;
    }

    const id = getTokenId();
    const token = getAuthenticationToken();

    const response = await fetch("http://localhost:3000/usuario/" + id, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + `${token}`,
      },
    });

    if (response.status === 401) {
      setIsError({ message: "Falta de credenciais para fazer isso" });
    }

    if (!response.ok) {
      setIsError({ message: "Falha na conexão com o banco de dados" });
      return;
    }

    localStorage.removeItem("token");
    localStorage.removeItem("expiration");

    return navigate("/logout");
  };

  //   const handleSubmit = () => {};
  return (
    <>
      <Container component="main">
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: 8,
            width: "100%",
            height: "100vh",
          }}
        >
          {/* <Container
            component="div"
            sx={{ height: "10vh", bgcolor: "red" }}
          ></Container> */}
          <AccountCircleIcon color="secondary" fontSize="large" />
          <Typography component="h1" variant="h5">
            Profile
          </Typography>
          <Box component="div" noValidate sx={{ mt: 3 }}>
            <Form method="post">
              <Grid container spacing={2}>
                <Grid item xs={12} sm={5}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="Nome"
                    autoFocus
                    defaultValue={nome}
                    disabled={!isEditing}
                    color="secondary"
                  />
                </Grid>
                <Grid item xs={12} sm={7}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Sobrenome"
                    name="lastName"
                    autoComplete="family-name"
                    defaultValue={sobrenome}
                    disabled={!isEditing}
                    color="secondary"
                  />
                </Grid>
                {/* {isError.name && (
                <Grid item xs={12} sx={{ marginTop: "-10px" }}>
                  <Typography component="p" sx={{ color: "red" }}>
                    {isError.name}
                  </Typography>
                </Grid>
              )} */}
                <Grid item xs={12} sm={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    autoComplete="email"
                    defaultValue={email}
                    disabled={!isEditing}
                    color="secondary"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    // required
                    sx={{ width: "100%" }}
                    name="cargo"
                    label="Cargo na empresa"
                    type="text"
                    id="cargo"
                    defaultValue={cargo}
                    disabled={!isEditing}
                    color="secondary"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    // required
                    fullWidth
                    name="role"
                    label="Role"
                    type="text"
                    id="role"
                    defaultValue={role}
                    disabled
                    color="secondary"
                  />
                </Grid>
              </Grid>
              <Box
                component="div"
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <Button
                  type="button"
                  onClick={toggleEditHandler}
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  {isEditing ? "voltar" : "editar"}
                </Button>
                {isEditing && (
                  <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Salvar
                  </Button>
                )}
              </Box>
              <Button
                type="button"
                variant="contained"
                onClick={disableAccountHandler}
                color="error"
              >
                Excluir conta
              </Button>
            </Form>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default ProfileForm;
