import { useEffect, useState } from "react";

type VideoItem = {
  id: string;
  snippet: {
    title: string;
    thumbnails: { medium: { url: string } };
    resourceId: { videoId: string };
    channelTitle: string;
  };
};

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY as string;
const PLAYLIST_ID = import.meta.env.VITE_YOUTUBE_PLAYLIST_ID as string;

export default function YouTubeFavorites() {
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=20&playlistId=${PLAYLIST_ID}&key=${API_KEY}`
        );
        const data = await res.json();

        if (!res.ok) throw new Error(data.error?.message || "Error en la API");

        setVideos(data.items || []);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <p className="text-gray-300">Cargando playlist...</p>;
  if (error) return <p className="text-red-400">Error: {error}</p>;

  return (
    <div className="flex flex-col items-center">
      <ul className="w-full divide-y divide-gray-700">
        {videos.map((video, index) => (
          <li
            key={video.id}
            className="flex items-center gap-4 py-3 hover:bg-gray-800 transition rounded px-2"
          >
            <span className="text-gray-400 font-bold w-6">{index + 1}</span>
            <img
              src={video.snippet.thumbnails.medium.url}
              alt={video.snippet.title}
              className="w-20 h-12 object-cover rounded"
            />
            <div className="flex flex-col text-left">
              <span className="text-sm font-semibold text-white line-clamp-1">
                {video.snippet.title}
              </span>
              <span className="text-xs text-gray-400">
                {video.snippet.channelTitle}
              </span>
              <a
                href={`https://www.youtube.com/watch?v=${video.snippet.resourceId.videoId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 text-xs hover:text-white"
              >
                ▶ Reproducir
              </a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
