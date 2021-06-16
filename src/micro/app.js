// 配置子系统文件，修改改文件，需要重启webpack
const subAppList = [
  {
    APP_NAME: 'subApp1',
    FE_ADDRESS: 'http://localhost:8084/subApp1',
    API_ADDRESS: '',
  },
  {
    APP_NAME: 'subApp2',
    FE_ADDRESS: 'http://localhost:8081/subApp2',
    API_ADDRESS: '',
  },
  {
    APP_NAME: 'subApp3',
    FE_ADDRESS: 'http://localhost:8082/subApp3',
    API_ADDRESS: '',
  },
  {
    APP_NAME: 'subApp4',
    FE_ADDRESS: 'http://localhost:8082/subApp4',
    API_ADDRESS: '',
  },
]

module.exports = subAppList
