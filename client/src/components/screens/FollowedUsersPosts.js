import React, { useState, useEffect, useContext } from 'react'
import {UserContext} from '../../App'
import {Link} from 'react-router-dom'

function FollowedUsersPosts() {

    const [data, setData] = useState([])
    const { state, dispatch } = useContext(UserContext)
    useEffect(() => {
        fetch(
            
            '/view_all_follow_posts',

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
        console.log(id)
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

        
        <div className="home input-field">
            {
                data.posts.length
                
                ?

                data.map(item => 
                {
                    return  (
                        <div className="card home-card" key={item.id}>
                            
                            <div style={{
                                padding: '3px', 
                                margin: '3px auto',
                            }}>
                                <h5 style={{
                                    padding: "6px",
                                    cursor: "pointer"
                                }}><Link to = {item.postedBy._id !== state._id ? "/profile/" + item.postedBy._id : "/profile"}>{item.postedBy.name} </Link></h5>
                                
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

                :

                <h2> You are not following any users :/ </h2>
            
            }
                
        </div>
            
        


      )

     
    
 }

//}

export default FollowedUsersPosts
