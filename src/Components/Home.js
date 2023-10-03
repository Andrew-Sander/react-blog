import { useState } from "react";
import Blogs from "./Blogs";
import Categories from "./Categories";
import { Modal } from "react-bootstrap";

const Home = () => {

    const [isOpen, setIsOpen] = useState(false);

    const showModal = () => {
        setIsOpen(true);
    };

    const hideModal = () => {
        setIsOpen(false);
    };

    return ( 
        <div className="home">
            <h1 className="d-inline-block">All Blogs</h1>
            <button className="float-end" onClick={showModal}>Browse Categories</button>
            <Modal show={isOpen} onHide={hideModal}>
                <Modal.Body>
                    <Categories />
                </Modal.Body>
                <Modal.Footer>
                    <button onClick={hideModal}>Close</button>
                </Modal.Footer>
            </Modal>
            <div className="row">
                <Blogs />
            </div>
        </div>
     );
}
 
export default Home;