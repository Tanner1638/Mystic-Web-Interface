import React from 'react';
import { Formik } from 'formik';
import  styled  from '@emotion/styled';
//import { Input, Select} from '@emotion/react';
import { updateGuildPrefix } from '../../utils/api';




export function DashboardMenu({
    history,
    guildId,
    user,
    roles,
    config,
    updatePrefix,
    updateRole,
}) {

    const defaultRoleId = config.defaultRole ? config.defaultRole : "";
    return (
        <body>
            <Formik
                initialValues={{ prefix: config.prefix, }}
                onSubmit={({ prefix }) => {
                    updatePrefix(prefix);
                }}
            >
                {
                    (props) => (
                        <form onSubmit={props.handleSubmit}>
                            <input type="text" name="prefix" onChange={props.handleChange} defaultValue={config.prefix} />
                            <a type="submit" children="Update Prefix" />

                        </form>
                    )
                }
            </Formik>
            <Formik
                initialValues={{ defaultRole: defaultRoleId}}
                onSubmit={({ defaultRole }) => { updateRole(defaultRole) }}
            >
                {
                    (props) => (
                        <form onSubmit={props.handleSubmit}>
                            <select name="defaultRole" onChange={props.handleChange}>
                                {roles.map((role) => (
                                    <option value={role.id} selected={role.id === defaultRoleId}>{role.name}</option>
                                ))}
                            </select>
                            <a type="submit" children="Update Role" />
                        </form>
                    )
                }
                
            </Formik>
        </body>
    )
}