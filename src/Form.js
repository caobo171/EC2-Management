import React from 'react';
import axios from 'axios';
import { toast } from 'react-toastify'
import { css } from '@emotion/core';
import { Env } from './env'

import { Maps } from './mapping'

import ClipLoader from 'react-spinners/ClipLoader';
import { SubscribeOne } from 'unstated-x';
import selectContainer from './containers/selectContainer';

class Form extends React.Component {
    state = {
        ImageId: Maps.AWSInstanceType2Arch["t2.micro"].Arch,
        InstanceType: 't2.micro',
        owner: '',
        department: '',
        name: '',
        KeyName: selectContainer.state.KeyPairsList[0],
        loading: false
    }

    onClickHandler = async (e) => {
        e.preventDefault();
        const url = `${Env.URL1}/createcloudformation `
        this.setState({ loading: true })

        let template = {
            "AWSTemplateFormatVersion": "2010-09-09",
            "Description": "AWS CloudFormation Sample Template",
            "Mappings": Maps,
            "Resources": {
            },
            "Outputs": {
                "InstanceId": {
                    "Description": "InstanceId of the newly created EC2 instance",
                    "Value": { "Ref": this.state.name }
                }
            }
        }

        template.Resources[this.state.name] = {
            "Type": "AWS::EC2::Instance",
            "Properties": {
                "InstanceType": this.state.InstanceType,
                "ImageId": {
                    "Fn::FindInMap": ["AWSRegionArch2AMI", { "Ref": "AWS::Region" },
                        { "Fn::FindInMap": ["AWSInstanceType2Arch", this.state.InstanceType, "Arch"] }]
                },
                "KeyName": this.state.KeyName,
                "UserData": {
                    "Fn::Base64": {
                        "Fn::Join": ["", [
                            `#!/bin/bash\n`,
                            `sed -i 's/PasswordAuthentication no/PasswordAuthentication yes/g' /etc/ssh/sshd_config\n`,
                            `service sshd reload\n`,
                            `password="tuilacao171"\n`,
                            `pass=$(perl -e 'print crypt($ARGV[0], "password")' $password)\n`,
                            `useradd -m -p $pass cao171\n`,
                            `sed -i 's/Allows people in group wheel to run all commands/Allows people in group wheel to run all commands \\n cao171   ALL=(ALL)  NOPASSWD:ALL/g' /etc/sudoers\n`
                        ]]
                    }
                },
                "Tags": [
                    {
                        Key: "owner",
                        Value: this.state.owner
                    },
                    {
                        Key: "Name",
                        Value: this.state.name
                    },
                    {
                        Key: "department",
                        Value: this.state.department
                    }
                ]

            }
        }

        const params = {
            StackName: this.state.name,
            TemplateBody: JSON.stringify(template)
        }
          
        console.log('params',JSON.stringify(template))
        const res = await axios.post(url, { ...params, region: this.props.region })

        if (res.data.errorMessage) {
            console.log(res)
            toast.error(res.data.errorMessage)

        } else {
            toast.success('create EC2 successfully! ')
            console.log('check res',res.data)
            //this.props.onCompleted(selectContainer.state.region)
        }

        await this.setState({ loading: false }, () => console.log(this.state))
     

        e.preventDefault();

    }

    async componentDidMount() {
       
        const url = `${Env.URL1}/listkeypairs`;
        const res = await axios.post(url, { region: this.props.region })

        this.setState({ KeyPairsList: res.data, KeyName: res.data[0] ? res.data[0] : [] },
            () => console.log(this.state))

    }


    onChangeHandler = async (e) => {
        e.preventDefault()
        this.setState({ [e.target.name]: e.target.value })
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
                            <SubscribeOne to={selectContainer} bind={['region','KeyPairsList']}>
                                {
                                    slContainer => (
                                        <form onSubmit={this.onClickHandler}>
                                            <h4>REGIONS : {slContainer.state.region}</h4>
                                            <div className="form-group">
                                                <label >Name</label>
                                                <input type="text" className="form-control" name="name" required placeholder="Enter name ..."
                                                    onChange={this.onChangeHandler} />
                                                <small id="emailHelp" className="form-text text-muted">please honestly</small>
                                            </div>
                                            <div className="form-group">
                                                <label >Owner</label>
                                                <input type="text" className="form-control" name="owner" placeholder="Enter the owner"
                                                    onChange={this.onChangeHandler} required />
                                                <small id="emailHelp" className="form-text text-muted">please honestly</small>
                                            </div>
                                            <div className="form-group">
                                                <label >Department</label>
                                                <input type="text" className="form-control" name="department" required placeholder="Enter the deparment"
                                                    onChange={this.onChangeHandler} />
                                                <small id="emailHelp" className="form-text text-muted">please honestly</small>
                                            </div>


                                            <div className="form-group">
                                                <label> InstanceType</label>

                                                <select className="form-control" name="InstanceType" value={this.state.InstanceType}
                                                    onChange={(e) => {
                                                        this.setState({
                                                            InstanceType: e.target.value,
                                                            ImageId: Maps.AWSInstanceType2Arch[e.target.value].Arch
                                                        })
                                                    }} required>
                                                    {
                                                        Object.keys(Maps.AWSInstanceType2Arch).map(e => (
                                                            <option key={e} value={e}>{e}</option>
                                                        ))
                                                    }
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <label>ImageId</label>
                                                <input type="text" className="form-control" readOnly={true} value={this.state.ImageId}>
                                                </input>
                                            </div>


                                            <div className="form-group">
                                                <label> KeyName</label>

                                                <select className="form-control" name="KeyName" value={this.state.KeyName}
                                                    onChange={this.onChangeHandler} required>
                                                    {
                                                        slContainer.state.KeyPairsList.length >= 1 && (
                                                            <React.Fragment>
                                                                {slContainer.state.KeyPairsList.map(e => (
                                                                    <option value={e} key={e}>{e}</option>
                                                                ))}
                                                            </React.Fragment>
                                                        )
                                                    }
                                                </select>
                                            </div>

                                            <button type="submit" className="btn btn-primary">Submit</button>
                                        </form>
                                    )
                                }
                            </SubscribeOne>)}

            </div>
        )
    }

}

export default Form