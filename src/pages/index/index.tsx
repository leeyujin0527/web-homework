import React, { useEffect, useMemo, useState } from 'react'
import styles from './index.module.scss';
import CommonHeader from './components/header/CommonHeader'
import CommonSearchBar from './components/searchBar/CommonSearchBar'
import Navigation from './components/navigation/CommonNav'
import Footer from './components/footer/CommonFooter'
import Card from './components/card/Card'
import { CardDTO } from './types/card'
import { imageData } from '../../recoil/atoms/selectors/imageSelectors'
import { useRecoilValue, useRecoilValueLoadable } from 'recoil'
import DetailDialog from './components/dialog/DetailDialog'
import { showBookmarkPageState } from '../../recoil/atoms/bookmarkState';
import BookmarkPage from './components/bookmark/BookmarkPage';

function Index() {
    const [imgData, setImgData] = useState<CardDTO>()
    const imgSelector = useRecoilValueLoadable(imageData)
    const [open, setOpen] = useState<boolean>(false)
    const showBookmarkPage = useRecoilValue(showBookmarkPageState);

    const cardList = useMemo(() => {
        console.log(imgSelector)
        if (imgSelector.state === "hasValue") {
            const result = imgSelector.contents.map((card: CardDTO) => {
                return (
                    <Card 
                        data={card} 
                        key={card.id} 
                        handleDialog={setOpen} 
                        handleData={setImgData}
                    />
                )
            })
            return result
        } else {
            return <div>loading...</div>
        }
    }, [imgSelector])

    if (showBookmarkPage) {
        return (
            <div className={styles.page}>
                <CommonHeader />
                <BookmarkPage/>
            </div>
        );
    }

    return (
        <div className={styles.page}>
            {/* 공통 헤더 UI 부분 */}
            <CommonHeader />
            <Navigation />
            <div className={styles.page__contents}>
                <div className={styles.page__contents__introBox}>
                    <div className={styles.wrapper}>
                        <span className={styles.wrapper__title}>PhotoSplash</span>
                        <span className={styles.wrapper__desc}>
                            인터넷의 시각 자료 출처입니다. <br />
                            모든 지역에 있는 크리에이터들의 지원을 받습니다.
                        </span>
                        {/* 검색창 UI 부분 */}
                        <CommonSearchBar />
                    </div>
                </div>
                <div className={styles.page__contents__imageBox}>{cardList}</div>
            </div>
            <Footer />
            {open && imgData && <DetailDialog data={imgData} handleDialog={setOpen} />}
        </div>
    )
}

export default Index