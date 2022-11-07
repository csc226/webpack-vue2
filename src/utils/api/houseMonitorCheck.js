import request from '@/utils/tools/request';

// 逾期巡查房屋
export function getOverdueHouse(data) {
  //console.log(data.regionCode);
  return Promise.resolve({
    "success": true,
    "message": "",
    "content": data.regionCode=="370100"?{
        "inspectHouseTotal": 3892,
        "timeoutTotal": 453,
        "inspectHouseDay": 140,
        "timeoutDay": 7,
        "inspectHouseWeek": 700,
        "timeoutWeek": 34,
        "inspectHouseHalfMon": 1550,
        "timeoutHalfMon": 20,
        "inspectHouseMonth": 3100,
        "timeoutMonth": 43
      }:{
      "inspectHouseTotal": 436,
      "timeoutTotal": 20,
      "inspectHouseDay": 10,
      "timeoutDay": 0,
      "inspectHouseWeek": 50,
      "timeoutWeek": 2,
      "inspectHouseHalfMon": 110,
      "timeoutHalfMon": 3,
      "inspectHouseMonth": 220,
      "timeoutMonth": 4
    }
  })
  request({
    url: '/risk/inspect/rhmaic/overdueHouseInspection',
    method: 'get',
    params: {
      ...data
    }
  });
}

// 经营性房屋鉴定到期提醒
export function getOperatingHouse(data) {
  //console.log(data.regionCode);
  // return request({
  //     url: '/risk/inspect/rhmaic/operatingHousingExpires',
  //     method: 'get',
  //     params: { ...data }
  // });
  return Promise.resolve({
    "success": true,
    "message": "",
    "content": data.regionCode=="370100"?{
      "safetyTimeout": 230,
      "justForBusiness": 137,
      "businessAndOwned": 93
    }:{
        "safetyTimeout": 32,
        "justForBusiness": 13,
        "businessAndOwned": 19
      }
  })
}

// 使用年限提醒
export function getServiceLife(data) {
  //console.log(data.regionCode);
  // return request({
  //     url: '/risk/inspect/rhmaic/serviceLifeReminder',
  //     method: 'get',
  //     params: { ...data }
  // });
  return Promise.resolve({
    "success": true,
    "message": "",
    "content": data.regionCode=="370100"?{
      "total": 880498,
      "moreThan50": 137,
      "range40To50": 372,
      "range30To40": 4773,
      "range20To30": 126380,
      "lessThan20":  737869,
      "otherBuildTimeIsNull": 10967
    }:{
        "total": 102107,
        "moreThan50": 16,
        "range40To50": 59,
        "range30To40": 857,
        "range20To30": 3362,
        "lessThan20":  95078,
        "otherBuildTimeIsNull": 2735
      }
  })
}

// 使用年限提醒-房屋用途数量统计
export function getHouseFwytTypeCount(data) {
  //console.log(data.regionCode);
  // return request({
  //     url: '/risk/inspect/rhmaic/houseFwytTypeCount',
  //     method: 'get',
  //     params: { ...data }
  // });
  if (data.type == 5) return Promise.resolve({
    "success": true,
    "message": "",
    "content": data.regionCode=="370100"?{
        "justForBusiness":  189830,
        "businessAndOwned": 332795,
        "otherTypeHouse": 357873
      }:{//102107
      "justForBusiness": 25936,
      "businessAndOwned": 35752,
      "otherTypeHouse": 40419
    }
  })
}

