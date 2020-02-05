# Steedos React Native

## 要求
- ruby >= 2.4

## 运行

### 在mac上执行以下命令

```
> yarn
> cd ios
> pod install
> cd ..
> react-native run-ios
```

## 注意
ios 下如果 yarn add 的node_module需要 pod install 。请在yarn add 后， 进入pod install ,再次之前不要启动项目，否则会出现一些奇怪的问题. 如果pod install后，启动项目报错（error code 65）, 并且没有其他明显错误信息， 可以尝试先删除build文件夹（从回收站也删除）后， 再启动项目。