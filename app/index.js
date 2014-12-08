'use strict';

/**
 * Our Stormpath generator.
 */

var crypto = require('crypto');
var exec = require('child_process').exec;

var async = require('async');
var chalk = require('chalk');
var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
  initializing: function() {
    var self = this;
    var done = self.async();

    // Print a blank line for style.
    self.log('');

    self.herokuInstalled = false;
    self.useHeroku = false;

    async.parallel([

      // Check to see whether `git` is available.
      function(callback) {
        exec('git --version', function(err) {
          if (err) {
            throw new Error('You must have Git installed to use this generator. Please install Git and try again.');
          }
          callback();
        }.bind(self));
      },

      // Check to see whether `heroku` is available.
      function(callback) {
        exec('heroku --version', function (err) {
          if (!err) {
            self.herokuInstalled = true;
          }
          callback();
        }.bind(self));
      },

      // Check to see whether `npm` is available.
      function(callback) {
        exec('npm --version', function (err) {
          if (err) {
            throw new Error('You must have NPM installed to use this generator. Please install NPM and try again.');
          }
          callback();
        }.bind(self));
      }

    ], function() {
      done();
    });
  },
  prompting: function() {
    var done = this.async();

    // If `heroku` is available, ask the user whether or not they'd like to
    // deploy this app on Heroku.
    if (this.herokuInstalled) {
      this.prompt({
        type: 'confirm',
        name: 'value',
        message: 'Would you like to deploy your app to Heroku?',
        default: true,
      }, function(answer) {
        if (answer.value) {
          this.useHeroku = true;
        }
        done();
      }.bind(this));
    } else {
      done();
    }
  },
  configuring: function() {
    this.src.copy('.gitignore', '.gitignore');
    this.src.copy('package.json', 'package.json');

    if (this.useHeroku) {
      this.src.copy('Procfile', 'Procfile');
    }
  },
  writing: function() {
    this.src.copy('index.js', 'index.js');
    this.bulkDirectory('routes', 'routes');
  },
  install: function() {
    this.log(chalk.blue('\nInstalling NPM dependencies...'));
    this.npmInstall(['express', 'express-stormpath'], { save: true });
  },
  end: function() {
    var self = this;

    async.series([
      function(callback) {
        self.log(chalk.blue('\nInstalling Git repository...'));
        var cmd = self.spawnCommand('git', ['init']);
        cmd.on('close', function() {
          callback();
        });
      },
      function(callback) {
        self.log(chalk.blue('\nStaging project with Git...'));
        var cmd = self.spawnCommand('git', ['add', '--all']);
        cmd.on('close', function() {
          callback();
        });
      },
      function(callback) {
        self.log(chalk.blue('\nCommitting project to Git...'));
        var cmd = self.spawnCommand('git', ['commit', '-m', 'First Commit!']);
        cmd.on('close', function() {
          callback();
        });
      },
      function(callback) {
        if (self.useHeroku) {
          self.log(chalk.blue('\nCreating Heroku app...'));
          var cmd = self.spawnCommand('heroku', ['create']);
          cmd.on('close', function() {
            callback();
          });
        } else {
          callback();
        }
      },
      function(callback) {
        if (self.useHeroku) {
          self.log(chalk.blue('\nSetting Heroku environment variables...'));
          crypto.randomBytes(48, function(ex, buf) {
            var token = buf.toString('hex');
            var cmd = self.spawnCommand('heroku', ['config:set', 'STORMPATH_SECRET_KEY=' + token]);
            cmd.on('close', function() {
              callback();
            });
          });
        } else {
          callback();
        }
      },
      function(callback) {
        if (self.useHeroku) {
          self.log(chalk.blue('\nPushing your application to Heroku...'));
          var cmd = self.spawnCommand('git', ['push', 'heroku', 'master']);
          cmd.on('close', function() {
            callback();
          });
        } else {
          callback();
        }
      },
      function(callback) {
        if (self.useHeroku) {
          self.log(chalk.blue('\nAdding Stormpath\'s Heroku addon...'));
          var cmd = self.spawnCommand('heroku', ['addons:add', 'stormpath']);
          cmd.on('close', function() {
            callback();
          });
        } else {
          callback();
        }
      },
      function(callback) {
        if (self.useHeroku) {
          self.log(chalk.blue('\nStarting up a single Heroku dyno...'));
          var cmd = self.spawnCommand('heroku', ['scale', 'web=1']);
          cmd.on('close', function() {
            callback();
          });
        } else {
          callback();
        }
      },
    ], function() {
      self.log(chalk.green('\nYour Stormpath app is ready to go! Open up your ') + chalk.bold('index.js') + chalk.green(' file to get started.\n'));
      if (self.useHeroku) {
        self.log(chalk.blue('Anytime you make changes to your code and want to re-deploy your app to heroku, just run:\n'));
        self.log(chalk.bold('    git push heroku master\n'));
        self.log(chalk.blue('If you\'d like to open your Heroku app in your browser, just run:\n'));
        self.log(chalk.bold('    heroku open\n'));
      }
    });
  }
});
