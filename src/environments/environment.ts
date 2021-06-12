// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const baseUrl = 'http://localhost:47220';

export const environment = {
  production: false,

  baseUrl,

  mobileBaseWidth: 650,

  stringLengthLimit: {
    companyNameMaxLength: 100,
    companyBusinessNumberMaxLength: 15,
    companyAddressMaxLength: 150,
    companyCEONameMaxLength: 100,
    companyCEOTelMaxLength: 15,
    companyTelMaxLength: 15,
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
    },
    company: {
      getCompany: baseUrl + '/api/company/getCompany',
      getCompanyInfo: baseUrl + '/api/company/getCompanyInfo',
      modifyCompany: baseUrl + '/api/company/modifyCompany',
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

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
