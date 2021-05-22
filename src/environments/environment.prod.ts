const baseUrl = '';

export const environment = {
  production: true,

  baseUrl,

  mobileBaseWidth: 650,

  api: {
    user: {
      login: baseUrl + '/api/user/login',
      logout: baseUrl + '/api/user/logout',
      authCheck: baseUrl + '/api/user/authCheck',
      getLoginInfo: baseUrl + '/api/user/getLoginInfo',
    },
    menu: {
      getUserMenu: baseUrl + '/api/menu/getUserMenu',
    },
  },

  image:{ 
    icon: {
      toggleIcon: baseUrl + '/public/images/icons/toggle-icon.svg',
      dashboardIcon: baseUrl + '/public/images/icons/dashboard-icon.svg',
      companyIcon: baseUrl + '/public/images/icons/company-icon.svg',
    },

    cyber: baseUrl + '/public/images/cyber_image.jpg',
    grid: baseUrl + '/public/images/grid.jpg',
  },
};
