import React, { useState } from 'react'
import st from 'styled-components';
import { formatNumberString } from './util/common.util';
import { CardData, DistrictData } from './types';

interface DataHeaderProps {
    headerColor: string;
}

interface DataProps {
    headerColor: string;
    headerName: string;
    rank?: number;
    data: CardData;
    districtData?: {[key: string]: DistrictData}
    showDistrictsButton?: boolean;
}

const DataWrapper = st.div`
    padding: 0;
    margin-bottom: 2rem;
    border-radius: 10px;
    box-shadow: 0 0 6px 3px #000;
    border: 1px solid #000;
    width: 100%;
    max-width: 50rem;
    background-color: #222;
`;

const DataHeader = st.div`
    background-color: ${(props: DataHeaderProps) => props.headerColor};
    color: #000;
    padding: 0.5rem;
    padding-left: 2rem;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    font-size: 20px;
    font-weight: 700;
`;

const DataBody = st.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
`;

const StatsSection = st.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    line-height: 2;
    color: #fff;
    em {
        font-weight: 600;
        font-style: normal;
    }
`;

const StatRow = st.div`
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
`;

const NewStats = st.span`
    background-color: #fedfdf;
    padding: 0.125rem 0.75rem;
    border-radius: 1rem;
    color: #700;
    font-weight: 700;
    margin-left: 0.5rem;
    height: 1rem;
    display: flex;
    align-items: center;
`;

const ShowDetailsButton = st.span`
  color: #fff;
  font-weight: 700;
  text-decoration: underline;
  cursor: pointer;
  margin: 1rem 0;
`;

const DistWrapper = st.div`
    padding: 0;
    width: 100%;
    max-width: 50rem;
    background-color: #333;
    border-radius: 10px;
    margin: 1rem 0;
`;

const sortDistList = (distArr: DistrictData[]) => {
    let finalList = distArr;

    for (let i = 0; i < finalList.length - 1; i++) {
        for (let j = i; j < finalList.length; j++) {
            if (finalList[i].confirmed < finalList[j].confirmed) {
                const tmp = finalList[i];
                finalList[i] = finalList[j];
                finalList[j] = tmp;
            }
        }
    }

    return finalList;
}

export const DataCard = (props: DataProps) => {
    const [distLimit, setDistLimit] = useState<number>(10);
    const [showDist, setShowDist] = useState<boolean>(false);

    const totalCases = formatNumberString(props.data.totalCases);
    const activeCases = formatNumberString(props.data.activeCases);
    const totalDeaths = formatNumberString(props.data.totalDeaths);
    const totalRecovered = formatNumberString(props.data.totalRecovered);

    let newCases = '';
    if (props.data.newCases && props.data.newCases !== '0') newCases = `+ ${formatNumberString(props.data.newCases)}`;

    let newDeaths = '';
    if (props.data.newDeaths && props.data.newDeaths !== '0') newDeaths = `+ ${formatNumberString(props.data.newDeaths)}`;

    let newRecovered = '';
    if (props.data.newRecovered && props.data.newRecovered !== '0') newRecovered = `+ ${formatNumberString(props.data.newRecovered)}`;


    let distListFull: DistrictData[] = [];
    let distList: DistrictData[] = [];
    if (props.districtData) {
        for (let dist in props.districtData) {
            if (dist.match(/nknown/g)) continue;
            distListFull.push({
                ...props.districtData[dist],
                name: dist
            });
        }
        distListFull = sortDistList(distListFull);

        distList = distListFull.slice(0, distLimit);
    }

    return (
        <DataWrapper>
            <DataHeader headerColor={props.headerColor}>
                {props.rank && <span> {props.rank}. </span>}
                <span> {props.headerName.toLocaleUpperCase()} </span>
            </DataHeader>
            <DataBody>
                <StatsSection>
                    <StatRow>
                        <span>
                            <em>Total Cases:</em> {totalCases}
                        </span>
                        {newCases && <NewStats> {newCases} </NewStats>}
                    </StatRow>
                    <StatRow>
                        <span>
                            <em>Active Cases:</em> {activeCases}
                        </span>
                    </StatRow>
                    <StatRow>
                        <span>
                            <em>Total Deaths:</em> {totalDeaths}
                        </span>
                        {newDeaths && <NewStats> {newDeaths} </NewStats>}
                    </StatRow>
                    <StatRow>
                        <span>
                            <em>Total Recovered:</em> {totalRecovered}
                        </span>
                        {newRecovered && <NewStats> {newRecovered} </NewStats>}
                    </StatRow>
                </StatsSection>
                {distList.length > 0 && 
                    <ShowDetailsButton onClick={() => { setShowDist(!showDist); setDistLimit(10); }}>{showDist ? 'Hide' : 'Show'} state details</ShowDetailsButton>
                }
                {
                    showDist && (
                        <>
                            {
                                distList.map((dist, id) => {
                                    const totalCases = formatNumberString(`${dist.confirmed}`);
                                    const activeCases = formatNumberString(`${dist.active}`);
                                    const totalDeaths = formatNumberString(`${dist.deceased}`);
                                    const totalRecovered = formatNumberString(`${dist.recovered}`);
            
                                    let newCases = '';
                                    if (dist.delta && dist.delta.confirmed !== 0)
                                        newCases = `+ ${formatNumberString(`${dist.delta.confirmed}`)}`;
            
                                    let newDeaths = '';
                                    if (dist.delta && dist.delta.deceased !==  0)
                                        newDeaths = `+ ${formatNumberString(`${dist.delta.deceased}`)}`;
            
                                    let newRecovered = '';
                                    if (dist.delta && dist.delta.recovered !== 0)
                                        newRecovered = `+ ${formatNumberString(`${dist.delta.recovered}`)}`;

                                    return (
                                    <DistWrapper key={`${id}-${dist.name}`}>
                                        <DataHeader headerColor={'#ffa'}>
                                            <span> {id + 1}. </span>
                                            <span> {dist.name.toLocaleUpperCase()} </span>
                                        </DataHeader>
                                        <DataBody>
                                            <StatsSection>
                                                <StatRow>
                                                    <span>
                                                        <em>Total Cases:</em> {totalCases}
                                                    </span>
                                                    {newCases && <NewStats> {newCases} </NewStats>}
                                                </StatRow>
                                                <StatRow>
                                                    <span>
                                                        <em>Active Cases:</em> {activeCases}
                                                    </span>
                                                </StatRow>
                                                <StatRow>
                                                    <span>
                                                        <em>Total Deaths:</em> {totalDeaths}
                                                    </span>
                                                    {newDeaths && <NewStats> {newDeaths} </NewStats>}
                                                </StatRow>
                                                <StatRow>
                                                    <span>
                                                        <em>Total Recovered:</em> {totalRecovered}
                                                    </span>
                                                    {newRecovered && <NewStats> {newRecovered} </NewStats>}
                                                </StatRow>
                                            </StatsSection>
                                        </DataBody>
                                    </DistWrapper>
                                    );
                                })
                            }
                            {
                                distLimit <= distListFull.length &&
                                <ShowDetailsButton onClick={() => { setDistLimit(distLimit + 10); }}>Show more</ShowDetailsButton>
                            }
                        </>
                    )
                }
            </DataBody>
        </DataWrapper>
    )
}
