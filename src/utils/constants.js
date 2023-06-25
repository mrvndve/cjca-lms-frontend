const isProduction = process.env.NODE_ENV === 'production';

export const apiDomain = isProduction ? 'https://cjca-elms.online' : 'http://localhost:8095';

export const socketServer = isProduction ? 'https://cjca-lms-socket.herokuapp.com/' : 'http://localhost:5000';

export const axiosUrl = `${apiDomain}/index.php`;

export const axiosConfig = {
  headers: {
    'Content-Type': 'multipart/form-data',
    'Authorization': `Bearer ${localStorage.getItem('token') ? localStorage.getItem('token') : null}`,
  },
};