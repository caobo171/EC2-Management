import React from 'react';
import axios from 'axios';
import { toast } from 'react-toastify'
import { css } from '@emotion/core';
import {Env} from './env'

import ClipLoader from 'react-spinners/ClipLoader';

class Form extends React.Component {
    state = {
        ImageId: this.props.imaids[0],
        InstanceType: 't2.micro',
        owner: '',
        department: '',
        KeyName: '',
        KeyPairsList: [],
        loading: false
    }

    onClickHandler = async (e) => {
        e.preventDefault();
        const url = `${Env.URL1}/createec2instance `
        const { KeyPairsList, ...params } = this.state
        console.log('check', params)
        this.setState({ loading: true }, () => console.log(this.state))
        const res = await axios.post(url, {...params,region:this.props.region})

        if (res.data.errorMessage) {
            console.log(res)
            toast.error(res.data.errorMessage)

        } else {
            toast.success('create EC2 successfully! ')
            this.props.onCompleted()
        }

        await this.setState({ loading: false }, () => console.log(this.state))
        console.log('check click')

        e.preventDefault();

    }

    async componentDidMount() {
        console.log('checkkkk', this.props.region)
        const url = `${Env.URL2}/listkeypairs`;
        const res = await axios.post(url,{region:this.props.region})
        console.log('checkk ', res)
        this.setState({ KeyPairsList: res.data, KeyName: res.data[0] ? res.data[0] : [] },
            () => console.log(this.state))

    }


    onChangeHandler = async (e) => {
        e.preventDefault()
        this.setState({ [e.target.name]: e.target.value }, () => console.log('state', this.state))
    }

    render() {
        return (
            <div className="container">
                {
                    this.state.loading ? (
                        <div className='sweet-loading'>
                            <ClipLoader
                                sizeUnit={"px"}
                                size={150}
                                color={'#123abc'}
                                loading={this.state.loading}
                            />
                        </div>
                    ) : (
                            <form onSubmit={this.onClickHandler}>
                                <h4>REGIONS : {this.props.region}</h4>
                                <div className="form-group">
                                    <label >Owner</label>
                                    <input type="text" className="form-control" name="owner" placeholder="Enter your name"
                                        onChange={this.onChangeHandler} required />
                                    <small id="emailHelp" className="form-text text-muted">please honestly</small>
                                </div>
                                <div className="form-group">
                                    <label >Department</label>
                                    <input type="text" className="form-control" name="department" required placeholder="Enter your deparment"
                                        onChange={this.onChangeHandler} />
                                    <small id="emailHelp" className="form-text text-muted">please honestly</small>
                                </div>

                                <div className="form-group">
                                    <label> AMI ID</label>

                                    <select className="form-control" name="ImageId" value={this.state.ImageId}
                                        onChange={this.onChangeHandler} required>
                                        {
                                            this.props.imaids.map(e=>(
                                                <option key={e} value={e}>{e}</option>
                                            ))
                                        }
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label> InstanceType</label>

                                    <select className="form-control" name="InstanceType" value={this.state.InstanceType}
                                        onChange={this.onChangeHandler} required>
                                        <option value="t2.micro">t2.micro</option>
                                        <option value="t2.medium">t2.medium</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label> KeyName</label>

                                    <select className="form-control" name="KeyName" value={this.state.KeyName}
                                        onChange={this.onChangeHandler} required>
                                        {
                                            this.state.KeyPairsList.length >= 1 && (
                                                <React.Fragment>
                                                    {this.state.KeyPairsList.map(e => (
                                                        <option value={e} key={e}>{e}</option>
                                                    ))}
                                                </React.Fragment>
                                            )
                                        }
                                    </select>
                                </div>

                                <button type="submit" className="btn btn-primary">Submit</button>
                            </form>)}
            </div>
        )
    }

}

export default Form