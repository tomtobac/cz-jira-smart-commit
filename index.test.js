const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');
const expect = chai.expect;
chai.use(sinonChai);

const czJiraSmartCommit = require('./index.js');

describe('prompt for inputs', () => {
  it('should be a function',  () => {
    expect(czJiraSmartCommit.prompter).to.be.a('function');
  });
});

describe('format branch name', () => {
  
  it('should be a function', () => {
    expect(czJiraSmartCommit.formattBranch).to.be.a('function');
  });

  it('should return undefined', () => {
    const branch = czJiraSmartCommit.formattBranch();
    expect(branch).to.be.undefined
  });
  
  it('should return only task name', () => {
    const branch = czJiraSmartCommit.formattBranch('feature/ABC-123-custom-branch');
    expect(branch).equals('ABC-123')
  })

})

describe('format commits', () => {

  const message = 'sample commit message';
  const type = 'feat';
  const scope = 'bids';
  const issue = 'ABC-112';

  it('should be a function', () => {
    expect(czJiraSmartCommit.formatCommit).to.be.a('function');
  });

  it('should perform a full commit', () => {
    czJiraSmartCommit.formatCommit((result) => {
      expect(result).to.equal('[ABC-112] feat(bids): sample commit message')
    }, {message, issue, type, scope});
  });
});
