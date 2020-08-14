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
        try {
            const userId = getCookie('id');
            const token = getCookie('token');
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
            <div className="container mt-5">
                <h1>Hola {this.props.user.name}<br />
                    Estamos encantados de tenerte</h1>
                <Link to='/new_post'>
                    Crea Un Nuevo Post
                </Link>
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