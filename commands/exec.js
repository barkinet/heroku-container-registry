var child = require('child_process');
var fs = require('fs');
var path = require('path');
var docker = require('../lib/docker');
var directory = require('../lib/directory');

module.exports = function(topic) {
  return {
    topic: topic,
    command: 'exec',
    description: 'run command in development Docker container',
    help: 'Run command in Docker container with the current working directory mounted',
    variableArgs: true,
    run: function(context) {
      var execImageId = docker.ensureExecImage(context.cwd);
      if (!execImageId) return;
      var command = context.args.join(' ');
      docker.runImage(execImageId, context.cwd, command, true);
    }
  };
};
