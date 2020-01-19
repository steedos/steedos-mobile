# Steedos 手机客户端

## 编译 mattermost-mobile

在mac上执行以下命令

```
git clone https://github.com/mattermost/mattermost-mobile
git checkout 最新版本分支
cd mattermost-mobile 
yarn 
pod repo update
make pre-run
make ios
```

如果报 mattemost-redux 错误，可能是因为包没编译

```
cd node_modules\mattermost-redux
yarn
```
