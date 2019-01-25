import React from 'react'
import axios from 'axios'
import Form from './Form'
import Instance from './Instance'
import { Env } from './env'
import selectContainer from './containers/selectContainer'

import EC2Instances from './fakedata'


const REGIONS = [
    "us-west-2",
    "ap-northeast-1"
]

class Manage extends React.Component {


    state = {
        ec2InstancesList: [],
        region: 'us-west-2'
    }
    async componentDidMount() {
        selectContainer.setState({ region: REGIONS[0] }, async () => {
            await this.getListInstace(selectContainer.state.region)
            const url = `${Env.URL1}/listkeypairs`;
            console.log('checkkk before', selectContainer.state.region )
            const res = await axios.post(url, { region: selectContainer.state.region })
            console.log('checkkk after', res.data )
    
            selectContainer.setState({ KeyPairsList: res.data })
        })

    }

    getListInstace = async (region) => {
        const url = `${Env.URL2}/manageec2instance`
        const res = await axios.post(url, { region })
        console.log('check RES ', res.data, this.state.region)
        if (res.data) {
            console.log('check res',res.data)
            this.setState({ ec2InstancesList: res.data })
        }
    }

    onChangeRegionHandle = (e) => {
        //console.log('check CLICCKK')
        selectContainer.setState({ region: e.target.value }, async () => {
            await this.getListInstace(selectContainer.state.region)

            const url = `${Env.URL1}/listkeypairs`;
            const res = await axios.post(url, { region: selectContainer.state.region })
    
            selectContainer.setState({ KeyPairsList: res.data })
        })
    }
    render() {
        return (<div>


            <button type="button" onClick={() => this.setState({ startForm: true })} className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                Create EC2 Instance
            </button>
            <br></br>
            <div className="form-group">
                <label>Regions </label>
                <select className="form-control" name='region' id="exampleFormControlSelect1" onChange={this.onChangeRegionHandle}>
                    {
                        REGIONS.map(e => (
                            <option key={e} value={e}>{e}</option>
                        ))
                    }
                </select>
            </div>



            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>

                        <Form  onCompleted={(region) => this.getListInstace(region)}></Form>


                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary"
                             data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>


            <table className="table table-dark">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Instance ID</th>
                        <th scope="col">Instance Type</th>
                        <th scope="col">State</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <React.Fragment>
                        {this.state.ec2InstancesList.map(e=>e[0]).map((e, index) => (
                            <Instance key={e.InstanceId}
                                region={this.state.region}
                                InstanceId={e.InstanceId}
                                InstanceType={e.InstanceType}
                                State={e.State}
                                Order={index + 1}
                                instance = {e}
                            ></Instance>
                        ))}
                    </React.Fragment>

                </tbody>
            </table>
        </div>

        )
    }
}





export default Manage