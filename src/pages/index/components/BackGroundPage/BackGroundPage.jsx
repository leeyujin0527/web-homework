import React, { useState, useRef } from 'react';
import styles from './BackGroundPage.module.scss';
import { backgroundPageShowState } from '../../../../recoil/atoms/bookmarkState';
import { useRecoilState } from 'recoil';

function BackGroundPage() {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  const [showPage,setShowPage] = useRecoilState(backgroundPageShowState)

  const gohome = () =>{
    setShowPage(false)
  }

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const resetImage = () => {
    setUploadedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className={styles.backgroundPage}>
      <div className={styles.container}>
        <h1 className={styles.title}>맥북 배경화면 미리보기</h1>
        <p className={styles.subtitle}>
          좋아하는 사진을 맥북 화면에서 미리 확인해보세요
        </p>
        <img src='src/assets/images/splashLogo.png' className={styles.logo} onClick={gohome}/>
        <div className={styles.macbookContainer}>
          <div className={styles.macbookWrapper}>
            {/* 화면 영역에 배경화면 표시 (맥북 SVG 뒤에 위치) */}
            <div className={styles.screenArea}>
              {uploadedImage ? (
                <img 
                  src={uploadedImage} 
                  alt="Preview" 
                  className={styles.previewImage}
                />
              ) : (
                <div className={styles.emptyScreen}>
                  <div className={styles.placeholderContent}>
                    <div className={styles.placeholderIcon}>🖼️</div>
                    <p>배경화면을 업로드하세요</p>
                  </div>
                </div>
              )}
            </div>
            
            {/* 맥북 SVG 앞에 위치 */}
            <div className={styles.macbookFrame}>
              <img src="src/assets/images/mac.svg" alt="MacBook" className={styles.macbookSvg} />
            </div>
          </div>
        </div>

        <div 
          className={`${styles.uploadArea} ${isDragging ? styles.dragging : ''}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            accept="image/*"
            className={styles.fileInput}
          />
          
          <div className={styles.uploadContent}>
            <div className={styles.uploadIcon}>📁</div>
            <p className={styles.uploadText}>
              {isDragging ? '여기에 이미지를 놓으세요! 🎯' : '이미지를 드래그하거나 클릭하여 업로드'}
            </p>
            <button 
              onClick={handleButtonClick}
              className={styles.uploadButton}
            >
              📷 이미지 선택하기
            </button>
          </div>
        </div>

        {uploadedImage && (
          <div className={styles.controls}>
            <button onClick={resetImage} className={styles.resetButton}>
              🔄 다시 선택하기
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default BackGroundPage;