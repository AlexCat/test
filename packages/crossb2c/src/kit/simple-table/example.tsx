import { jsx, Theme } from '@emotion/react'
import styled from '@emotion/styled'
import React from 'react'

import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableHeaderCell,
    TableCell
} from './index'

const data = [
    { id: 1, name: 'a', email: 'a@email.com' },
    { id: 2, name: 'b', email: 'b@email.com' },
    { id: 3, name: 'c', email: 'c@email.com' }
]

function Example() {

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHeaderCell>Имя</TableHeaderCell>
                    <TableHeaderCell>Email</TableHeaderCell>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map(x => (
                    <TableRow key={x.id}>
                        <TableCell>{x.name}</TableCell>
                        <TableCell>{x.email}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

export {
    Example
}