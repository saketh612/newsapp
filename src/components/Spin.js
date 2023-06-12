import React, { Component } from 'react'
// import loading from './loading.gif'

export class Spin extends Component {
    render() {
        return (
            <div class="d-flex justify-content-center">
                <div class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>

        )
    }
}

export default Spin