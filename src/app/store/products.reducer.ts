import { createReducer, on } from "@ngrx/store"
import {load} from "./products.actions"
import { Product } from "../models/product"

const products:Product[]=[] 
export const initialState = {
    products
}


export const productsReducer = createReducer(
    initialState,
    on(load,(state,{products}) => ({products: [... products]})),
)