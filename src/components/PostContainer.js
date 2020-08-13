import React from 'react';
import './styles/PostContainer.css';

const ListPosts = (props) => {
    return (
        <div className="list-group list-group-horizontal">
            <span className="list-group-item list-item-title">{props.post.title}</span>
            <span className="list-group-item list-item-description">{props.post.shortDescription}</span>
        </div>
    );
}

const PostsContainer = (props) => {
    const posts = props.post;
    let count = 1;
    if (posts.length === 0) {
        return (
            <>
                <h3>No has posteado Nada</h3>
            </>
        );
    }
    return (
        <div>
            <ul className="list-unstyled">
                <li key='0'>
                    <div className="list-group list-group-horizontal">
                        <span className="list-group-item list-item-title"><strong>Titulo</strong></span>
                        <span className="list-group-item list-item-description"><strong>Descripcion</strong></span>
                    </div>
                </li>
                {posts.map(post => {
                    return (
                        <li key={count++}>
                            <ListPosts post={post} />
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}


export default PostsContainer;