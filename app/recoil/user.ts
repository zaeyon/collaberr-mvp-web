import {atom} from 'recoil';
import { detectMobile } from '../lib/detectMobile';
import {isMobile} from 'react-device-detect';

export const userState = atom({
    key: 'userState',
    default: {
        isLogin: false,
        email: "",
        username: "",
        lastName: "",
        firstName: "",
        role: "",
    }
})

export const isVisDropdownState = atom({
    key: 'isVisDropdownState',
    default: false,
})

export const toastState = atom({
    key: 'toastState',
    default: {
        visible: false,
        message: "",
        type: "",
        request: "",
    }
})

export const isVisSidebarState = atom({
    key: 'isVisSidebarState',
    default: isMobile ? false : true
})