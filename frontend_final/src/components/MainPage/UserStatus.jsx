import React, { Component } from 'react'
import { connect } from 'react-redux'
import UpdateHeadline from './UpdateHeadline';
import parse from 'html-react-parser';

export class UserStatus extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <div className='bg-sky-100 rounded-lg p-10 m-3 flex flex-col'>
        <div className='flex flex-col items-center '>
          <div>{parse(this.props.avatar)}</div>
          <div>{this.props.user}</div>
          <div className='italic font-bold'>{this.props.headline}</div>
        </div>
        <UpdateHeadline/>
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

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(UserStatus)