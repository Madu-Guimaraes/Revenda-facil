import React from 'react';
import styles from './CustomerForm.module.css';
import Input from '../form/Input';
import SubmitiButton from '../form/SubmitiButton';

function CustomerForm({btnText}) {

    return (
        <form className= {`${styles.form} ${styles.text}`}>
            <Input type="text" text="Nome do Cliente" name="name" placeholder="Insira o nome do cliente"/>
            
            <Input type="text" text="Telefone" name="phone" placeholder="Insira o telefone do cliente"/>
            
            <Input type="text" text="Endereço" name="address" placeholder="Insira o endereço do cliente"/>

            <SubmitiButton text={btnText}/>
        </form>
    );
}

export default CustomerForm;