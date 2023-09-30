import CreateBlog from "./CreateBlog";
import Modal from "react-bootstrap/Modal";
import CreatePost from "./CreatePost";
import { useState } from "react";

const Create = () => {

    const [isOpen1, setIsOpen1] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);

    const showModal1 = () => {
        setIsOpen1(true);
    };

    const hideModal1 = () => {
        setIsOpen1(false);
    };

    const showModal2 = () => {
        setIsOpen2(true);
    };

    const hideModal2 = () => {
        setIsOpen2(false);
    };

    return ( 
        <div>
            <button onClick={showModal1}>Start a new Blog</button>
            <Modal show={isOpen1} onHide={hideModal1}>
                <Modal.Body>
                    <CreateBlog />
                </Modal.Body>
                <Modal.Footer>
                    <button onClick={hideModal1}>Close</button>
                </Modal.Footer>
            </Modal>
            <button onClick={showModal2}>Add a new Blog Post</button>
            <Modal show={isOpen2} onHide={hideModal2}>
                <Modal.Body>
                    <CreatePost />
                </Modal.Body>
                <Modal.Footer>
                    <button onClick={hideModal2}>Close</button>
                </Modal.Footer>
            </Modal>
        </div> 
    );
}
 
export default Create;