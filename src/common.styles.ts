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
  border-radius: 10px;
  max-width: 48rem;
  width: 90%;
`;

export const ShowMoreButton = st.span`
  color: #fff;
  font-weight: 700;
  text-decoration: underline;
  cursor: pointer;
  margin-top: 1rem;
  margin-bottom: 3rem;
`;