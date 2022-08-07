import { Navigate } from "react-router-dom";
import Header from "../../components/header/header";

export default function PrivateRoute({ children }) {
  const auth = JSON.parse(localStorage.getItem("auth"));
  if (auth) {
    const userAvatar = auth.image;
    return (
      <>
        <Header userAvatar={userAvatar} />
        {children}
      </>
    );
  }
  return <Navigate to="/" />;
}
