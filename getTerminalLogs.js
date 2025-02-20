const fs = require('fs')
const path = require('path')

const LINES_TO_READ = 100

module.exports = async ({ directoryPath }) => {
  try {
    const logFilePath = path.resolve(directoryPath, 'logs/dev.log')
    const fileContent = await fs.promises.readFile(logFilePath, 'utf8')
    const allLines = fileContent.split('\n')
    const lastLines = allLines.slice(-LINES_TO_READ).join('\n')

    // Empty the file content
    await fs.promises.writeFile(logFilePath, '', 'utf8')

    return lastLines
  } catch (err) {
    console.log(err.message)
  }
}
