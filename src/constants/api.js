const getApi = (url) => '/boss' + url;

export const CODE_SUCCESS = 200;
export const GET_REGIONS_LIST = getApi('/region/list');
export const ADD_REGION = getApi('/region/add');
export const DELETE_REGION = getApi('/region/delete');
export const GET_ALL_COUNTRY = getApi('/region/country/list');
export const GET_ALL_ADMIN = getApi('/admin/users');
export const DELETE_COUNTRY = getApi('/region/country/delete');
export const ADD_COUNTRY = getApi('/region/country/add');
export const DELETE_ADMIN = getApi('/region/admin/delete');
export const ADD_ADMIN = getApi('/region/admin/add');

//models
export const GET_PROJECTS_LIST = getApi('/project/list');
export const DELETE_PROJECT = getApi('/project/delete');
export const ADD_PROJECT = getApi('/project/add');
export const ADD_MODELS = getApi('/project/model/add');
export const DELETE_MODELS = getApi('/project/model/delete');

//labels
export const GET_LABELS = getApi('/label/list');
export const ADD_LABELS = getApi('/label/add');
export const DELETE_LABELS = getApi('/label/delete');
//faqs
export const GET_CATEGORYS = getApi('/hotfaq/category');
export const SEARCH_FAQ = getApi('/hotfaq/list');
export const CHANGE_FAQ_DISPLAY = getApi('/hotfaq/editStatus');
export const GET_ALL_PROJECTS_LIST = getApi('/project/getAllProject');
export const SAVE_TEMPLATE = getApi('/hotfaq/save');
export const deleteFAQ = getApi('/hotfaq/delete');
export const invalidate = getApi('/hotfaq/invalidate');
export const GET_CUR_STATUS = getApi('/hotfaq/i18n/language');
export const GET_DETAIL = getApi('/hotfaq/i18n');
export const SAVE_LAN_TRANS = getApi('/hotfaq/i18n/save');
