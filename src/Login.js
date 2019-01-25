import React from 'react'
import axios from 'axios'

import Manage from './Manage'
import { Env } from './env'


class Login extends React.Component {

    state = {
        accessTokenId: '',
        secretId: '',
        isLoggined: true
    }

    onChangeHandle = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmitHandle = async (e) => {
        e.preventDefault()
        console.log('check', this.state)

        const url = `${Env.URL2}/checksecretkey `

        const res = await axios.post(url, this.state)
        if (res.data === 'true' || res.data === true) {
            this.setState({ isLoggined: true })
        }

    }
    render() {
        return (
            !this.state.isLoggined ? (
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12" >
                    <form onSubmit={this.onSubmitHandle}>
                        <div className="form-group">
                            <label >Access Token</label>
                            <input type="text" name="accessTokenId" className="form-control" placeholder="Enter your accessToken "
                                value={this.state.accessTokenId} onChange={this.onChangeHandle} required />
                        </div>
                        <div className="form-group">
                            <label >Secret Key</label>
                            <input type="password" name="secretId" className="form-control" placeholder="Enter your secret key"
                                value={this.state.secretId} onChange={this.onChangeHandle} required />
                        </div>
                        <div className="form-check">
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>

                    </form>
                </div>
            ) : (
                    <React.Fragment>
                         <Manage></Manage>
                    </React.Fragment>
                )

        )
    }
}

export default Login;