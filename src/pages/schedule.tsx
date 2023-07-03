import styles from '@/styles/pages/schedule.module.scss';
import Head from 'next/head';
import Container from '@/components/styles/Container';
import Schedules from '@/components/styles/Schedules';
import { schedules } from '@/fake-api/schedule';

export default function Schedule() {
    return (
        <>
            <Head>
                <title>Agenda | Arcade</title>
            </Head>
            <main className={styles.schedule}>
                <Container>
                    <div className={styles.schedule_container}>
                        {schedules.map((sche, index) => (
                            <Schedules
                                title={sche.title}
                                date={sche.date}
                                hours={sche.hours}
                                src={sche.src}
                                key={sche.title + index}
                                to={sche.to}
                            />
                        ))}
                    </div>
                </Container>
            </main>
        </>
    );
}
