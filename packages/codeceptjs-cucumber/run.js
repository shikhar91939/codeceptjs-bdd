const { event } = require('codeceptjs');
const Workers = require('codeceptjs/lib/workers');
const workers = new Workers(4, { by: 'tests' }); // can also be by suite, function etc

workers.run();
console.log(JSON.stringify(workers.workers, undefined, 4));

workers.on(event.test.failed, (failedTest, err) => { // use standard constants
  console.log('Failed', failedTest);
});