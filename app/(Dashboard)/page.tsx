import styles from '../styles.module.scss'
import {redirect} from "next/navigation";

export default function Home() {
    redirect('/dashboard')
    return (
        <main className={styles.main}>
            <div>
            </div>
        </main>
    )
}
