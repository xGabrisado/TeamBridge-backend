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
import { Form, useLoaderData } from "react-router-dom";

const ProfileForm = () => {
  const [isEditing, setIsEditing] = useState(false);

  const { nome, sobrenome, cargo, permission, email } = useLoaderData();

  const role = permission === "c" ? "Comum" : "Admin";

  const toggleEditHandler = () => {
    setIsEditing((prevstate) => !prevstate);
  };

  const disableAccountHandler = () => {};

  //   const handleSubmit = () => {};
  return (
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
              Desativar conta
            </Button>
          </Form>
        </Box>
      </Box>
    </Container>
  );
};

export default ProfileForm;
