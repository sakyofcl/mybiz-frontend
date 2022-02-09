import type from '../../constant/type';
import clone from './cloneObject';
let store = {
    isExpandLeftPanel:true,
};

const layout = (state = store, action) => {
    const { RESIZE_LEFT_PANEL } = type;
    let newObj = clone(state);
    switch (action.type) {
        case RESIZE_LEFT_PANEL:
            if (state.isExpandLeftPanel) {
                newObj.isExpandLeftPanel = false;
                return newObj;
            } else {
                newObj.isExpandLeftPanel = true;
                return newObj;
            }

        case 'LOG_OUT':
            return { l: false };
        default:
            return state;
    }
};

export { layout };
