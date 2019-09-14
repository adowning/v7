module.exports = {
    publicPath:
        process.env.NODE_ENV === "production" ? "/vue-parse-example/" : "/",
        pluginOptions: {
            electronBuilder: {
            "productName": "Your App Name",
            "appId": "com.groupandrews.adminapp",
            "directories": {
              "output": "build"
            },
            "files": [
              "dist/electron/**/*"
            ],
            "win": {
              "icon": "build/icons/icon.ico",
              "target": "squirrel"
            },
            "linux": {
              "artifactName": "${productName}-${version}-${arch}.${ext}",
              "icon": "build/icons"
            },
            "squirrelWindows": {
              "iconUrl": "https://yourServer/app/icon.ico"
            }
          },
        }
};
