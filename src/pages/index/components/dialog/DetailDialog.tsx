import { CardDTO } from '../../types/card'
import styles from './DetailDialog.module.scss'
import React from 'react'
import closeIcon from '@/assets/icons/close.png'

interface Props{
    data : CardDTO
    handleDialog : (eventValue : boolean) => void
}


function DetailDialog({ data,handleDialog }:Props) {
    console.log()
    const close = (event: React.MouseEvent<HTMLElement,MouseEvent>) => {
        handleDialog(false)
        event.stopPropagation()
    }
  return (
    <div className={styles.container}>
        <div className={styles.container__Dialog}>
            <div className={styles.container__Dialog__header}>
                <div className={styles.container__Dialog__header__left}>
                    <img src={closeIcon} className={styles.container__Dialog__header__left__close} onClick={close}></img>
                    <img className={styles.container__Dialog__header__left__profile} alt='작가프사' src={data.user.profile_image.small}></img>
                    <span className={styles.container__Dialog__header__left__authName}>{data.user.name}</span>
                </div>
                <div className={styles.container__Dialog__header__right}>
                    <button className={styles.container__Dialog__header__right__bookmarkBtn}>
                        <span className="material-symbols-outlined" style={{ fontSize: 17 + 'px'}}>favorite</span>
                        북마크
                    </button>
                    <button className={styles.container__Dialog__header__right__downloadBtn}>다운로드</button>
                </div>
            </div>
            <div className={styles.container__Dialog__body}>
                <img className={styles.container__Dialog__body__image} alt='상세 이미지' src={data.urls.small}></img>
            </div>
            <div className={styles.container__Dialog__footer}>
                <div className={styles.container__Dialog__footer__itemBox}>
                    <div className={styles.container__Dialog__footer__itemBox__item}>
                        <span className={styles.container__Dialog__footer__itemBox__item__label}>이미지 크기</span>
                        <span className={styles.container__Dialog__footer__itemBox__item__value}>{data.width} X {data.height}</span>
                    </div>
                    <div className={styles.container__Dialog__footer__itemBox__item}>
                        <span className={styles.container__Dialog__footer__itemBox__item__label}>업로드</span>
                        <span className={styles.container__Dialog__footer__itemBox__item__value}>{data.created_at.split("T")[0]}</span>
                    </div>
                    <div className={styles.container__Dialog__footer__itemBox__item}>
                        <span className={styles.container__Dialog__footer__itemBox__item__label}>마지막 업데이트</span>
                        <span className={styles.container__Dialog__footer__itemBox__item__value}>{data.updated_at.split("T")[0]}</span>
                    </div>
                    <div className={styles.container__Dialog__footer__itemBox__item}>
                        <span className={styles.container__Dialog__footer__itemBox__item__label}>다운로드</span>
                        <span className={styles.container__Dialog__footer__itemBox__item__value}>{data.likes}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default DetailDialog