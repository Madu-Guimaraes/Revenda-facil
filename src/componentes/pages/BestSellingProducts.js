// import React, { useState } from 'react';
// import Calendar from '../layout/Calendar';
// import styles from './BestSellingProducts.module.css';
// import { useLocation } from 'react-router-dom';

// const BestSellingProducts = () => {
//     const location = useLocation();
//     const [selectedDate, setSelectedDate] = useState(new Date());

//     // Função para atualizar o mês
//     const handleMonthChange = (newDate) => {
//         setSelectedDate(newDate);
//     };

//     // Simulação de produtos mais vendidos
//     const getBestSellingProducts = () => {
//         const data = {
//             '2024-0': ['Produto A', 'Produto B', 'Produto C'],
//             '2024-1': ['Produto D', 'Produto E', 'Produto F'],
//         };

//         const key = `${selectedDate.getFullYear()}-${selectedDate.getMonth()}`;
//         return data[key] || ['Sem dados disponíveis'];
//     };

//     return (
//         <section className={styles.container}>
//             <section className={styles.containerDashboard}>
//                 <div className={styles.dashboard}>
//                     <div className={styles.card}>
//                         <h3>Produtos Mais Vendidos</h3>
//                         {getBestSellingProducts().length > 0 ? (
//                             <ul>
//                                 {getBestSellingProducts().map((product, index) => (
//                                     <li key={index}>{product}</li>
//                                 ))}
//                             </ul>
//                         ) : (
//                             ''
//                         )}
//                     </div>
//                 </div>
//                 <div className={styles.calendarContainer}>
//                     <Calendar selectedDate={selectedDate} onMonthChange={handleMonthChange} />
//                 </div>
//             </section>
//         </section>
//     );
// };

// export default BestSellingProducts;

import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Calendar from '../layout/Calendar';
import styles from './BestSellingProducts.module.css';

const BestSellingProducts = () => {
    const location = useLocation();
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [produtosMaisVendidos, setProdutosMaisVendidos] = useState([]);

    // Atualiza o estado com os dados passados pela navegação
    useEffect(() => {
        if (location.state) {
            setProdutosMaisVendidos(location.state.produtosMaisVendidos || []);
            const year = parseInt(location.state.year, 10);
            const month = parseInt(location.state.month, 10) - 1; // Ajuste de mês (0-11)
            setSelectedDate(new Date(year, month));
        }
    }, [location.state]);

    const handleMonthChange = (newDate) => {
        setSelectedDate(newDate);

        // Simula atualização de produtos com base na data
        const formattedKey = `${newDate.getFullYear()}-${String(newDate.getMonth() + 1).padStart(2, '0')}`;
        const simulatedData = {
            '2024-10': ['Produto A', 'Produto B', 'Produto C'],
            '2024-11': ['Produto X', 'Produto Y', 'Produto Z'],
        };
        setProdutosMaisVendidos(simulatedData[formattedKey] || ['Sem dados disponíveis']);
    };

    return (
        <section className={styles.container}>
            <section className={styles.containerDashboard}>
                <div className={styles.dashboard}>
                    <div className={styles.card}>
                        <h3>Produtos Mais Vendidos</h3>
                        {produtosMaisVendidos.length > 0 ? (
                            <ul>
                                {produtosMaisVendidos.map((product, index) => (
                                    <li key={index}>{product}</li>
                                ))}
                            </ul>
                        ) : (
                            <p>Sem dados disponíveis</p>
                        )}
                    </div>
                </div>
                <div className={styles.calendarContainer}>
                    <Calendar selectedDate={selectedDate} onMonthChange={handleMonthChange} />
                </div>
            </section>
        </section>
    );
};

export default BestSellingProducts;