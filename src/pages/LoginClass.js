import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../actions';
import { Link } from 'react-router-dom';
import './styles/Login.css';
import Header from '../components/Header';
import PageLoading from '../components/PageLoading';

class Login extends Component {
    state = {
        loading: false,
        error: false,
        form: {}
    }

    handleInput = (e) => {
        let form = this.state.form;
        form = {
            ...this.state.form,
            [e.target.name]: e.target.value,
        }
        this.setState({
            form: form
        });
    };

    handleSubmit = async (event) => {
        this.setState({ loading: true, error: null });
        event.preventDefault();
        await this.props.loginUser(this.state.form);
        this.setState({ loading: false, error: null });
        this.props.history.push('/');
    };


    render() {
        if (this.state.loading) {
            return <PageLoading />;
        }

        return (
            <>
                <Header />
                <section className='login'>
                    <section className='login__container'>
                        <h2>Inicia sesión</h2>
                        <form className='login__container--form' onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <input
                                    name='email'
                                    className='form-control'
                                    type='text'
                                    placeholder='Correo'
                                    onChange={this.handleInput}
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    name='password'
                                    className='form-control'
                                    type='password'
                                    placeholder='Contraseña'
                                    onChange={this.handleInput}
                                />
                            </div>
                            <button className='btn btn-primary' type='submit'>Iniciar sesión</button>
                        </form>
                        <section className='login__container--register'>
                            <p className='login__container--register'>
                                No tienes ninguna cuenta
                        </p>
                            <Link to='/register'>Regístrate</Link>
                        </section>
                    </section>
                </section>
            </>
        );
    }
}

const mapDispatchToProps = {
    loginUser,
};

export default connect(null, mapDispatchToProps)(Login);
