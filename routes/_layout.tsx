import { PageProps } from "$fresh/server.ts";
import { Header } from "../components/Header.tsx";
import { userApi } from "../types.ts";



export default function Layout(props: PageProps<unknown,userApi>){
    return (
        <>
            {props.route !== "/login" && props.route !== "/register" ? (
                 <div class="page-container">   
                    <Header user={props.state}></Header>
                 <props.Component></props.Component>
             </ div>
            ): <props.Component></props.Component>
        }
        </>
       
        
    )
}