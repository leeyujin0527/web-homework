import { atom } from "recoil"
import { CardDTO } from "../../pages/index/types/card"

export const bookmarkedImagesState = atom<CardDTO[]>({ //북마크 된 카드 리스트
    key:'bookmarkState',
    default : []
})

export const isBookmarkModalOpenState = atom<boolean>({ //북마크 하트누르면 true 안누르면 false
    key : 'isBookmarkModalOpenState',
    default : false
})

export const showBookmarkPageState = atom<boolean>({ //북마크 페이지로 이동
    key: 'showBookmarkPageState',
    default: false,
  });
