import { expect } from 'chai';
import React from 'react';

import { shallow, mount } from 'enzyme';

import Home from 'src/containers/Home';

describe('Component Home', () => {
  it('contains two tags paragraph <p> when user is not logged', () => {
    const userProfil = {
      id: 0,
      username: '',
      firstname: '',
      lastname: '',
      email: '',
    };

    const wrapper = shallow(<Home
      userProfil={userProfil}
      isLogged={false}
      isLoading={false}
    />);

    expect(wrapper.find('p')).to.have.lengthOf(2);
  });
});
