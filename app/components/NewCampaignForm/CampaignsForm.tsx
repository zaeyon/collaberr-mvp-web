import styled from '@emotion/styled';

import InfoInput from '../InfoInput';
import InfoSelect from '../InfoSelect';
import RadioButton from '../RadioButton';
import PeriodPicker from '../PeriodPicker';
import InfoTextArea from '../InfoTextArea';

const CATEGORY_DATA = [
    {id: 1, value: 'Fashion'},
    {id: 2, value: 'Beauty'},
    {id: 3, value: 'Food'},
    {id: 4, value: 'Travel'},
    {id: 5, value: 'Beverages'},
]

const PLATFORM_DATA = [
    'Instagram',
    'Youtube',
    'Tiktok'
]

const Container = styled.div`
    margin-top: 24px;
`;

const SectionTitle = styled.div`
    font-family: 'Pretendard';
    font-size: 17px;
    font-weight: 600;
    line-height: 27px;
    letter-spacing: -0.015em;
    text-align: left;
`

interface props {
    category: string;
    platform: string;
    startDate: any;
    endDate: any;
    description: string;
    changeCategory: (value: string) => void;
    changePlatform: (value: string) => void;
    changeStartDate: (value: any) => void;
    changeEndDate: (value: any) => void;
    changeDescription: (e: React.ChangeEvent<HTMLTextAreaElement>) => void; 
}


export default function CampaignsForm({category, platform, startDate, endDate, description, changeCategory, changePlatform, changeStartDate, changeEndDate, changeDescription}: props) {
    return (
        <Container>
            <SectionTitle>
                Campaigns
            </SectionTitle>
            <InfoSelect
            options={CATEGORY_DATA}
            onChangeSelect={changeCategory}
            value={category}
            label={"Campaign Category"}
            placeholder={"Choose campaign category"}
            />
            <RadioButton
            selectOption={changePlatform}
            label={"Campaign Platform"}
            options={PLATFORM_DATA}
            value={platform}
            />
            <PeriodPicker
            startDate={startDate}
            endDate={endDate}
            changeEndDate={changeEndDate}
            changeStartDate={changeStartDate}
            label={"Campaign due date"}
            placeholder={"2023"}
            />
            <InfoTextArea
            label={"Campaign description"}
            value={description}
            onChangeInput={changeDescription}
            />
        </Container>
    )
}