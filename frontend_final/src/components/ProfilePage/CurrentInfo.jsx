import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchEmail } from '../../reducers';
import parse from 'html-react-parser';

export class CurrentInfo extends React.Component {
  render() {
    return (
      <div className='bg-sky-100 rounded-lg px-4 py-10'>
        <h3 className='font-bold font-xl'>Current Information</h3>
        <div>{parse(this.props.avatar)}</div>
        <div>
          <span className='font-bold font-xl italic'>User Name: </span>
          <div>{this.props.user}</div>
        </div>
        <div>
          <span className='font-bold font-xl italic'>Email: </span>
          <div>{this.props.email}</div>
        </div>
        <div>
          <span className='font-bold font-xl italic'>Zipcode: </span>
          <div>{this.props.zipcode}</div>
        </div>
        <div>
          <span className='font-bold font-xl italic'>Date of Birth: </span>
          <div>{this.props.dob}</div>
        </div>
        <div>
          <span className='font-bold font-x italic'>Password: </span>
          <div>**********</div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
    return {
        user: state.currentUser,
        email: state.email,
        zipcode: state.zipcode,
        dob: state.dob,
        avatar: state.avatar
    }
  };

const mapDispatchToProps = (dispatch) => ({
  fetchEmail: (payload) => fetchEmail(payload)
})

export default connect(mapStateToProps, mapDispatchToProps)(CurrentInfo)