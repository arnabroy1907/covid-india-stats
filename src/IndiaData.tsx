import React, { useState, useEffect } from "react";
import { DataCard } from "./DataCard";
import { IndiaApiResponse, StateData } from "./types";
import { getIndiaData } from './common.util';
import loader from './assets/loader.gif';
import { LoadingWrapper, ErrorText, ShowMoreButton } from './common.styles';
import config from "./config";

export const IndiaData = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [indiaApiData, setIndiaApiData] = useState<IndiaApiResponse|undefined>();
  const [indiaError, setIndiaError] = useState<string>('');
  const [listLimit, setListLimit] = useState<number>(10);

  useEffect(() => {
    const assignIndiaData = async () => {
      try {
        const indiaData: IndiaApiResponse = await getIndiaData();
        setIndiaApiData(indiaData);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setIndiaError(config.errorMessage);
        setLoading(false);
      }
    };

    assignIndiaData();
    window.scrollTo(0,0);
  }, []);

  const stateList: StateData[] = [];
  if (indiaApiData) {
    let iter = 0;
    for (let state in indiaApiData.state_wise) {
      if (iter >= listLimit) break;
      stateList.push(indiaApiData.state_wise[state]);
      iter++;
    }
  }

  return (
    <>
      {loading && (
        <LoadingWrapper>
          <img alt='Loading' src={loader} />
        </LoadingWrapper>
      )}
      {indiaError && <ErrorText> {indiaError} </ErrorText>}
      {indiaApiData && (
        <>
          <DataCard
            headerColor={"#8ea"}
            headerName={"India"}
            data={{
              activeCases: indiaApiData.total_values.active,
              totalCases: indiaApiData.total_values.confirmed,
              totalRecovered: indiaApiData.total_values.recovered,
              totalDeaths: indiaApiData.total_values.deaths,
              newCases: indiaApiData.total_values.deltaconfirmed,
              newDeaths: indiaApiData.total_values.deltadeaths,
              newRecovered: indiaApiData.total_values.deltarecovered
            }}
          />
          {
            stateList.map((stateData, rank) =>
              <DataCard
                key={stateData.state}
                headerColor={"#87e5e5"}
                headerName={stateData.state}
                rank={rank + 1}
                data={{
                  activeCases: stateData.active,
                  totalCases: stateData.confirmed,
                  totalRecovered: stateData.recovered,
                  totalDeaths: stateData.deaths,
                  newCases: stateData.deltaconfirmed,
                  newDeaths: stateData.deltadeaths,
                  newRecovered: stateData.deltarecovered
                }}
                districtData={stateData.district}
              />
            )
          }
          { (listLimit <= Object.keys(indiaApiData.state_wise).length) && 
            <ShowMoreButton onClick={() => { setListLimit(listLimit + 10); }}>Show More</ShowMoreButton>
          }
        </>
      )}
    </>
  );
};
