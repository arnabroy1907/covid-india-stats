import React, { useState, useEffect } from "react";
import { DataCard } from "./DataCard";
import { WorldApiResponse, WorldData as WorldDataType } from "./types";
import { getWorldData } from './util/common.util';
import loader from './assets/loader.gif';
import { LoadingWrapper, ErrorText, ShowMoreButton, TimeInfo } from './common.styles';
import config from "./config";

export const WorldData = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [worldApiData, setWorldApiData] = useState<WorldApiResponse|undefined>();
    const [worldError, setWorldError] = useState<string>('');
    const [listLimit, setListLimit] = useState<number>(10);
  
    useEffect(() => {
      const assignWorldData = async () => {
        try {
          const worldData: WorldApiResponse = await getWorldData();
          setWorldApiData(worldData);
          setLoading(false);
        } catch (err) {
          console.error(err);
          setWorldError(config.errorMessage);
          setLoading(false);
        }
      };

      assignWorldData();
      window.scrollTo(0,0);
    }, []);

    let countryList: WorldDataType[] = [];
    if (worldApiData) {
      countryList = worldApiData.countries_stat.slice(0, listLimit);
    }

  return (
    <>
      {loading && (
        <LoadingWrapper>
          <img alt='Loading' src={loader} />
        </LoadingWrapper>
      )}
      {worldError && <ErrorText> {worldError} </ErrorText>}
      {worldApiData && (
        <>
          <TimeInfo> Data taken at: {new Date(worldApiData.statistic_taken_at).toLocaleString()} </TimeInfo>
          <DataCard
            headerColor={"#ea8"}
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
          {countryList.map((country, rank) => (
            <DataCard
              key={country.country_name}
              headerColor={"#87e5e5"}
              headerName={country.country_name}
              rank={rank + 1}
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
          { (listLimit <= worldApiData.countries_stat.length) && 
            <ShowMoreButton onClick={() => { setListLimit(listLimit + 10); }}>Show More</ShowMoreButton>
          }
        </>
      )}
    </>
  );
};
