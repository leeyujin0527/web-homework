import { useRecoilState } from 'recoil'
import styles from './CommonHeader.module.scss'
import logo from '@/assets/images/splashLogo.png'
import { showBookmarkPageState } from '../../../../recoil/atoms/bookmarkState';

function CommonHeader() {
  const [showBookmarkPage,setShowBookmarkPage] = useRecoilState(showBookmarkPageState);
  const moveToBookmark = () =>{
    setShowBookmarkPage(!showBookmarkPage)
  }
  return (
    <header className={styles.header}>
      <div className={styles.header__logoBox}>
        <img src={logo} className={styles.header__logoBox__logo}/>
        <span className={styles.header__logoBox__title}>PhotoSplash</span>
      </div>
      <div className={styles.header__profileBox}>
        <button className={styles.header__profileBox__button}>사진제출</button>
        <button className={styles.header__profileBox__button} onClick={moveToBookmark}>북마크</button>
        <span className={styles.header__profileBox__userName}>leeyujin  |  sksdldbwls@gmail.com</span>
      </div>
    </header>
  )
}

export default CommonHeader
