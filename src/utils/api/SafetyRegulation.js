import request from '@/utils/tools/request';
import qs from 'qs';

// const aa="http://172.18.21.97:9512/hgsims-rest"
// 安全结构
export function getstructural(params) {
    //console.log("dm:"+params.xzqdm);
  // return request({
  //     url: '/risk/appraisal/onePicture/structural',
  //     method: 'post',
  //     data: params
  // });
  let result ={}
   result={
    "success": true,
    "message": "查询成功",
    "content": {
      "totalCount": params.xzqdm=="370100"?10827:981,
      "jyxzjf": params.xzqdm=="370100"?3427:362,
      "jyxzjfPercentage": params.xzqdm=="370100"?"32%":"37%",
      "jyxjzzzjf": params.xzqdm=="370100"?4480:384,
      "jyxjzzzjfPercentage": params.xzqdm=="370100"?"41%":"39%",
      "qtzjf": params.xzqdm=="370100"?2924:235,
      "qtzjfPercentage": params.xzqdm=="370100"?"27%":"24%",
      "djd": params.xzqdm=="370100"?7323:635,
      "jdz": params.xzqdm=="370100"?1974:203,
      "yjd": params.xzqdm=="370100"?1530:143,
      "levelA": params.xzqdm=="370100"?1977:413,
      "levelB": params.xzqdm=="370100"?88301:7558,
      "levelC": params.xzqdm=="370100"?1208:121,
      "levelD": params.xzqdm=="370100"?322:22,
      "dangerHouse": params.xzqdm=="370100"?1392:189,
      "dzz": params.xzqdm=="370100"?437:20,
      "zzz": params.xzqdm=="370100"?129:54,
      "yzz": params.xzqdm=="370100"?826:115,
      "cczj": params.xzqdm=="370100"?217:43,
      "wxjg": params.xzqdm=="370100"?493:69,
      "qtgccs": params.xzqdm=="370100"?245:57
    }
  }

  return Promise.resolve(result)
};
// 分页查询结构安全房屋
export function getqueryStructuralHouse(params) {
    //console.log("dm:"+params.xzqdm);
    // 1结构安全，2经营安全，5违法建设和违法审批(appraisalType 列表参数)
  // return request({
  //     url:'/risk/appraisal/onePicture/queryStructuralHouse',
  //     method: 'post',
  //     data: params
  // });
  if (params.appraisalType == 5) return Promise.resolve({
    "success": true,
    "message": "查询成功",
    "content": {
      "total": params.xzqdm=="370100"?39:16,
      "list": params.xzqdm=="370100"?[{
        "yhfwbh": "YH370102000014861",
        "cqr": "刘**",
        "fwaqjd": "0"
      }, {
        "yhfwbh": "YH370102000000006",
        "cqr": "张**",
        "fwaqjd": "0"
      }, {
        "yhfwbh": "YH370102000035612",
        "cqr": "张**",
        "fwaqjd": "0"
      }, {
        "yhfwbh": "YH370102000459181",
        "cqr": "王**",
        "fwaqjd": "0"
      }, {
        "yhfwbh": "YH370102000041012",
        "cqr": "钱**",
        "fwaqjd": "0"
      }, {
        "yhfwbh": "YH370102000038547",
        "cqr": "欧**",
        "fwaqjd": "0"
      }, {
        "yhfwbh": "YH370102000016441",
        "cqr": "刘**",
        "fwaqjd": "0"
      }, {
        "yhfwbh": "YH370102000000006",
        "cqr": "张**",
        "fwaqjd": "0"
      }, {
        "yhfwbh": "YH370102000023411",
        "cqr": "施*",
        "fwaqjd": "0"
      }, {
        "yhfwbh": "YH370102000038587",
        "cqr": "方*",
        "fwaqjd": "0"
      }, {
        "yhfwbh": "YH370102000037437",
        "cqr": "许**",
        "fwaqjd": "0"
      }, {
        "yhfwbh": "YH370102000030208",
        "cqr": "王**",
        "fwaqjd": "0"
      }, {
        "yhfwbh": "YH370102000009711",
        "cqr": "马**",
        "fwaqjd": "0"
      }, {
        "yhfwbh": "YH370102000088521",
        "cqr": "张*",
        "fwaqjd": "0"
      }, {
        "yhfwbh": "YH370102000080028",
        "cqr": "欧*",
        "fwaqjd": "0"
      }, {
        "yhfwbh": "YH370102000012443",
        "cqr": "李**",
        "fwaqjd": "0"
      }, {
        "yhfwbh": "YH370102000031547",
        "cqr": "刘*",
        "fwaqjd": "0"
      }, {
        "yhfwbh": "YH370102000000017",
        "cqr": "王**",
        "fwaqjd": "0"
      }, {
        "yhfwbh": "YH370102000021471",
        "cqr": "张**",
        "fwaqjd": "0"
      }, {
        "yhfwbh": "YH370102000023082",
        "cqr": "王*",
        "fwaqjd": "0"
      }]:[{
        "yhfwbh": "YH370112000020819",
        "cqr": "王**",
        "fwaqjd": "0"
      }, {
        "yhfwbh": "YH370114000015240",
        "cqr": "张**",
        "fwaqjd": "0"
      }, {
        "yhfwbh": "YH370103000003855",
        "cqr": "许**",
        "fwaqjd": "0"
      }, {
        "yhfwbh": "YH370116000172942",
        "cqr": "王**",
        "fwaqjd": "0"
      }, {
        "yhfwbh": "YH370116000172942",
        "cqr": "王**",
        "fwaqjd": "0"
      }, {
        "yhfwbh": "YH370124000006971",
        "cqr": "赵**",
        "fwaqjd": "0"
      }, {
        "yhfwbh": "YH370114000015234",
        "cqr": "张**",
        "fwaqjd": "0"
      }, {
        "yhfwbh": "YH370112000020815",
        "cqr": "欧*",
        "fwaqjd": "0"
      }, {
        "yhfwbh": "YH370172000004176",
        "cqr": "方*",
        "fwaqjd": "0"
      }, {
        "yhfwbh": "YH370172000005005",
        "cqr": "方**",
        "fwaqjd": "0"
      }, {
        "yhfwbh": "YH370114000015228",
        "cqr": "钱**",
        "fwaqjd": "0"
      }, {
        "yhfwbh": "YH370172000002400",
        "cqr": "李**",
        "fwaqjd": "0"
      }, {
        "yhfwbh": "YH370116000081981",
        "cqr": "张**",
        "fwaqjd": "0"
      }, {
        "yhfwbh": "YH370117000033747",
        "cqr": "刘**",
        "fwaqjd": "0"
      }, {
        "yhfwbh": "YH370114000015263",
        "cqr": "孙**",
        "fwaqjd": "0"
      }, {
        "yhfwbh": "YH370116000177169",
        "cqr": "孙**",
        "fwaqjd": "0"
      }],
      "pageNum": 1,
      "pageSize": 20,
      "size": 17,
      "startRow": 1,
      "endRow": 17,
      "pages": 1,
      "prePage": 0,
      "nextPage": 0,
      "isFirstPage": true,
      "isLastPage": true,
      "hasPreviousPage": false,
      "hasNextPage": false,
      "navigatePages": 8,
      "navigatepageNums": [1],
      "navigateFirstPage": 1,
      "navigateLastPage": 1
    }
  })
  if (params.appraisalType == 2) return Promise.resolve({
    "success": true,
    "message": "查询成功",
    "content": {
      "total": params.xzqdm=="370100"?39:16,
      "list": params.xzqdm=="370100"?[{
        "yhfwbh": "YH370102000014861",
        "cqr": "刘**",
        "fwaqjd": "0"
      }, {
        "yhfwbh": "YH370102000000006",
        "cqr": "张**",
        "fwaqjd": "0"
      }, {
        "yhfwbh": "YH370102000035612",
        "cqr": "张**",
        "fwaqjd": "0"
      }, {
        "yhfwbh": "YH370102000459181",
        "cqr": "王**",
        "fwaqjd": "0"
      }, {
        "yhfwbh": "YH370102000041012",
        "cqr": "钱**",
        "fwaqjd": "0"
      }, {
        "yhfwbh": "YH370102000038547",
        "cqr": "欧**",
        "fwaqjd": "0"
      }, {
        "yhfwbh": "YH370102000016441",
        "cqr": "刘**",
        "fwaqjd": "0"
      }, {
        "yhfwbh": "YH370102000000006",
        "cqr": "张**",
        "fwaqjd": "0"
      }, {
        "yhfwbh": "YH370102000023411",
        "cqr": "施*",
        "fwaqjd": "0"
      }, {
        "yhfwbh": "YH370102000038587",
        "cqr": "方*",
        "fwaqjd": "0"
      }, {
        "yhfwbh": "YH370102000037437",
        "cqr": "许**",
        "fwaqjd": "0"
      }, {
        "yhfwbh": "YH370102000030208",
        "cqr": "王**",
        "fwaqjd": "0"
      }, {
        "yhfwbh": "YH370102000009711",
        "cqr": "马**",
        "fwaqjd": "0"
      }, {
        "yhfwbh": "YH370102000088521",
        "cqr": "张*",
        "fwaqjd": "0"
      }, {
        "yhfwbh": "YH370102000080028",
        "cqr": "欧*",
        "fwaqjd": "0"
      }, {
        "yhfwbh": "YH370102000012443",
        "cqr": "李**",
        "fwaqjd": "0"
      }, {
        "yhfwbh": "YH370102000031547",
        "cqr": "刘*",
        "fwaqjd": "0"
      }, {
        "yhfwbh": "YH370102000000017",
        "cqr": "王**",
        "fwaqjd": "0"
      }, {
        "yhfwbh": "YH370102000021471",
        "cqr": "张**",
        "fwaqjd": "0"
      }, {
        "yhfwbh": "YH370102000023082",
        "cqr": "王*",
        "fwaqjd": "0"
      }]:[{
        "yhfwbh": "YH370112000020862",
        "cqr": "孙**",
        "fwaqjd": "0"
      }, {
        "yhfwbh": "YH370112000020880",
        "cqr": "张**",
        "fwaqjd": "0"
      }, {
        "yhfwbh": "YH370116000078641",
        "cqr": "许**",
        "fwaqjd": "0"
      }, {
        "yhfwbh": "YH370117000033855",
        "cqr": "苏**",
        "fwaqjd": "0"
      }, {
        "yhfwbh": "YH370171000000335",
        "cqr": "孙**",
        "fwaqjd": "0"
      }, {
        "yhfwbh": "YH370117000033796",
        "cqr": "赵**",
        "fwaqjd": "0"
      }, {
        "yhfwbh": "YH370172000002426",
        "cqr": "刘**",
        "fwaqjd": "0"
      }, {
        "yhfwbh": "YH370113000000020",
        "cqr": "欧*",
        "fwaqjd": "0"
      }, {
        "yhfwbh": "YH370117000028493",
        "cqr": "方*",
        "fwaqjd": "0"
      }, {
        "yhfwbh": "YH370112000000009",
        "cqr": "刘**",
        "fwaqjd": "0"
      }, {
        "yhfwbh": "YH370112000020815",
        "cqr": "方**",
        "fwaqjd": "0"
      }, {
        "yhfwbh": "YH370114000015244",
        "cqr": "张**",
        "fwaqjd": "0"
      }, {
        "yhfwbh": "YH370172000003598",
        "cqr": "刘**",
        "fwaqjd": "0"
      }, {
        "yhfwbh": "YH370172000001780",
        "cqr": "王**",
        "fwaqjd": "0"
      }, {
        "yhfwbh": "YH370114000015297",
        "cqr": "孙**",
        "fwaqjd": "0"
      }, {
        "yhfwbh": "YH370114000015284",
        "cqr": "孙**",
        "fwaqjd": "0"
      }],
      "pageNum": 1,
      "pageSize": 20,
      "size": 17,
      "startRow": 1,
      "endRow": 17,
      "pages": 1,
      "prePage": 0,
      "nextPage": 0,
      "isFirstPage": true,
      "isLastPage": true,
      "hasPreviousPage": false,
      "hasNextPage": false,
      "navigatePages": 8,
      "navigatepageNums": [1],
      "navigateFirstPage": 1,
      "navigateLastPage": 1
    }
  })
  if (params.appraisalType == 1) return Promise.resolve({
    "success": true,
    "message": "查询成功",
    "content": {
      "total": params.xzqdm=="370100"?39:16,
      "list": params.xzqdm=="370100"?[{
        "yhfwbh": "YH370102000014861",
        "cqr": "刘**",
        "fwaqjd": "0"
      }, {
        "yhfwbh": "YH370102000000006",
        "cqr": "张**",
        "fwaqjd": "0"
      }, {
        "yhfwbh": "YH370102000035612",
        "cqr": "张**",
        "fwaqjd": "0"
      }, {
        "yhfwbh": "YH370102000459181",
        "cqr": "王**",
        "fwaqjd": "0"
      }, {
        "yhfwbh": "YH370102000041012",
        "cqr": "钱**",
        "fwaqjd": "0"
      }, {
        "yhfwbh": "YH370102000038547",
        "cqr": "欧**",
        "fwaqjd": "0"
      }, {
        "yhfwbh": "YH370102000016441",
        "cqr": "刘**",
        "fwaqjd": "0"
      }, {
        "yhfwbh": "YH370102000000006",
        "cqr": "张**",
        "fwaqjd": "0"
      }, {
        "yhfwbh": "YH370102000023411",
        "cqr": "施*",
        "fwaqjd": "0"
      }, {
        "yhfwbh": "YH370102000038587",
        "cqr": "方*",
        "fwaqjd": "0"
      }, {
        "yhfwbh": "YH370102000037437",
        "cqr": "许**",
        "fwaqjd": "0"
      }, {
        "yhfwbh": "YH370102000030208",
        "cqr": "王**",
        "fwaqjd": "0"
      }, {
        "yhfwbh": "YH370102000009711",
        "cqr": "马**",
        "fwaqjd": "0"
      }, {
        "yhfwbh": "YH370102000088521",
        "cqr": "张*",
        "fwaqjd": "0"
      }, {
        "yhfwbh": "YH370102000080028",
        "cqr": "欧*",
        "fwaqjd": "0"
      }, {
        "yhfwbh": "YH370102000012443",
        "cqr": "李**",
        "fwaqjd": "0"
      }, {
        "yhfwbh": "YH370102000031547",
        "cqr": "刘*",
        "fwaqjd": "0"
      }, {
        "yhfwbh": "YH370102000000017",
        "cqr": "王**",
        "fwaqjd": "0"
      }, {
        "yhfwbh": "YH370102000021471",
        "cqr": "张**",
        "fwaqjd": "0"
      }, {
        "yhfwbh": "YH370102000023082",
        "cqr": "王*",
        "fwaqjd": "0"
      }]:[{
        "yhfwbh": "YH370117000033651",
        "cqr": "许**",
        "fwaqjd": "0"
      }, {
        "yhfwbh": "YH370114000015342",
        "cqr": "王**",
        "fwaqjd": "0"
      }, {
        "yhfwbh": "YH370114000027965",
        "cqr": "许**",
        "fwaqjd": "0"
      }, {
        "yhfwbh": "YH370116000054601",
        "cqr": "刘**",
        "fwaqjd": "0"
      }, {
        "yhfwbh": "YH370116000172997",
        "cqr": "王**",
        "fwaqjd": "0"
      }, {
        "yhfwbh": "YH370114000015263",
        "cqr": "孙**",
        "fwaqjd": "0"
      }, {
        "yhfwbh": "YH370112000000020",
        "cqr": "张**",
        "fwaqjd": "0"
      }, {
        "yhfwbh": "YH370117000028486",
        "cqr": "许*",
        "fwaqjd": "0"
      }, {
        "yhfwbh": "YH370114000015290",
        "cqr": "方*",
        "fwaqjd": "0"
      }, {
        "yhfwbh": "YH370172000004999",
        "cqr": "刘**",
        "fwaqjd": "0"
      }, {
        "yhfwbh": "YH370114000015125",
        "cqr": "李**",
        "fwaqjd": "0"
      }, {
        "yhfwbh": "YH370112000020796",
        "cqr": "李**",
        "fwaqjd": "0"
      }, {
        "yhfwbh": "YH370114000015321",
        "cqr": "许**",
        "fwaqjd": "0"
      }, {
        "yhfwbh": "YH370103000003859",
        "cqr": "王**",
        "fwaqjd": "0"
      }, {
        "yhfwbh": "YH370172000001916",
        "cqr": "孙**",
        "fwaqjd": "0"
      }, {
        "yhfwbh": "YH370114000015293",
        "cqr": "王**",
        "fwaqjd": "0"
      }],
      "pageNum": 1,
      "pageSize": 20,
      "size": 17,
      "startRow": 1,
      "endRow": 17,
      "pages": 1,
      "prePage": 0,
      "nextPage": 0,
      "isFirstPage": true,
      "isLastPage": true,
      "hasPreviousPage": false,
      "hasNextPage": false,
      "navigatePages": 8,
      "navigatepageNums": [1],
      "navigateFirstPage": 1,
      "navigateLastPage": 1
    }
  })

};
//房屋拆除情况
export function getdismantleHouse(params) {
    //console.log("dm:"+params.xzqdm);
  // return request({
  //     url: '/risk/appraisal/onePicture/dismantleHouse',
  //     method: 'post',
  //     data: params
  // });
  return Promise.resolve({
    "success": true,
    "message": "查询成功",
    "content": {
      "total": params.xzqdm=="370100"?217:43,
      "fwList": params.xzqdm=="370100"?[{
        clsl: 43,
        regionName: '历下区'
      }, {
        clsl: 36,
        regionName: '市中区'
      }, {
        clsl: 20,
        regionName: '槐荫区'
      }, {
        clsl: 12,
        regionName: '天桥区'
      }, {
        clsl: 40,
        regionName: '历城区'
      }, {
        clsl: 11,
        regionName: '长清区'
      }, {
        clsl: 17,
        regionName: '章丘区'
      }, {
        clsl: 6,
        regionName: '济阳区'
      }, {
        clsl: 0,
        regionName: '莱芜区'
      }, {
        clsl: 3,
        regionName: '钢城区'
      }, {
        clsl: 11,
        regionName: '平阴县'
      }, {
        clsl: 15,
        regionName: '商河县'
      }, {
        clsl: 0,
        regionName: '济南高新技术产业开发区'
      }, {
        clsl: 5,
        regionName: '济南新旧动能转换先行区'
      }]:[{
        regionName:"历下区",
        clsl:43,
        bar:"0.15"
    }]
    }
  })
};
//经营安全
export function getqueryJyaqDatail(params) {
    //console.log("dm:"+params.xzqdm);
  return Promise.resolve({
    "success": true,
    "message": "查询成功",
    "content":  params.xzqdm=="370100"?{
      "jyaqwt": 17201,
      "wscztdj": 5313,
      "wjyxk": 7129,
      "wjdbg": 4759,
      "yzz": 7981,
      "zzz": 837,
      "dzz": 8383,
      "glcs": 4654,
      "tzsy": 439,
      "tzjy": 213,
      "fkjs": 878,
      "rycl": 657,
      "qt": 2463,
      "wfjscc": 3327,
      "qbcc": 1476,
      "bbsx": 983,
      "ms": 174,
      "fk": 482,
      "bfcc": 92,
      "qtwfjscc": 120,
      "fwList": [],
      "jyaqYhfwzs": 0
    }:{
      "jyaqwt": 1052,
      "wscztdj": 433,
      "wjyxk": 497,
      "wjdbg": 122,
      "yzz": 758,
      "zzz": 121,
      "dzz": 173,
      "glcs": 497,
      "tzsy": 141,
      "tzjy": 84,
      "fkjs": 90,
      "rycl": 59,
      "qt": 123,
      "wfjscc": 261,
      "qbcc": 72,
      "bbsx": 41,
      "ms": 29,
      "fk": 54,
      "bfcc": 43,
      "qtwfjscc": 22,
      "fwList": [{
        regionName:"历下区",
        clsl:758,
        bar:"1"
    }],
      "jyaqYhfwzs": 1052
    }
  })
  //  request({
  //     url: '/risk/appraisal/onePicture/queryJyaqDatail',
  //     method: 'post',
  //     data: params
  // });
};
//违法建设和违法审批
export function getqueryWfjsAndWfspStatistics(params) {
    //console.log("dm:"+params.xzqdm);
  // return request({
  //     url:'/risk/appraisal/onePicture/queryWfjsAndWfspStatistics',
  //     method: 'post',
  //     data: params
  // });
  return Promise.resolve({
    "success": true,
    "message": "查询成功",
    "content":  params.xzqdm=="370100"?{
      "wfjsfw": 12313,
      "wfzd": 1896,
      "wfxj": 2839,
      "wggkj": 3217,
      "wggbyt": 4361,
      "wfspfw": 7983,
      "wfydsp": 3171,
      "wfghsp": 2547,
      "wfjssp": 1043,
      "wfjyxk": 1222,
      "yzz": 9127,
      "zzz": 831,
      "dzz": 8995,
      "qbcc": 2468,
      "bbsx": 1209,
      "ms": 977,
      "fk": 2016,
      "bfcc": 976,
      "qtwfjscc": 1481,
      "fwList": [{
        "regionName": "历下区",
        "clsl": 1
      }],
      "wfjsYhfwzs": 0
    }:{
      "wfjsfw": 971,
      "wfzd": 183,
      "wfxj": 241,
      "wggkj": 397,
      "wggbyt": 168,
      "wfspfw": 1029,
      "wfydsp": 277,
      "wfghsp": 251,
      "wfjssp": 376,
      "wfjyxk": 125,
      "yzz": 955,
      "zzz": 168,
      "dzz": 856,
      "qbcc": 92,
      "bbsx": 357,
      "ms": 126,
      "fk": 201,
      "bfcc": 132,
      "qtwfjscc": 47,
      "fwList": [{
        "regionName": "历下区",
        "clsl": 955
      }],
      "wfjsYhfwzs": 2000
    }
  })
};
//各行政区结构安全鉴定列表
export function getlistStructuralDetail(params) {
    //console.log("dm:"+params.xzqdm);
  // return request({
  //     url:'/risk/appraisal/onePicture/listStructuralDetail',
  //     method: 'post',
  //     data: params
  // });
  return Promise.resolve({
    "success": true,
    "message": "查询成功",
    "content": {
      "total": params.xzqdm=="370100"?10827:1285,
      "fwList": params.xzqdm=="370100"?[{
      //   "regionName": "全市",
      //   "regionNum": "370100",
      //   "jdsl": 1530,
      //   "wfsl": 1392,
      //   "zzsl":826
      // },{
        regionName: '历下区',
        "regionNum": "370102",
        "jdsl": 143,
        "wfsl": 189,
        "zzsl":115
      }, {
        regionName: '市中区',
        "regionNum": "370103",
        "jdsl": 101,
        "wfsl": 107,
        "zzsl":82
      }, {
        regionName: '槐荫区',
        "regionNum": "370104",
        "jdsl": 96,
        "wfsl": 89,
        "zzsl":63
      }, {
        regionName: '天桥区',
        "regionNum": "370105",
        "jdsl": 59,
        "wfsl": 67,
        "zzsl":39
      }, {
        regionName: '历城区',
        "regionNum": "370112",
        "jdsl": 143,
        "wfsl": 125,
        "zzsl":68
      }, {
        regionName: '长清区',
        "regionNum": "370113",
        "jdsl": 172,
        "wfsl": 91,
        "zzsl":52
      }, {
        regionName: '章丘区',
        "regionNum": "370114",
        "jdsl": 88,
        "wfsl": 69,
        "zzsl":41
      }, {
        regionName: '济阳区',
        "regionNum": "370115",
        "jdsl": 93,
        "wfsl": 133,
        "zzsl":92
      }, {
        regionName: '莱芜区',
        "regionNum": "370116",
        "jdsl": 105,
        "wfsl": 53,
        "zzsl":23
      }, {
        regionName: '钢城区',
        "regionNum": "370117",
        "jdsl": 93,
        "wfsl": 127,
        "zzsl":81
      }, {
        regionName: '平阴县',
        "regionNum": "370124",
        "jdsl": 54,
        "wfsl": 94,
        "zzsl":58
      }, {
        regionName: '商河县',
        "regionNum": "370126",
        "jdsl": 162,
        "wfsl": 48,
        "zzsl":34
      }, {
        regionName: '济南高新技术产业开发区',
        "regionNum": "370171",
        "jdsl": 171,
        "wfsl": 49,
        "zzsl":21
      }, {
        regionName: '济南新旧动能转换先行区',
        "regionNum": "370172",
        "jdsl": 50,
        "wfsl": 151,
        "zzsl":57
      }]:[{
        "regionName": "历下区",
        "regionNum": "370102",
        "jdsl": 143,
        "wfsl": 189,
        "zzsl":115
      }]
    }
  })
};
// 行政区划房屋整治情况
export function getqueryXzqhZzStatistics(params) {
    //console.log("dm:"+params.xzqdm);
  // return request({
  //     url:'/risk/appraisal/onePicture/queryXzqhZzStatistics',
  //     method: 'post',
  //     data: params
  // });
  if (params.appraisalType == 2) return Promise.resolve({
    "success": true,
    "message": "查询成功",
    "content": {
      "total": params.xzqdm=="370100"?17201:1052,
      "fwList":params.xzqdm=="370100"?[{
        clsl: 758,
        regionName: '历下区'
      }, {
        clsl: 736,
        regionName: '市中区'
      }, {
        clsl: 420,
        regionName: '槐荫区'
      }, {
        clsl: 512,
        regionName: '天桥区'
      }, {
        clsl: 740,
        regionName: '历城区'
      }, {
        clsl: 611,
        regionName: '长清区'
      }, {
        clsl: 417,
        regionName: '章丘区'
      }, {
        clsl: 316,
        regionName: '济阳区'
      }, {
        clsl: 537,
        regionName: '莱芜区'
      }, {
        clsl: 392,
        regionName: '钢城区'
      }, {
        clsl: 311,
        regionName: '平阴县'
      }, {
        clsl: 215,
        regionName: '商河县'
      }, {
        clsl: 403,
        regionName: '济南高新技术产业开发区'
      }, {
        clsl: 215,
        regionName: '济南新旧动能转换先行区'
      }]:[{
        regionName:"历下区",
        clsl:758,
        bar:"0.15"
    }]
    }
  })
  if (params.appraisalType == 5) return Promise.resolve({
    "success": true,
    "message": "查询成功",
    "content": {
      "total": params.xzqdm=="370100"?20292:2000,
      "fwList": params.xzqdm=="370100"?[{
        clsl: 955,
        regionName: '历下区'
      }, {
        clsl: 596,
        regionName: '市中区'
      }, {
        clsl: 710,
        regionName: '槐荫区'
      }, {
        clsl: 1016,
        regionName: '天桥区'
      }, {
        clsl: 909,
        regionName: '历城区'
      }, {
        clsl: 812,
        regionName: '长清区'
      }, {
        clsl: 717,
        regionName: '章丘区'
      }, {
        clsl: 608,
        regionName: '济阳区'
      }, {
        clsl: 572,
        regionName: '莱芜区'
      }, {
        clsl: 396,
        regionName: '钢城区'
      }, {
        clsl: 624,
        regionName: '平阴县'
      }, {
        clsl: 313,
        regionName: '商河县'
      }, {
        clsl: 607,
        regionName: '济南高新技术产业开发区'
      }, {
        clsl: 533,
        regionName: '济南新旧动能转换先行区'
      }]:[{
        regionName:"历下区",
        clsl:955,
        bar:"0.49"
    }]
    }
  })
};
