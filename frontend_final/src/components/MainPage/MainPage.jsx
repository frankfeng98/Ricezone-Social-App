import React, { Component } from 'react'
import store from '../../store'
import Posts from './Posts';
import { getPosts } from '../../actions';
import { connect } from 'react-redux'
import NavbarSection from './Navbar_main';
import AddPost from './AddPost';
import { fetchFollowers } from '../../actions';
import FollowedUserList from './FollowedUserList';
import UserStatus from './UserStatus';
import { fetchArticles, fetchAvatar, fetchFollowers_get, fetchHeadline } from '../../reducers';
import Pagination from './Pagination';
import {Pagination_posts} from './Pagination_posts';


export class MainPage extends Component {
  constructor(props) {
    super(props);
    let user_payload = {username: this.props.user};
    this.props.fetchFollowers(user_payload);
    this.props.getPost(this.props.user);
    this.props.fetchHeadline(user_payload);
    this.props.fetchAvatar(this.props.user);
  }

  render() {
    return (
      <>
      <NavbarSection/>
      <div className='flex'>
        <div className='flex flex-col'>
          <UserStatus headline={this.props.headline}/>
          <FollowedUserList headline={this.props.headlineList}/>
        </div>
        <div>
          <AddPost/ >
          <Pagination_posts />
        </div>
      </div>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
      user: state.currentUser,
      headline: state.userHeadline
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
      getPost: (user) => dispatch(fetchArticles(user)),
      fetchFollowers: (user) => dispatch(fetchFollowers_get(user)),
      fetchHeadline: (payload) => dispatch(fetchHeadline(payload)),
      fetchAvatar: (payload) => dispatch(fetchAvatar(payload))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage)