import React, { useState, useEffect } from "react";
import st from 'styled-components';
import { DataCard } from "./DataCard";
import { WorldApiResponse } from "./types";
import { getWorldData } from './common.util';
import loader from './assets/loader.gif';

const LoadingWrapper = st.div`
  padding: 1rem;
  img {
    width: 5rem;
    height: 5rem;
  }
`;

export const WorldData = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [worldApiData, setWorldApiData] = useState<WorldApiResponse|undefined>();
    const [worldError, setWorldError] = useState<string>('');
  
    useEffect(() => {
      const assignWorldData = async () => {
        try {
          const worldData: WorldApiResponse = await getWorldData();
          setWorldApiData(worldData);
          setLoading(false);
        } catch (err) {
          console.error(err);
          setWorldError('Something went wrong.');
          setLoading(false);
        }
      };

      assignWorldData();
    }, []);

  return (
    <>
      {loading && (
        <LoadingWrapper>
          <img alt='Loading' src={loader} />
        </LoadingWrapper>
      )}
      {worldError && <h1> {worldError} </h1>}
      {worldApiData && (
        <>
          <DataCard
            headerColor={"#853"}
            headerName={"Global"}
            data={{
              activeCases: worldApiData.world_total.active_cases,
              totalCases: worldApiData.world_total.total_cases,
              totalRecovered: worldApiData.world_total.total_recovered,
              totalDeaths: worldApiData.world_total.total_deaths,
              newCases: worldApiData.world_total.new_cases,
              newDeaths: worldApiData.world_total.new_deaths,
            }}
          />
          {worldApiData.countries_stat.map((country) => (
            <DataCard
              key={country.country_name}
              headerColor={"#2f8da7"}
              headerName={country.country_name}
              data={{
                activeCases: country.active_cases,
                totalCases: country.cases,
                totalRecovered: country.total_recovered,
                totalDeaths: country.deaths,
                newCases: country.new_cases,
                newDeaths: country.new_deaths,
              }}
            />
          ))}
        </>
      )}
    </>
  );
};
