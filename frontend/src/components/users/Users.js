import React, {useCallback, useEffect, useState} from "react";
import {MuiThemeProvider} from "material-ui";
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from "material-ui/Table";
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@material-ui/icons/Done';
import sendRequest from "../../http-client";
import {Button, Container, InputGroup} from "react-bootstrap";
import NavBarAdmin from "../navbars/NavBarAdmin";

const Users = ({language}) => {
    const [users, setUsers] = useState([]);
    const [editIdx, setEditIdx] = useState(-1);
    const [role_id, setRoleId] = useState(undefined);
    const [update, setUpdate] = useState(undefined);

    const getUsers = async () => {
        const token = localStorage.getItem('JWT');
        const options = {
            url: `http://localhost:3001/api/users`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        };

        const result = await sendRequest(options);

        setUsers(result.response);
    };

    useEffect(async () => {
        await getUsers();
    }, []);

    const updateRole = async (user_id, role_id) => {
        const token = localStorage.getItem('JWT');
        const options = {
            url: `http://localhost:3001/api/users/${user_id}/role/${role_id}`,
            method: 'PUT',
            headers: {
              Authorization: `Bearer ${token}`
            }
        };

        await sendRequest(options);
    };

    const updateRoleCallback = useCallback(async (user_id, role_id) => {
        if (update)
            return;

        setUpdate(true);
        await updateRole(user_id, role_id);
        setUpdate(false);

        window.location.reload();
    }, [update]);

    const header = [
        {
            name: 'user_id',
            prop: 'user_id'
        },
        {
            name: 'email',
            prop: 'email',
        },
        {
            name: 'role',
            prop: 'role'
        }
    ];

    const mapToTableRow = (user, idx) => (
        <TableRow key={`tr-${idx}`} selectable={false}>
            {header.map((y, k) =>
                <TableRowColumn key={`trc-${k}`}>
                    {editIdx === idx && y.prop === 'role'
                        ?  <InputGroup className={'justify-content-between'}>
                            <Button variant="outline-secondary" size={"sm"} onClick={() => setRoleId(1)}>ADMIN</Button>
                            <Button variant="outline-secondary" size={"sm"} onClick={() => setRoleId(2)}>SUPPORT</Button>
                            <Button variant="outline-secondary" size={"sm"} onClick={() => setRoleId(3)}>USER</Button>
                        </InputGroup>
                        : user[y.prop]}
                </TableRowColumn>
            )}
            <TableRowColumn>
                { editIdx === idx
                    ? <DoneIcon onClick={() => {
                        setEditIdx(-1);
                        setUpdate(false);
                        updateRoleCallback(user.user_id, role_id ? role_id : user.role_id).then(r => undefined);
                    }}/>
                    : <EditIcon onClick={() => setEditIdx(idx)}/> }
            </TableRowColumn>
        </TableRow>
    );

    return (
        <MuiThemeProvider>
            <div className={'login-content'}>
                <NavBarAdmin language={language}/>
                <Container className="my-5">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHeaderColumn key='thc-1' className={'font-small'}>user_id</TableHeaderColumn>
                                <TableHeaderColumn key='thc-2' className={'font-small'}>e-mail</TableHeaderColumn>
                                <TableHeaderColumn key='thc-3' className={'font-small'}>role</TableHeaderColumn>
                                <TableHeaderColumn/>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                users && users.map((user, idx) => mapToTableRow(user, idx))
                            }
                        </TableBody>
                    </Table>
                </Container>
            </div>
        </MuiThemeProvider>
    );
};

export default Users;