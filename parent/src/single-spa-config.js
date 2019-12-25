// single-spa-config.js
import * as singleSpa from 'single-spa'; //导入single-spa
import axios from 'axios'
/*
* runScript：一个promise同步方法。可以代替创建一个script标签，然后加载服务
* */

const runScript = async (url) => {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = url;
        script.onload = resolve;
        script.onerror = reject;
        const firstScript = document.getElementsByTagName('script')[0];
        firstScript.parentNode.insertBefore(script, firstScript);
    });
};

/*
* getManifest：远程加载manifest.json 文件，解析需要加载的js
* url: manifest.json 链接
* bundle：entry名称
* */
const getManifest = (url, bundle) => new Promise(async (resolve) => {
    const { data } = await axios.get(url);
    // eslint-disable-next-line no-console
    const { entrypoints, publicPath } = data;
    const assets = entrypoints[bundle].assets;
    for (let i = 0; i < assets.length; i++) {
        await runScript(publicPath + assets[i]).then(() => {
            if (i === assets.length - 1) {
                resolve()
            }
        })
    }
});

singleSpa.registerApplication( //注册微前端服务
    'singleDemo', 
    async () => {
        if (process.env.NODE_ENV === 'development') {
            await runScript('http://127.0.0.1:3000/js/chunk-vendors.js');
            await runScript('http://127.0.0.1:3000/js/app.js'); 
            return window.singleVue;
        } else {
            let singleVue = null;
            await getManifest('http://127.0.0.1:3000/manifest.json', 'app').then(() => {
                singleVue = window.singleVue;
            });
            return singleVue;        
        }
       
    },
    location => location.pathname.startsWith('/vue-antd') // 配置微前端模块前缀
);

singleSpa.registerApplication(
    'elementVue',
    async () => {
        if (process.env.NODE_ENV === 'development') {
            await runScript('http://127.0.0.1:3001/js/chunk-vendors.js');
            await runScript('http://127.0.0.1:3001/js/app.js'); 
            return window.elementVue;
        } else {
            let elementVue = null;
            await getManifest('http://127.0.0.1:3001/manifest.json', 'app').then(() => {
                elementVue = window.elementVue;
            });
            return elementVue;        
        }
    },
    location => location.pathname.startsWith('/vue-element')
);


singleSpa.start(); // 启动
