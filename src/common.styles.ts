import st from 'styled-components';

export const LoadingWrapper = st.div`
  padding: 1rem;
  img {
    width: 5rem;
    height: 5rem;
  }
`;

export const ErrorText = st.div`
  color: #611;
  background-color: #fedfdf;
  padding: 1rem;
  margin-bottom: 2rem;
  font-size: 20px;
  font-weight: 700;
  border-radius: 5px;
  max-width: 48rem;
  width: 90%;
`;

export const TimeInfo = st.div`
  background-color: #b9f7e5;
  border-radius: 5px;
  border: #000;
  box-shadow: 0 0 6px 3px #000;
  margin-bottom: 2rem;
  padding: 0 1rem;
  color: #154437;
  text-align: center;
  line-height: 1.2;
  letter-spacing: 1px;
  h1 {
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 0.5rem;
  }
  h2 {
    font-size: 18px;
    font-weight: 700;
    margin-top: 0;
  }
`;

export const ShowMoreButton = st.span`
  color: #fff;
  font-weight: 700;
  text-decoration: underline;
  cursor: pointer;
  margin-top: 1rem;
  margin-bottom: 3rem;
`;
