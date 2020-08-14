import React, { Component } from 'react';
//import './styles/Post.css';
import api from '../api'

class PostDetails extends Component {
    state = {
        loading: false,
        error: false,
        post: {}
    }

    fetchData = async () => {
        this.setState({ loading: true, error: null });
        try {
            const data = await api.getPost(this.props.match.params.postId);
            if (!data.error) {
                this.setState({ loading: false, post: data.message });
            } else {
                this.setState({ loading: false, error: 'No Existe el Post' });
            }
        } catch (error) {
            this.setState({ loading: false, error: error });
        }
    };
    componentDidMount() {
        this.fetchData();
    }
    render() {
        const { title, shortDescription, description } = this.state.post;
        return (
            <div className="container" >
                <h1>{title}</h1>
                <h6>{shortDescription}</h6>
                <hr style="color: #0056b2;" />
                <p>
                    {description}
                </p>
            </div>
        );
    }
}


export default PostDetails;