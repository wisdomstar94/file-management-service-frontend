const baseUrl = '';

export const environment = {
  production: true,

  baseUrl,

  mobileBaseWidth: 650,

  stringLengthLimit: {
    companyNameMaxLength: 100,
    companyBusinessNumberMaxLength: 15,
    companyAddressMaxLength: 150,
    companyCEONameMaxLength: 100,
    companyCEOTelMaxLength: 15,
    companyTelMaxLength: 15,

    userIdMaxLength: 50,
    userNameMaxLength: 50,
    userPhoneMaxLength: 15,
  },

  api: {
    code: {
      getCode: baseUrl + '/api/code/getCode',
    },
    dashboard: {
      getDownloadedCount: baseUrl + '/api/dashboard/getDownloadedCount',
      getUploadedFileCount: baseUrl + '/api/dashboard/getUploadedFileCount',
      getDownloadedSize: baseUrl + '/api/dashboard/getDownloadedSize',
      getFileDownloadUrlAccessCount: baseUrl + '/api/dashboard/getFileDownloadUrlAccessCount',
      getFileDownloadCountWithDately: baseUrl + '/api/dashboard/getFileDownloadCountWithDately',
    },
    user: {
      login: baseUrl + '/api/user/login',
      logout: baseUrl + '/api/user/logout',
      authCheck: baseUrl + '/api/user/authCheck',
      getLoginInfo: baseUrl + '/api/user/getLoginInfo',
      getUser: baseUrl + '/api/user/getUser',
      getUserInfo: baseUrl + '/api/user/getUserInfo',
      modifyUser: baseUrl + '/api/user/modifyUser',
    },
    company: {
      getCompany: baseUrl + '/api/company/getCompany',
      getCompanyInfo: baseUrl + '/api/company/getCompanyInfo',
      modifyCompany: baseUrl + '/api/company/modifyCompany',
      createCompany: baseUrl + '/api/company/createCompany',
    },
    menu: {
      getUserMenu: baseUrl + '/api/menu/getUserMenu',
    },
    permissionGroup: {
      getPermissionGroup: baseUrl + '/api/permissionGroup/getPermissionGroup',
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
