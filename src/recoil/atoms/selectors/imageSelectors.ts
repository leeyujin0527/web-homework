import { selector } from "recoil";
import axios from "axios";
import { searchState } from "../searchState";
import { error } from "console";
import { pageState } from "../pageState";

const API_URL = 'https://api.unsplash.com/search/photos'
const API_KEY = 'lMXfNKcPlL1w8s66orZmP8drRruoINS7hC131RCxbRY'
const PER_PAGE = 30

export const imageData = selector({
    key : "imageData",
    get : async ({get})=>{
        const searchValue = get(searchState)
        const pageValue = get(pageState)

        try{
            const res = await axios.get(`${API_URL}?query=${searchValue}&client_id=${API_KEY}&page=${pageValue}&per_page=${PER_PAGE}`)

            return res.data.results

        }catch(error){
            console.log(error)
        }
    }
})
