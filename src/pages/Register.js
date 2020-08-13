import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { registerUser } from '../actions';
import Header from '../components/Header';
import './styles/Register.css';

const Register = (props) => {
    const [form, setValues] = useState({
        email: '',
        name: '',
        password: '',
        phone: 0,
    });

    const updateInput = (event) => {
        setValues({
            ...form,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        props.registerUser(form);
        props.history.push('/');
    };
    return (
        <>
            <Header />
            <section className='register'>
                <section className='register__container'>
                    <h2>Regístrate</h2>

                    <form className='register__container--form' onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input
                                name='name'
                                className='form-control'
                                type='text'
                                placeholder='Nombre'
                                onChange={updateInput}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                name='email'
                                className='form-control'
                                type='text'
                                placeholder='Correo'
                                onChange={updateInput}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                name='password'
                                className='form-control'
                                type='password'
                                placeholder='Contraseña'
                                onChange={updateInput}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                name='phone'
                                className='form-control'
                                type='tel'
                                placeholder='Celular'
                                onChange={updateInput}
                            />
                        </div>
                        <button className='btn btn-primary' type='submit'>Registrarme</button>
                    </form>
                    <Link to='/login' className='register__container--login'>
                        Iniciar sesión</Link>
                </section>
            </section>
        </>
    );
};

const mapDispatchToProps = {
    registerUser,
};

Register.propTypes = {
    registerUser: PropTypes.func,
};

export default connect(null, mapDispatchToProps)(Register);
