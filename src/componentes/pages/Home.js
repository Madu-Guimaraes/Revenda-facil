import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Calendar from '../layout/Calendar';
import styles from './Home.module.css';

function Home() {
    const navigate = useNavigate();

    // Dados simulados de clientes
    const clients = [
        { name: 'Cliente 1', status: 'pendente' },
        { name: 'Cliente 2', status: 'ativo' },
        { name: 'Cliente 3', status: 'amarelo' },
        { name: 'Cliente 1', status: 'pendente' },
        { name: 'Cliente 2', status: 'ativo' },
        { name: 'Cliente 3', status: 'amarelo' },
        { name: 'Cliente 1', status: 'pendente' },
        { name: 'Cliente 2', status: 'ativo' }
    ];

    const dataByDate = useMemo(() => ({
        '2024-10-01': {
            totalFaturado: 'R$ 10.000,00',
            totalClientesCadastrados: 20,
            produtosMaisVendidos: ['Produto A', 'Produto B', 'Produto C', 'Produto A', 'Produto B', 'Produto A', 'Produto B', 'Produto C', 'Produto A', 'Produto B', 'Produto C']
        },
        '2024-11-01': {
            totalFaturado: 'R$ 15.000,00',
            totalClientesCadastrados: 25,
            produtosMaisVendidos: ['Produto X', 'Produto Y', 'Produto Z']
        }
    }), []);

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [totalFaturado, setTotalFaturado] = useState('R$ 0,00');
    const [totalClientesCadastrados, setTotalClientesCadastrados] = useState(0);
    const [produtosMaisVendidos, setProdutosMaisVendidos] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState(null);
    const [filter, setFilter] = useState('todos');
    const [showLegend, setShowLegend] = useState(false);

    useEffect(() => {
        const currentMonth = new Date().getMonth();
        const savedMonth = localStorage.getItem('selectedMonth');
        setSelectedMonth(savedMonth ? parseInt(savedMonth, 10) : currentMonth);

        const formattedDate = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-01`;
        const dataForSelectedDate = dataByDate[formattedDate];

        if (dataForSelectedDate) {
            setTotalFaturado(dataForSelectedDate.totalFaturado);
            setTotalClientesCadastrados(dataForSelectedDate.totalClientesCadastrados);
            setProdutosMaisVendidos(dataForSelectedDate.produtosMaisVendidos);
        } else {
            setTotalFaturado('');
            setTotalClientesCadastrados(0);
            setProdutosMaisVendidos([]);
        }
    }, [selectedDate, dataByDate]);

    const handleClientClick = (clientName) => {
        navigate(`/cliente/${clientName}`);
    };

    const getClientClass = (client) => {
        if (client.status === 'pendente') {
            return styles.red;
        } else if (client.status === 'amarelo') {
            return styles.orange;
        }
        return '';
    };

    const renderFilteredClients = () => {
        return clients
            .filter(client => {
                if (filter === 'pendente') return client.status === 'pendente';
                if (filter === 'inativo') return client.status === 'amarelo';
                return true;
            })
            .map((client, index) => (
                <li
                    key={index}
                    className={`${styles.clickable} ${getClientClass(client)}`}
                    onClick={() => handleClientClick(client.name)}
                >
                    {client.name}
                </li>
            ));
    };

    const handleProductCardClick = () => {
        const year = selectedDate.getFullYear();
        const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
    
        // Navega para a tela BestSellingProducts passando o estado com os produtos
        navigate(`/BestSellingProducts`, {
            state: {
                year,
                month,
                produtosMaisVendidos,
            },
        });
    };       

    return (
        <section className={styles.homeContainer}>
            <section className={styles.containerDashboard}>
                <div className={styles.dashboard}>
                    <Link to="/Billing" className={styles.card}>
                        <h3>Total Faturado</h3>
                        {totalFaturado ? <p>{totalFaturado}</p> : <p>Sem dados cadastrados</p>}
                    </Link>

                    <div className={styles.card}>
                        <h3>Total de Clientes Cadastrados</h3>
                        {totalClientesCadastrados > 0 ? <p>{totalClientesCadastrados}</p> : <p>Sem dados cadastrados</p>}
                    </div>

                    <div onClick={handleProductCardClick} className={styles.card}>
                        <h3>Produtos Mais Vendidos</h3>
                        {produtosMaisVendidos.length > 0 ? (
                            produtosMaisVendidos.slice(0, 10).map((produto, index) => (
                                <p key={index}>{produto}</p>
                            ))
                        ) : (
                            <p>Sem dados cadastrados</p>
                        )}
                    </div>


                    <div className={styles.card}>
                        <div className={styles.clientHeader}>
                            <h3>Meus Clientes</h3>
                            <select value={filter} onChange={(e) => setFilter(e.target.value)} className={styles.filterSelect}>
                                <option value="todos">Todos</option>
                                <option value="pendente">Pendentes</option>
                                <option value="inativo">Inativos</option>
                            </select>
                        </div>
                        <ul className={styles.clientListScrollable}>
                            {renderFilteredClients()}
                        </ul>
                        <span
                            className={styles.legendLink}
                            onClick={() => setShowLegend(true)}
                        >
                            Legenda
                        </span>
                    </div>
                </div>

                <div className={styles.calendarContainer}>
                    <Calendar 
                        selectedDate={selectedDate} 
                        onMonthChange={setSelectedDate} 
                    />
                </div>
            </section>

            {showLegend && (
                <div className={styles.legendModal}>
                    <div className={styles.legendContent}>
                        <button className={styles.closeButton} onClick={() => setShowLegend(false)}>X</button>
                        <p>- Clientes destacados em <span className={styles.red}>vermelho</span> possuem saldo pendente.</p>
                        <p>- Clientes destacados em <span className={styles.orange}>laranja</span> não realizaram compras nos últimos meses.</p>
                    </div>
                </div>
            )}
        </section>
    );
}

export default Home;