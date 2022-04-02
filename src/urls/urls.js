import endswith from "lodash.endswith";

export let MAIN =
  process.env.NODE_ENV === "development"
    ? `http://127.0.0.1:8000`
    : "https://idf.coursestar.net";

// export let MAIN = "https://idf.coursestar.net";

export let BUCKET_BASE = "https://idf-degree-pro-1.s3.amazonaws.com/";

export const removeBackslash = (url) => {
  let newUrl = url;
  if (endswith(newUrl, `/`)) {
    newUrl = `${newUrl.slice(0, -1)}`;
  }
  return newUrl;
};

export const makeToUrl = (url, id) => {
  if (id) {
    let newUrl = removeBackslash(url);
    return `${newUrl}/${id}/`;
  } else {
    return url;
  }
};
export const makeGetUrl = (url, method = "") => {
  if (method.toLowerCase() === "get") {
    let newUrl = removeBackslash(url);
    return `${newUrl}_get/`;
  } else {
    return url;
  }
};

export const urls = {
  models: {
    uploader: {
      POLICY: `${MAIN}/api/uploader/policy/`,
      retrieve_cookie: `${MAIN}/api/uploader/retrieve_cookie/`,
    },
    users: {
      self: `${MAIN}/api/users/`,
      auth: {
        self: `${MAIN}/api/users/auth/`,
        login: `${MAIN}/api/users/auth/login/`,
        signup: `${MAIN}/api/users/auth/signup/`,
        user_get: `${MAIN}/api/users/user_get/`,
      },
    },
    degrees: {
      self: `${MAIN}/api/degrees/`,
      degree: `${MAIN}/api/degrees/degree/`,
      degree_file: `${MAIN}/api/degrees/degree_file/`,
    },
  },
};

// export let MAIN =
//   process.env.NODE_ENV === "development"
//     ? "http://127.0.0.1:8000"
//     : window.location.hostname.includes("beta")
//     ? "https://beta.api.coursestar.net"
//     : "https://api.coursestar.net";

// // export let AMAZON_BUCKET_BASE =
// //   process.env.NODE_ENV === "development"
// //     ? "https://dev-coursestar-bucket.s3.amazonaws.com/"
// //     : "https://coursestar-bucket.s3.amazonaws.com/";

// export let AMAZON_BUCKET_BASE =
//   process.env.NODE_ENV === "development"
//     ? "https://courses-pro.s3.amazonaws.com/"
//     : "https://courses-pro.s3.amazonaws.com/";

// // "https://courses-pro.s3.amazonaws.com/"
// // export let MAIN = `https://api.coursestar.net`;
// // export let MAIN = `https://xc7447bfgc.execute-api.eu-central-1.amazonaws.com/dev`;

// export const urls = {
//   AMAZON_BUCKET_BASE: AMAZON_BUCKET_BASE,
//   CLOUD_FRONT_AMAZON: `https://dns.coursestar.net`,
//   OLD_CLOUD_FRONT_AMAZON: `https://d3ntu8ywohtpo9.cloudfront.net`,
//   CLOUD_FRONT_CDN77: `https://1580549041.rsc.cdn77.org`,

//   PATH_FOR_THUMBNAILS: name => `${name}/orginal/images`,

//   // FOR SEND EMAIL
//   SEND_EMAIL: `${MAIN}/api/users/send-email/`,

//   // FOR DJANGO

