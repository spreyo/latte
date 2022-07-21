const {app, BrowserWindow, ipcMain, Notification} = require('electron');
const path = require('path');
const { pathToFileURL } = require('url');

const isDev = !app.isPackaged;
const {PythonShell} =  require('python-shell');
const child = require('child_process').execFile;




function createWindow(){
    const win = new BrowserWindow({
        width: 700,
        height: 500,
        frame:false,
        transparent:true,
        hasShadow: true,
        webPreferences:{
            nodeIntegration: true,
            worldSafeExecuteJavaScript: true,
            contextIsolation: true,
            enableRemoteModule: true,
            preload: path.join(__dirname, 'preload.js')
        }
    })


    PythonShell.run('./dependencies.py', undefined, (err,results)=>{
        console.log(results)
    })
    
    ipcMain.on('ping', (e, message)=>{
        // PythonShell.run('./ping.py', undefined, (err,results)=>{
        //     e.sender.send('pingResponse', results[0])
        // })
        var exePath = path.resolve(__dirname, './ping.exe')
        child(exePath, function(err,data){
            if(err){
                console.log(err)
                return
            }
            e.sender.send('pingResponse', data.toString());
        })
    })

    ipcMain.on('quit', (e,message)=>{
        app.quit();
    })

    ipcMain.on('minimize', (e,message)=>{
        win.minimize();
    })

    win.loadFile('index.html');
}


if(isDev) {
    require('electron-reload')(__dirname, { 
        electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
    })

}

ipcMain.on('notify', (event, message)=>{
    new Notification({title:'Notification', body:message}).show();
})

app.whenReady().then(createWindow);