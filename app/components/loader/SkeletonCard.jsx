import { useRef, useLayoutEffect, useState} from "react";
import styled from '@emotion/styled';
import Image from 'next/image';

import animationData from "@/app/assets/animations/loader_skeletonCard.json";
import animationInitial from "@/app/assets/animations/loader_skeletonCard.png";
import { Player } from '@lottiefiles/react-lottie-player';

const Container = styled.div`
left: -10px;
  width: 330px;
  height: 250px;
  background-size: 330px;
  background-repeat: no-repeat;
    position: relative;
`;

export default function SkeletonCard({}) {
  const [bgImage, setBgImage] = useState(`url(${animationInitial.src})`);
  const container = useRef();

  useLayoutEffect(() => {
    container.current = document.querySelector('#container');
    
  }, [])

  return (
    <Container
    id={"container"}
    style={{backgroundImage: bgImage}}>
      <Player
      autoplay
      loop
      renderer={'svg'}
      src={animationData}
      progressiveLoad={true}
      viewBoxOnly={false}
      onEvent={event => {
        if (event === 'load') {
          setBgImage('none');
        }
      }}
      >
      </Player>
    </Container>
  );
}
