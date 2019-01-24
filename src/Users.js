import React from 'react'


class Users extends React.Component {
    render() {
        console.log('check vao')
        return (
            <table class="table container" >
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">InstanceID</th>
                        <th scope="col">{this.props.instanceId}</th>
                        <th scope="col">Handle</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">1</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                    </tr>
                    <tr>
                        <th scope="row">2</th>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                    </tr>
                    <tr>
                        <th scope="row">3</th>
                        <td>Larry</td>
                        <td>the Bird</td>
                        <td>@twitter</td>
                    </tr>
                </tbody>
            </table>
        )
    }
}

export default Users