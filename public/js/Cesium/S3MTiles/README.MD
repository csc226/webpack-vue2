<!--
 * @Author: SnotlingLiu<snotlingliu@gmail.com/>
 * @Date: 2022-02-23 17:06:25
 * @LastEditors: SnotlingLiu<snotlingliu@gmail.com/>
 * @LastEditTime: 2022-03-01 15:48:23
 * @Description:
-->

# S3MB 数据自定义渲染

## version 1.1

## 开源库 github 地址: https://github.com/SuperMap/s3m-spec

## 对应开源版本号: 5f3f749ab093cf9979e25aaa037d408ad6b4d531

### 修改记录

1. Enum 文件夹

   - 将该文件夹中 S3MPixelFormat.js 合并到 Static 文件夹中的 S3MFormat.js 文件.
   - 将该文件夹中 ProgramDefines.js 和 VertexCompressOption.js 文件合并到 Static 文件夹中的 S3MMember.js 文件.
   - 将该文件夹中 InstanceMode.js 和 RangeMode.js 文件合并到 Static 文件夹中的 S3MMode.js 文件.
   - 将该文件夹中 ContentState.js 文件合并到 Static 文件夹中的 S3MState.js 文件.
   - 将该文件夹中 OperationType.js 和 CompressType.js 文件合并到 Static 文件夹中的 S3MType.js 文件.

2. Enum 文件夹


### 可能会存在的问题
1. 存在于S3MTile下的indexData目前使用的是单个索引数据