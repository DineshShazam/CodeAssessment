import React, { useEffect, useState } from 'react'
import { listUsers, updateStatus, updateRoleAPI } from '../../API/apiActions/admin'
import Button from '@material-ui/core/Button';
import MaterialTable from "material-table";
import { toast } from 'react-toastify';
import useLoader from '../../customHook/loadingHook';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { confirmAlert } from 'react-confirm-alert'; 

export default function Admin() {

    const [users,SetUsers] = useState([]);
    const [column,SetColumn] = useState([]);
    const [newColumn,SetNewColumn] = useState({});
    const [loading,showLoading,hideLoading] = useLoader();

    useEffect(() => {
        userDataFetch();
     },[])

    const userDataFetch = async () => {
        showLoading();
        const result = await listUsers();
        SetUsers(result);
        result.map((val) => {
            return  SetColumn(Object.keys(val));
        })
        hideLoading();
        column.map((headerName) => (
            SetNewColumn({title:headerName, field:headerName})
        ))
    }
    
    const updateRole = async (userName,email,role) => {
        const newRole = (role === 'Admin' ? 'User' : 'Admin'); 
        const res = await updateRoleAPI({userName,email,role:newRole});
        toast.success(res);
        userDataFetch();
    }

    const confirmation = ({email,userName,role}) => {
        confirmAlert({
            title: 'Confirm To Submit',
            message: `Are you sure to Update to ${(role === 'Admin') ? 'User' : 'Admin' }`,
            buttons:[
                {
                    label:'yes',
                    onClick: () => {updateRole(userName,email,role)}
                },
                {
                    label:'no',
                    onClick: () => {return}
                }
            ]
        })
    }

    const userActivation = async ({email,userName},userStatus) => {
        showLoading();
        const value = {
            userName,
            email,
            isActive:userStatus
        }
        const res = await updateStatus(value)
        toast.success(res);
        userDataFetch();
    }

    return (
        <>
        <div style={{maxWidth:"100%",marginTop:'135px'}}>
           <MaterialTable
            actions={[{
                icon:()=> <AccountCircleIcon />,
                tooltip: 'Update User Role',
                onClick:(event,rowData) => {
                    confirmation(rowData);
                }
            }]}
            
            columns={[    
            {
                title:"UserName",
                field:"userName"
            },
            {
                title:"Email",
                field:"email"
            },
            {
                title:"Role",
                field:"role"
            },
            {
                title:"Joined Date",
                field:"Joineddate"
            },
            {
                title:"User Status",
                field:"isActive",
                render: rowData => rowData.isActive === true ?
                'Active' :
                'InActive'
            },
            {
                title:"isActive",
                field:"isActive",
                render: rowData => rowData.isActive === true ? 
                <Button onClick={(e) => userActivation(rowData,'deactivate')} variant="contained" color="primary">DeActivate</Button> :
                <Button onClick={(e) => userActivation(rowData,'activate')} variant="contained" color="primary">Activate</Button>
            }]}
            data={
                users.map((val) => {
                    let tableData = val;
                    return tableData
                })        
            }
            title="User List"
          
            options={{
                // filtering: true,
                headerStyle: {color:'Black',
                            fontWeight:'bold',
                            fontSize:'15px'},
                exportButton: true,
              }}
           />
        </div>
        {loading}
        </>
    )

    // const columns: ColDef[] = [
      
    //     {
    //         newColumn
    //     }
    // ]

    // const rows = [
    //     users
    // ]
    // return (
    //     <div style={{ height: 400, width: "100%" }}>
    //         <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection />
    //     </div>
    // )
}
