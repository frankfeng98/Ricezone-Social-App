import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getProfile } from '../../actions';
import { fetchDOB, fetchEmail, fetchPhone, fetchZipcode } from '../../reducers';
import CurrentInfo from './CurrentInfo'
import NavbarProfile from './Navbar_Profile';
import UpdateCurrentInfo from './UpdateCurrentInfo';

export class Profile extends Component {
  constructor(props) {
    super(props);
    this.props.fetchEmail("hello");
    this.props.fetchZipcode("hello");
    this.props.fetchDOB("hello");
  }

  render() {
    return (
      <div>
        <NavbarProfile/>
        <div className='flex justify-center'>
          <div className='flex justify-center'><CurrentInfo/></div>
          <UpdateCurrentInfo/>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
    return {
       user: state.currentUser,
       avatar: state.avatar
    }
  };

const mapDispatchToProps = (dispatch) => {
  return {
    fetchEmail: (payload) => dispatch(fetchEmail(payload)),
    fetchZipcode: (payload) => dispatch(fetchZipcode(payload)),
    fetchDOB: (payload) => dispatch(fetchDOB(payload))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile)