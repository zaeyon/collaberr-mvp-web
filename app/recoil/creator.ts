import {atom, selector} from 'recoil';

export const allCreatorsState = atom({
    key: 'allCreatorsState',
    default: []
})

export const allCreatorsTableListState = selector({
    key: 'allCreatorsTableListState',
    get: ({get}) => {
        const allCreators = get(allCreatorsState);

        return allCreators.map((item: any) => {
            return {
                channelId: item.channel_id,
                profileImage: item.channel_profile_image,
                name: item.channel_name,
                type: item.channel_type,
                target: item.target,
                subscriber: item.subscribers,
                view: item.views,
                upload: item.uploads,
                analyze: "http://localhost:3000",
            }
        })
    }
})



