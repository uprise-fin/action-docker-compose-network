const core = require('@actions/core')
const yaml = require('yaml')
const fs = require('fs')

try {
  const composeFilePath = core.getInput('compose-file')
  const networkName = core.getInput('network-name')

  const compose = yaml.parse(fs.readFileSync(composeFilePath, {
    encoding: "utf8"
  }))
  const network = core.getState('job.container.network')

  compose['networks'][networkName] = {'external': true, 'name': network}
  fs.writeFileSync(composeFilePath, yaml.stringify(compose))

  core.setOutput("network-name", network)

} catch(error) {
  core.setFailed(error.message)
}

