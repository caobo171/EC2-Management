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
        selectContainer.setState({ instance: this.props.instance },async ()=>{
            const res = await axios.post(`${Env.URL1}/manageuserec2 `,{
                host:'34.220.226.48'
            })
            
            let array = res.data.split('\n')
            array.pop()
            array.splice(0,array.indexOf('ec2-user')+1)
            let instance = selectContainer.state.instance
            instance.users = array
            selectContainer.setState({instance})
            
        })
    }

    onClickCheck = async ()=>{
       const data = await axios.post(`${Env.URL1}/manageuserec2 `,{
            host:'34.220.226.48'
        })

        window.data = data;
        console.log('check ',data)
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
                if (res.data && !res.data.errorMessage) {
                    console.log('check ress ',res.data)
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
                                            className="far fa-user" data-toggle="modal" data-target="#exampleModal1">
                                        </button>
                                        <button onClick={this.onClickCheck}>
                                            checkkk
                                        </button>
                                    </React.Fragment>

                                )
                        }
                    </td>
                </tr>


                {
                    ReactDOM.createPortal((


                        <div className="modal fade" id="exampleModal1" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <Users></Users>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                        <button type="button" className="btn btn-primary">Save changes</button>
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