import React from 'react';
import './styles/Home.css';
import { connect } from 'react-redux';
import Header from '../components/Header';
import SalesList from '../components/SalesList'
import FormBuy from '../components/FormBuy'
import Footer from '../components/Filter'
import { clearProductCar } from '../actions';


const Buy = ({ productsCar, total }) => {
    return (
        <div className="container">
            <Header />
            <SalesList sales={productsCar} total={total} />
            <FormBuy productsCar={productsCar} />
            <Footer />
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        productsCar: state.productsCar,
        total: state.total,
    };
};
const mapDispatchToProps = {
    clearProductCar,
};
export default connect(mapStateToProps, mapDispatchToProps)(Buy);