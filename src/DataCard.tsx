import React from 'react'
import st from 'styled-components';
import { CardData } from './types';

interface DataHeaderProps {
    headerColor: string;
}

interface DataProps {
    headerColor: string;
    headerName: string;
    data: CardData;
}

const DataWrapper = st.div`
    padding: 0;
    margin-bottom: 2rem;
    border-radius: 10px;
    box-shadow: 0 0 5px 2px #9ac;
    border: 1px solid #999;
    width: 100%;
    max-width: 50rem;
    background-color: #fff;
`;

const DataHeader = st.div`
    background-color: ${(props: DataHeaderProps) => props.headerColor};
    color: #fff;
    padding: 0.5rem;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    font-weight: 700;
`;

const DataBody = st.div`
    padding: 1rem;
    display: flex;
    flex-direction: column;
    line-height: 2;
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
    padding: 0.125rem 0.5rem;
    border-radius: 1rem;
    color: #000;
    margin-left: 0.5rem;
    height: 1rem;
    display: flex;
    align-items: center;
`;

const formatNumberString = (numberString: string) => {
    let str = numberString;
    str = numberString.replace(',', '');
    if (str.length > 3) {
        const lastThree = str.substr(str.length-3);
        str = str.substr(0, str.length - 3);
        str = str.replace(/\B(?<!\.\d*)(?=(\d{2})+(?!\d))/g, ",");
        str = str + ',' + lastThree;
        str = str.replace(',,', ',');
    }
    return str;
};

export const DataCard = (props: DataProps) => {

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

    return (
        <DataWrapper>
            <DataHeader headerColor={props.headerColor}>
                <span> {props.headerName.toLocaleUpperCase()} </span>
            </DataHeader>
            <DataBody>
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
            </DataBody>
        </DataWrapper>
    )
}
