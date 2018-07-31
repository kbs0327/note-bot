var fs = require('fs');
var _ = require('lodash');
const FOLDER = 'note/'

exports.append = function (fileName, text) {
    var content = loadSync(fileName)
    saveSync(fileName, `${content ? content + '\n' : ''}${text.replace(/\n/g, '\\n')}`)
}

exports.list = function (fileName) {
    var content = loadSync(fileName)
    var textList = content.split('\n');
    return _.map(textList, (text, idx) => `${idx + 1}. ${text.replace(/\\n/g, '\n')}`).join('\n');
}

function isExists(fileName) {
    return fs.existsSync(FOLDER + fileName)
}

function loadSync(fileName) {
    return isExists(fileName) ? fs.readFileSync(FOLDER + fileName, 'utf8') : ''
}

function saveSync(fileName, content) {
    fs.writeFileSync(FOLDER + fileName, content, 'utf8')
}