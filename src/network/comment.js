import { request } from "./request";
import qs from "qs";
// 添加文章
export function postAddComment (info) {
  return request({
    method: "post",
    url: "home/comment/add",
    data: qs.stringify(info),
  })
}