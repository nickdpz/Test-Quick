import React, { Component } from 'react';
import { connect } from 'react-redux';
import './styles/Profile.css';
import { userUpdate } from '../actions';
import getCookie from '../utils/getCookie';
import PageLoading from '../components/PageLoading'

class Profile extends Component {
    state = {
        user: {
            email: '',
            password: '',
            phone: 0,
        },
        enabledInput: false,
        enabledButton: false,
        loading: false,
        error: false,
    }

    updateInput = (event) => {
        this.setState({
            user: {
                ...this.state.user,
                [event.target.name]: event.target.value,
            },
            enabledButton: true
        });
    };

    handleSubmit = async (event) => {
        this.setState({ loading: true, error: null });
        event.preventDefault();
        const token = getCookie('token');
        try {
            await this.props.userUpdate(this.state.user, token);
            this.setState({
                loading: false,
                error: null,
                user: this.props.user
            });
        } catch (e) {
            this.setState({
                loading: false,
                error: e,
            });
        }
    };

    handleCheck = () => {
        this.setState({
            enabledInput: !this.state.enabledInput
        })
    }
    componentDidMount() {
        this.setState({
            user: this.props.user
        })
    }

    render() {
        if (this.state.loading) {
            return <PageLoading />;
        }
        return (
            <section className='container my-5' >
                <h2>{this.props.user.name}</h2>
                <div className='container-switch'>
                    <h4 className='mr-4'>Editar</h4>
                    <label className="switch">
                        <input type="checkbox" onClick={this.handleCheck} />
                        <span className="slider round"></span>
                    </label>
                </div>
                <form className='profile__container--form' onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <input
                            name='email'
                            className='form-control'
                            type='text'
                            placeholder='Correo'
                            value={this.state.user.email}
                            onChange={this.updateInput}
                            disabled={!this.state.enabledInput}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            name='phone'
                            className='form-control'
                            type='tel'
                            value={this.state.user.phone}
                            placeholder='Celular'
                            onChange={this.updateInput}
                            disabled={!this.state.enabledInput}
                        />
                    </div>
                    <div className="form-group">
                        <h3>Ingrese Clave </h3>
                        <input
                            name='password'
                            className='form-control'
                            type='password'
                            value={this.state.user.password}
                            placeholder='Contraseña'
                            onChange={this.updateInput}
                            disabled={!this.state.enabledInput}
                        />
                    </div>
                    <button
                        className='btn btn-primary'
                        type='submit'
                        disabled={!this.state.enabledButton}
                    >
                        Actualizar
                        </button>
                </form>
            </section>
        );
    };
}
const mapStateToProps = (state) => {
    return {
        user: state.user,
    };
};

const mapDispatchToProps = {
    userUpdate,
};


export default connect(mapStateToProps, mapDispatchToProps)(Profile);
