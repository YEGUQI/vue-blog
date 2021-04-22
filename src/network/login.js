import { request } from "./request";
import qs from "qs";
export function postLogin (userinfo) {
  return request({
    method: "post",
    url: "admin/login",
    data: qs.stringify(userinfo),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
  })
}