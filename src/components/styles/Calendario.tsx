import styles from '@/styles/styles/Calendario.module.scss';
import { useState } from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

export default function Calendaio() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const months = [
        'Janeiro',
        'Fevereiro',
        'Março',
        'Abril',
        'Maio',
        'Junho',
        'Julho',
        'Agosto',
        'Setembro',
        'Outubro',
        'Novembro',
        'Dezembro',
    ];

    const generateCalendar = () => {
        const myDate = new Date();
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();
        const eventsDates = [
            new Date(2023, 5, 25),
            new Date(2023, 6, 7),
            new Date(2023, 6, 8),
            new Date(2023, 6, 9),
            new Date(2023, 11, 20),
        ];
        //It'll be responsible to highlight the current day in the world
        const thisDay =
            myDate.getMonth() === currentMonth && myDate.getFullYear() === currentYear
                ? true
                : false;

        const firstDay = new Date(currentYear, currentMonth, 1);
        const lastDay = new Date(currentYear, currentMonth + 1, 0);

        const numDays = lastDay.getDate();
        const firstDayOfWeek = firstDay.getDay();

        const numEmptyCellsBefore = (firstDayOfWeek + 7) % 7;
        const numEmptyCellsAfter = (7 - ((numDays + numEmptyCellsBefore) % 7)) % 7;
        const totalCells = numDays + numEmptyCellsBefore + numEmptyCellsAfter;

        const calendarCells = [];

        let currentDay = 1;
        let nextMonthDay = 1;

        for (let row = 0; row < Math.ceil(totalCells / 7); row++) {
            const cells = [];

            for (let col = 0; col < 7; col++) {
                let cellContent = null;

                if (row === 0 && col < numEmptyCellsBefore) {
                    const prevMonth = new Date(currentYear, currentMonth, 0);
                    const prevMonthDay = prevMonth.getDate() - numEmptyCellsBefore + col + 1;
                    cellContent = <span className={styles.prev_month}>{prevMonthDay}</span>;
                } else if (currentDay <= numDays) {
                    //It'll see the events dates and highlight
                    eventsDates.forEach((event) => {
                        if (
                            currentDate.getMonth() === event.getMonth() &&
                            currentDay === event.getDate() &&
                            currentDate.getFullYear() === event.getFullYear()
                        ) {
                            cellContent = (
                                <span className={`${styles.event_date}`}>{currentDay}</span>
                            );
                            return;
                        }
                    });

                    if (!cellContent) {
                        cellContent = (
                            <span
                                className={`${styles.current_day} ${
                                    currentDay === myDate.getDate() && thisDay
                                        ? `${styles.highlight}`
                                        : ''
                                }`}
                            >
                                {currentDay}
                            </span>
                        );
                    }

                    currentDay++;
                } else {
                    cellContent = <span className={styles.next_month}>{nextMonthDay}</span>;
                    nextMonthDay++;
                }

                cells.push(<td key={`${row}-${col}`}>{cellContent}</td>);
            }

            calendarCells.push(<tr key={row}>{cells}</tr>);
        }

        return calendarCells;
    };

    function getMonth() {
        return months[currentDate.getMonth()];
    }

    function nextMonth() {
        const month = currentDate.getMonth();
        const year = currentDate.getFullYear();

        if (month <= 11) {
            setCurrentDate(new Date(year, month + 1, 1));
            return;
        }

        setCurrentDate(new Date(year + 1, 0, 1));
    }

    function prevMonth() {
        const month = currentDate.getMonth();
        const year = currentDate.getFullYear();

        if (month >= 1) {
            setCurrentDate(new Date(year, month - 1, 1));
            return;
        }

        setCurrentDate(new Date(year - 1, 11, 1));
    }

    return (
        <>
            <div className={styles.calendar_button}>
                <button onClick={prevMonth}>
                    <FaAngleLeft />
                </button>
                <h1 className={styles.title}>
                    <span> {getMonth()}</span>
                    <span> {currentDate.getFullYear()}</span>
                </h1>
                <button onClick={nextMonth}>
                    <FaAngleRight />
                </button>
            </div>

            <table className={styles.calendar} id="calendar">
                <thead>
                    <tr>
                        <th>Dom</th>
                        <th>Seg</th>
                        <th>Ter</th>
                        <th>Qua</th>
                        <th>Qui</th>
                        <th>Sex</th>
                        <th>Sáb</th>
                    </tr>
                </thead>
                <tbody>{generateCalendar()}</tbody>
            </table>
        </>
    );
}
