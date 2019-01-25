import React from 'react'
import axios from 'axios'
import { Env } from './env'

import Users from './Users'
import ReactDOM from 'react-dom'
import selectContainer from './containers/selectContainer'

class Instance extends React.Component {

    state = {
        state: this.props.State,
        instanceId: this.props.InstanceId
    }

    componentDidMount() {
        this.recurseToSetState(this.state.state)
    }


    onClickUserHandle= ()=>{
        ///* load users here
        selectContainer.setState({ instance: this.props.instance })
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

        }
        const params = {
            instanceIds: [this.state.instanceId],
            action,
            region: this.props.region
        }


        const url = `${Env.URL2}/manageec2instance`
        const res = await axios.post(url, params)


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
                                        <button type="button"
                                            onClick={this.onClickUserHandle}
                                            class="far fa-user" data-toggle="modal" data-target="#exampleModal1">
                                        </button>
                                    </React.Fragment>

                                )
                        }
                    </td>
                </tr>


                {
                    ReactDOM.createPortal((


                        <div class="modal fade" id="exampleModal1" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div class="modal-body">
                                        <Users></Users>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                        <button type="button" class="btn btn-primary">Save changes</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ), document.getElementById('root'))
                }







            </React.Fragment>


        )
    }



}

export default Instance