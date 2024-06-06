import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import { VideoType, userApi } from "../../types.ts";
import {VideoSolo} from "../../components/VideoSolo.tsx"

export const handler: Handlers<VideoType,userApi> = {
    GET: async (req:Request, ctx: FreshContext<userApi,VideoType>) => {
        
        const api = await fetch(`https://videoapp-api.deno.dev/video/${ctx.state.id}/${ctx.params.id}`)
        const video = await api.json()

        return ctx.render(video);
    }
}

export default function Page (props: PageProps<VideoType,userApi>){
    return (
        <div class="video-detail-container">
            <VideoSolo video={props.data} estado={props.state}></VideoSolo>
        </div>
        
    )
}