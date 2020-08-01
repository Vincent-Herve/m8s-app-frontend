import { expect } from 'chai';

import activities, { initialState } from 'src/reducers/activities';
import { saveActivities } from 'src/actions/activities';

describe('Activities reducer', () => {
  describe('structure', () => {
    it('Is a function', () => {
      expect(activities).to.be.a('function');
    });

    it('returns the state with initial state value when called function without arguments', () => {
      expect(activities()).to.be.an('object');
      expect(activities()).to.eql(initialState);
    });
  });

  describe('with actions', () => {
    it('should return a modified state when receive SAVE_ACTIVITIES', () => {
      const newActivities = [{ a: 1 }, { b: 2 }];
      const action = saveActivities(newActivities);
      const modifiedState = activities(initialState, action);
      expect(modifiedState).to.be.eql({
        list: newActivities,
        resultList: [],
        redirectionCreate: false,
        isLoading: false,
        title: '',
        description: '',
        free_place: '',
        location: '',
        date: '',
        hour: '',
      });
    });
  });
});
