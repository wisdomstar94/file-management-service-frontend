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
    userPasswordMinLength: 6,
    userPasswordMaxLength: 20,

    permissionGroupNameMaxLength: 100,

    fileLabelNameMaxLength: 100,
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
      createUser: baseUrl + '/api/user/createUser',
      permissionCheck: baseUrl + '/api/user/permissionCheck',
      deleteUser: baseUrl + '/api/user/deleteUser',
      getSearchAreaShowFlag: baseUrl + '/api/user/getSearchAreaShowFlag',
    },
    company: {
      getCompany: baseUrl + '/api/company/getCompany',
      getCompanyInfo: baseUrl + '/api/company/getCompanyInfo',
      modifyCompany: baseUrl + '/api/company/modifyCompany',
      createCompany: baseUrl + '/api/company/createCompany',
      deleteCompany: baseUrl + '/api/company/deleteCompany',
    },
    menu: {
      getUserMenu: baseUrl + '/api/menu/getUserMenu',
    },
    permissionGroup: {
      getPermissionGroup: baseUrl + '/api/permissionGroup/getPermissionGroup',
      getPermissionGroupInfo: baseUrl + '/api/permissionGroup/getPermissionGroupInfo',
      copyPermissionGroup: baseUrl + '/api/permissionGroup/copyPermissionGroup',
      deletePermissionGroup: baseUrl + '/api/permissionGroup/deletePermissionGroup',
    },
    permission: {
      getPermission: baseUrl + '/api/permission/getPermission',
    },
    permissionGroupUpload: {
      getPermissionGroupUpload: baseUrl + '/api/permissionGroupUpload/getPermissionGroupUpload',
      applyPermissionGroupUpload: baseUrl + '/api/permissionGroupUpload/applyPermissionGroupUpload',
    },
    file: {
      getFile: baseUrl + '/api/file/getFile',
      fileBasicInfo: baseUrl + '/api/file/fileBasicInfo',
      modifyFile: baseUrl + '/api/file/modifyFile',
      fileDownloadUrlOuterInfo: baseUrl + '/api/file/fileDownloadUrlOuterInfo',
      uploadFile: baseUrl + '/api/file/uploadFile',
      deleteFile: baseUrl + '/api/file/deleteFile',
    },
    fileVersion: {
      getFileVersion: baseUrl + '/api/fileVersion/getFileVersion',
      versionInfo: baseUrl + '/api/fileVersion/versionInfo',
      modifyFileVersion: baseUrl + '/api/fileVersion/modifyFileVersion',
      uploadFileVersion: baseUrl + '/api/fileVersion/uploadFileVersion',
      onlyFileVersionList: baseUrl + '/api/fileVersion/onlyFileVersionList',
      deleteFileVersion: baseUrl + '/api/fileVersion/deleteFileVersion',
    },
    fileDownloadUrl: {
      getFileDownloadUrl: baseUrl + '/api/fileDownloadUrl/getFileDownloadUrl',
      fileDownloadUrlInfo: baseUrl + '/api/fileDownloadUrl/fileDownloadUrlInfo',
      modifyFileDownloadUrl: baseUrl + '/api/fileDownloadUrl/modifyFileDownloadUrl',
      createFileDownloadUrl: baseUrl + '/api/fileDownloadUrl/createFileDownloadUrl',
      deleteFileDownloadUrl: baseUrl + '/api/fileDownloadUrl/deleteFileDownloadUrl',
      getFileDownloadUrlLog: baseUrl + '/api/fileDownloadUrl/getFileDownloadUrlLog',
    },
    download: {
      yyyymmList: baseUrl + '/api/download/yyyymmList',
      statistics: baseUrl + '/api/download/statistics',
      downloadCheck: baseUrl + '/api/download/downloadCheck',
      downloadPasswordCheck: baseUrl + '/api/download/downloadPasswordCheck',
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
    fileSingleDefaulImageSrc: baseUrl + '/public/images/no-image.jpg',
    plusImage: baseUrl + '/public/images/plus-image.png',

    noImage: baseUrl + '/public/images/no-image.jpg',
  },

  localStorageName: {
    fileDownloadUrlErrorResult: 'fileDownloadUrlErrorResult',
  },
};
