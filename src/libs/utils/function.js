/*
 * @Description: 文件介绍
 * @version: 1.0.0
 * @Author: 张泽锋
 * @Date: 2021-05-18 11:06:16
 * @LastEditTime: 2021-07-15 19:04:10
 * @LastEditors: 张泽锋
 */

/**
 * @description: 文本复制
 * @version: 1.0.0
 * @param {*} value
 * @return {*}
 * @author: 张泽锋
 * @Date: 2021-05-20 09:36:11
 */
function copy(value) {
  var copyLabel = document.createElement("input"); // !创建一个隐藏input
  copyLabel.value = value; // !赋值
  document.body.appendChild(copyLabel);
  copyLabel.select(); // !选择对象
  document.execCommand("Copy"); // !执行浏览器复制命令
  document.body.removeChild(copyLabel); // !标签删除
}

/**
 * @description: 判断数据类型
 * @version: 1.0.0
 * @param {*} data 源数据
 * @return {*} String
 * @author: 张泽锋
 * @Date: 2021-05-20 11:37:21
 */
const dataType = (data) => {
  return Object.prototype.toString
    .call(data)
    .replace(/\[|]/g, "")
    .split(" ")[1];
};

/**
 * @description: 数组重复属性合并
 * @version: 1.0.0
 * @param {*} data 源数据
 * @param {*} name 主标识  将依据此标识进行合并
 * @param {*} keyData 需要添加进结构的其余数据
 * @return {*}
 * @author: 张泽锋
 * @Date: 2021-05-20 11:36:21
 */
const mergeRepeatData = (data, name, keyData = []) => {
  let oldDataRule = [];
  data.forEach((el) => {
    let oldObj = {
      name: el[name],
      children: [],
    };
    keyData.map((item) => {
      oldObj[item] = el[item];
    });
    oldObj.children.push(el);
    oldDataRule.push(oldObj);
  });
  let newData = [];
  let newObj = {};
  oldDataRule.forEach((el, i) => {
    if (!newObj[el[name]]) {
      newData.push(el);
      newObj[el[name]] = true;
    } else {
      newData.forEach((el) => {
        if (el[name] === oldDataRule[i][name]) {
          el.children = el.children.concat(oldDataRule[i].children);
        }
      });
    }
  });
  return newData;
};
/**
 * @description: 查找两个数组不同数据
 * @version: 1.0.0
 * @param {*} arr1 数据1
 * @param {*} arr2 数据2
 * @param {*} key 匹配标识
 * @return {*} Array
 * @author: 张泽锋
 * @Date: 2021-06-02 15:52:16
 */
const getArrDifference = (arr1, arr2, key) => {
  let newArr = [];
  for (let i = 0; i < arr2.length; i++) {
    for (let j = 0; j < arr1.length; j++) {
      if (arr1[j][key] !== arr2[i][key]) {
        newArr.push(arr1[j]);
      }
    }
  }
  return newArr;
};

/**
 * @description: 深拷贝
 * @version: 1.0.0
 * @param {*} target
 * @return {*}
 * @author: 张泽锋
 * @Date: 2021-04-09 16:20:55
 */
function deepcopy(target) {
  // 定义一个变量
  let result;
  // 如果当前需要深拷贝的是一个对象的话
  if (typeof target === "object") {
    // 如果是一个数组的话
    if (Array.isArray(target)) {
      result = []; // 将result赋值为一个数组，并且执行遍历
      for (let i in target) {
        // 递归克隆数组中的每一项
        result.push(deepcopy(target[i]));
      }
      // 判断如果当前的值是null的话；直接赋值为null
    } else if (target === null) {
      result = null;
      // 判断如果当前的值是一个RegExp对象的话，直接赋值
    } else if (target.constructor === RegExp) {
      result = target;
    } else {
      // 否则是普通对象，直接for in循环，递归赋值对象的所有值
      result = {};
      for (let i in target) {
        result[i] = deepcopy(target[i]);
      }
    }
    // 如果不是对象的话，就是基本数据类型，那么直接赋值
  } else {
    result = target;
  }
  // 返回最终结果
  return result;
}
/**
 * @description: 根据查询条件生成对应的查询条件集合
 * @version: 1.0.0
 * @param {*} data 数据源
 * @return {*} Array 处理过的集合
 * @author: 张泽锋
 * @Date: 2021-06-01 15:03:22
 */
function getQueryModel(data, formData) {
  let result = [];
  for (let i in data) {
    result.push({
      Field: i,
      Value: data[i],
      Method: formData.find((val) => val.prop === i).method,
    });
  }
  return result;
}
function setPropName(data, basicData) {
  data.map((item) => {
    item.value = basicData[item.prop] || "";
  });
  return data;
}
/**
 * @description: 获取级联选择器的值
 * @version: 1.0.0
 * @param {*} data 数据源
 * @return {*}
 * @author: 张泽锋
 * @Date: 2021-06-16 14:26:25
 */
function getCascaderVal(data) {
  if (dataType(data) === "Array") {
    const isLength = data.length > 0;
    const deptLength = isLength ? data.length - 1 : 0;
    return !isLength ? "" : data[deptLength];
  }
  return data;
}
function clearCache(vm, name) {
  // var key =
  //   vm.$vnode.key == null
  //     ? vm.$vnode.componentOptions.Ctor.cid +
  //     (vm.$vnode.componentOptions.tag
  //       ? `::${vm.$vnode.componentOptions.tag}`
  //       : "")
  //     : vm.$vnode.key;
  if (!vm.$vnode) return;
  if (!vm.$vnode.parent) return;
  var cache = vm.$vnode.parent.componentInstance.cache;
  // var keys = vm.$vnode.parent.componentInstance.keys;
  // console.log(cache);
  for (let i in cache) {
    if (cache[i].tag.split("-").includes(name)) {
      delete cache[i];
    }
  }
  // if (cache) {
  //   if (keys.length) {
  //     var index = keys.indexOf(key);
  //     if (index > -1) {
  //       keys.splice(index, 1);
  //     }
  //   }
  //   delete cache[key];
  // }
}

function nextTick(vm) {
  return new Promise((resolve) => {
    vm.$nextTick(() => {
      resolve(true);
    });
  });
}
export default {
  copy,
  dataType,
  mergeRepeatData,
  deepcopy,
  getQueryModel,
  getArrDifference,
  setPropName,
  getCascaderVal,
  clearCache,
  nextTick,
};
