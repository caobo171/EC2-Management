import React from 'react'
import axios from 'axios'
import Form from './Form'
import Instance from './Instance'


const REGIONS = [
    "us-west-2",
    "ap-northeast-1"
]

const MAP = {
    "ap-northeast-1":[
        "ami-00a5245b4816c38e6",
        "ami-0bab560bf1ee352f5"
    ],
    "us-west-2":[
        "ami-7172b611",
        "ami-83b770e3"
    ]
}
class Manage extends React.Component {


    state = {
        ec2InstancesList: [],
        region: 'us-west-2',
        startForm: false
    }
    async componentDidMount() {

        await this.getListInstace()
    }

    getListInstace = async ()=>{
        const url = `https://9flyfjl9hb.execute-api.us-west-2.amazonaws.com/dev/manageec2instance`
        const res = await axios.post(url, { region: this.state.region })
        console.log('check RES ',res.data, this.state.region)
        if (res.data) {
            this.setState({ ec2InstancesList: res.data })
        }
    }

    onChangeRegionHandle = (e) => {
        //console.log('check CLICCKK')
        this.setState({ [e.target.name]: e.target.value }, async () => {

            await this.getListInstace()
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
                <select className="form-control" name='region' id="exampleFormControlSelect1" value={this.state.region} onChange={this.onChangeRegionHandle}>
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
                            <button type="button" onClick={() => this.setState({ startForm: false })} className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <React.Fragment>
                            {
                                this.state.startForm && (
                                    <Form region={this.state.region} imaids={MAP[this.state.region]} onCompleted={()=>this.getListInstace()}></Form>
                                    
                                )
                            }
                        </React.Fragment>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary"
                                onClick={() => this.setState({ startForm: false })} data-dismiss="modal">Close</button>
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
                        {this.state.ec2InstancesList.map((e, index) => (
                            <Instance key={e[0].InstanceId}
                                region={this.state.region}
                                InstanceId={e[0].InstanceId}
                                InstanceType={e[0].InstanceType}
                                State={e[0].State}
                                Order={index + 1}
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