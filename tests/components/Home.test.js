import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import { Link } from 'react-router-dom';
import Home from 'src/components/Home';

describe('Component <Home />', () => {
  it('find two tags paragraph <p> when user is not logged', () => {
    const userProfil = {
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

  it('find one tag paragraph <p> when user is logged', () => {
    const userProfil = {
      username: '',
      firstname: '',
      lastname: '',
      email: '',
    };

    const wrapper = shallow(<Home
      userProfil={userProfil}
      isLogged
      isLoading={false}
    />);

    expect(wrapper.find('p')).to.have.lengthOf(1);
  });

  it('contains one Link component', () => {
    const userProfil = {
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

    expect(wrapper.contains(<Link className="square_btn" to="/activity">N'attendez plus !</Link>)).to.equal(true);
  });
});
