interface FirebaseJwt{
    aud:string,
    auth_time: number,
    email: string,
    email_verified: boolean,
    exp: number,
    firebase:{},
    iat: number,
    iss:string,
    sub:string,
    user_id:string,
}




export {FirebaseJwt}