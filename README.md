# Steedos 手机客户端

## 参考 

https://developers.mattermost.com/contribute/mobile/build-your-own/preparation/

## 初始化 mattermost-mobile

在mac上执行以下命令

```bash
git clone https://github.com/steedos/mattermost-mobile
git checkout steedos-1.27 # 最新版本分支
cd mattermost-mobile
yarn
pod repo update
make pre-run
make run-ios
```

如果报 mattemost-redux 错误，可能是因为包没编译

```bash
cd node_modules/mattermost-redux
yarn
```
## 在 mattermost-mobile 中使用 @steedos/react-native

```bash
cd mattermost-mobile
yarn add file:../steedos-mobile/steedosNative
```

- 【初始化】修改 mattermost-mobile/app/actions/navigation/index.js 文件
    - ```javascript 
      import steedosInit from '@steedos/react-native'
        ```
    - 在 `resetToChannel` 函数最后一行添加初始化代码 
        ```javascript 
        steedosInit(store.getState().entities?.general?.config?.AboutLink, true);
        ```
- 【更换右上角more图标为九宫格】修改 mattermost-mobile/app/screens/channel/channel_nav_bar/settings_drawer_button.js 文件
    - ```javascript 
      import { getSettingsIcon } from '@steedos/react-native'
        ```
    - 将 `render` 函数中 `name='md-more'` 修改为 `name={getSettingsIcon()}`
- 【替换右上角more图标点击事件】修改 mattermost-mobile/app/components/sidebars/drawer_layout.js 文件
    - ```javascript 
      import {canShowSteedosSettings, showSteedosSettings} from '@steedos/react-native' 
      ```
    - 在 `openDrawer` 函数的第一行添加代码 
        ```javascript
        if(!options.openSettingsDrawer && canShowSteedosSettings(this.props)){
            return showSteedosSettings({openSettings: this.openDrawer});
        }
        ```

## [手机端左下角的加号，点击后增加一个选项 视频会议 ，就是发起zoom会议] (https://github.com/steedos/mattermost-mobile/commit/874738133db6feb24b543f79ad3e44aa27845d4c)

## OEM

```bash
cp -r ./mattermost-mobile/assets/override ../mattermost-mobile/assets/override
cp ./mattermost-mobile/fastlane/.env ../mattermost-mobile/fastlane/.env

```

## 更换图标及签名等(fastlane)
```bash
sudo gem install fastlane
cd fastlane
fastlane ios replace_assets
fastlane android replace_assets 
```

## 编译 ios

```bash
make build-ios
```