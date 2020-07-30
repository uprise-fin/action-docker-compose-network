const core = require('@actions/core')
const yaml = require('yaml')
const fs = require('fs')

try {
  const composeFilePath = core.getInput('compose-file')
  const networkName = core.getInput('network-name')

  let compose
  let composeFile

  try {
    composeFile = fs.openSync(composeFilePath, 'r')
    compose = yaml.parse(fs.readSync(composeFilePath))
    const network = core.getState('job.container.network')
    compose['networks'][networkName] = {'external': true, 'name': network}
  } finally {
    fs.closeSync(composeFile)
  }

  try {
    composeFile = fs.openSync(composeFilePath, 'w')
    fs.writeSync(composeFile, yaml.stringify(compose))
  } finally {
    fs.closeSync(composeFile)
  }

} catch(error) {
  score.setFiled(error.message)
}

