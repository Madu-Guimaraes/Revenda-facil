import React from 'react';
import styles from './CustomerRegistration.module.css';
import CustomerForm from '../customer/CustomerForm';

function CustomerRegistration() {

    return (
        <div className={styles.newCustomerContainer}>
            <h1>Registro de Cliente</h1>
            <CustomerForm btnText="Cadastrar Cliente"/>

        </div>
    );
}

export default CustomerRegistration;