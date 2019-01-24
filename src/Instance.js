import React from 'react'
import axios from 'axios'
import { Env } from './env'

import Users from './Users'
import ReactDOM from 'react-dom'

class Instance extends React.Component {

    state = {
        state: this.props.State,
        instanceId: this.props.InstanceId,
        openDialog: false
    }

    componentDidMount() {
        this.recurseToSetState(this.state.state)
    }

    onClickHandle = async (e) => {
        let action = null;
        switch (e.target.className) {
            case 'fa fa-play-circle mr-3':
                action = 'START'
                break;
            case 'far fa-stop-circle mr-3':
                action = 'STOP'
                break;
            case 'far fa-trash-alt mr-3':
                action = 'TERMINATE'
                break;
            case 'far fa-user':
                action = 'USERS'
                this.setState({ openDialog: true })
        }
        const params = {
            instanceIds: [this.state.instanceId],
            action,
            region: this.props.region
        }

        let res = {}
        if (action !== 'USERS') {
            const url = `${Env.URL2}/manageec2instance`
            res = await axios.post(url, params)
        }

        if (res.data && res.data.StoppingInstances && res.data.StoppingInstances[0].CurrentState.Name) {
            console.log('check VAO ROI')
            this.setState({ state: res.data.StoppingInstances[0].CurrentState.Name }, () => {
                console.log('check -------- AAAA', this.state.state)
                this.recurseToSetState(this.state.state)
            })
        } else if (res.data && res.data.StartingInstances && res.data.StartingInstances[0].CurrentState.Name) {
            console.log('check VAO ROI')
            this.setState({ state: res.data.StartingInstances[0].CurrentState.Name }, () => {
                console.log('check -------- AAAA', this.state.state)
                this.recurseToSetState(this.state.state)
            })
        } else if (res.data && res.data.TerminatingInstances && res.data.TerminatingInstances[0].CurrentState.Name) {
            console.log('check VAO ROI')
            this.setState({ state: res.data.TerminatingInstances[0].CurrentState.Name }, () => {
                console.log('check -------- AAAA', this.state.state)
                this.recurseToSetState(this.state.state)
            })
        }
    }

    recurseToSetState = async (state) => {

        await setTimeout(async () => {
            if (state !== 'stopped' && state !== 'terminated' && state !== 'running') {
                const url = `${Env.URL2}/manageec2instance`
                const res = await axios.post(url, {
                    instanceIds: [this.state.instanceId],
                    region: this.props.region
                })
                console.log('check STATE ', res.data)
                if (res.data) {
                    this.setState({ state: res.data[0][0].State }, () => {
                        console.log('check STATE setimetou')
                        this.recurseToSetState(this.state.state)
                    })

                }
            } else {

                return
            }
        }, 5000)


    }

    render() {
        const { InstanceId, InstanceType, State, Order } = this.props
        console.log('checkkkk', this.props)
        return (
            <React.Fragment>
                <tr >
                    <th scope="row">{Order}</th>
                    <td>{InstanceId}</td>
                    <td>{InstanceType}</td>
                    <td>{this.state.state}</td>
                    <td>
                        {
                            ['running', 'stopped', 'terminated'].indexOf(this.state.state) === -1 ? (
                                <i className="fas fa-spinner"></i>
                            ) : (
                                    <React.Fragment>
                                        {State === 'stopped' && (
                                            <i onClick={this.onClickHandle} className="fa fa-play-circle mr-3"></i>
                                        )}
                                        {State === 'running' && (
                                            <i onClick={this.onClickHandle} className="far fa-stop-circle mr-3"></i>
                                        )}
                                        {
                                            State !== 'terminated' && (
                                                <i onClick={this.onClickHandle} className="far fa-trash-alt mr-3"></i>
                                            )
                                        }

                                        <button type="button" onClick={() => this.setState({ openDialog: this.props.InstanceId })} className="far fa-user" data-toggle="modal" data-target="#modal">
                                        </button>
                                    </React.Fragment>

                                )
                        }
                    </td>
                </tr>

                
                {
                    ReactDOM.createPortal((
                        <div className="modal fade" id="modal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                                    <button type="button" onClick={() => this.setState({ openDialog: false })} className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <React.Fragment>
                                    {
                                        this.state.openDialog && (
                                            <Users instanceId={this.state.openDialog} ></Users>
                                        )
                                    }
                                </React.Fragment>
    
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary"
                                        onClick={() => this.setState({ openDialog: false })} data-dismiss="modal">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    ),document.getElementById('root'))
                }
               





        
            </React.Fragment>


        )
    }



}

export default Instance