//   modals: {
//     users: {
//       user: {
//         // LOGIN: `${MAIN}/api/users/rest-auth/login/`,
//         LOGIN: `${MAIN}/api/users/auth/login/`,
//         LOGIN_WITH_SOCIAL_CONNECT: provider => `${MAIN}/api/users/rest-auth/${provider}/connect/`,
//         // REGISTER: `${MAIN}/api/users/rest-auth/register/`,
//         REGISTER: `${MAIN}/api/users/auth/register/`,
//         CHECK_MFA: `${MAIN}/api/users/rest-auth/check-mfa/`,
//         USER_ME: `${MAIN}/api/users/me/`,
//         CHECK_USER_PERMISSION_COURSE: `${MAIN}/api/tasks/check_user_permission_course/`,
//         RESET_CONFIRM: `${MAIN}/api/users/reset_password/confirm/`,
//         RESET_REQUEST: `${MAIN}/api/users/reset_password/`,
//         SEND_MAIL_TO_CONTACT: `${MAIN}/api/users/user/send-mail-to-contact/`,
//         CHANGE_PASSWORD: `${MAIN}/api/users/change-password/`,
//         USER: `${MAIN}/api/users/user/`,
//         TO_SEND_MAIL_TO_USERS: `${MAIN}/api/users/user/send-mail-to-users/`
//       },
//       user_enrollment: {
//         USER_ENROLLMENT: `${MAIN}/api/users/user-enrollment/`
//       },
//       user_enrollment_db: {
//         USER_ENROLLMENT_DB: `${MAIN}/api/users/user-enrollment-db/`,
//         CHECK_IF_USER_ENROLLED: `${MAIN}/api/users/user-enrollment-db/check-if-user-enrolled/`
//         // UPDATE: course_video_list_id =>
//         //   `${MAIN}/api/users/user-enrollment-db/${course_video_list_id}/update/`
//       },
//       user_metadata: {
//         USER_METADATA: `${MAIN}/api/users/user-metadata/`
//       },
//       totp_device: {
//         TOTP_DEVICE: `${MAIN}/api/users/totp-device/`
//       },
//       user_contact: {
//         SEND_MAIL_TO_CONTACT: `${MAIN}/api/users/user-contact/send-mail-to-contact/`
//       },
//       request_instructor: {
//         REQUEST_INSTRUCTOR: `${MAIN}/api/users/request-instructor/`
//       }
//     },
//     courses: {
//       course: {
//         COURSE: `${MAIN}/api/courses/course/`,
//         course_content: {
//           COURSE_CONTENT: `${MAIN}/api/courses/course-content/`
//           // UPDATE_COURSE_CONTENT: `${MAIN}/api/courses/course-content/`
//         },
//         GET_LATEST_COURSES: `${MAIN}/api/courses/course-get/get-latest-courses/`,
//         GET_LATEST_USER_VIEW_COURSES: `${MAIN}/api/courses/course-get/get-latest-user-view-courses/`,
//         COURSE_GET: `${MAIN}/api/courses/course-get/get-courses/`,
//         TO_SEND_MAIL_TO_STUDENTS: courseId =>
//           `${MAIN}/api/courses/course/${courseId}/send-mail-to-students/`,
//         TO_COURSE_GET: id => `${MAIN}/api/courses/course-get/${id}/get-course/`,
//         TO_COURSE_CONTENT: id => `${MAIN}/api/courses/course-content-get/${id}/`,
//         SEARCH: `${MAIN}/api/courses/search/`,
//         TO_SEARCH: (query, page) => `${MAIN}/api/courses/search/?page=${page}&search=${query}`,
//         FETCH_MORE_COURSES: (categoryId, path = false) => {
//           if (path === false) {
//             return `${MAIN}/api/courses/course-get/by_category/?category_id=${categoryId}`;
//           }
//           return path;
//         },
//         DJANGO_UPDATE_MULTIPLE: `${MAIN}/api/courses/update-multiple/`
//       },
//       course_active_request: {
//         COURSE_ACTIVE_REQUEST: `${MAIN}/api/courses/course-active-request/`
//       },
//       course_main_list: {
//         COURSE_MAIN_LIST: `${MAIN}/api/courses/course-main-list/`
//       },

//       course_sub_list: {
//         COURSE_SUB_LIST: `${MAIN}/api/courses/course-sub-list/`
//         // DJANGO_CHANGE_ORDER_SUB_LIST: `${MAIN}/api/courses/change_order_sub_list/`,
//       },

//       course_video_list: {
//         COURSE_VIDEO_LIST: `${MAIN}/api/courses/course-video-list/`,

