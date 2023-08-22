import { baseUrl } from ".";
import axios from "axios";
const YOUTUBE_API_KEY = "AIzaSyCdE32XjchMShwkZSm8kd1dwiOQuBotCPg";
const YOUTUBE_BASE_URL = 'https://www.googleapis.com/youtube/v3';

export const GET_youtubeAuth = () => {
  return axios.get(`${baseUrl}/api/youtube/auth/`,
                   {withCredentials: true});
};

export const GET_youtubeConfirm = (accessToken: string | null) => {
    console.log("accessToken", accessToken);
    const promise = axios.get(`${baseUrl}/api/youtube/confirm/`);

    const res = promise.then((res) => res);

    return res;
}

export const GET_channelVideos = (channelId: string) => {
  const promise =  axios
  .get(
    `${YOUTUBE_BASE_URL}/search?key=${YOUTUBE_API_KEY}&channelId=${channelId}&part=snippet&type=video&maxResults=6&order=date`
  );

  const res = promise.then((res) => res);

  return res;
}

export const GET_channelVideosPublisedAfter = (channelId: string, date: string) => {
  let pageToken = ""; 
  let videos: any = [];
  let totalResult = 0;
  const nowDate = new Date();
  const publisedBefore = `${nowDate.getFullYear()}-${nowDate.getMonth() + 1}-00T00:00:00Z`;

  try {
    const promise: any =  axios.get(
      `${YOUTUBE_BASE_URL}/search?key=${YOUTUBE_API_KEY}&channelId=${channelId}&part=snippet&type=video&order=date&maxResults=50&publishedAfter=${date}&publisedBefore=${publisedBefore}`
    ).then(async (res) => {
      videos = [...res.data.items];
      console.log("res", res);
      if(res.data.nextPageToken) {
        totalResult = res.data.pageInfo.totalResults;
        while(totalResult > videos.length) {
          let isError = false;
          try {
            await axios.get(
              `${YOUTUBE_BASE_URL}/search?key=${YOUTUBE_API_KEY}&channelId=${channelId}&part=snippet&type=video&order=date&maxResults=50&pageToken=${pageToken}&publishedAfter=${date}&publisedBefore=${publisedBefore}`
            ).then((res) => {
              videos = [...videos, ...res.data.items]
              if(videos.length < totalResult) pageToken = res.data.nextPageToken;
            })
            .catch((err) => {
              console.log("err1", err)
              isError = true;
              return;
            })
            if(isError) break;
          } catch {
            break;
          }
        }
        return videos;
      } else {
        return videos;
      }
  
    })
    .catch((err) => {
      console.log("err2", err);
      return;
    })

  const result = promise.then((res: any) => res);

  return result;
  } catch {
    throw Error("GET_channelVideosPublisedAfter err")
  }
}

export const GET_channelInfo = (channelId: string) => {
  const promise = axios.get(`${YOUTUBE_BASE_URL}/channels?key=${YOUTUBE_API_KEY}&part=brandingSettings,snippet,contentDetails,statistics,topicDetails&id=${channelId}&fields=items(brandingSettings,snippet,topicDetails,statistics)`)

  const res = promise.then((res) => res);

  return res;
}

