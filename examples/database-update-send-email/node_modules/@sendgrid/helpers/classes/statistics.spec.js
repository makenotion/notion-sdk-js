'use strict';

/**
 * Dependencies
 */
const Statistics = require('./statistics');

/**
 * Tests
 */
describe('Statistics', function() {

  //Test data
  const data = {
    startDate: new Date(),
    endDate: new Date('2017-10-21'),
    aggregatedBy: 'week',
  };

  describe('setStartDate()', function() {
    let stats;

    beforeEach(function() {
      stats = new Statistics(data);
    });

    it('should set the startDate', function() {
      stats.setStartDate(new Date('2017-10-22'));
      expect(stats.startDate).equal('2017-10-22');
    });

    it('should throw error for invalid input', function() {
      expect(function() {
        stats.setStartDate('');
      }).to.throw(Error);

      expect(function() {
        stats.setStartDate({});
      }).to.throw(Error);
    });

    it('should throw error for no input', function() {
      expect(function() {
        stats.setStartDate();
      }).to.throw(Error);
    });
  });

  describe('endDate()', function() {
    let stats;

    beforeEach(function() {
      stats = new Statistics(data);
    });

    it('should set endDate', function() {
      stats.setEndDate(new Date('2017-10-22'));
      expect(stats.endDate).equal('2017-10-22');
    });

    it('should throw error for invalid input', function() {
      expect(function() {
        stats.setEndDate('');
      }).to.throw(Error);
    });
  });

  describe('setAggregatedBy()', function() {
    let stats;

    beforeEach(function() {
      stats = new Statistics(data);
    });

    it('should set aggregatedBy', function() {
      stats.setAggregatedBy('week');
      expect(stats.aggregatedBy).equal('week');
    });

    it('should throw error for invalid input', function() {
      expect(function() {
        stats.setAggregatedBy('');
      }).to.throw(Error);
      expect(function() {
        stats.setAggregatedBy([1]);
      }).to.throw(Error);
    });
  });

  describe('getAdvanced()', function() {
    let stats;

    beforeEach(function() {
      stats = new Statistics(data);
    });

    it('should get advanced', function() {
      const advanced = stats.getAdvanced('US');
      expect(advanced.country).equal('US');
    });
  });

  describe('getAdvancedMailboxProviders()', function() {
    let stats;

    beforeEach(function() {
      stats = new Statistics(data);
    });

    it('should get advanced mailbox providers', function() {
      const arr = ['something'];
      const advanced = stats.getAdvancedMailboxProviders(arr);
      expect(advanced.mailBoxProviders).equal(arr);
    });
  });

  describe('getAdvancedBrowsers()', function() {
    let stats;

    beforeEach(function() {
      stats = new Statistics(data);
    });

    it('should get advanced browsers', function() {
      const arr = ['something'];
      const advanced = stats.getAdvancedBrowsers(arr);
      expect(advanced.browsers).equal(arr);
    });
  });

  describe('getCategories()', function() {
    let stats;

    beforeEach(function() {
      stats = new Statistics(data);
    });

    it('should get categories', function() {
      const arr = ['something'];
      const categories = stats.getCategories(arr);
      expect(categories.categories).equal(arr);
    });
  });

  describe('getSubuser()', function() {
    let stats;

    beforeEach(function() {
      stats = new Statistics(data);
    });

    it('should get subusers', function() {
      const arr = ['something'];
      const advanced = stats.getSubuser(arr);
      expect(advanced.subusers).equal(arr);
    });
  });

  describe('getSubuserSum()', function() {
    let stats;

    beforeEach(function() {
      stats = new Statistics(data);
    });

    it('should get subusersum', function() {
      const subuser = stats.getSubuserSum('delivered', 'asc', 10, 0);

      expect(subuser.sortByMetric).equal('delivered');
      expect(subuser.sortByDirection).equal('asc');
      expect(subuser.limit).equal(10);
      expect(subuser.offset).equal(0);
    });
  });

  describe('getSubuserMonthly()', function() {
    let stats;

    beforeEach(function() {
      stats = new Statistics(data);
    });

    it('should get subusersmonthly', function() {
      const subuser = stats.getSubuserMonthly('delivered', 'asc', 10, 0);

      expect(subuser.sortByMetric).equal('delivered');
      expect(subuser.sortByDirection).equal('asc');
      expect(subuser.limit).equal(10);
      expect(subuser.offset).equal(0);
    });
  });
});
