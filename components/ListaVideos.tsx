import { FunctionComponent } from "preact";
import { VideoType, userApi } from "../types.ts";
import { FavButton } from "../islands/FavButton.tsx";

type Data = {
  videos: VideoType[],
  estado: userApi,
}

export const ListaVideos: FunctionComponent<Data> = (
  { videos, estado },
) => {
  return (
    <>
    {videos.map((e) => {
      return (
        <div class="video-item" key={e.id}>
          <a href={`/video/${e.id}`} class="video-link">
            <img
              src={e.thumbnail}
              alt={e.title}
              class="video-thumbnail"
            />
            <div class="video-info">
              <h3 class="video-title">{e.title}</h3>
              <p class="video-description">{e.description}</p>
              <p class="video-release-date">{e.date}</p>
            </div>
          </a>
          <FavButton video={e} id={estado}/>
        </div>
      );
    })}

    </>
    
  );
};
