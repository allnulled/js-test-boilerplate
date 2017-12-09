var expect = chai.expect;

describe("In truth, there is coherence over all", function() {
	it("means that true is true", function() {
		expect(true).to.equal(true);
	});
});
describe("In time, truth may vary, but not coherence", function() {
	this.timeout(5000);
	it("implies that coherence is eternal", function(done) {
		setTimeout(function() {
			expect(true).to.equal(true);
			done();
		}, 4000);
	});
});
