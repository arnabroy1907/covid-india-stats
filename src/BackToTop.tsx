import React, { useEffect, useState } from "react";
import st from "styled-components";

interface BackToTopWrapperProps {
  opacityVal: number;
}

interface BTTProps {
    width: string;
    height: string;
}

const BackToTopWrapper = st.div`
    position: fixed;
    bottom: 7rem;
    right: 2rem;
    opacity: ${(props: BackToTopWrapperProps) => `${props.opacityVal}`};
    cursor: pointer;
    display: ${(props: BackToTopWrapperProps) => props.opacityVal > 0.4 ? 'block' : 'none'};
`;

const BTT = (props: BTTProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      enableBackground="new 0 0 24 24"
      viewBox="0 0 24 24"
      fill="white"
      width={props.width}
      height={props.height}
    >
      <g>
        <rect fill="none" height="24" width="24" />
        <path d="M12,20c-4.41,0-8-3.59-8-8s3.59-8,8-8s8,3.59,8,8S16.41,20,12,20 M12,22c5.52,0,10-4.48,10-10c0-5.52-4.48-10-10-10 C6.48,2,2,6.48,2,12C2,17.52,6.48,22,12,22L12,22z M11,12l0,4h2l0-4h3l-4-4l-4,4H11z" />
      </g>
    </svg>
  );
};

export const BackToTop = () => {
  const [opacity, setOpacity] = useState<number>(0);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
  });

  const handleScroll = () => {
    if (window.pageYOffset >= 2000) {
      setOpacity(1);
    } else if (window.pageYOffset < 2000 && window.pageYOffset >= 1000) {
      const opc = (window.pageYOffset - 1000)/1000;
      setOpacity(opc);
    } 
    else {
      setOpacity(0);
    }
  };

    return (
        <BackToTopWrapper
            opacityVal={opacity}
            onClick={() => {
              window.scrollTo({
                top: 0,
                behavior: 'smooth'
              });
            }}
        >
            <BTT
                width='3rem'
                height='3rem'
            />
        </BackToTopWrapper>
    );
};
