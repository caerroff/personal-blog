import "./sidebar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faPenToSquare, faHome } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function SideBar() {
  return (
    <>
    <nav id="sidebar">
      <h2 className="text-center py-2">Personal Blog</h2>
      <ul >
        <li className="flex">
          <Link to="/" className="btn btn-gray w-full"><FontAwesomeIcon icon={faHome}/> Home</Link>
        </li>
        <li className="flex">
          <Link to="/posts" className="btn btn-gray w-full"><FontAwesomeIcon icon={faPenToSquare}/> Posts</Link>
        </li>
        <li className="flex">
          <Link to="/account" className="btn btn-gray w-full"><FontAwesomeIcon icon={faUser}/> Account</Link>
        </li>
      </ul>
    </nav>
    </>
  );
}

export default SideBar;
