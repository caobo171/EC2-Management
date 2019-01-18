import React from 'react'
import axios from 'axios'

import Manage from './Manage'


class Login extends React.Component {

    state = {
        accessTokenId: '',
        secretId: '',
        isLoggined: false
    }

    onChangeHandle = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmitHandle = async (e) => {
        e.preventDefault()
        console.log('check', this.state)

        const url = `https://9flyfjl9hb.execute-api.us-west-2.amazonaws.com/dev/checksecretkey `

        const res = await axios.post(url, this.state)
        if (res.data === 'true' || res.data === true) {
            this.setState({ isLoggined: true })
        }
        //console.log('check',data)
        //e.preventDefault()
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