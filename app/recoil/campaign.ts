import {atom,  selector} from 'recoil';
import { getFormattedDate } from '../lib/date';
import { campaignListType } from '../type/campaign';

export const allCampaignsState = atom({
    key: 'allCampaignsState',
    default: []
})

export const myCampaignsState = atom<campaignListType []>({
    key: 'myCampaignsState',
    default: []
})

const MY_CAMPAIGNS_STATE_DATA = [
    'proceeding',
    'recruitment_complete',
    'recruiting',
    'writing',
    'progress_complete'
]

export const myCampaignsTableListState = selector({
    key: 'myCampaignsTableListState',
    get: ({get})=> {
        const myCampaigns = get(myCampaignsState);

        return myCampaigns?.map((item) => {
            return {
                state: 
                item.is_completed ? 'progress_complete' : 
                item.is_draft ? 'writing' : 
                item.is_recruiting ? 'recruiting' : 
                item.is_recruited ? 'recruitment_complete' : 
                item.is_active ? "proceeding" : "proceeding",
                title: item.title,
                platform: item.platform,
                mission_type: item.mission_type,
                date: getFormattedDate(item.start_date, ".")+ " - " + getFormattedDate(item.end_date, "."),
                //content: typeof window !== 'undefined' ?`${window.location.origin}/campaigns/${item.id}` : "",
                content: item.id,
            }
        })
    }
})

export const campaignStatusTableState = selector({
    key: 'campaignStatusTableState',
    get: ({get}) => {
        const myCampaigns = get(myCampaignsState);

        return myCampaigns?.map((item: any, index) => {
            return {
                state: 
                item.is_completed ? 'progress_complete' : 
                item.is_draft ? 'writing' : 
                item.is_recruiting ? 'recruiting' : 
                item.is_recruited ? 'recruitment_complete' : 
                item.is_active ? "proceeding" : "proceeding",
                title: item.title,
                date: getFormattedDate(item.start_date, ".")+ " - " + getFormattedDate(item.end_date, "."),          
                quota: item.approved_creators.length,
                reaction_rate: "50%",
                content: item.id,
            }
        })
    }
})
