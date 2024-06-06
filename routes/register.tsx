import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import { AsExpressionBase } from "https://deno.land/x/ts_morph@21.0.1/ts_morph.js";
import { ListaVideos } from "../components/ListaVideos.tsx";
import {VideoType} from "../types.ts"
export {ListaVideos} from "../components/ListaVideos.tsx"

import {userApi }from "../types.ts"
import {Register} from "../components/Register.tsx"
import jwt from "jsonwebtoken"

export const handler: Handlers = {
    POST: async (req:Request, ctx: FreshContext) => {
        const form = await req.formData(); //formulario del componente
        const email = form.get("email")?.toString(); //es el 'name'
        const name = form.get("name")?.toString();
        const password = form.get("password")?.toString();

        //const url = new URL(req.url); //guardar en la cookie
    
        try{
            const response = await fetch(`https://videoapp-api.deno.dev/register`, {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json",
                },
                body: JSON.stringify({ //le pasas al body las cosas del formulario
                    name,
                    email,
                    password,
                })
            })

            if (response.status !== 200){
                return ctx.render("Incorrect credentials or user does not exist") 
    
            }
    
            const data:userApi = await response.json() // el objeto que devuelve la api, que es de ese tipo
            
            //guardar en las cookies
            //pero primero debemos encriptarlas
            //sign -> encriptas   verify -> desencriptar
            const token = await jwt.sign(data, Deno.env.get("JWTSecret"))
    
            //quiero hacer las cookies en las headers 
            const headers = new Headers({
                location: "/videos", //como es correcto todo le dejo apsar a donde tiene que ir
                "Set-Cookie": `auth=${token}` //guarda 'token' porque ya es los datos que queremos guaradr pero encriptados
                //"Set-Cookie": `pipipipo=${token}`
            })
    
            return new Response("", {status: 302, headers}) //302 es de redirect


        }catch(e){
            return ctx.render();
        }

    }
}

export default function Page (props: PageProps<VideoType[]>){
    return (
        <div>
            <Register></Register>
        </div>
        
    )
}