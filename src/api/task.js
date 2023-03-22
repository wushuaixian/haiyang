import service from "../utils/request";

// 获取seller
export function getDetail(params) {
  return service.request({
    method: "get",
    url: "/data.json",
    params: params,
  });
}
export function getDetail2(params) {
  return service.request({
    method: "post",
    url: "/seller",
    data: params,
  });
}
