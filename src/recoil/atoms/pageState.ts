import { atom } from "recoil";

export const pageState = atom<Number>({
    key : 'pageState',
    default : 1
})