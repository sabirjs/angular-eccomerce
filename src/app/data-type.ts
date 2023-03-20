export interface SignUp {
    name: string,
    password: string,
    email: string
}


export interface Login{
    email: string,
    password: string,
}


export interface product{
    name:string,
    Price:number,
    Category:string,
    Color:string,
    Description:string,
    Image:string,
    id:number,
    quantity:undefined|number,
    productId:undefined|number,
}

export interface cart{
    name:string,
    Price:number,
    Category:string,
    Color:string,
    Description:string,
    Image:string,
    id:number | undefined,
    quantity:undefined|number,
    userId:number,
    productId:number
}


export interface priceSummary{
    price:number,
    discount:number,
    tax:number,
    delivery:number,
    total: number
}

export interface order{
    email:string,
    address:string,
    contact:string,
    totalPrice:number,
    userId:string,
    id:number|undefined
}