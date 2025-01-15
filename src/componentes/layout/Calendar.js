import React, { useState } from 'react';
import styles from './Calendar.module.css';

const Calendar = ({ onMonthChange, selectedDate }) => {
    // Alterar o ano
    const changeYear = (amount) => {
        onMonthChange(new Date(selectedDate.getFullYear() + amount, selectedDate.getMonth()));
    };

    // Alterar o mês selecionado
    const handleMonthClick = (month) => {
        onMonthChange(new Date(selectedDate.getFullYear(), month));
    };

    // Função para determinar o estilo para o mês atual
    const getMonthStyle = (month) => {
        const currentMonth = new Date().getMonth();
        return currentMonth === month ? styles.currentMonth : '';
    };

    // Renderizar o calendário
    const renderCalendar = () => {
        const year = selectedDate.getFullYear();
        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();
        const months = [
            'Janeiro', 'Fevereiro', 'Março', 'Abril',
            'Maio', 'Junho', 'Julho', 'Agosto',
            'Setembro', 'Outubro', 'Novembro', 'Dezembro'
        ];

        return (
            <div className={styles.calendar}>
                <div className={styles.calendarHeader}>
                    <button onClick={() => changeYear(-1)}>&lt;</button>
                    <span>{year}</span>
                    <button onClick={() => changeYear(1)}>&gt;</button>
                </div>
                <div className={styles.calendarGrid}>
                    {months.map((month, index) => {
                        const isSelected = selectedDate.getMonth() === index;
                        const isCurrent = currentMonth === index && currentYear === year;

                        return (
                            <div
                                key={index}
                                className={`${styles.calendarCell} ${isSelected ? styles.selected : ''} ${getMonthStyle(index)} ${isCurrent ? styles.current : ''}`}
                                onClick={() => handleMonthClick(index)}
                            >
                                {month}
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    };

    return renderCalendar();
};

export default Calendar;