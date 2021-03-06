import React, { Component } from 'react';
import './styles/CreatePost.css';
import api from '../utils/api';
import sweetAlert from 'sweetalert2';
import PageLoading from '../components/PageLoading';
import getCookie from '../utils/getCookie'

class CreatePost extends Component {
    state = {
        loading: false,
        error: false,
        categories: [],
        form: {}
    }

    alertError = () => {
        sweetAlert.fire({
            title: 'Oops!',
            text: `Unexpected Error 😅, try again`,
            icon: 'error'
        });
    }

    alertData(data) {
        sweetAlert.fire({
            title: 'Stop!',
            text: `Fields to fill 🧐
          ${data}`,
            icon: 'error'
        });
    }

    alertSuccess() {
        sweetAlert.fire({
            title: 'Creación Exitosa !',
            text: 'We wait for you here 😊',
            icon: 'success'
        }).then((result) => {
            if (result.value || !result.value) {
                this.props.history.push('/');
            }
        });
    }

    handleChange = e => {
        let form = this.state.form;
        form = {
            ...this.state.form,
            [e.target.name]: e.target.value,
        }
        this.setState({
            form: form
        });
    }


    handleSubmit = async (e) => {
        e.preventDefault();
        const valuesFilter = Object.keys(this.state.form).filter((value) => {
            return (this.state.form[value] === "")
        })
        if (valuesFilter.length !== 0) {
            this.alertData(valuesFilter)
        } else {
            this.setState({ loading: true, error: null });
            const userId = getCookie('id');
            const token = getCookie('token');
            try {
                await api.createPost({ ...this.state.form, user: userId }, token);
                this.alertSuccess()
            } catch (error) {
                this.setState({ loading: false, error: error });
                this.alertError()
            }
        }
    };

    fetchData = async () => {
        const token = getCookie('token');
        try {
            const data = await api.getCategories(token);
            this.setState({ categories: data.message })
        } catch (error) {
            this.setState({ categories: [] });
        }
    };

    componentDidMount() {
        this.fetchData();
    }

    render() {
        if (this.state.loading) {
            return <PageLoading />;
        }
        return (
            <section className="container my-5">
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label>Title</label>
                        <input
                            onChange={this.handleChange}
                            className="form-control"
                            type="text"
                            name="title"
                            value={this.state.title}
                        />
                    </div>

                    <div className="form-group">
                        <label>Slug</label>
                        <input
                            onChange={this.handleChange}
                            className="form-control"
                            type="text"
                            name="slug"
                            value={this.state.slug}
                        />
                    </div>
                    <div className="form-group">
                        <label>Categoria</label>
                        <select id="category" name="category" className="form-control">
                            <option key="0" value="0" selected>Categoria</option>
                            {this.state.categories.length > 0 && (
                                <>
                                    {this.state.categories.map((item) => (
                                        <option
                                            key={item._id}
                                            value={item._id}
                                        >
                                            {item.name}</option>
                                    ))}
                                </>
                            )}

                        </select>
                    </div>
                    <div className="form-group">
                        <label>Descripcion Corta</label>
                        <input
                            onChange={this.handleChange}
                            className="form-control"
                            type="text"
                            name="shortDescription"
                            value={this.state.shortDescription}
                        />
                    </div>

                    <div className="form-group">
                        <label>Descirptcion Larga</label><br />
                        <textarea
                            onChange={this.handleChange}
                            name="description"
                            className="form-control"
                            rows="10"
                            cols="80"
                            placeholder="Escribe tu post"
                            value={this.state.description}
                        />
                    </div>

                    <button type='submit' className="btn btn-primary">
                        Guardar Post</button>

                    {this.props.error && (
                        <p className="text-danger">{this.props.error.message}</p>
                    )}
                </form>
            </section>
        );
    }
}


export default CreatePost;
