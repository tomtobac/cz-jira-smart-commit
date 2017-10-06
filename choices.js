const rightPad = require('right-pad');

const choices = [
  {
    type: 'feat',
    description: 'A new feature'
  },
  {
    type: 'fix',
    description: 'A bug fix'
  },
  {
    type: 'docs',
    description: 'Documentation only changes'
  },
  {
    type: 'feat',
    description: 'Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)'
  },
  {
    type: 'refactor',
    description: 'A code change that neither fixes a bug or adds a feature'
  },
  {
    type: 'perf',
    description: 'A code change that neither fixes a bug or adds a feature'
  },
  {
    type: 'test',
    description: 'Adding missing test'
  },
  {
    type: 'chore',
    description: 'Changes to the build process or auxiliary tools and libraries such as documentation generation'
  }
];

module.exports = choices.map( choice => {
  return {
    name: rightPad(choice.type + ':', 12) + choice.description,
    value: choice.type
  }
})