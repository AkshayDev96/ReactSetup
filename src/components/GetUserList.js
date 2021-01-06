import React from 'react'

const GetUserList = ({users,delUser}) => {
    return (
        <div>
            <ul>
            {
                users && users.map((user)=>{
                    return (
                        <li key={user._id} onDoubleClick={()=>delUser(user._id)}>{user.name} - {user.email} </li>
                    )
                })
            }
            </ul>
        </div>
    )
}

export default GetUserList
