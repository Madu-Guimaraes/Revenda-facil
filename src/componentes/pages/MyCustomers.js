import React, { useState } from 'react';
import styles from './MyCustomers.module.css';

const MyCustomers = () => {
    const [filter, setFilter] = useState('todos'); // Estado para o filtro
    const [showLegend, setShowLegend] = useState(false); // Estado para mostrar ou esconder a legenda

    const clients = [
        { name: 'Cliente 1', status: 'pago', lastPurchase: new Date('2024-09-01') },
        { name: 'Cliente 2', status: 'pendente', lastPurchase: new Date('2024-08-15') },
        { name: 'Cliente 3', status: 'inativo', lastPurchase: new Date('2024-07-20') }, // Cliente inativo
        { name: 'Cliente 4', status: 'pago', lastPurchase: new Date('2024-08-30') },
        { name: 'Cliente 5', status: 'inativo', lastPurchase: new Date('2024-10-05') },
    ];

    const getClientClass = (client) => {
        if (client.status === 'pendente') {
            return styles.red;
        } else if (client.status === 'inativo') {
            return styles.orange;
        }
        return ''; 
    };

    // Filtrando os clientes de acordo com o filtro selecionado
    const filteredClients = clients.filter(client => {
        if (filter === 'todos') return true;
        return client.status === filter;
    });

    return (
        <section className={styles.myCustomersContainer}>
            <h1>Lista de Clientes</h1>
            <div className={styles.filterContainer}>
                <select value={filter} onChange={(e) => setFilter(e.target.value)} className={styles.filterSelect}>
                    <option value="todos">Todos</option>
                    <option value="pendente">Pendentes</option>
                    <option value="inativo">Inativos</option>
                </select>

                <span className={styles.legendLink} onClick={() => setShowLegend(true)}>
                    Legenda
                </span>
            </div>

            {showLegend && (
                <div className={styles.legendModal}>
                    <div className={styles.legendContent}>
                        <button className={styles.closeButton} onClick={() => setShowLegend(false)}>X</button>
                        <p>- Clientes destacados em <span className={styles.red}>vermelho</span> possuem saldo pendente.</p>
                        <p>- Clientes destacados em <span className={styles.orange}>laranja</span> não realizaram compras nos últimos 30, 60 ou 90 dias.</p>
                    </div>
                </div>
            )}

            <ul className={styles.clientList}>
                {filteredClients.map((client, index) => (
                    <li key={index} className={`${styles.clientItem} ${getClientClass(client)}`}>
                        {client.name}
                        <p>
                            Última Compra: {client.lastPurchase.toLocaleDateString()}
                        </p>
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default MyCustomers;