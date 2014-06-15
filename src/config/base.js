"use strict";


var path = require('path'),
  waigo = require('waigo');


module.exports = function(config) {
  // ------------- BEGIN EDITING --------------- //

  /** Path to Ansible binary */
  config.ansiblePlaybookBin = '/usr/local/bin/ansible-playbook';

  /** Path to folder containg Ansible playbooks */
  config.ansiblePlaybooks = path.join(__dirname, '..', '..', 'ansible', 'playbooks');

  /** Max no. of jobs to execute in parallel. Should match no. of CPU cores. */
  config.jobsInParallel = 1;

  // ------------- STOP EDITING --------------- //

  waigo.load('waigo:config/base')(config);

  config.db = {
    mongo: {
      host: '127.0.0.1',
      port: '27017',
      db: 'ansibot'
    }
  };

  config.middleware.order = [
    'errorHandler',
    'staticResources',
    'methodOverride',
    'outputFormats',
    'sessions'
  ];

  config.startupSteps = [
    'logging',
    'middleware',
    'database',
    'models',
    'routes',
    'setupTriggerTypes',
    'setupAnsible',
    'setupTemplateHelpers',
    'listener',
    'startJobProcessor'
  ];

  config.middleware.options.staticResources = {
    folder: '../frontend/build'
  };
};


