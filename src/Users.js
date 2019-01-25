import React from 'react'
import { SubscribeOne } from 'unstated-x'
import selectContainer from './containers/selectContainer';

class Users extends React.Component {

    componentDidUpdate(prevProps,prevState){
        console.log('check',prevProps,prevState)
    }

    componentDidMount(){
        console.log('checkkkk')
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
                                    slContainer.state.instance && (
                                        <table class="table container">
                                            <thead>
                                                <tr>
                                                    <th scope="col">#</th>
                                                    <th scope="col">Users</th>
                                                    <th scope="col">Password</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <th scope="row">1</th>
                                                    <td>Mark</td>
                                                    <td>Otto</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">2</th>
                                                    <td>Jacob</td>
                                                    <td>Thornton</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">3</th>
                                                    <td>Larry</td>
                                                    <td>the Bird</td>
                                                </tr>
                                                <tr>
                                                    <th><button>addusers</button></th>
                                                    <td><input type="text" placeholder="username"></input></td>
                                                    <td><input type="text" placeholder="password"></input></td>
                                                </tr>
                                            </tbody>
                                        </table>
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