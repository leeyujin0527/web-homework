import styles from './CommonFooter.module.scss'
import right from '@/assets/icons/icon-arrowRight.svg'
import left from '@/assets/icons/icon-arrowLeft.svg'
function CommonFooter() {
  return (
    <footer className={styles.footer}>
        <div className={styles.pagination}>
            <button className={styles.pagination__button}>
                <img src={left}></img>
            </button>
            <span>1</span>
            <button className={styles.pagination__button}>
                <img src={right}></img>
            </button>
        </div>
    </footer>
  )
}

export default CommonFooter
