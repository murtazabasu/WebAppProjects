import { useState } from "react";
import Authentication from "./Authentication";
import Modal from "./Modal";
import { useAuth } from "../context/AuthContext";


export default function Layout(props) {
    const { children } = props;

    const [showModal, setShowModal] = useState(false)

    const { globalUser, logout } = useAuth()
  
    const header = (
        <header>
            <div>
                <h1 className="text-gradient">CAFFIEND</h1>
                <p>For coffe Insatiates</p>
            </div>
            { globalUser ? (
                <button onClick={logout}>
                    <p>Logout</p>
                    <i className="fa-solid fa-mug-hot"></i>
                </button>) : (
                <button onClick={() => { setShowModal(true) }}>
                    <p>Sign up free</p>
                    <i className="fa-solid fa-mug-hot"></i>
                </button>
            )}
        </header>
    );

    function handleCloseModal() {
        setShowModal(false)
    }

    const footer = (
        <footer>
            <p><span className="text-gradient">Caffiend</span> was made by
                <a target="_blank" href="https://murtaza-basuwala-portfolio.netlify.app/"> Murtaza Basuwala</a>
                <br/>Check out the project on <a target="_blank" href="/">GitHub</a>!
                </p>
        </footer>
    );

    return (
        <>
            {showModal && (
                <Modal handleCloseModal={() => { handleCloseModal }}>
                    <Authentication handleCloseModal={() => { handleCloseModal }}/>
                </Modal>
            )}
            {header}
            <main>{children}</main>
            {footer}
        </>
    );
}
