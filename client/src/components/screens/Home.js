import React from 'react'

function Home() {
    return (
        <div>
            <div className="home input-field">
                <div className="card home-card">
                    <div style={{
                        padding: '3px', 
                        margin: '3px auto',
                    }}>
                        <h5>Miss McNamara</h5>
                    </div>
                    <div className="card-image">
                        <img src="https://images.unsplash.com/photo-1477346611705-65d1883cee1e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" />
                    </div>
                    <div className="card-content">
                        <h4>title hello</h4>
                        <p>Hello World for life</p>
                        <i className="material-icons" style={{color: 'red'}}>favorite</i>
                        <input type="text" placeholder="Add a comment..." />
                    </div>
                </div>
            </div>
            <div className="home input-field">
                <div className="card home-card">
                    <div style={{
                        padding: '3px', 
                        margin: '3px auto',
                    }}>
                        <h5>Miss McNamara</h5>
                    </div>
                    <div className="card-image">
                        <img src="https://images.unsplash.com/photo-1477346611705-65d1883cee1e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" />
                    </div>
                    <div className="card-content">
                        <h4>title hello</h4>
                        <p>Hello World for life</p>
                        <i className="material-icons" style={{color: 'red'}}>favorite</i>
                        <input type="text" placeholder="Add a comment..." />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
