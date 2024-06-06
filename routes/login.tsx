import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import { userApi } from "../types.ts"
import jwt from "jsonwebtoken"
import {LoginForm} from "../components/LoginForm.tsx"

export const handler: Handlers<string> = {
    POST: async (req: Request, ctx:FreshContext<unknown,string>) => {
        const form = await req.formData()

        const email1 = await form.get("email")?.toString()
        const password1 = await form.get("password")?.toString()

        //compruba con fecth si son correctos el email y pwd
        const api = await fetch(`${Deno.env.get("API_URL")}/checkuser`, {
            method: "POST",
                headers: {
                    "Content-Type" : "application/json",
                },
                body: JSON.stringify({
                    email: email1,
                    password: password1,
                })
        })

        if (api.status !== 200){
            return ctx.render("Incorrect credentials or user does not exist") 

        }

        const data:userApi = await api.json() // el objeto que devuelve la api, que es de ese tipo
        
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
        

    }
}


export default function Page (props: PageProps<string>) {
    return(
        <>
            <LoginForm error={props.data}></LoginForm>
        </>
    )
}