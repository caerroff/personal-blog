import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
function NoPage(){
    return(
        <>
            <div className="card space-y-2 h-96">
                <h1 className="bg-light-red p-2 rounded-2xl text-center">Oops... It seems like you're going somewhere unknown</h1>
                <p className="text-xl">This is a 404 Error, you are trying to access a page that has not been made yet. But if you're looking for it, it means it should be here soon !</p>
                <p className="text-xl pb-4">Don't worry, click this button and you'll be brought back to familiar places !</p>
                <Link to="/" className="btn"><FontAwesomeIcon icon={faHome} /> Home</Link>
            </div>
        </>
    )
}

export default NoPage;