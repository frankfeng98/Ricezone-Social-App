import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getPosts, removeFollowers } from '../../actions';
import AddFollower from './AddFollower';
import FollowedUser from './FollowedUser';
import { Toaster } from 'react-hot-toast';
import { fetchArticles, removeFollowers_delete } from '../../reducers';

export class FollowedUserList extends React.Component {
  handleRemove = (username) => {
    this.props.removeFollower(username);
  }

  render() {
    return (
        <div className='bg-sky-100 rounded-lg p-10 m-3'>
          <AddFollower />
            {this.props.followerList.map((user, index) => (
                <FollowedUser key={index} username = {user.username} headline = {user.headline} avatar={user.avatar} handleRemove = {this.handleRemove}/>
            ))}
          <Toaster/>
        </div>
            
    )
  }
}

const mapStateToProps = (state) => {
    return {
        user: state.currentUser,
        followerList: state.followerHeadlineList
    }
  };

const mapDispatchToProps = (dispatch) => {
    return {
        removeFollower: (user) => dispatch(removeFollowers_delete(user))
    }
  };

export default connect(mapStateToProps, mapDispatchToProps)(FollowedUserList)