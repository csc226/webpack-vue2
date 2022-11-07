import request from '@/utils/tools/request';

const formDataContentType = {
    'Content-Type': 'application/x-www-form-urlencoded'
}
export function getDic(typeCode) {
    return request({

        url: '/hgsims/common/getDicByTypeCode?typeCode=' + typeCode,
        method: 'post'
    });
}
/**
 * 上传附件
 * @param {*} tableName 
 * @param {*} pkName 
 * @param {*} recordId 
 * @returns 
 */
export function uploadFile(data) {
    return request({

        url: '/hgsims/common/uploadFile',
        method: 'post',
        data: data,
        headers: formDataContentType
    });
}
// 下载附件(通过附件的详情Id)
export function getFileById(data) {
    return request({

        url: '/hgsims/common/downloadByDetailId?detailId=' + data,
        method: 'get',
        responseType: 'blob'
    });
}

// 删除附件(通过附件的详情Id)
export function deleteFileById(data) {
    return request({

        url: '/hgsims/common/deleteAttachmentByDetailId',
        method: 'post',
        data: data
    });
}
// 获取附件列表(通过业务表，记录Id)
export function getListBscAttFormByTableNameRecordId(data) {
    return request({

        url: '/hgsims/common/getListBscAttFormByTableNameRecordId',
        method: 'post',
        data: data,
        headers: formDataContentType
    });
}
// 获取用户所属行政等级
export function getRegion(data) {
    return {"success":true,"message":null,"content":{"parRegionId":"22","orgName":"济南市","unitGbSysId":"250","parRegionName":"山东","unitGbSysCode":"431000","unitGbSysName":"济南市","parRegionCode":"430000","orgRank":"2"}}
     request({

        url: '/hgsims/common/getOrgRankAreaCode',
        method: 'get',
        data: data
    });
}

// 获取行政区划
export function getAllRegion(data) {
    return request({

        url: '/hgsims/common/getAreaCode',
        method: 'get',
        data: data
    });
}

// 根据行政区划编码获取上级
export function getParentAreaCode(data) {
    return request({

        url: '/hgsims/common/getParentAreaCode?regionCode=' + data.regionCode,
        method: 'get',
        data
    });
}

// 获取一个UUID
export function genUUID() {
    return request({
        url: '/js/risk/org/genUUID',
        method: 'get'
    });
}

// 判断是否启用佛山鉴定表单 foshan_appraisal_form
export function getInitConfigByKey(key) {
    return request({
        url: `/hgsims/common/getInitConfigByKey?configKey=${key}`,
        method: 'get'
    });
}