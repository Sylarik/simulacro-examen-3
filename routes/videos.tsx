import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import { ListaVideos } from "../components/ListaVideos.tsx";
import {VideoType, userApi} from "../types.ts"
export {ListaVideos} from "../components/ListaVideos.tsx"

type Data = {
    videos: VideoType[],
    estado: userApi,
}

export const handler: Handlers<VideoType[], userApi> = {
    GET: async (req:Request, ctx: FreshContext<userApi, VideoType[]>) => {
        
        const api = await fetch(`https://videoapp-api.deno.dev/videos/${ctx.state.id}`)
        console.log(ctx.state.id)
        const videos = await api.json()
        console.log(videos)

        return ctx.render(videos);
    }
}

export default function Page (props: PageProps<VideoType[], userApi>){
    return (
        <div class="video-page-container">
            <h1 class="video-list-title">Curso Deno Fresh</h1>
            <div class="video-list-container">
                <ListaVideos videos={props.data} estado={props.state}></ListaVideos>
            </div>
        </div>
        
    )
}