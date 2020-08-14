import React, { useState } from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../actions';
import { Link } from 'react-router-dom';
import './styles/Login.css';
import PageLoading from '../components/PageLoading';

const Login = (props) => {
    const [form, setValues] = useState({
        email: '',
        password: ''
    });
    const [state, setState] = useState({
        loading: false,
        error: null,
    })

    const handleInput = (event) => {
        setValues({
            ...form,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        setState({ loading: true, error: null });
        event.preventDefault();
        await props.loginUser(form);
        props.history.push('/');
    };

    if (state.loading) {
        return <PageLoading />;
    }
    return (
        <>
            <section className='login'>
                <section className='login__container'>
                    <h2>Inicia sesión</h2>
                    <form className='login__container--form' onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input
                                name='email'
                                className='form-control'
                                type='text'
                                placeholder='Correo'
                                onChange={handleInput}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                name='password'
                                className='form-control'
                                type='password'
                                placeholder='Contraseña'
                                onChange={handleInput}
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
};

const mapDispatchToProps = {
    loginUser,
};

export default connect(null, mapDispatchToProps)(Login);
