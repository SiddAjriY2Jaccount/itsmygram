import React from 'react'

function CreatePost() {
    return (
        <div className="card input-field" style={{
            margin: '10px auto',
            maxWidth: '600px',
            padding: '20px',
            textAlign: 'center'
        }}>
            <input type="text" placeholder="Title" />            
            <input type="text" placeholder="Body" />
            <div className="file-field input-field">
                <div className="btn waves-effect waves-light green darken-1">
                    <span>upload image</span>
                    <input type="file" />
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text" />
                </div>
            </div>
            <button className="btn waves-effect waves-light indigo darken-1" name="action">
            Submit Post
            </button>                    
        </div>
    )
}

export default CreatePost
