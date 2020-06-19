import { registerMicroApps, runAfterFirstMounted, setDefaultMountApp, start, initGlobalState } from 'qiankun';
export default () => {
    registerMicroApps(
        [
            {
                name: 'vue',
                entry: '//localhost:8080',
                container: '#subapp-viewport',
                // loader,
                activeRule: '/vue',
            },
        ],
        {
            //   beforeLoad: [
            //     app => {
            //       console.log('[LifeCycle] before load %c%s', 'color: green;', app.name);
            //     },
            //   ],
            //   beforeMount: [
            //     app => {
            //       console.log('[LifeCycle] before mount %c%s', 'color: green;', app.name);
            //     },
            //   ],
            //   afterUnmount: [
            //     app => {
            //       console.log('[LifeCycle] after unmount %c%s', 'color: green;', app.name);
            //     },
            //   ],
        },
    );
    start();
}