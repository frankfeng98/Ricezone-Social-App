import React from 'react'
import { getPosts } from '../../actions';
import { connect } from 'react-redux'
import Post from './Post';
import Search from './search';

export class Posts extends React.Component {
    constructor(props) {
        super(props);
        
    }

    async componentDidMount() {
        await this.props.postList;
    }

    render() {
        return (
            (this.props.loading === false)?
            <div className='rounded-lg flex flex-col items-center'>
                <Search/>
                <div className='grid grid-cols-2'>
                    {this.props.posts.map((post, index) => (
                        <Post key={index} post = {post} user = {post.author} time={post.date}/>
                    ))}
                </div>
            </div>
            :<div>loading....</div>  
          )
    }
}

const mapStateToProps = (state) => {
    return {
        postList: state.displayPost,
        user: state.currentUser,
        loading: state.loading
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getPost: (user) => dispatch(getPosts(user))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Posts)