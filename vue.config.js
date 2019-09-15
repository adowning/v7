// vue.config.js
const ICONS_DIR = 'build/icons'

module.exports = {
	pluginOptions: {
		electronBuilder: {
			// chainWebpackMainProcess: config => {
			// 	// Chain webpack config for electron main process only
			// },
			chainWebpackRendererProcess: config => {
				// Chain webpack config for electron renderer process only
				// The following example will set IS_ELECTRON to true in your app
				config.plugin('define').tap(args => {
					args[0]['IS_ELECTRON'] = true
					return args
				})
			},
			builderOptions: {
				asar: true,
				productName: 'andrews-app',
				appId: 'com.groupandrews.andrews-app',
				artifactName: 'andrews-app-${version}.${ext}',
				// default files: https://www.electron.build/configuration/contents

				linux: {
					icon: ICONS_DIR,
					category: 'Network',
					publish: ['github'],
					target: [
						{
							target: 'deb',
							arch: ['x64'],
						},
						{
							target: 'AppImage',
							arch: ['x64'],
						},
					],
					// target: ['deb', 'AppImage'],
					packageCategory: 'Network',
					// mimeTypes: ['tel'],
					// desktop: 'andrews-app',
					// protocols: [
					// 	{
					// 		name: 'Andrews Protocol',
					// 		schemes: ['andapp', 'andrews'],
					// 	},
					// 	{
					// 		name: 'Telephone Protocol',
					// 		schemes: ['tel'],
					// 	},
					// ],
					// snap: {
					//     confinement: "classic",
					// },
					// afterInstall: 'build/postinst',
					// beforeInstall: 'build/prerm',
				},

				// protocols: [
				// 	{
				// 		name: 'Andrews Protocol',
				// 		schemes: ['andapp', 'andrews'],
				// 	},
				// 	{
				// 		name: 'Telephone Protocol',
				// 		schemes: ['tel'],
				// 	},
				// ],

				// files: [
				//     'dist/electron/**/*'
				// ],
			},
		},
	},
}
// module.exports = {
//     publicPath:
//         process.env.NODE_ENV === "production" ? "/vue-parse-example/" : "/",
//         pluginOptions: {
//             electronBuilder: {
//             "productName": "Your App Name",
//             "appId": "com.groupandrews.adminapp",
//             "publish": {
//               "provider": "github"
//             },
//             "directories": {
//               "output": "build"
//             },
//             "files": [
//               "dist/electron/**/*"
//             ],
//             "win": {
//               "icon": "build/icons/icon.ico",
//               "target": "squirrel"
//             },
//             "linux": {
//               "artifactName": "${productName}-${version}-${arch}.${ext}",
//               "icon": "build/icons"
//             },
//             "squirrelWindows": {
//               "iconUrl": "https://yourServer/app/icon.ico"
//             }
//           },
//         }
// };