// 巡查任务执行成果
export function getTaskResult(data) {
    // let queryType=label=="累计"?0:label=="今日"?1:label=="近一周"?2:label=="近半月"?3:4
  //console.log(data.regionCode);
  let result=null;
  switch (data.queryType) {
    case 0://累计
        result={
            "success": true,
            "message": "",
            "content": data.regionCode=="370100"?{
              "total": 323,
              "normalNum": 320,
              "normalPercent": 99.1,   
              "errorNum": 28,
              "errorPercent": 0.9,
              "waitProcessed": 7,
              "waitProcessedPercent": 25.0,
              "inProcessing": 5,
              "inProcessingPercent": 17.9,
              "processedEnd": 16,
              "processedEndPercent": 57.1
            }:{
                "total": 28,
                "normalNum": 25,
                "normalPercent": 89.2,   
                "errorNum": 3,
                "errorPercent": 10.8,
                "waitProcessed": 0,
                "waitProcessedPercent": 0.0,
                "inProcessing": 0,
                "inProcessingPercent": 0.0,
                "processedEnd": 3,
                "processedEndPercent": 100.0
              }
          }
        break;
    case 1://当日
        result={
            "success": true,
            "message": "",
            "content": data.regionCode=="370100"?{
              "total": 14,
              "normalNum": 14,
              "normalPercent": 100,   
              "errorNum": 0,
              "errorPercent": 0.0,
              "waitProcessed": 0,
              "waitProcessedPercent": 0.0,
              "inProcessing": 0,
              "inProcessingPercent": 0.0,
              "processedEnd": 0,
              "processedEndPercent": 0.0
            }:{
                "total": 1,
                "normalNum": 1,
                "normalPercent": 100.0,   
                "errorNum": 0,
                "errorPercent": 0.0,
                "waitProcessed": 0,
                "waitProcessedPercent": 0.0,
                "inProcessing": 0,
                "inProcessingPercent": 0.0,
                "processedEnd": 0,
                "processedEndPercent": 0.0
              }
          }
        break;
    case 2://周
        result={
            "success": true,
            "message": "",
            "content": data.regionCode=="370100"?{
              "total": 70,
              "normalNum": 62,
              "normalPercent": 89.9,   
              "errorNum": 8,
              "errorPercent": 10.1,
              "waitProcessed": 2,
              "waitProcessedPercent": 25.0,
              "inProcessing": 2,
              "inProcessingPercent": 25.0,
              "processedEnd": 4,
              "processedEndPercent": 50.0
            }:{
                "total": 5,
                "normalNum": 5,
                "normalPercent": 100.0,   
                "errorNum": 0,
                "errorPercent": 0.0,
                "waitProcessed": 0,
                "waitProcessedPercent": 0.0,
                "inProcessing": 0,
                "inProcessingPercent": 0.0,
                "processedEnd": 0,
                "processedEndPercent": 0.0
              }
          }
        break;
    case 3://半月
        result={
            "success": true,
            "message": "",
            "content": data.regionCode=="370100"?{
              "total": 140,
              "normalNum": 130,
              "normalPercent": 93.0,   
              "errorNum": 10,
              "errorPercent": 7.0,
              "waitProcessed": 4,
              "waitProcessedPercent": 40.0,
              "inProcessing": 3,
              "inProcessingPercent": 30.0,
              "processedEnd": 3,
              "processedEndPercent": 30.10
            }:{
                "total": 11,
                "normalNum": 10,
                "normalPercent": 91.0,   
                "errorNum": 1,
                "errorPercent": 9.0,
                "waitProcessed": 0,
                "waitProcessedPercent": 0.0,
                "inProcessing": 0,
                "inProcessingPercent": 0.0,
                "processedEnd": 1,
                "processedEndPercent": 100.0
              }
          }
        break;
    case 4:
        result={
            "success": true,
            "message": "",
            "content": data.regionCode=="370100"?{
              "total": 280,
              "normalNum": 262,
              "normalPercent": 90.0,   
              "errorNum": 28,
              "errorPercent": 10.0,
              "waitProcessed": 7,
              "waitProcessedPercent": 25.0,
              "inProcessing": 5,
              "inProcessingPercent": 17.9,
              "processedEnd": 16,
              "processedEndPercent": 57.1
            }:{
                "total": 22,
                "normalNum": 20,
                "normalPercent": 90.9,   
                "errorNum": 2,
                "errorPercent": 9.1,
                "waitProcessed": 0,
                "waitProcessedPercent": 0.0,
                "inProcessing": 0,
                "inProcessingPercent": 0.0,
                "processedEnd": 2,
                "processedEndPercent": 100.0
              }
          }
        break;
    default:
        result={
            "success": true,
            "message": "",
            "content": {
              "total": 1,
              "normalNum": 1,
              "normalPercent": 100.0,
              "errorNum": 0,
              "errorPercent": 0.0,
              "waitProcessed": 0,
              "waitProcessedPercent": 0.0,
              "inProcessing": 0,
              "inProcessingPercent": 0.0,
              "processedEnd": 0,
              "processedEndPercent": 0.0
            }
          }
        break;
}
  // return request({
  //     url: '/risk/inspect/rhmaic/inspectionTasksResult',
  //     method: 'get',
  //     params: { ...data }
  // });
  return Promise.resolve(result)
}

// 投诉申报问题处置
export function getComplaintProblem(data) {
    // let queryType=label=="累计"?0:label=="今日"?1:label=="近一周"?2:label=="近半月"?3:4
  //console.log(data.regionCode);
  // return request({
  //     url: '/risk/inspect/rhmaic/complaintProblemDisposal',
  //     method: 'get',
  //     params: { ...data }
  // });
  let result=null
  
  result={
    "success": true,
    "message": "",
    "content": data.regionCode=="370100"?{
        "waitProcessed": 2,
        "inProcessing": 4,
        "processedEndToal": 34,
        "processedEndWeek": 7,
        "processedEndMonth": 23
      }:{
        "waitProcessed": 2,
        "inProcessing": 3,
        "processedEndToal": 14,
        "processedEndWeek": 5,
        "processedEndMonth": 9
      }
  }
  return Promise.resolve(result)
}


