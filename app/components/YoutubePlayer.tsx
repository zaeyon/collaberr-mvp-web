import Link from "next/link";
import styled from "@emotion/styled";
import Image from "next/image";
import { motion, MotionConfig } from "framer-motion";

interface props {
  device?: string;
  video: any;
}

export default function YoutubePlayer({ video, device }: props) {
  return (
    <iframe
      style={{ borderRadius: 8 }}
      width={"307"}
      height="172"
      src={`https://www.youtube.com/embed/${video.id.videoId}`}
      title={video.snippet.title}
      allow="accelerometer; autoplay; clipboard-write; 
      encrypted-media; gyroscope; picture-in-picture"
      frameBorder={0}
      allowFullScreen
    ></iframe>
  );
}
