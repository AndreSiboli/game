import Container from "@/components/styles/Container"
import styles from "@/styles/pages/pageBuilding.module.scss"

export default function PageBuilding(){
    return(
        <div className={styles.pageBuilding}>
            <Container>
                <div className={styles.pageBuilding_container}>
                    <h1>Página em construção.</h1>
                </div>
            </Container>
        </div>
    )
}