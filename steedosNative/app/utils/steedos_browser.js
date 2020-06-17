import OpenFile from 'react-native-doc-viewer';
import RNFetchBlob from 'rn-fetch-blob';
import {DeviceTypes} from 'app/constants/';
import mattermostBucket from 'app/mattermost_bucket';
import {
    Alert,
    NativeModules,
    NativeEventEmitter,
    Platform,
    StatusBar,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import {goToScreen} from 'app/actions/navigation';
const mimeDB = require('mime-db');
const {DOCUMENTS_PATH} = DeviceTypes;

const TEXT_PREVIEW_FORMATS = [
    'application/json',
    'application/x-x509-ca-cert',
    'text/plain',
];

function showDownloadFailedAlert(context){
    const {intl} = context;
    Alert.alert(
        intl.formatMessage({
            id: 'mobile.downloader.failed_title',
            defaultMessage: 'Download failed',
        }),
        intl.formatMessage({
            id: 'mobile.downloader.failed_description',
            defaultMessage: 'An error occurred while downloading the file. Please check your internet connection and try again.\n',
        }),
        [{
            text: intl.formatMessage({
                id: 'mobile.server_upgrade.button',
                defaultMessage: 'OK',
            }),
        }]
    );
}

function  openDocument(file, context, delay = 2000){
    // The animation for the progress circle takes about 2 seconds to finish
    // therefore we are delaying the opening of the document to have the UI
    // shown nicely and smooth
    setTimeout(async () => {
        const {data} = file;
        const prefix = Platform.OS === 'android' ? 'file:/' : '';
        const path = `${DOCUMENTS_PATH}/${data.id}-${file.caption}`;
        let textPreview = false;
        if(data.mime_type){
            const mime = data.mime_type.split(';')[0];
            if (TEXT_PREVIEW_FORMATS.includes(mime)) {
                textPreview = true;
            }
        }
        if(textPreview){
            try {
                const readFile = RNFetchBlob.fs.readFile(`${prefix}${path}`, 'utf8');
                const content = await readFile;
                const screen = 'TextPreview';
                const title = file.caption;
                const passProps = {
                    content,
                };
                goToScreen(screen, title, passProps);
            } catch (error) {
                RNFetchBlob.fs.unlink(path);
            }
        }else{
            OpenFile.openDoc([{
                url: `${prefix}${path}`,
                fileNameOptional: file.caption,
                fileName: encodeURI(data.name.split('.').slice(0, -1).join('.')),
                fileType: data.extension,
                cache: false,
            }], (error, url) => {
                if (error) {
                    const {intl} = context;
                    Alert.alert(
                        intl.formatMessage({
                            id: 'mobile.document_preview.failed_title',
                            defaultMessage: 'Open Document failed',
                        }),
                        intl.formatMessage({
                            id: 'mobile.document_preview.failed_description',
                            defaultMessage: 'An error occurred while opening the document. Please make sure you have a {fileType} viewer installed and try again.\n',
                        }, {
                            fileType: data.extension.toUpperCase(),
                        }),
                        [{
                            text: intl.formatMessage({
                                id: 'mobile.server_upgrade.button',
                                defaultMessage: 'OK',
                            }),
                        }]
                    );
                    RNFetchBlob.fs.unlink(path);
                }
            });
        }
        // Android does not trigger the event for DoneButtonEvent
        // so we'll wait 4 seconds before enabling the tap for open the preview again
        // if (Platform.OS === 'android') {
        //     setTimeout(onDonePreviewingFile, 4000);
        // }
    }, delay);
};

export async function downloadAndPreviewFile(file, options){
    let defCaption = 'data.temp'
    const {data} = file;
    const path = `${DOCUMENTS_PATH}/${data.id}-${file.caption || defCaption}`;

    try {
        const certificate = await mattermostBucket.getPreference('cert');
        const isDir = await RNFetchBlob.fs.isDir(DOCUMENTS_PATH);
        if (!isDir) {
            try {
                await RNFetchBlob.fs.mkdir(DOCUMENTS_PATH);
            } catch (error) {
                showDownloadFailedAlert(options.context);
                return;
            }
        }

        const options = {
            session: data.id,
            timeout: 10000,
            indicator: true,
            overwrite: true,
            path,
            certificate,
        };

        // const mime = data.mime_type.split(';')[0];
        // let openDocument = this.openDocument;
        // if (TEXT_PREVIEW_FORMATS.includes(mime)) {
        //     openDocument = this.previewTextFile;
        // }

        const exist = await RNFetchBlob.fs.exists(path);
        if (file.caption && file.data.extension && exist) {
            openDocument(file, options.context, 0);
        } else {
            let downloadTask = RNFetchBlob.config(options).fetch('GET', file.url);
            // downloadTask.progress((received, total) => {
            //     const progress = (received / total) * 100;
            //     this.setState({progress});
            // });
            
            let resp = await downloadTask;
            file.data.mime_type = resp.respInfo.headers["Content-Type"]
            if(!file.data.extension){
                let fileExtensions = mimeDB[resp.respInfo.headers["Content-Type"]].extensions
                if(fileExtensions.length > 0){
                    file.data.extension = fileExtensions[0]
                }
            }

            if(!file.caption){
                file.caption = file.data.id + '.' +  file.data.extension
                file.data.name = file.caption
                const exist = await RNFetchBlob.fs.exists(`${DOCUMENTS_PATH}/${data.id}-${file.caption}`);
                if(exist){
                    openDocument(file, options.context);
                    return;
                }else{
                    if(Platform.OS === 'android'){
                        await RNFetchBlob.fs.mv(path, `${DOCUMENTS_PATH}/${data.id}-${file.caption}`)
                    }else{
                        await RNFetchBlob.fs.cp(path, `${DOCUMENTS_PATH}/${data.id}-${file.caption}`);
                        await RNFetchBlob.fs.unlink(path);
                    }
                }
            }
            openDocument(file, options.context);
        }
    } catch (error) {
        RNFetchBlob.fs.unlink(path);
        if (error.message !== 'cancelled') {
            showDownloadFailedAlert(options.context);
        }
    }
}

