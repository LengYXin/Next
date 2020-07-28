# Next

# 目录

| 文件   | 描述  具体逻辑看文件注释 |
| ------ | ------------------------ |
| admin  | Vue 项目                 |
| client | 业务同构                 |
| main   | 微前端主界面             |
| react  | react 项目               |
| weapp  | 小程序                   |
| www    | pc 站点 vue              |
# 启动顺序
* 先启动 dev 这是 主界面 主要是端口原因。npm run dev
* 然后 admin 或者 react 都行 命令根 package 已经配置 npm run dev:admin | npm run dev:react
* main 注册 文件 在 packages/main/register.tsx 配置 vue&react 地址端口