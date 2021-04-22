import { request } from "./request";
// import qs from "qs";

export function getUserList (info) {
  return request({
    method: "get",
    url: 'admin/users',
    params: info,
  })
}