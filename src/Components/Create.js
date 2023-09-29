import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useCurrentUser from "../useCurrentUser";


const getDate = () => {
        const today = new Date();
        const month = today.getMonth()+1;
        const year = today.getFullYear();
        const date = today. getDate();
        return `${year}-${month}-${date}`;
}

const Create = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [author, setAuthor] = useState('');
    const currentUser = useCurrentUser();
    const [isPending, setIsPending] = useState(false);
    const [date, setDate] = useState(getDate());
    const navigate = useNavigate();

    useEffect(() => {
        if(currentUser && currentUser.username) {
            setAuthor(currentUser.username)
        }
    }, [currentUser]);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const blog = { title, body, author, date };

        fetch('http://localhost:8000/api/blogPosts/create', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(blog)
        }).then(response => {
            if (!response.ok) {
                throw new Error("Network response not okay");
            }
        }).then(() => {
            console.log('new blog added');
            setIsPending(false);
            navigate('/');
        }).catch(error => {
            console.error(error);
            console.log(error);
        })
    }

    return ( 
        <div className="create">
            <h2>Add a new blog</h2>
            <form onSubmit={handleSubmit}>
                <label className="form-label" htmlFor="">Blog title:</label>
                <input className="form-control" type="text" required value={title}
                onChange={(e) => setTitle(e.target.value)}
                />
                <br />
                <label className="form-label" htmlFor="">Blog body:</label>
                <textarea className="form-control" required name="body-text" id="body-text" cols="30" rows="6" onChange={(e) => setBody(e.target.value)}></textarea>
                <br />
                { !isPending && <button type="submit" >Add blog</button> }
                { isPending && <button disabled type="submit" >Adding blog...</button> }
            </form>
        </div>
    );
}
 
export default Create;