// 新增自建房屋总数
export function getIncrementHouse(data) {
    // let queryType=label=="累计"?0:label=="今日"?1:label=="近一周"?2:label=="近半月"?3:4
  //console.log(data.regionCode);
  let result={
    "success": true,
    "message": "",
    "content": data.regionCode=="370100"?{
      "newBuildHouseTotal": 1037,
      "safetyHouse": 1021,
      "suspectedDangerHouse": 16
    }:{
        "newBuildHouseTotal": 83,
        "safetyHouse": 81,
        "suspectedDangerHouse": 2
      }
  }
  // return request({
  //     url: '/risk/inspect/rhmaic/incrementOfHouse',
  //     method: 'get',
  //     params: { ...data }
  // });
  return Promise.resolve(result)
}

// 巡查任务执行成果
export function getInspectionTasks(data) {
    // let queryType=label=="累计"?0:label=="今日"?1:label=="近一周"?2:label=="近半月"?3:4
  //console.log(data.regionCode);
  // return request({
  //     url: '/risk/inspect/rhmaic/inspectionTasksResult',
  //     method: 'get',
  //     params: { ...data }
  // });
  return Promise.resolve({
    "success": true,
    "message": "",
    "content": {
      "total": 1,
      "normalNum": 1,
      "normalPercent": 100.0,
      "errorNum": 0,
      "errorPercent": 0.0,
      "waitProcessed": 0,
      "waitProcessedPercent": 0.0,
      "inProcessing": 0,
      "inProcessingPercent": 0.0,
      "processedEnd": 0,
      "processedEndPercent": 0.0
    }
  })

}

// 投诉申报问题处置
export function getTaskProblem(data) {
  //console.log(data.regionCode+'sssssss');
//   let queryType=label=="累计"?0:label=="今日"?1:label=="近一周"?2:label=="近半月"?3:4
  // return request({
  //     url: '/risk/inspect/rhmaic/complaintProblemDisposal',
  //     method: 'get',
  //     params: { ...data }
  // });
  let result=null
  
  result={
    "success": true,
    "message": "",
    "content": data.regionCode=="370100"?{
        "waitProcessed": 2,
        "inProcessing": 4,
        "processedEndToal": 34,
        "processedEndWeek": 7,
        "processedEndMonth": 23
      }:{
        "waitProcessed": 2,
        "inProcessing": 3,
        "processedEndToal": 14,
        "processedEndWeek": 5,
        "processedEndMonth": 9
      }
  }
  return Promise.resolve(result)

}

// 新增自建房屋总数
export function getNewAddHouse(data) {
  //console.log(data.regionCode);
  let result={
    "success": true,
    "message": "",
    "content": data.regionCode=="370100"?{
      "newBuildHouseTotal": 1037,
      "safetyHouse": 1021,
      "suspectedDangerHouse": 16
    }:{
        "newBuildHouseTotal": 83,
        "safetyHouse": 81,
        "suspectedDangerHouse": 2
      }
  }
  // return request({
  //     url: '/risk/inspect/rhmaic/incrementOfHouse',
  //     method: 'get',
  //     params: { ...data }
  // });
  return Promise.resolve(result)
}

// 巡查任务完成率
export function getTaskFinishRatio(data) {
  //console.log(data);
  //2:周 3：半月 4：一月 queryType
  // return request({
  //     url: '/risk/inspect/rhmaic/inspectTaskFinishRatio',
  //     method: 'get',
  //     params: { ...data }
  // });
  return Promise.resolve({
    "success": true,
    "message": "",
    "content": [{
      "regionCode": "370102",
      "regionName": "历下区",
      "total": 2,
      "finishNum": 1,
      "finishRatio": 50.0
    }]
  })
}

// 巡查任务逾期
export function getTaskOvertime(data) {
  //console.log(data);
  //2:周 3：半月 4：一月 queryType
  // return request({
  //     url: '/risk/inspect/rhmaic/inspectTaskOverTime',
  //     method: 'get',
  //     params: { ...data }
  // });
  return Promise.resolve({
    "success": true,
    "message": "",
    "content": [{
      "regionCode": "370102",
      "regionName": "历下区",
      "total": 2,
      "overTimeNum": 1,
      "overTimeRatio": 50.0
    }]
  })
}
