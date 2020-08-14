import React, { Component } from 'react';
import api from '../utils/api'
import getCookie from '../utils/getCookie';
import PageLoading from '../components/PageLoading';
import './styles/PostDetail.css';

class PostDetail extends Component {
    state = {
        loading: true,
        error: false,
        post: {}
    }

    fetchData = async () => {
        this.setState({ loading: true, error: null });
        const token = getCookie('token');
        try {
            const data = await api.getPostId(this.props.match.params.postId, token);
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
        if (this.state.loading) {
            return <PageLoading />;
        }
        if (this.state.error) {
            return (
                <h1>No Existe Post</h1>
            )
        }
        const { title, shortDescription, description } = this.state.post;
        return (
            <div className="container mt-4 h-100" >
                <h1>{title}</h1>
                <h5 className="my-4"> <strong>Resumen :</strong> {shortDescription}</h5>

                <hr className="container-div" />
                <p className="mt-4">
                    {description}
                </p>
            </div>
        );
    }
}


export default PostDetail;