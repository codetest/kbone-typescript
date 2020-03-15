const fs = require('fs')
const path = require('path')
const distBasePath = "./dist/common/Images/";

class ImageProcessPlugin {
    constructor() {
        try{
            var folder = path.resolve("./dist/")
            if (!fs.existsSync(folder)){
                fs.mkdirSync(folder)
            }
            
            folder = path.resolve("./dist/", "miniprogram_npm")
            if (!fs.existsSync(folder)){
                fs.mkdirSync(folder)
            }

            folder = path.resolve("./dist/miniprogram_npm", "miniprogram-element")
            if (!fs.existsSync(folder)){
                fs.mkdirSync(folder)
            }

            folder = path.resolve("./dist/miniprogram_npm/miniprogram-element", "images")
            if (!fs.existsSync(folder)){
                fs.mkdirSync(folder)
            }

            var that = this
            fs.watch(path.resolve(distBasePath), {}, (event, filename) => {
                console.log("Executing ImageProcessPlugin")
                console.log(event, filename)
                try{
                    var fileList = []
                    that.readAllFiles(path.resolve(distBasePath), fileList)
                    for (var inx = 0; inx < fileList.length; ++inx) {
                        var file = fileList[inx]
                        var dist = file.replace("\\common\\", "\\miniprogram_npm\\miniprogram-element\\")
                        try{
                            fs.copyFileSync(file, dist)
                        }
                        catch(err){
                            console.log(err)
                        }
                    } 
                }   
                catch(err){
                }            
            })
        }
        catch(err){
            console.log(err)
        }
    }

    readAllFiles(filePath, fileList) {
        var that = this
        try {
            var files = fs.readdirSync(filePath)
            for (var inx = 0; inx < files.length; ++inx) {
                var file = path.resolve(filePath, files[inx])
                var stat = fs.statSync(file)
                if (stat.isFile()) {
                    fileList.push(file)
                }
                else if (stat.isDirectory()) {
                    that.readAllFiles(file, fileList);
                }
            }
        }
        catch(err) {
        }
    }

    clearFiles(path) {
        try {
            var files = fs.readdirSync(path)
            for (var inx = 0; inx < files.length; ++inx) {
                var file = path.resolve(filePath, files[inx])
                var stat = fs.statSync(file)
                if (stat.isFile()) {
                    fs.unlinkSync(file)
                }
                else if (stat.isDirectory()) {
                    this.clearFiles(file);
                }
            }
        }
        catch(err) {
        }
    }

    apply(compiler) {
    }
}

module.exports = ImageProcessPlugin;