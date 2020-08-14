import React, { Component } from 'react';
import './styles/Home.css';
import { Link } from 'react-router-dom';
import api from '../utils/api'
import { connect } from 'react-redux';
import { addPost } from '../actions';
import PostsContainer from '../components/PostContainer';
import getCookie from '../utils/getCookie';

class Home extends Component {
    fetchData = async () => {
        const userId = getCookie('id');
        const token = getCookie('token');
        try {
            const data = await api.getPost(userId, token);
            this.props.addPost(data.message);
        } catch (error) {
            this.setState({ post: [] });
        }
    };

    componentDidMount() {
        this.fetchData();
    }

    render() {
        return (
            <div className="container mt-5 h-100">
                <div className="row">
                    <h1>Hola {this.props.user.name}<br />
                    Estamos encantados de tenerte</h1>
                </div>
                <div className="row">
                    <span className="my-4">
                        <Link to='/new_post'>Crea Un Nuevo Post</Link>
                    </span>
                </div>
                <PostsContainer post={this.props.post} />
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        user: state.user,
        post: state.post
    };
};

const mapDispatchToProps = {
    addPost,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);