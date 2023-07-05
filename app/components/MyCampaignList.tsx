'use client';

import {useRouter} from 'next/navigation'
import styled from '@emotion/styled';
import {useRecoilValue} from 'recoil';

import { myCampaignsState, myCampaignsTableListState } from '../recoil/campaign';
import Button from './Button';
import MyCampaignListItem from './MyCampaignListItem';
import ListTable from './ListTable';

const Container = styled.div`
width: 100%;
display: flex;
flex-direction: column;
`;

const Header = styled.div`
margin-top: 56px;
display: flex;
flex-direction: row;
align-items: center;
justify-content: space-between;
`;

const TableContainer = styled.div`
margin-top: 14px;
`;

const TableColumn = styled.div`
display: flex;
flex-direction: row;
background-color: #F1F4F7;
`;

const ColumnItem = styled.div`
min-width: 0px;
display: flex;
justify-content: center;
padding-top: 8px;
padding-bottom: 8px;
font-family: 'Pretendard';
font-size: 15px;
font-weight: 400;
line-height: 24px;
letter-spacing: -0.015em;
color :#35424C;
`;

const ColumnSpan = styled.span`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;  
`;

export default function MyCampaignList() {
    const myCampaigns = useRecoilValue(myCampaignsTableListState)

    const router = useRouter(); 

    return (
        <Container>
            <Header>
                <h2>전체 캠페인</h2>
                <Button
                size={"small"}
                style={"primary"}
                label={"신규 캠페인"}
                state={"default"}
                onClick={() => router.push('/mycampaigns/create')}/>
            </Header>
            <TableContainer>
                <ListTable
                data={myCampaigns}
                tableMarginTop={14}
                headerColumns={MY_CAMPAIGNS_TABLE_HEADER}/>
                {/* <TableColumn>
                    <ColumnItem
                    style={{flex: 1}}>
                        <ColumnSpan>
                        ID
                        </ColumnSpan>
                    </ColumnItem>
                    <ColumnItem
                    style={{flex: 1}}>
                        <ColumnSpan>
                        State
                        </ColumnSpan>
                    </ColumnItem>
                    <ColumnItem
                    style={{flex: 3.3}}>
                        <ColumnSpan>
                        Campaign
                        </ColumnSpan>
                    </ColumnItem>
                    <ColumnItem
                    style={{flex: 1}}>
                        <ColumnSpan>
                        SNS
                        </ColumnSpan>
                    </ColumnItem>
                    <ColumnItem
                    style={{flex: 1}}>
                        <ColumnSpan>
                        Type
                        </ColumnSpan>
                    </ColumnItem>
                    <ColumnItem
                    style={{flex: 2.35}}>
                        <ColumnSpan>
                        Date
                        </ColumnSpan>
                    </ColumnItem>
                    <ColumnItem
                    style={{flex: 1}}>
                        <ColumnSpan>
                        Options
                        </ColumnSpan>
                    </ColumnItem>
                </TableColumn>
                {myCampaigns.map((campaignItem: any, index) => {
                    return (
                        <MyCampaignListItem
                        key={index}
                        campaignItem={campaignItem}/>
                    )
                })
                } */}
            </TableContainer>

        </Container>
    )
}

const MY_CAMPAIGNS_TABLE_HEADER = [
    {
        label: "State",
        width: "9.37"
    },
    {
        label: "Campaign",
        width: "44.27"
    },
    {
        label: "플랫폼",
        width: "5.73"
    },
    {
        label: "종류",
        width: "10.41"
    },
    {
        label: "기간",
        width: "20.82",
    },
    {
        label: "캠패인 관리",
        width: "9.37"
    }
]
