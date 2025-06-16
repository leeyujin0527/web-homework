import styles from './CommonFooter.module.scss';
import right from '@/assets/icons/icon-arrowRight.svg';
import left from '@/assets/icons/icon-arrowLeft.svg';
import { pageState } from '../../../../recoil/atoms/pageState';
import { useRecoilState } from 'recoil';


function CommonFooter() {
  const [page,setPage] = useRecoilState(pageState)
  const leftBtn = () =>{
    if(page<=1){
      setPage(1)
    }else{
      setPage(page-1)
    }
  }

  const rightBtn = () =>{
    setPage(page+1);
  }

  return (
    <footer className={styles.footer}>
      <div className={styles.pagination}>
        <button className={styles.pagination__button} onClick={leftBtn}>
          <img src={left} alt="이전" />
        </button>
        <span>{page}</span>
        <button className={styles.pagination__button} onClick={rightBtn}>
          <img src={right} alt="다음" />
        </button>
      </div>
    </footer>
  );
}

export default CommonFooter;
