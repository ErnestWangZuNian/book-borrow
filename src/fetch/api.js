/*
 * @Author: wangzunian 
 * @Date: 2017-04-10 10:16:22 
 * @Last Modified by: wangzunian
 * @Last Modified time: 2018-01-03 08:42:39
 */
import axios from "axios";

/**  axios基础配置 */
axios.defaults.timeout = 5000;
axios.defaults.headers["Content-Type"] = "application/json;charset=UTF-8";

/** axios封装请求get,post,put,delete方法 */
export function fetchGet(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params: params
      })
      .then(
        response => {
          resolve(response.data);
        },
        err => {
          reject(err);
        }
      )
      .catch(error => {
        reject(error);
      });
  });
}
export function fetchPost(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, params)
      .then(
        response => {
          resolve(response.data);
        },
        err => {
          reject(err);
        }
      )
      .catch(error => {
        reject(error);
      });
  });
}
export function fetchPut(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .put(url, params)
      .then(
        response => {
          resolve(response.data);
        },
        err => {
          reject(err);
        }
      )
      .catch(error => {
        reject(error);
      });
  });
}
export function fetchDelete(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .delete(url, params)
      .then(
        response => {
          resolve(response.data);
        },
        err => {
          reject(err);
        }
      )
      .catch(error => {
        reject(error);
      });
  });
}

/**  项目所有的请求写在这里并导出 */
export default {
  /**
   * 获取图书列表信息
   *
   * @param {any} params
   * @returns
   */
  getBookList(params) {
    return fetchGet("/v1/book/list", params);
  },
  /**
   * 获取图书分类信息
   *
   * @param {any} params
   * @returns
   */
  getCategoryList(params) {
    return fetchGet("/v1/category/list", params);
  },

  /**
   * 注册用户信息
   *
   * @param {any} params
   * @returns
   */
  registerUser(params) {
    return fetchPost("/v1/register", params);
  },
  /**
   * 用户登录
   *
   * @param {any} params
   * @returns
   */
  loginUser(params) {
    return fetchPost("/v1/login", params);
  },
  /**
   * 用户借书
   *
   * @param {any} params
   * @returns
   */
  borrow(params) {
    return fetchPost("/v1/book/borrow", params);
  },
  /**
   * 用户还书
   *
   * @param {any} params
   * @returns
   */
  returnBook(params) {
    return fetchPost("/v1/book/return", params);
  },
  /**
   * 用户借阅记录
   *
   * @param {any} params
   * @returns
   */
  borrowRecord(params) {
    return fetchGet("/v1/user-book-borrow", params);
  },
  /**
   * 判断登录状态
   *
   * @param {any} params
   * @returns
   */
  checkLoginStatus(params) {
    return fetchGet("/v1/auth-status", params);
  }
};
