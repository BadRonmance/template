/*
 * @Description: 文件介绍
 * @version: 1.0.0
 * @Author: 张泽锋
 * @Date: 2021-05-27 19:40:07
 * @LastEditTime: 2021-07-15 19:03:23
 * @LastEditors: 张泽锋
 */

/**
 * @description: 平级结构转化为树形结构
 * @Version: 1.0.0
 * @param {Array} data 数据源
 * @param {String} superiorId 父级id
 * @param {String} permissionId 子级id
 * @return {Array} 返回树形结构
 * @author: 张泽锋
 * @Date: 2020-08-11 20:11:52
 */
function listToTree(data, superiorId, permissionId) {
  let arr = JSON.parse(JSON.stringify(data));
  const listChildren = (obj, filter) => {
    [arr, obj.children] = arr.reduce(
      (res, val) => {
        if (filter(val)) res[1].push(val);
        else res[0].push(val);
        return res;
      },
      [[], []]
    );
    obj.children.forEach((val) => {
      if (arr.length)
        listChildren(val, (obj) => obj[superiorId] === val[permissionId]);
    });
  };
  const tree = {};
  listChildren(
    tree,
    (val) => arr.findIndex((i) => i[permissionId] === val[superiorId]) === -1
  );
  return tree.children;
}

/**
 * @description: 树形结构转化为平级结构
 * @Version: 1.0.0
 * @param {Array} 需要转化的树形结构
 * @return {Array} 返回平级的结构
 * @author: 张泽锋
 * @Date: 2020-08-11 20:11:08
 */
function treeToList(list, key = "children", id = "id") {
  let output = [];
  const listData = (list, superiorId = "") => {
    list.forEach(function (item) {
      if (item[key] && item[key].length > 0) {
        listData(item[key], item[id]);
        delete item[key];
      }
      if (superiorId !== "") {
        item.parentId = superiorId;
      }
      output.push(item);
    });
  };
  listData(list);
  return output;
}
export default {
  listToTree,
  treeToList,
};
