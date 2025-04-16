import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    miniSidebar: false,
    miniSidebarWidth: 80,
    sidebarWidth: 240,
    sidebarOpen: true,
    mobileSidebarOpen: false,
    activeSidebarGroupMenu: []
};

export const ThemeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setSidebarOpen: (state, action) => {
            state.sidebarOpen = action?.payload ?? !state.sidebarOpen
        },
        setMiniSidebar: (state, action) => {
            state.miniSidebar = action?.payload ?? !state.miniSidebar
        },
        setMobileSidebarOpen: (state, action) => {
            state.mobileSidebarOpen = action.payload ?? !state.mobileSidebarOpen;
        },
        setActiveSidebarGroupMenu: (state, action) => {
            if (state.activeSidebarGroupMenu.includes(action.payload)) {
                state.activeSidebarGroupMenu = state.activeSidebarGroupMenu.filter(e => e !== action.payload);
            } else {
                state.activeSidebarGroupMenu = [...state.activeSidebarGroupMenu, action.payload];
            }
        },
        reset: () => initialState
    }
});

export const ThemeActions = ThemeSlice.actions;
export default ThemeSlice;
