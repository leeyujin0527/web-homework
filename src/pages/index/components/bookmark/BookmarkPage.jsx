import React, { useMemo, useState } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { bookmarkedImagesState, showBookmarkPageState } from '../../../../recoil/atoms/bookmarkState';
import styles from './BookmarkPage.module.scss'
import Card from '../card/Card';
import DetailDialog from '../dialog/DetailDialog';

function BookmarkPage() {
  const bookmarkedImages = useRecoilValue(bookmarkedImagesState);
  const [showBookmarkPage, setShowBookmarkPage] = useRecoilState(showBookmarkPageState);
  const [imgData, setImgData] = useState();
  const [open, setOpen] = useState(false);

  const bookmarkCardList = useMemo(() => {
    if (bookmarkedImages.length > 0) {
      return bookmarkedImages.map((card) => (
        <Card 
          data={card} 
          key={card.id} 
          handleDialog={setOpen} 
          handleData={setImgData}
        />
      ));
    } else {
      return (
        <div className={styles.emptyMessage}>
          <p>북마크된 사진이 없습니다.</p>
          <p>마음에 드는 사진을 북마크해보세요!</p>
        </div>
      );
    }
  }, [bookmarkedImages]);

  const handleClose = () => {
    setShowBookmarkPage(false);
  };

  return (
    <div className={styles.bookmarkPage}>
      <div className={styles.bookmarkPage__header}>
        <h2 className={styles.bookmarkPage__header__title}>북마크된 사진들</h2>
        <button 
          className={styles.bookmarkPage__header__closeBtn}
          onClick={handleClose}
        >
          ✕ 닫기
        </button>
      </div>
      <div className={styles.bookmarkPage__content}>
        <div className={styles.bookmarkPage__content__count}>
          총 {bookmarkedImages.length}개의 북마크된 사진
        </div>
        <div className={styles.bookmarkPage__content__imageGrid}>
          {bookmarkCardList}
        </div>
      </div>
      {open && imgData && <DetailDialog data={imgData} handleDialog={setOpen} />}
    </div>
  );
}

export default BookmarkPage;