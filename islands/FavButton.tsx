import { useState } from "preact/hooks";
import { FunctionComponent } from "preact";
import {VideoType, userApi} from "../types.ts"


export const FavButton: FunctionComponent<{video:VideoType, id:userApi}> = ({video, id}) => {
    const [fav, setFav] = useState<boolean>(video.fav)
    
    const cambiarFav = async (video: VideoType, id:userApi) => {
        const data = await fetch(`https://videoapp-api.deno.dev/fav/${id.id}/${video.id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
              },
        })
        if(data.status === 200){
            setFav(!fav)
            return
        }


        return
    }

    return (
        <button class="fav-button" onClick={() => cambiarFav(video,id)}>
            {fav === true ? "❤️ Remove from Favorites": "🤍 Add to Favorites"}
        </button>
    )
}