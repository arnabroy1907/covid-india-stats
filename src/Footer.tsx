import React from 'react';
import st from 'styled-components';
import linkedin from './assets/linkedin.png';
import config from './config';


const FooterWrapper = st.div`
  background-color: #222;
  height: 3rem;
  border-top: solid 1px #000;
  box-shadow 0 -2px 6px #000;
  display: flex;
  justify-content: center;
  padding: 1rem;
  padding-bottom: 2rem;
`;

const InfoText = st.div`
    color: #fff;
    text-align: center;
    display: flex;
    align-items: center;
`;

const LinkedInLink = st.a`
    padding: 1rem;
    margin-left: 2rem;
    img {
        width: 1.5rem;
    }
`;

export const Footer = () => {
    return (
        <FooterWrapper>
            <InfoText>
                <p>
                    {config.footerText.info}
                    <br/>
                    <strong>{config.footerText.owner.toLocaleUpperCase()}</strong>
                </p>
                <LinkedInLink href={config.footerText.linkedInLink} target='_blank'>
                    <img alt='linked-in' src={linkedin}/>
                </LinkedInLink>
            </InfoText>
        </FooterWrapper>
    )
};
