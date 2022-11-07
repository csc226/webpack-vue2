import Vue from 'vue'
import { Message } from 'element-ui' 
import { saveAs } from "file-saver";
 

export function handleFilter(val, options) {
  let label = "-";
  if(val===null || val ===undefined || val ==='') return '-'
  if (options && options.length > 0) {
    options.forEach((item) => {
      if (item.value === val) {
        label = item.label;
      }
    });
  }
  return label;
}

export function handleHouseStatusFilter(val, options) {
  let houseStatus = "-";
  if(val===null || val ===undefined || val ==='') return '-'
  if (options && options.length > 0) {
    if (val.indexOf(",") > -1) {
      houseStatus = "";
      let valArr = val.split(",");
      valArr.forEach((item1, index) => {
        options.forEach((item) => {
          if (item.value === item1) {
            houseStatus +=
              index === valArr.length - 1 ? item.label : item.label + ",";
          }
        });
      });
    } else {
      options.forEach((item) => {
        if (item.value === val) {
          houseStatus = item.label;
        }
      });
    }
  }
  return houseStatus;
}

/**
 * 文件下载
 * @param {*} id 文件ID
 * @param {*} name 文件名
 */ 

export function downloadByBlob(res, name) {
  let blob = res;
  let a = document.createElement("a"); // 创建一个`a`标签
  // 创键临时url对象
  let binaryData = [];
  binaryData.push(blob);
  let url = window.URL.createObjectURL(new Blob(binaryData));

  a.href = url;
  a.download = name;
  a.click();
  // 释放之前创建的URL对象
  window.URL.revokeObjectURL(url);
}
/**
 * 文件下载
 * @param {*} url 文件地址
 * @param {*} name 文件名
 */
export function download(url, name) {
  let link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", name);
  document.body.appendChild(link);
  link.click();
  URL.revokeObjectURL(link.href); // 释放URL 对象
  document.body.removeChild(link); // 释放标签
}
/**
 * 文件预览
 * @param {*} url 文件地址
 * @param {*} name 文件名
 */
export function previewFile(id, name) {
    window.open(`${CIM_PROJECT_CONFIG.VUE_APP_BSC_UI}/previewPdf?detailId=${id}`, '_blank')
}

export function getFilePath(id) {
  if(id) {
    return `${CIM_PROJECT_CONFIG.VUE_APP_HGSIMS_PROCESS_API}/hgsims/common/downloadByDetailId?detailId=${id}`
  }else {
    return ''
  }
}

/**
* 数字格式化
* @param {*} num格式化目标数字
* @param decimal 保留几位小数，默认0位
* @param split 千分位分隔符，默认为
*/
export function numFormat(num, decimal = 0, split = ',') {
  if (isFinite(num)) { // num是数字
    if (num === 0) { // 为0
      return num.toFixed(decimal)
    } else { // 非0
      var res = ''
      var dotIndex = String(num).indexOf('.')
      if (dotIndex === -1) { // 整数
        let dotStr = decimal > 0 ? '.' + '0'.repeat(decimal) : ''
        res = String(num).replace(/(\d)(?=(?:\d{3})+$)/g, `$1${split}`) + dotStr
      } else {
        // 保留decimals位小数
        const numStr = String((Math.round(num * Math.pow(10, decimal)) / Math.pow(10, decimal)).toFixed(decimal)) // 四舍五入，然后固定保留2位小数
        const decimals = numStr.slice(dotIndex, dotIndex + decimal + 1) // 截取小数位
        res = String(numStr.slice(0, dotIndex)).replace(/(\d)(?=(?:\d{3})+$)/g, `$1${split}`) + decimals
      }
      return res
    }
  } else {
    return '--'
  }
}

// 数组用逗号拼接
export function handleArrToStr(arr) {
  let str = ''
  if (!arr || (arr && arr.length < 1)) return '';
  if (arr && !Array.isArray(arr)) return arr;
  arr.forEach((item, index) => {
    if (index === arr.length - 1) {
      str += item;
    } else {
      str += item + ','
    }
  })
  return str;
}

/**
 * 在树形数组中，根据id获取对应的中文名
 * @param {要查找的id值} id 
 * @param {父级id的字段名} pidStr 
 * @param {该树形数据} list 
 * @returns 
 */
export function findItemByIdFromTree(id, pidStr, list) {
  console.log('findItemByIdFromTree', id, pidStr, list)
  if (!id) return null;
  let res = list.find(item => item[pidStr] === id)
  if (res) {
    return res
  } else {
    for (let i = 0; i < list.length; i++) {
      if (list[i].children instanceof Array && list[i].children.length > 0) {
        res = this.findItemByIdFromTree(id, pidStr, list[i].children)
        if (res) {
          return res
        }
      }
    }
    return null
  }
}

/**
 * 在portal打开新标签页
 * @param {标签名字} taskName 
 * @param {页面地址} url 
 * @param {页面类型：process-流程页} type 
 */
export function openTabs(taskName, url,type) {
  let id = Date.now() + url;
  if (top === window) {
    if(!type||type === "process") {
      window.open(CIM_PROJECT_CONFIG.VUE_APP_HGSIMS_PROCESS_API + url, "_blank");
    } else {
      window.open(url, "_blank");
    }
  } else {
    const tab = {
      // origin:window.location.origin + '/hgsims-ui',
      menuName: taskName || "新窗口",
      id: id,
      menuInnerUrl:
      !type||type === "process" ? "/hgsims-rest" + url : "/hgsims-ui/app#" + url,
      menuId: "",
    };
    top.postMessage(tab, "*");
  }
}

Vue.prototype.previewFile = previewFile