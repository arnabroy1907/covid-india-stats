import React, { useState, useEffect } from "react";
import { DataCard } from "./DataCard";
import { IndiaApiResponse } from "./types";
import { getIndiaData } from './common.util';

export const IndiaData = () => {
  const [indiaApiData, setIndiaApiData] = useState<IndiaApiResponse|undefined>();
  const [indiaError, setIndiaError] = useState<string>('');

  useEffect(() => {
    const assignIndiaData = async () => {
      try {
        const indiaData: IndiaApiResponse = await getIndiaData();
        setIndiaApiData(indiaData);
      } catch (err) {
        console.error(err);
        setIndiaError('Something went wrong.');
      }
    };

    assignIndiaData();
  }, []);

  return (
    <>
      {indiaError && <h1> {indiaError} </h1>}
      {indiaApiData && (
        <>
          <DataCard
            headerColor={"#f0f"}
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
            Object.entries(indiaApiData.state_wise).map(([state, stateData]) =>
              <DataCard
                key={state}
                headerColor={"#2f8da7"}
                headerName={state}
                data={{
                  activeCases: stateData.active,
                  totalCases: stateData.confirmed,
                  totalRecovered: stateData.recovered,
                  totalDeaths: stateData.deaths,
                  newCases: stateData.deltaconfirmed,
                  newDeaths: stateData.deltadeaths,
                  newRecovered: stateData.deltarecovered
                }}
              />
            )
          }
        </>
      )}
    </>
  );
};
