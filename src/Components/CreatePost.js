import { useState, useEffect } from "react";
import useCurrentUser from "../useCurrentUser";


const getDate = () => {
        const today = new Date();
        const month = today.getMonth()+1;
        const year = today.getFullYear();
        const date = today.getDate();
        return `${year}-${month}-${date}`;
}

const CreatePost = ({ hideModal, id, onCreate }) => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [author, setAuthor] = useState('');
    const [isPending, setIsPending] = useState(false);
    const [date, setDate] = useState('');
    const currentUser = useCurrentUser();

    useEffect(() => {
        if(currentUser && currentUser.username) {
            setAuthor(currentUser.username)
        }
    }, [currentUser]);

    useEffect(() => {
        setDate(getDate());
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const blogPost = { title, body, author, date, id };

        if(onCreate) {
            onCreate(blogPost);
        }
        fetch('https://lords-of-blogtown.onrender.com/api/blogPosts/create', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(blogPost)
        }).then(response => {
            if (!response.ok) {
                throw new Error("Network response not okay");
            }
        }).then(() => {
            console.log('new post added');
            setIsPending(false);
        }).catch(error => {
            console.error(error);
            console.log(error);
        })
        hideModal();
        
    }
    
    return ( 
        <div className="create-modal">
            <h2>Make a New Post</h2>
            <form onSubmit={handleSubmit}>
                <label className="form-label">Title:</label>
                <input className="form-control" type="text" required value={title}
                onChange={(e) => setTitle(e.target.value)}
                />
                <br />
                <label className="form-label">Body:</label>
                <textarea className="form-control" required name="body-text" id="body-text" cols="30" rows="6" onChange={(e) => setBody(e.target.value)}></textarea>
                { !isPending && <button className="post-button" type="submit" >Post</button> }
                { isPending && <button disabled type="submit" >Adding blog...</button> }
            </form>
        </div>
    );
}
 
export default CreatePost;