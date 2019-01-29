import React from 'react'
import { SubscribeOne } from 'unstated-x'
import selectContainer from './containers/selectContainer';
import ClipLoader from 'react-spinners/ClipLoader';
import { Env } from './env'
import axios from 'axios'
import {toast} from 'react-toastify'
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


    onClickWithKeyHandle = async (e) => {
        const res = await axios.post(`${Env.URL1}/manageuserec2 `, {
            username: this.state.username,
            host: selectContainer.state.instance.Host,
            isPemKey: true
        })
        //const exstring = '-----BEGIN RSA PRIVATE KEY-----\nMIIEowIBAAKCAQEAsP4WYSGhQ3bWiqXr8fV8s0h1LKKl1XiYeelOl8pZH8lLfKsq\n+TCvmWmEv+miKCRsmMNhRiPbwoSXlyfLRFy0NPpk4Imsy9b6es21DYmHXcMPJlB0\nWkL6Lp7NbVawTUKtA1H/DkV3Hn7tTpGz7AEQ3gZGbfloQqHti9pl+8wpiejLTcut\nqwe/SWGWX9c9QMcGRZRmRXb2EhVM2zop0xHFFOqyEzUdLOcJr43UlsKZXmTb20h0\nDL79U0+lkVb64bTKJcZhkUvRoFM71Kz2Bvxix5QflDh8LPNY7nNyG2e7M08B1ef3\nnjFogIPON7OQjpfl0xX6TJjJI20QdAfYXotb3QIDAQABAoIBADg0B1FCx53Pv+L5\nO0pzROz9hk/tOjHmgKy93HoxBEomtrTY+eV1g11493GltBuBLYb5DAuk2WUUi7qx\nJUgJFCR6msv+jAOSuamDZwnscTLh/Q6Sn9AF0sI5JUyiKYvvL1eNkyup/WCOt7aq\nZ/L6h6upXHYRq/z0xKUTbi0eMNacsRcPC73wFtqO19R1BdtW56Xq84T4IKbKHgEX\n46C6byRejl/hNjsqQiXP8OxmerBzmYgTgvIe8pYZho8x58gQOfW0MhRVaGIhZchL\nykNEMEEhD6KV7i9V8iUAHQRIJZ/kNJTYQoVFWZtfrRlyWi1nLNehQrd/1o56SgUu\n66dMQjUCgYEA6o5EqKNZ+Clwb/KGaJLQvq5bBMG1A/gw1NcdDgb6twIBwKtTGJOi\nFgdxZhuHj2fig1RICToC7otzYI44jK6+A2HReV6PxapLGLX0fbWkjsjTaKZ7SdwO\nitllbKqG6iRoXtqrTJ0x5nRXmG3/Fu8CnyEFIbMtVZv8blXcV4MCDvcCgYEAwSyQ\nP3xFg/oYT/O+s3yJ7lK8brCyu9qbDtBQkWBt5yfDn9TNfGU0ZyCGurhNEkRfQ1Yd\nvjeqylxlWIzGloXTHXDDB0O0Rp5pwq62E6HAGU7z4MtAekZQKfK7NZ6saius7QvV\nTxU5Csp7GqZlH/A81wP3QV8XzXJlAKWLk99c8ssCgYBb31nZTBKDd4fI8Y/gChGl\nfpm8JTuH0IEf/RouUmGFqU2ScAjeSYVlZ4jtW78fVquMkUieBJD9arXIjixsPk3C\n+V+ZUIaz/93mUe7wBmPsYZEdHoiQB5fSnxBxHeI2eAhBjxklqzTOdaeR1xPhocC/\nH6no50vMioq3lP33cSMvRQKBgQCspnWuKBXBZS+BleplZPOqS8waalb0yuc3EDxS\nEotnxAR1v66AdbumSE3iaIKJxw4Vksw2jG5bOsVhpUCAm88aSwQkZACl9UO1Oo2F\nclXMyOHzkfVo05smQsnLnKugoLSHkMHvUpqO6HWqVfmf2AmoauT8Sk9t0cYwE8Vy\nPnpGjQKBgBFrb1TAMzgNYQfy4qJ8+Zd6UVQIBd67K03iBwGYIYWm5zbdUpi091tQ\n2ADJx401m0C67A0PB/qGLXodAk0eaQUR70I4rKnOtDxOhl0QgXmC2cpKq0/5pIiE\nEy61xoD8+i/oNJ4md5NFzb+rhasuswqjj7ZVzN0X0jqD3G0isJSe\n-----END RSA PRIVATE KEY-----\n'
        const template = await `${res.data}`
        window.template = template
        function downloadObjectAsJson(exportName) {
            const dataStr = 'data:text/plain;charset=utf-8,' + encodeURIComponent(template)
            const downloadAnchorNode = document.createElement('a')
            downloadAnchorNode.setAttribute('href', dataStr)
            downloadAnchorNode.setAttribute('download', exportName + '.pem')
            const e = document.createEvent('MouseEvents')
            e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
            downloadAnchorNode.dispatchEvent(e)
            downloadAnchorNode.remove()
        }

        await downloadObjectAsJson('caobo171')
    }

    getPemKey = async (username) => {

        const res = await axios.post(`${Env.URL1}/manageuserec2 `, {
            username,
            host: selectContainer.state.instance.Host,
            isGetPemKey: true
        })
       // console.log('check ', res, username, selectContainer.state.instance.Host)
       // const exstring = '-----BEGIN RSA PRIVATE KEY-----\nMIIEowIBAAKCAQEAsP4WYSGhQ3bWiqXr8fV8s0h1LKKl1XiYeelOl8pZH8lLfKsq\n+TCvmWmEv+miKCRsmMNhRiPbwoSXlyfLRFy0NPpk4Imsy9b6es21DYmHXcMPJlB0\nWkL6Lp7NbVawTUKtA1H/DkV3Hn7tTpGz7AEQ3gZGbfloQqHti9pl+8wpiejLTcut\nqwe/SWGWX9c9QMcGRZRmRXb2EhVM2zop0xHFFOqyEzUdLOcJr43UlsKZXmTb20h0\nDL79U0+lkVb64bTKJcZhkUvRoFM71Kz2Bvxix5QflDh8LPNY7nNyG2e7M08B1ef3\nnjFogIPON7OQjpfl0xX6TJjJI20QdAfYXotb3QIDAQABAoIBADg0B1FCx53Pv+L5\nO0pzROz9hk/tOjHmgKy93HoxBEomtrTY+eV1g11493GltBuBLYb5DAuk2WUUi7qx\nJUgJFCR6msv+jAOSuamDZwnscTLh/Q6Sn9AF0sI5JUyiKYvvL1eNkyup/WCOt7aq\nZ/L6h6upXHYRq/z0xKUTbi0eMNacsRcPC73wFtqO19R1BdtW56Xq84T4IKbKHgEX\n46C6byRejl/hNjsqQiXP8OxmerBzmYgTgvIe8pYZho8x58gQOfW0MhRVaGIhZchL\nykNEMEEhD6KV7i9V8iUAHQRIJZ/kNJTYQoVFWZtfrRlyWi1nLNehQrd/1o56SgUu\n66dMQjUCgYEA6o5EqKNZ+Clwb/KGaJLQvq5bBMG1A/gw1NcdDgb6twIBwKtTGJOi\nFgdxZhuHj2fig1RICToC7otzYI44jK6+A2HReV6PxapLGLX0fbWkjsjTaKZ7SdwO\nitllbKqG6iRoXtqrTJ0x5nRXmG3/Fu8CnyEFIbMtVZv8blXcV4MCDvcCgYEAwSyQ\nP3xFg/oYT/O+s3yJ7lK8brCyu9qbDtBQkWBt5yfDn9TNfGU0ZyCGurhNEkRfQ1Yd\nvjeqylxlWIzGloXTHXDDB0O0Rp5pwq62E6HAGU7z4MtAekZQKfK7NZ6saius7QvV\nTxU5Csp7GqZlH/A81wP3QV8XzXJlAKWLk99c8ssCgYBb31nZTBKDd4fI8Y/gChGl\nfpm8JTuH0IEf/RouUmGFqU2ScAjeSYVlZ4jtW78fVquMkUieBJD9arXIjixsPk3C\n+V+ZUIaz/93mUe7wBmPsYZEdHoiQB5fSnxBxHeI2eAhBjxklqzTOdaeR1xPhocC/\nH6no50vMioq3lP33cSMvRQKBgQCspnWuKBXBZS+BleplZPOqS8waalb0yuc3EDxS\nEotnxAR1v66AdbumSE3iaIKJxw4Vksw2jG5bOsVhpUCAm88aSwQkZACl9UO1Oo2F\nclXMyOHzkfVo05smQsnLnKugoLSHkMHvUpqO6HWqVfmf2AmoauT8Sk9t0cYwE8Vy\nPnpGjQKBgBFrb1TAMzgNYQfy4qJ8+Zd6UVQIBd67K03iBwGYIYWm5zbdUpi091tQ\n2ADJx401m0C67A0PB/qGLXodAk0eaQUR70I4rKnOtDxOhl0QgXmC2cpKq0/5pIiE\nEy61xoD8+i/oNJ4md5NFzb+rhasuswqjj7ZVzN0X0jqD3G0isJSe\n-----END RSA PRIVATE KEY-----\n'
           
            if(res.data!=="" && res.data!== null){
                const template = await `${res.data}`
                console.log('check ',res.data)
                window.template = template
                 function downloadObjectAsJson( exportName) {
                   const dataStr = 'data:text/plain;charset=utf-8,' + encodeURIComponent(template)
                   const downloadAnchorNode = document.createElement('a')
                   downloadAnchorNode.setAttribute('href', dataStr)
                   downloadAnchorNode.setAttribute('download', exportName + '.pem')
                   const e = document.createEvent('MouseEvents')
                   e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
                   downloadAnchorNode.dispatchEvent(e)
                   downloadAnchorNode.remove()
               }
    
               await downloadObjectAsJson('caobo171')
            }else{
                toast.error('account is not using .pem files')
            }
         
    }

    onResetHandle = async (e) => {
        //console.log('check clieck',this.state)
        this.setState({ loading: true })
        const res = await axios.post(`${Env.URL1}/manageuserec2 `, {
            username: this.state.isResetting,
            password: this.state.resetPassword,
            host: selectContainer.state.instance.Host,
            isReset: true
        })

        this.setState({ loading: false, isResetting: false })

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
                                                                    <i className="fas fa-download" onClick={() => this.getPemKey(e)}></i>


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
                                                    <td><button
                                                        onClick={this.onClickHandle}
                                                        className="btn btn-warning" onClick={this.onClickWithKeyHandle}>Add User With Key</button></td>
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