import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Home.module.css';

function Home() {
    const navigate = useNavigate();

    const dataByDate = {
        '2024-10-01': {
            totalFaturado: 'R$ 10.000,00',
            totalClientesCadastrados: 20,
            produtosMaisVendidos: ['Produto A', 'Produto B', 'Produto C']
        },
        '2024-11-01': {
            totalFaturado: 'R$ 15.000,00',
            totalClientesCadastrados: 25,
            produtosMaisVendidos: ['Produto X', 'Produto Y', 'Produto Z']
        }
        // Adicione outros meses conforme necessário...
    };

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [totalFaturado, setTotalFaturado] = useState('R$ 0,00');
    const [totalClientesCadastrados, setTotalClientesCadastrados] = useState(0);
    const [produtosMaisVendidos, setProdutosMaisVendidos] = useState([]);
    
    const [clients] = useState([
        { name: 'Cliente 1', status: 'pago', lastPurchase: new Date('2024-09-01') },
        { name: 'Cliente 2', status: 'pendente', lastPurchase: new Date('2024-08-15') },
        { name: 'Cliente 3', status: 'amarelo', lastPurchase: new Date('2024-07-20') },
        { name: 'Cliente 4', status: 'pago', lastPurchase: new Date('2024-08-30') },
        { name: 'Cliente 5', status: 'amarelo', lastPurchase: new Date('2024-10-05') },
    ]);

    const [showLegend, setShowLegend] = useState(false);

    useEffect(() => {
        const formattedDate = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-01`;
        const dataForSelectedDate = dataByDate[formattedDate];

        if (dataForSelectedDate) {
            setTotalFaturado(dataForSelectedDate.totalFaturado);
            setTotalClientesCadastrados(dataForSelectedDate.totalClientesCadastrados);
            setProdutosMaisVendidos(dataForSelectedDate.produtosMaisVendidos);
        } else {
            setTotalFaturado('R$ 0,00');
            setTotalClientesCadastrados(0);
            setProdutosMaisVendidos([]);
        }
    }, [selectedDate]);

    const handleClientClick = (clientName) => {
        navigate(`/cliente/${clientName}`);
    };

    const getClientClass = (client) => {
        const daysSinceLastPurchase = Math.floor((selectedDate - new Date(client.lastPurchase)) / (1000 * 60 * 60 * 24));

        if (client.status === 'pendente') {
            return styles.red; 
        } else if (daysSinceLastPurchase > 90) {
            return styles.yellow; 
        }
        return ''; 
    };

    const renderCalendar = () => {
        const daysInMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0).getDate();
        const firstDayOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1).getDay();
        const calendar = [];

        // Preenche as células vazias antes do primeiro dia do mês
        for (let i = 0; i < firstDayOfMonth; i++) {
            calendar.push(<div className={styles.calendarCell} key={`empty-${i}`}></div>);
        }

        // Adiciona os dias do mês ao calendário
        for (let day = 1; day <= daysInMonth; day++) {
            calendar.push(
                <div 
                    key={day} 
                    className={styles.calendarCell} 
                    onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day))}
                >
                    {day}
                </div>
            );
        }

        return calendar;
    };

    const changeMonth = (delta) => {
        const newDate = new Date(selectedDate);
        newDate.setMonth(selectedDate.getMonth() + delta);
        setSelectedDate(newDate);
    };

    return (
        <section className={styles.homeContainer}>
            <div className={styles.WelcomeContainer}>
                <h1>Bem-Vindo(a) ao <span>Revenda Fácil</span></h1>
                <p>Comece a gerenciar as suas vendas agora mesmo!</p>
            </div>
            <section className={styles.containerDashboard}>
                <div className={styles.dashboard}>
                    <Link to="/Billing" className={styles.card}>
                        <h3>Total Faturado</h3>
                        <p>{totalFaturado}</p>
                    </Link>

                    <div className={styles.card}>
                        <h3>Total de Clientes Cadastrados</h3>
                        <p>{totalClientesCadastrados}</p>
                    </div>

                    <Link to="/BestSellingProducts" className={styles.card}>
                        <h3>Produtos Mais Vendidos</h3>
                        {produtosMaisVendidos.length > 0 ? (
                            produtosMaisVendidos.map((produto, index) => <p key={index}>{produto}</p>)
                        ) : (
                            <p>Sem dados</p>
                        )}
                    </Link>

                    <div className={styles.card}>
                        <div className={styles.clientHeader}>
                            <Link to="/MyCustomers" className={styles.linkText}>
                                <h3>Meus Clientes</h3>
                            </Link>
                        </div>
                        <ul className={styles.clientListScrollable}>
                            {clients.map((client, index) => (
                                <li
                                    key={index}
                                    className={`${styles.clickable} ${getClientClass(client)}`}
                                    onClick={() => handleClientClick(client.name)}
                                >
                                    {client.name}
                                </li>
                            ))}
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
                    <div className={styles.calendar}>
                        <div className={styles.calendarHeader}>
                            <button onClick={() => changeMonth(-1)}>&lt;</button>
                            <span>{selectedDate.toLocaleString('default', { month: 'long' })} {selectedDate.getFullYear()}</span>
                            <button onClick={() => changeMonth(1)}>&gt;</button>
                        </div>
                        <div className={styles.calendarGrid}>
                            {renderCalendar()}
                        </div>
                    </div>
                </div>
            </section>

            {showLegend && (
                <div className={styles.legendModal}>
                    <div className={styles.legendContent}>
                        <button className={styles.closeButton} onClick={() => setShowLegend(false)}>X</button>
                        <p>- Clientes destacados em <span className={styles.red}>vermelho</span> possuem saldo pendente.</p>
                        <p>- Clientes destacados em <span className={styles.yellow}>amarelo</span> não realizaram compras nos últimos 30, 60 ou 90 dias.</p>
                    </div>
                </div>
            )}
        </section>
    );
}

export default Home;