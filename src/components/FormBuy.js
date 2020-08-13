import React from 'react';
import api from '../api';
import PageLoading from './PageLoading'
import sweetAlert from 'sweetalert2'

class FormBuy extends React.Component {
  state = {
    loading: false,
    error: null,
    form: {
      name: '',
      phone: '',
      email: ''
    },
  };

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
      title: 'Update Success !',
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

  handleSubmit = async e => {
    e.preventDefault();
    const ids = this.props.productsCar.map((product) => (product.id));
    const counts = this.props.productsCar.map((product) => (product.count));
    const valuesFilter = Object.keys(this.state.form).filter((value) => {
      return (this.state.form[value] === "")
    })
    if (valuesFilter.length !== 0) {
      this.alertData(valuesFilter)
    } else {
      this.setState({ loading: true, error: null });

      try {
        await api.postBuy(this.state.form.name, this.state.form.phone, this.state.form.email, ids, counts);
        this.setState({ loading: false });
        this.alertSuccess()
      } catch (error) {
        this.setState({ loading: false, error: error });
        this.alertError()
      }
    }
  };


  render() {
    if (this.state.loading) {
      return <PageLoading />;
    }

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              onChange={this.handleChange}
              className="form-control"
              type="text"
              name="name"
              value={this.state.form.name}
            />
          </div>

          <div className="form-group">
            <label>Phone</label>
            <input
              onChange={this.handleChange}
              className="form-control"
              type="number"
              name="phone"
              value={this.state.form.phone}
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              onChange={this.handleChange}
              className="form-control"
              type="email"
              name="email"
              value={this.state.form.email}
            />
          </div>

          <button className="btn btn-primary">
            Buy
          </button>

          {this.props.error && (
            <p className="text-danger">{this.props.error.message}</p>
          )}
        </form>
      </div>
    );
  }
}

export default FormBuy;
