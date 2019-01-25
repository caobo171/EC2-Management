import React from 'react'
import { SubscribeOne } from 'unstated-x'
import selectContainer from './containers/selectContainer';
import ClipLoader from 'react-spinners/ClipLoader';
class Users extends React.Component {

    componentDidUpdate(prevProps, prevState) {
        console.log('check', prevProps, prevState)
    }

    componentDidMount() {
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
                                    (slContainer.state.instance && slContainer.state.instance.users)?(
                                        <table className="table container">
                                            <thead>
                                                <tr>
                                                    <th scope="col">#</th>
                                                    <th scope="col">Users</th>
                                                    <th scope="col">Password</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    slContainer.state.instance.users.map((e,index) => {
                                                        console.log('check ', e)
                                                        return (
                                                            <tr key={e}>
                                                                <th scope="row">{index+1}</th>
                                                                <td>{e}</td>
                                                                <td>********</td>
                                                            </tr>
                                                        )
                                                    })
                                                }

                                            </tbody>
                                        </table>
                                    ):(
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