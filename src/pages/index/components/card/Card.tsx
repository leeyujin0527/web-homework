import styles from './Card.module.scss'
import { CardDTO } from '../../types/card'

interface Props{
    data : CardDTO
    handleDialog : (eventValue : boolean) => void
    handleData : (eventValue : CardDTO) => void
}

function Card({data,handleDialog,handleData}:Props) {
    const openDialog = () =>{
        console.log("카드 함수 호출")
        handleDialog(true)
        handleData(data)
    }
    return (
        <div className={styles.card} onClick={openDialog}>
            <img src={data.urls.small} alt={data.alt_description} className={styles.card__image} />
        </div>
    )
}

export default Card
