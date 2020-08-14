import React, { Component } from 'react';
import api from '../utils/api'
import getCookie from '../utils/getCookie';
import PageLoading from '../components/PageLoading';
import './styles/PostDetail.css';
import sweetAlert from 'sweetalert2';

class PostDetail extends Component {
    state = {
        loading: true,
        error: false,
        post: {}
    }

    alertDanger = () => {
        sweetAlert.fire({
            title: 'Are you sure ?',
            text: "You won't be able to revert this. Input your password",
            icon: 'warning',
            input: 'password',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
            allowOutsideClick: () => !sweetAlert.isLoading(),
            preConfirm: async (login) => {
                try {
                    const response = await this.fetchDelete(login);
                    if (response) {
                        sweetAlert.fire(
                            'Deleted!',
                            'Your post has been deleted.',
                            'success'
                        ).then(() => {
                            this.props.history.push('/');
                        })
                    }
                }
                catch (error) {
                    sweetAlert.showValidationMessage(
                        `Request failed: ${error}`
                    )
                }
            }
        })
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
    fetchDelete = async (passUser) => {
        this.setState({ loading: true, error: null });
        const token = getCookie('token');
        try {
            const data = await api.deletePost({ postId: this.props.match.params.postId, passUser }, token);
            if (!data.error) {
                return data.message;
            } else {
                throw (new Error("Error inesperado"))
            }
        } catch (error) {
            this.setState({ loading: false });
            throw (error)
        }
    };

    handleDeletePost = () => {
        this.fetchDelete();
    }
    componentDidMount = () => {
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
                <hr className="container-div" />

                <a href="#deleteUser" className="text-danger" onClick={this.alertDanger}> Eliminar Post</a>

            </div>
        );
    }
}


export default PostDetail;