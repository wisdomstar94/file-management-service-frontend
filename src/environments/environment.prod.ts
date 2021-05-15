const baseUrl = '';

export const environment = {
  production: true,

  baseUrl,

  api: {
    user: {
      login: baseUrl + '/api/user/login',
      authCheck: baseUrl + '/api/user/authCheck',
    },
  },

  image:{ 
    cyber: baseUrl + '/public/images/cyber_image.jpg',
    grid: baseUrl + '/public/images/grid.jpg',
  },
};
