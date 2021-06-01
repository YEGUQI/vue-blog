import { request } from "./request";
import qs from "qs";

// 获取用户列表数据
export function getUserList (info) {
  return request({
    method: "get",
    url: 'admin/users',
    params: info,
  })
}

// 添加用户
export function postAddUser (info) {
  return request({
    method: "post",
    url: 'admin/users/add',
    data: qs.stringify(info),
  })
}

// 根据 id 查找指定用户
export function getFindUserById (id) {
  return request({
    method: "get",
    url: 'admin/users/' + id,
  })
}

// 根据 id 修改指定用户的状态
export function putUserState (stateInfo) {
  return request({
    method: "put",
    url: `admin/users/${stateInfo._id}/state/${stateInfo.state}`
  })
}

// 根据 id 删除指定用户
export function deleteUserById (id) {
  return request({
    method: "delete",
    url: "admin/users/" + id
  })
}

// 修改用户信息
export function editUser (editInfo) {
  return request({
    method: 'put',
    url: "admin/users/edit",
    data: editInfo
  })
}

// 根据id查找该用户发布的所有文章
export function findUserArticle (id, info) {
  return request({
    method: 'get',
    url: "home/articles" + id,
    params: info,
  })
}