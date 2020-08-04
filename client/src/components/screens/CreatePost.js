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
            <div class="file-field input-field">
                <div class="btn waves-effect waves-light green darken-1">
                    <span>upload image</span>
                    <input type="file" />
                </div>
                <div class="file-path-wrapper">
                    <input class="file-path validate" type="text" />
                </div>
            </div>
            <button className="btn waves-effect waves-light indigo darken-1" name="action">
            Submit Post
            </button>                    
        </div>
    )
}

export default CreatePost
