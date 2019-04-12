// development setup
export const baseUrl = 'http://127.0.0.1:8000';
// production setup
// export const baseUrl = window.location.origin;


export const authLoginURL =  baseUrl + '/api/authenticate/users/login';
export const authSignUPURL =  baseUrl + '/api/authenticate/users/';
export const tokenAuthenticationURL = baseUrl + '/api/authenticate/user';
export const starredArticlesURL = baseUrl + '/api/authenticate/starred';


export const contactCreateListURL = baseUrl + '/api/emailwatch/contacts/';

export const groupCreateListURL = baseUrl + '/api/emailwatch/groups/';