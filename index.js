const inquirer = require('inquirer');
const branch = require('git-branch');
const choices = require('./choices');

// This can be any kind of SystemJS compatible module.
// We use Commonjs here, but ES6 or AMD would do just
// fine.
module.exports = {
  prompter,
  formatCommit,
  formattBranch
};

// When a user runs `git cz`, prompter will
// be executed. We pass you cz, which currently
// is just an instance of inquirer.js. Using
// this you can ask questions and get answers.
//
// The commit callback should be executed when
// you're ready to send back a commit template
// to git.
//
// By default, we'll de-indent your commit
// template and will keep empty lines.
function prompter(cz, commit) {

  // Let's ask some questions of the user
  // so that we can populate our commit
  // template.
  //
  // See inquirer.js docs for specifics.
  // You can also opt to use another input
  // collection library if you prefer.
  inquirer.prompt([
    {
      type: 'input',
      name: 'issue',
      message: 'Jira Issue ID(s) (required):\n',
      default: formattBranch(branch.sync()),
      validate: function(input) {
        if (!input) {
          return 'Must specify issue IDs, otherwise, just use a normal commit message';
        } else {
          return true;
        }
      }
    },
    {
      type: 'list',
      name: 'type',
      message: 'Select the type of change that you\'re committing:',
      choices: choices
    },
    {
      type: 'input',
      name: 'scope',
      message: 'Denote the scope of this change ($location, $browser, $compile, etc.):\n',
      validate: function(input) {
        if (!input) {
          return 'empty scope';
        } else {
          return true;
        }
      }
    },
    {
      type: 'input',
      name: 'message',
      message: 'Commit message (required):\n',
      validate: function(input) {
        if (!input) {
          return 'empty commit message';
        } else {
          return true;
        }
      }
    }
  ]).then((answers) => {
    formatCommit(commit, answers);
  });
}

function formatCommit(commit, answers) {
  commit(filter([
    `[${answers.issue}]`,
    `${answers.type}(${answers.scope}):`,
    answers.message,
  ]).join(' '));
}

function filter(array) {
  return array.filter(function(item) {
    return !!item;
  });
}

function formattBranch(branch) {
  if (branch == undefined || branch == null) {
    return;
  }
  const keys = branch.split('-'); // bugfix/ABC-1192-my-new-branch
  return keys.length >= 1 ? `${keys[0].split('/').pop()}-${keys[1]}` : undefined ; // ABC-1199
}