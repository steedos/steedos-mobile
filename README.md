# Steedos 手机客户端

## 参考 

https://developers.mattermost.com/contribute/mobile/build-your-own/preparation/

## 初始化 mattermost-mobile

在mac上执行以下命令

```bash
git clone https://github.com/mattermost/mattermost-mobile
git checkout release-1.27 # 最新版本分支
cd mattermost-mobile
yarn
pod repo update
make pre-run
make ios
```

如果报 mattemost-redux 错误，可能是因为包没编译

```bash
cd node_modules/mattermost-redux
yarn
```

## OEM

```bash
cp -r ./mattermost-mobile/assets/override ../mattermost-mobile/assets/override
cp ./mattermost-mobile/fastlane/.env ../mattermost-mobile/fastlane/.env

```

## 编译 ios

```bash
make build-ios
```