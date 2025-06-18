import { useRecoilState } from 'recoil';
import styles from './DetailDialog.module.scss';
import closeIcon from '@/assets/icons/close.png';
import { useState } from 'react';
import { isBookmarkModalOpenState,bookmarkedImagesState } from '../../../../recoil/atoms/bookmarkState';
import { useEffect } from 'react';

function DetailDialog({ data, handleDialog }) {
  const close = (event) => {
    handleDialog(false);
    event.stopPropagation();
  };

  const [add, setAdd] = useRecoilState(isBookmarkModalOpenState);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [bookmarkedImages, setBookmarkedImages] = useRecoilState(bookmarkedImagesState)

  useEffect(() => {
    const isBookmarked = bookmarkedImages.some(img => img.id === data.id);
    setIsFavorite(isBookmarked);
  }, [bookmarkedImages, data.id]);

  const addBookmark = () => {
    if (isFavorite) {
      // 북마크 제거
      const updatedBookmarks = bookmarkedImages.filter(img => img.id !== data.id);
      setBookmarkedImages(updatedBookmarks);
      setIsFavorite(false);
      alert('북마크에서 제거되었습니다.');
    } else {
      // 북마크 추가
      const updatedBookmarks = [...bookmarkedImages, data];
      setBookmarkedImages(updatedBookmarks);
      setIsFavorite(true);
      alert('북마크에 추가되었습니다.');
    }
  };

  const downloadImage = async () => {
    try {
      setIsDownloading(true);
      
      // 고해상도 이미지 URL 사용 (regular 또는 full)
      const imageUrl = data.urls.regular || data.urls.full || data.urls.raw;
      
      // 이미지를 fetch로 가져오기
      const response = await fetch(imageUrl);
      
      if (!response.ok) {
        throw new Error('이미지를 가져올 수 없습니다.');
      }
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      
      // 파일명 생성 (작가명-이미지ID.jpg)
      const filename = `${data.user.name.replace(/\s+/g, '_')}-${data.id}.jpg`;
      
      // 다운로드 링크 생성 및 클릭
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      
      // 정리
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
    } catch (error) {
      console.error('다운로드 실패:', error);
      alert('다운로드에 실패했습니다. 잠시 후 다시 시도해주세요.');
    } finally {
      setIsDownloading(false);
    }
  };


  return (
    <div className={styles.container}>
      <div className={styles.container__Dialog}>
        <div className={styles.container__Dialog__header}>
          <div className={styles.container__Dialog__header__left}>
            <img
              src={closeIcon}
              className={styles.container__Dialog__header__left__close}
              onClick={close}
              alt="닫기 아이콘"
            />
            <img
              className={styles.container__Dialog__header__left__profile}
              alt="작가프사"
              src={data.user.profile_image.small}
            />
            <span className={styles.container__Dialog__header__left__authName}>
              {data.user.name}
            </span>
          </div>
          <div className={styles.container__Dialog__header__right}>
            <button className={styles.container__Dialog__header__right__bookmarkBtn} onClick={addBookmark}>
              <span style={{ 
                  fontSize: '17px',
                  color: isFavorite ? 'red' : '#999',
                }}>
                  {isFavorite ? '❤️' : '🤍'}
                </span>
              북마크
            </button>
            <button 
                className={styles.container__Dialog__header__right__downloadBtn}
                onClick={downloadImage}
                disabled={isDownloading}
                style={{
                  opacity: isDownloading ? 0.6 : 1,
                  cursor: isDownloading ? 'not-allowed' : 'pointer'
                }}
              >
                {isDownloading ? '다운로드 중...' : '다운로드'}
              </button>
          </div>
        </div>
        <div className={styles.container__Dialog__body}>
          <img
            className={styles.container__Dialog__body__image}
            alt="상세 이미지"
            src={data.urls.small}
          />
        </div>
        <div className={styles.container__Dialog__footer}>
          <div className={styles.container__Dialog__footer__itemBox}>
            <div className={styles.container__Dialog__footer__itemBox__item}>
              <span className={styles.container__Dialog__footer__itemBox__item__label}>
                이미지 크기
              </span>
              <span className={styles.container__Dialog__footer__itemBox__item__value}>
                {data.width} X {data.height}
              </span>
            </div>
            <div className={styles.container__Dialog__footer__itemBox__item}>
              <span className={styles.container__Dialog__footer__itemBox__item__label}>
                업로드
              </span>
              <span className={styles.container__Dialog__footer__itemBox__item__value}>
                {data.created_at.split('T')[0]}
              </span>
            </div>
            <div className={styles.container__Dialog__footer__itemBox__item}>
              <span className={styles.container__Dialog__footer__itemBox__item__label}>
                마지막 업데이트
              </span>
              <span className={styles.container__Dialog__footer__itemBox__item__value}>
                {data.updated_at.split('T')[0]}
              </span>
            </div>
            <div className={styles.container__Dialog__footer__itemBox__item}>
            <span className={styles.container__Dialog__footer__itemBox__item__label}>
                다운로드 수
              </span>
              <span className={styles.container__Dialog__footer__itemBox__item__value}>
                {data.likes}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailDialog;
