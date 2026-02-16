module.exports = {
  default: {
    require: [
      'src/steps/test.steps.js',
      'src/steps/addnote-unit.steps.ts',
      'src/steps/example.steps.ts',
      'src/steps/FacilityManagementSteps.ts',
      'src/support/hooks.ts',
      'src/support/world.ts'
    ],
    requireModule: ['ts-node/register'],
    format: [
      'progress',
      'html:reports/cucumber-report.html',
      'json:reports/cucumber-report.json',
      'allure-cucumberjs/reporter'
    ],
    formatOptions: { 
      snippetInterface: 'async-await',
      resultsDir: 'allure-results'
    },
    publishQuiet: true,
    paths: ['features/**/*.feature']
  }
};
