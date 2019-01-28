import React from 'react'
import { SubscribeOne } from 'unstated-x'
import selectContainer from './containers/selectContainer';
import ClipLoader from 'react-spinners/ClipLoader';
import { Env } from './env'
import axios from 'axios'

class Users extends React.Component {

    state = {
        username: '',
        password: '',
        loading: false,
        resetPassword: '********',
        isResetting: false
    }
    
    onChangeHandle = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    onClickHandle = async (e) => {
        //console.log('check clieck',this.state)
        this.setState({ loading: true })
        const res = await axios.post(`${Env.URL1}/manageuserec2 `, {
            username: this.state.username,
            password: this.state.password,
            host: selectContainer.state.instance.Host
        })

        console.log('check ,ress', res)

        this.setState({ username: '', password: '' })
        let array = res.data.split('\n')
        array.pop()
        array.splice(0, array.indexOf('ec2-user') + 2)
        let instance = selectContainer.state.instance
        instance.users = array
        selectContainer.setState({ instance }, () => {
            this.setState({ loading: false })
        })
    }

    onResetHandle = async (e) => {
         //console.log('check clieck',this.state)
         this.setState({ loading: true })
         const res = await axios.post(`${Env.URL1}/manageuserec2 `, {
             username: this.state.isResetting,
             password: this.state.resetPassword,
             host: selectContainer.state.instance.Host,
             isReset : true
         })
 
        //  let array = res.data.split('\n')
        //  array.pop()
        //  array.splice(0, array.indexOf('ec2-user') + 2)
        //  let instance = selectContainer.state.instance
        //  instance.users = array
        //  selectContainer.setState({ instance }, () => {
             this.setState({ loading: false ,isResetting:false})
        //  })
    }

    onDelete = async (username) => {
        console.log('check delete', username)
        this.setState({ loading: true })
        const res = await axios.post(`${Env.URL1}/manageuserec2 `, {
            username,
            host: selectContainer.state.instance.Host
        })

        console.log('check ,ress', res)


        let array = res.data.split('\n')
        array.pop()
        array.splice(0, array.indexOf('ec2-user') + 2)
        let instance = selectContainer.state.instance
        instance.users = array
        selectContainer.setState({ instance }, () => {
            this.setState({ loading: false })
        })


    }
    render() {
        // console.log('check vao')
        // console.log('check ', this.props.instanceId)
        return (

            <SubscribeOne to={selectContainer} bind={['instance']}>
                {
                    slContainer => {
                        ///console.log('check', slContainer.state)
                        return (
                            <React.Fragment>
                                {
                                    (slContainer.state.instance && slContainer.state.instance.users && !this.state.loading) ? (
                                        <table className="table container">
                                            <thead>
                                                <tr>
                                                    <th scope="col">#</th>
                                                    <th scope="col">Users</th>
                                                    <th scope="col">Password</th>
                                                    <th scope="col">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    slContainer.state.instance.users.map((e, index) => {
                                                        console.log('check ', e)
                                                        return (
                                                            <tr key={e}>
                                                                <th scope="row">{index + 1}</th>
                                                                <td>{e}</td>

                                                                <td >
                                                                    {this.state.isResetting === e ? (
                                                                        <input className="form-control" placeholder="...reset pass"
                                                                            name="resetPassword" onChange={this.onChangeHandle}
                                                                        ></input>
                                                                    ) : ('********')}
                                                                </td>
                                                                <td>


                                                                    <i onClick={() => this.onDelete(e)} className="far fa-trash-alt mr-3"></i>
                                                                    <React.Fragment>
                                                                        {this.state.isResetting === e ? (
                                                                                <i className="fas fa-share-square" onClick={this.onResetHandle}></i>
                                                                        ) : (
                                                                                <i onClick={() => this.setState({ isResetting: e })}
                                                                                    className="fas fa-redo-alt"></i>
                                                                            )}
                                                                    </React.Fragment>


                                                                </td>



                                                            </tr>
                                                        )
                                                    })
                                                }
                                                <tr>
                                                    <th scope="row"><button
                                                        onClick={this.onClickHandle}
                                                        className="btn btn-success">Add User</button></th>
                                                    <td><input className="form-control" placeholder="...username"
                                                        name="username" onChange={this.onChangeHandle}
                                                    ></input></td>
                                                    <td><input className="form-control" placeholder="...password"
                                                        name="password" onChange={this.onChangeHandle}
                                                    ></input></td>
                                                </tr>

                                            </tbody>
                                        </table>
                                    ) : (
                                            <ClipLoader></ClipLoader>
                                        )
                                }
                            </React.Fragment>

                        )
                    }
                }
            </SubscribeOne>

        )
    }
}


export default Users