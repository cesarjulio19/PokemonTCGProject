export interface SignInPayload{
    email:string,
    password:string
}

export interface SignUpPayload{
    email:string,
    password:string,
    name:string,
    surname:string,
    user:string
}

export interface User{
    id:string,
    username:string,
    email:string,
    picture?:{
        url?:string | undefined,
        large?:string | undefined,
        medium?:string | undefined,
        small?:string | undefined,
        thumbnail?:string | undefined
    } | null,
    admin:boolean
}