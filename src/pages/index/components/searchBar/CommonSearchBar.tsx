import { searchState } from '@/recoil/atoms/searchState'
import styles from './CommonSearchBar.module.scss'
import searchIcon from '@/assets/icons/searchIcon.png'
import { useRecoilState } from 'recoil'
import React, { useState } from 'react'

function CommonSearchBar() {
  const [serach,setSearch] = useRecoilState(searchState)
  const [text,setText] = useState('')
  const onSearch = () => {
    if(text == ''){
      setSearch('korea')
    }else{
      setSearch(text)
    }
  }
  const onChange = (event) => {
    console.log(event.target.value)
    setText(event.target.value)
  }
  const keyDown = (event : React.KeyboardEvent) => {
    if(event.key === 'Enter'){
      if(text === ''){
        setSearch('korea')
      }else{
        setSearch(text)
      }
    }
  }

  return (
    <div className={styles.searchBar}>
      <div className={styles.searchBar__search}>
        <input type='text' placeholder='찾으실 이미지를 검색하세요' value={text} className={styles.searchBar__search__input} onChange={onChange} onKeyDown={keyDown} />
        <img src={searchIcon} onClick={onSearch}/>
      </div>
    </div>
  )
}

export default CommonSearchBar
