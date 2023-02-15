import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { Button } from 'flowbite-react';
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { filterPosts } from '../../actions';

export class search extends React.Component {
    checkEnter = (event) => {
        let input = event.target.value;
        if (event.key === 'Enter') {
            this.props.filterPost(input)
        }
    }

    search = () => {
        let text = document.querySelector('#search').value;
        this.props.filterPost(text)
    }

    resetPost = (event) => {
        this.props.filterPost("");
    }

    render() {
        return (
            <div className="w-50 sm:max-w-xs flex my-2">
                <label htmlFor="search" className="sr-only">
                        Search
                </label>
                <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <input
                        id="search"
                        name="search"
                        className="block w-full rounded-md border border-transparent bg-gray-700 py-2 pl-10 pr-3 text-sm placeholder-gray-400 focus:border-white focus:bg-white focus:text-gray-900 focus:placeholder-gray-500 focus:outline-none focus:ring-white sm:text-sm"
                        placeholder="Search"
                        type="search"
                        onKeyDown={this.checkEnter}
                    />
                </div>
                <button onClick={this.search} className="py-2 ml-3 items-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                    Search
                </button>
                <button onClick={this.resetPost} className="py-2 mx-3 items-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                    Reset
                </button>
            </div>
          )
    }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => {
    return {
        filterPost: (input) => dispatch(filterPosts(input))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(search)