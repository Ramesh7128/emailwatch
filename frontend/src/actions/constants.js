// development setup
// export const baseUrl = 'https://localhost:8000';
export const baseUrl = 'https://eef000ec.ngrok.io'

// production setup
// export const baseUrl = window.location.origin;


export const authLoginURL =  baseUrl + '/api/authenticate/users/login';
export const socialLoginURL = baseUrl + '/api/authenticate/socialusers/login';
export const authSignUPURL =  baseUrl + '/api/authenticate/users/';
export const tokenAuthenticationURL = baseUrl + '/api/authenticate/user';
export const starredArticlesURL = baseUrl + '/api/authenticate/starred';


export const contactCreateListURL = baseUrl + '/api/emailwatch/contacts/';
export const groupCreateListURL = baseUrl + '/api/emailwatch/groups/';
export const sendEmailListURl = baseUrl + '/api/emailwatch/sendemails/';
export const trackerURL = baseUrl + '/api/emailwatch/tracker/';