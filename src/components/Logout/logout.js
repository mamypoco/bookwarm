import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";
import Swal from "sweetalert2";

const Logout = ({ setIsAuthenticated }) => {
  const handleLogout = () => {
    Swal.fire({
      icon: "question",
      title: "Logging Out",
      text: "Are you sure you want to log out?",
      showCancelButton: true,
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        signOut(auth).then(() => {
          Swal.fire({
            timer: 1500,
            showConfirmButton: false,
            willOpen: () => {
              Swal.showLoading();
            },
            willClose: () => {
              setIsAuthenticated(false);
            },
          });
        });
      }
    });
  };

  return (
    <button className="header-logout-button" onClick={handleLogout}>
      Logout
    </button>
  );
};

export default Logout;
