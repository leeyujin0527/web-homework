import { Link, useLocation } from 'react-router-dom'
import styles from './CommomNav.module.scss'
import navjson from './Navjson.json'
import { lazy, useEffect, useState } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { pageState } from '@/recoil/atoms/pageState'
import { searchState } from '@/recoil/atoms/searchState'
import { setServers } from 'dns'

interface Navigation{
  index: number
  path: string
  label: string
  searchValue: string
  isActive: boolean
}

function CommonNav() {
  const location = useLocation()
  const [navigation,setNavigation] = useState<Navigation[]>(navjson) 

  const [page,setPage] = useRecoilState(pageState)
  const [search,setSearch] = useRecoilState(searchState)

  const Nav = navigation.map((item : Navigation)=>{
    return(
      <Link to={item.path} className={item.isActive ? `${styles.navigation__menu} ${styles.active}` : `${styles.navigation__menu} ${styles.inactive}`} key={item.path}>
        <span className={styles.navigation__menu__label}>{item.label}</span>
      </Link>
    )
  })

  useEffect(()=>{
    navigation.forEach((nav : Navigation)=> {
      nav.isActive = false
      if(nav.path === location.pathname || location.pathname.includes(nav.path)){
        nav.isActive = true
        setPage(1)
        setSearch(nav.searchValue)

      }
    })
    setNavigation([...navigation])
  },[location.pathname])
  
  return (
    <nav className={styles.navigation}>{Nav}</nav>
  )
}
export default CommonNav
