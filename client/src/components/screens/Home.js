import React, { useState, useEffect, useContext } from 'react'
import {UserContext} from '../../App'

function Home() {

    const [data, setData] = useState([])
    const { state, dispatch } = useContext(UserContext)
    useEffect(() => {
        fetch(
            
            '/view_all_posts',

            {
                headers: {
                    //"Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("jwt")
                }

            })
            .then(res => res.json())
            .then(result => {
                console.log(result);
                setData(result.posts)
            })
    }, [])

    const likeposts = (id) => {
        fetch('/like', 
        {
            method: "put",
            
            headers: 
            {
            
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
        
        
            },

            body: JSON.stringify({
                postId: id
            })
     
        }).then(res => res.json())
        .then(result => {
            console.log(result)
            const newData = data.map(item => {
                if (item._id == result._id) {
                    return result
                }

                else {
                    return item
                }
            })

            setData(newData)
        })
    }

    const unlikeposts = (id) => {
        fetch('/unlike', 
        {
            method: "put",
            
            headers: 
            {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },

            body: JSON.stringify({
                postId: id
            })
     
        }).then(res => res.json())
        .then(result => {
            console.log(result)
            const newData = data.map(item => {
                if (item._id == result._id) {
                    return result
                }

                else {
                    return item
                }
            })

            setData(newData)
        }).catch(error => console.log(error))
    }

    const postComment = (text, postId) => {
        console.log(text)
        console.log(postId)
        fetch('/comment', 
        {
            method: "put",
            headers: 
            {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                postId: postId,
                text: text
            })
        }).then(res => res.json())
        .then(result => {
            console.log(result)
            const newData = data.map(item => {
                if (item._id == result._id) {
                    return result
                }

                else {
                    return item
                }
            })

            console.log(newData)

            setData(newData)
            
        })
        .catch(error => console.log(error))
    }

    const delete_post = (postId) => {
        fetch(`/delete_post/${postId}`, {
            method: "delete",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res => res.json())
        .then(result => {
            console.log(result)
            const newData = data.filter(item => {
                return item._id !== result._id
            })

            setData(newData)
        })
    }

    return (
        <div>
            <div className="home input-field">
            {
                data.map(item => {
                    return  (
                        <div className="card home-card" key={item.id}>
                            <div style={{
                                padding: '3px', 
                                margin: '3px auto',
                            }}>
                                <h5>{item.postedBy.name}</h5>
                                
                                {
                                item.postedBy._id == state._id 
                                
                                &&
                                
                                <i className="material-icons" 
                                style={{float: 'right', cursor: 'pointer'}}
                                onClick={() => {delete_post(item._id);}}
                                >delete
                                </i>
                                }
                            
                            </div>
                            <div className="card-image">
                                <img src={item.photo} />
                            </div>
                            <div className="card-content">
                                <h4>{item.title}</h4>
                                <p>{item.body}</p>
                                <p>{item.likes.length} likes</p>
                                                                
                                {/* <i className="material-icons" style={{color: 'blue'}}>favorite</i> */}
                                
                                {
                                
                                item.likes.includes(state._id) 

                                ?

                                <i className="material-icons" 
                                style={{color: 'red', cursor: 'pointer'}}
                                onClick={() => {unlikeposts(item._id);}}
                                >thumb_down
                                </i>

                                :
                                
                                <i className="material-icons" 
                                style={{color: 'green', cursor: 'pointer'}}
                                onClick={() => {likeposts(item._id);}}
                                >thumb_up
                                </i>
                                
                                }
                                
                                {
                                    item.comments.map(record => {
                                        return (
                                            <p key={record._id}>
                                                <span style={{fontWeight: 'bold'}}>{record.postedBy.name}</span>  {record.text}
                                            </p>
                                        )
                                    })
                                }

                                <form onSubmit={(event) => {
                                    event.preventDefault()
                                    console.log(event.target[0].value)
                                    postComment(event.target[0].value, item._id)
                                }}>
                                    <input type="text" placeholder="Add a comment..." />

                                </form>
                                
                            </div>
                        </div>

                    )
                })
            }
                
            </div>
            {/* <div className="home input-field">
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
            </div>*/}
       </div>
    )
}

export default Home
