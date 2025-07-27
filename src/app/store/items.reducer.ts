import { createReducer, on } from "@ngrx/store";
import { CartItem } from "../models/cartItem";
import { add, remove, total } from "./items.action";

export interface ItemsState{
    items: CartItem[],
    total:number
}

export const initialState:ItemsState = {
    items: JSON.parse(sessionStorage.getItem('cart') || '[]'),
    total: 0
}
export const itemsReduce = createReducer(
    initialState,
    on(add,(state,{product}) => {
        const hasItem = state.items.find((i:CartItem) => i.product.id === product.id);
              if(hasItem){
                return {items: state.items.map((i:CartItem)=>{
                  if(i.product.id === product.id){
                    return {... i,quantity: i.quantity+1}
                  }
                  return i;
                }),
                total: state.total
            }
              }else{
                return {
                    items:[... state.items, {product:{...product},quantity:1}],
                    total: state.total
                };
              }
    }),
    on(remove,(state,{id}) => {
        return{
            items: state.items.filter(i => i.product.id !== id),
            total:state.total
        }
    }),
    on(total,state => {
        return {
            items: state.items,
            total: state.items.reduce((acc,item) => acc + (item.quantity * item.product.price),0)
        }
    })
)