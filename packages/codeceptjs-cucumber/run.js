const { event } = require('codeceptjs');
const Workers = require('codeceptjs/lib/workers');
const workers = new Workers(2, { by: 'tests' }); // can also be by suite, function etc

workers.run();

console.log('\n\nworkers.workers: ', workers.workers);

workers.on(event.test.failed, (failedTest, err) => { // use standard constants
  console.log('Failed', failedTest);
});