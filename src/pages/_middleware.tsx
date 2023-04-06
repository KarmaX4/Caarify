import { NextResponse } from "next/server";
import {verify} from "jsonwebtoken"

const secret:any = process.env.SECRET
 export default function  middleware(req:any){
    const {cookies} = req;
    const jwt = cookies.OursiteJWT;
    const url = req.url;

    if(url.includes("/dashboard")){
        if (jwt === undefined){
            return NextResponse.redirect("/pages/login");
        }

        try {
            verify(jwt,secret);
            return NextResponse.next();
        } catch (e) {
            return NextResponse.redirect("/dashboard")
        }
    }
            return NextResponse.next();
 }