//         PROCESS_VIDEO: `${MAIN}/api/courses/course-video-list/process-video/`
//       },
//       course_video_list_live: {
//         COURSE_VIDEO_LIST_LIVE: `${MAIN}/api/courses/course-video-list-live/`,
//         DELETE_MULTIPLE: `${MAIN}/api/courses/course-video-list-live/delete-multiple/`
//       },
//       category: {
//         CATEGORY: `${MAIN}/api/courses/category/`
//       },
//       sub_category: {
//         SUB_CATEGORY: `${MAIN}/api/courses/sub-category/`
//       },

//       video_text: {
//         VIDEO_TEXT: `${MAIN}/api/courses/video-text/`
//       },
//       video_file: {
//         VIDEO_FILE: `${MAIN}/api/courses/video-file/`
//       },
//       video_link: {
//         VIDEO_LINK: `${MAIN}/api/courses/video-link/`
//       },
//       course_messages: {
//         COURSE_MESSAGES: `${MAIN}/api/courses/course-messages/`
//         // COURSE_MESSAGES_GET: `${MAIN}/api/courses/course-messages-get/`,
//       },

//       course_coupon: {
//         CHECK_COURSE_COUPON: `${MAIN}/api/courses/course-coupon/check-course-coupon/`,
//         COURSE_COUPON: `${MAIN}/api/courses/course-coupon/`,
//         DELETE_MULTIPLE: `${MAIN}/api/courses/course-coupon/delete-multiple/`
//         //
//       },
//       policy: {
//         POLICY: `${MAIN}/api/files/policy/`
//       }
//     },
//     questions: {
//       questions_in_course: {
//         QUESTIONS_IN_COURSE: `${MAIN}/api/question/questions-in-course/`
//       },
//       questions_in_course_list: {
//         QUESTIONS_IN_COURSE_LIST: `${MAIN}/api/question/questions-in-course-list/`
//       },
//       questions_in_page_list: {
//         QUESTIONS_IN_PAGE_LIST: `${MAIN}/api/question/questions-in-page-list/`
//       },
//       questions_in_page: {
//         QUESTIONS_IN_PAGE: `${MAIN}/api/question/questions-in-page/`
//       }
//     },
//     UI: {
//       ui_item: {
//         UI_ITEM: `${MAIN}/api/UI/ui-item/`
//       },
//       ui_items_list: {
//         UI_ITEMS_LIST: `${MAIN}/api/UI/ui-items-list/`
//       }
//     },
//     payments: {
//       instructor_gain_list: {
//         INSTRUCTOR_GAIN_LIST: `${MAIN}/api/payments/instructor-gain-list/`
//       },
//       payment_list: {
//         PAYMENT_LIST: `${MAIN}/api/payments/payment_list/`
//       },
//       make_payment: {
//         MAKE_PAYMENT: `${MAIN}/api/payments/make-payment/`,
//         TO_MAKE_PAYMENT: path => `${MAIN}/api/payments/make-payment/${path}/`
//       },
//       payment_monthly: {
//         PAYMENT_MONTHLY: `${MAIN}/api/payments/payment-monthly/`
//       }
//     },
//     tasks: {
//       PROCESS_TASK: `${MAIN}/api/tasks/process-task/`
//     }
//   }
// };

export const withQueryParams = (url, params = []) => {
  let newUrl = addBackslash(url);
  if (params.length > 0) {
    let paramsString = params.join(`&`);
    return `${newUrl}?${paramsString}`;
  } else {
    return `${newUrl}`;
  }
};

// export const withCache = url => {
//   if (process.env.NODE_ENV !== "development") {
//     return url.replace(MAIN, "https://cache.api.coursestar.net");
//   }
//   return url;
//   // return url.replace(MAIN, "https://cache.api.coursestar.net");
// };

export const addBackslash = (url) => {
  let newUrl = url;
  if (!endswith(newUrl, `/`)) {
    newUrl = `${newUrl}/`;
  }
  return newUrl;
};
