import React from "react";
import { Link } from "react-router-dom";


import { FaGithub, FaLinkedin } from "react-icons/fa";

import styles from './Sidebar.module.css'
import logo from '../../img/logo.png';

const Sidebar = () => {
    return (
        <nav className={styles.sidebar}>
                <Link to="/">
                    <img className={styles.logo} src={logo} alt="Logo Revenda Fácil" />
                </Link>
                <ul className={styles.list}>
                    <li className={styles.item}>
                        <Link to="/">Home</Link>
                    </li>
                    <li className={styles.item}>
                        <Link to="/CustomerRegistration">Registro de Cliente</Link>
                    </li>
                    <li className={styles.item}>
                        <Link to="/MyCustomers">Meus Clientes</Link>
                    </li>
                    <li className={styles.item}>
                        <Link to="/BestSellingProducts">Produtos mais Vendidos</Link>
                    </li>
                    <li className={styles.item}>
                        <Link to="/Billing">Faturamento</Link>
                    </li>
                    <li className={styles.item}>
                        <Link to="/Trash">Lixo</Link>
                    </li>
                    <li className={styles.item}>
                        <Link to="/Account">Conta</Link>
                    </li>
                </ul>
                <div className={styles.socialMedia}>
                    <a href="https://github.com/SeuPerfil" target="_blank" rel="noopener noreferrer">
                        <FaGithub className={styles.icon} />
                    </a>
                    <a href="https://linkedin.com/in/SeuPerfil" target="_blank" rel="noopener noreferrer">
                        <FaLinkedin className={styles.icon} />
                    </a>
                </div>
                <div className={styles.copyright}>
                    <p>&copy; 2024 Revenda Fácil. Todos os direitos reservados.</p>
                </div>
        </nav>
    );
};

export default Sidebar;