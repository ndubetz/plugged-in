var newman = require('newman');

var collection = process.argv[2];

var runConfig = {
	reporters: 'cli',
	collection: require('./collections/' + collection + '.json')
};

newman.run(runConfig).on('done', function(err, summary) {
	if (thereWereFailures(summary)) {
		throw new Error('Contract failure');
	}
});

function thereWereFailures(summary) {
	var failures = summary.run.failures;
	return !!failures && !!failures.length
}
