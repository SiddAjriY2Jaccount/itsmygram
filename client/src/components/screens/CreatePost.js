import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import M from 'materialize-css'

function CreatePost() {

    const history = useHistory()
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [img, setImg] = useState("")
    const [url, setUrl] = useState("")

    useEffect(() => {
        if (url) {

            fetch(
                "/createpost",
                
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + localStorage.getItem("jwt")
                    },
                    body: JSON.stringify({ 
                        title, 
                        body,
                        url
                    })
    
                }
                )
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if (data.error) {
                        M.toast({html: data.error, classes:"red darken-2"})
                    }
    
                    else {
        
                    M.toast({html: data.message, classes:"light-green darken-2"})
                    history.push('/profile')
                                        
                    }
    
                })
                .catch(error => console.log(error))
    
        }
    }, [url])

    const postDetails = () => {
        const data = new FormData()
        data.append("file", img)
        data.append("upload_preset", "itsmygram")
        data.append("cloud_name", "justtoosweet")

        console.log(data)

        fetch("https://api.cloudinary.com/v1_1/justtoosweet/image/upload", {
                method: "POST",
                body: data
            })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setUrl(data.url)
            })
            .catch(error => console.log(error))

    }

        

    return (
        <div className="card input-field" style={{
            margin: '10px auto',
            maxWidth: '600px',
            padding: '20px',
            textAlign: 'center'
        }}>
            <input 
            type="text" 
            placeholder="Title" 
            value={title}
            onChange={(event) => setTitle(event.target.value)}    
            />       

            <input 
            type="text" 
            placeholder="Body"
            value={body} 
            onChange={(event) => setBody(event.target.value)}
            />

            <div className="file-field input-field">
                <div className="btn waves-effect waves-light green darken-1">
                    <span>upload image</span>
                    
                    <input 
                    type="file"
                    onChange={(event) => setImg(event.target.files[0])}                    
                    />

                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text" />
                </div>
            </div>
            
            <button 
            className="btn waves-effect waves-light indigo darken-1" 
            name="action"
            onClick={() => postDetails()}
            >

            Submit Post
            </button>                    
        </div>
    )
}

export default CreatePost
