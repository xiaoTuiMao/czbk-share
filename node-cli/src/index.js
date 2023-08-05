
const path = require('path');
const fs = require('fs');
const UglifyJS = require('uglify-js');

const handleError = (msg) => {
  console.error(`Error: ${msg}`);
  process.exit(1);
}
const rootPath = process.cwd();
/**
 * 1. 通过上一步获取的文件名，解析出当前文件类型
 * 2. 根据不同的文件类型采用不同的压缩工具
 * @param {string} filePath
 */
const minifyFile = (filePath) => {
  console.log(`正在压缩文件: ${filePath}`);
  const extname = path.extname(filePath);

  if (extname === '.js') {
    // 读取文件
    const code = fs.readFileSync(path.resolve(rootPath, filePath));
    const result = UglifyJS.minify(code.toString());
    if(result.error) {
      handleError(result.error);
      return;
    }
    // 输出压缩文件
    const distFilePath = path.resolve(rootPath, `mini-${filePath}`);
    fs.writeFileSync(distFilePath, result.code, { encoding: 'utf-8' });
    console.log(`文件压缩成功，压缩文件地址为：${distFilePath}`);
    return;
  }
  console.error(`Error: 当前不支持后缀名为 ${extname} 的文件处理`);
  process.exit(1);
}
const main = (commandName, filePath) => {
  switch(commandName){
    case 'minify': minifyFile(filePath); return;
    default: console.error('该命令未注册')
  }
}

main(process.argv[2], process.argv[3])