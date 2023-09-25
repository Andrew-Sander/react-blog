import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Create = () => {
const [title, setTitle] = useState('');
const [body, setBody] = useState('');
const [author, setAuthor] = useState('andy');
const [isPending, setIsPending] = useState(false);
const history = useHistory();

const handleSubmit = (e) => {
    e.preventDefault();
    const blog = { title, body, author };

    fetch('http://localhost:8000/blogs', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(blog)
    }).then(() => {
        console.log('new blog added');
        setIsPending(false);
        history.push('/');
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
                <label className="form-label" htmlFor="">Blog author:</label>
                <select className="form-select" 
                    value = {author}
                    onChange={(e) => setAuthor(e.target.value)}
                >
                    <option value="andy">andy</option>
                    <option value="sarah">sarah</option>
                </select>
                { !isPending && <button type="submit" >Add blog</button> }
                { isPending && <button disabled type="submit" >Adding blog...</button> }
            </form>
        </div>
    );
}
 
export default Create;