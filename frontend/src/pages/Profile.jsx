import { redirect } from "react-router-dom";
import ProfileForm from "../components/ProfileForm";
import {
  getAuthenticationToken,
  getTokenId,
} from "../helpers/functions.helper";

export default function ProfilePage() {
  return <ProfileForm />;
}

export async function loader() {
  const id = getTokenId();
  //   console.log(id);

  const response = await fetch("http://localhost:3000/usuario/" + `${id}`);

  const resData = await response.json();

  const loaderData = {
    nome: resData.userName,
    sobrenome: resData.userLastName,
    cargo: resData.userPost,
    permission: resData.userPermission,
    email: resData.userEmail,
  };

  return loaderData;
}

export async function action({ request }) {
  //   console.log(request);
  const data = await request.formData();
  const profileUpdated = {
    userName: data.get("firstName"),
    userLastName: data.get("lastName"),
    userEmail: data.get("email"),
    userPost: data.get("cargo"),
  };

  const id = getTokenId();
  const token = getAuthenticationToken();

  const response = await fetch("http://localhost:3000/usuario/" + `${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + `${token}`,
    },
    body: JSON.stringify(profileUpdated),
  });

  const resData = await response.json();
  console.log(resData);
  //   console.log(id);
  //   console.log("profileUpdated");
  //   console.log(profileUpdated);

  return redirect("/profile");
}
