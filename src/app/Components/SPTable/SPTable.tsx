import React, { useState, useEffect } from 'react';
import {
    Table,
    TableHeader,
    TableBody,
    TableVariant
} from '@patternfly/react-table';
import { Pagination, Modal, Button } from '@patternfly/react-core';

const SPModal = ({ profile, isDelete }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        setIsModalOpen(profile.visibility);
    }, [profile]);

    const handleModalToggle = () => {
        setIsModalOpen(!isModalOpen);
    };

    return (
        <>
            {isDelete ? (
                <Modal
                    title='Confirm Delete'
                    isOpen={isModalOpen}
                    onClose={handleModalToggle}
                    width={'50%'}
                    actions={[
                        <Button key="confirm" variant="primary" onClick={handleModalToggle}>
                            Confirm
                        </Button>,
                        <Button key="cancel" variant="link" onClick={handleModalToggle}>
                            Cancel
                        </Button>
                    ]}
                >
                    <p>You are going to delete this user. Are you sure?</p>
                </Modal>
            ) : (
                <Modal
                    title={`About ${profile.fName} ${profile.lName}`}
                    isOpen={isModalOpen}
                    onClose={handleModalToggle}
                    width={'50%'}
                    actions={[
                        <Button key="confirm" variant="primary" onClick={handleModalToggle}>
                            Ok
                        </Button>
                    ]}
                >
                    <h3>User profile:</h3>
                    <br />
                    <p>First name: {profile.fName}</p>
                    <p>Last name: {profile.lName}</p>
                    <p>Age: {profile.age}</p>
                    <p>Country: {profile.country}</p>
                </Modal>
            )}
        </>
    );
};

const SPTable = () => {
    const [profile, setProfile] = useState({});
    const [isDelete, setIsDelete] = useState(false);
    const defaultPerPage = 5;
    const [perPage, setPerPage] = useState(defaultPerPage);
    const [page, setPage] = useState(1);
    const [columns, setColumns] = useState([
        'First Name', 'Last Name', 'Age', 'Country'
    ]);
    const [defaultRows, setDefaultRows] = useState([
        { cells: ['DHN', 'Chandan', 35, 'Bangladesh'] },
        { cells: ['Sajib', 'Hasan', 35, 'Bangladesh'] },
        { cells: ['ASM', 'Saem', 37, 'USA'] },
        { cells: ['Khan', 'Rajib', 35, 'China'] },
        { cells: ['JM', 'Dana', 33, 'Canada'] },
        { cells: ['JN', 'Beny', 26, 'Bangladesh'] },
        { cells: ['RJ', 'Barno', 20, 'Ghana'] }
    ]);
    const [rows, setRows] = useState(defaultRows.slice(0, defaultPerPage));

    const handleSetPage = (_evt, newPage, perPage, startIdx, endIdx) => {
        setPage(newPage);
        setRows(defaultRows.slice(startIdx, endIdx));
    };

    const handlePerPageSelect = (_evt, newPerPage, newPage, startIdx, endIdx) => {
        setPerPage(newPerPage);
        setPage(newPage);
        setRows(defaultRows.slice(startIdx, endIdx));
    };

    const renderPagination = (variant = 'top') => {
        return (
            <Pagination
                isCompact
                itemCount={defaultRows.length}
                page={page}
                perPage={perPage}
                defaultToFullPage
                onSetPage={handleSetPage}
                onPerPageSelect={handlePerPageSelect}
                perPageOptions={[
                    { title: '3', value: 3 },
                    { title: '5', value: 5 },
                    { title: '12', value: 12 },
                    { title: '20', value: 20 }
                ]}
                titles={{
                    paginationTitle: `${variant} pagination`
                }}
            />
        );
    };

    const actionResolver = (rowData, { rowIndex }) => {
        return [
            {
                title: 'Edit Object',
                onClick: (event, rowId, rowData, extra) => {
                    setProfile({
                        fName: rowData['first-name'].title,
                        lName: rowData['last-name'].title,
                        age: rowData.age.title,
                        country: rowData.country.title,
                        visibility: true
                    });
                    setIsDelete(false);
                }
            },
            {
                title: <div>Delete Object</div>,
                onClick: (event, rowId, rowData, extra) => {
                    setIsDelete(true);
                    setProfile({ visibility: true });
                }
            }
        ];
    };

    const rowClick = (event, row, rowProps, computedData) => {
        console.log(row, rowProps, computedData);
    };

    const rows_show = rows.map(row => ({ cells: row.cells }));

    return (
        <>
            <SPModal profile={profile} isDelete={isDelete} />
            <div className="builder-content">
                <div className="col-xl-13">
                    <h2 className="actions-label">Paginated Table</h2>
                    <hr />
                </div>
                <div>
                    {renderPagination()}
                    <Table aria-label="Compact Table"
                           variant={TableVariant.compact}
                           cells={columns}
                           rows={rows_show}
                           actionResolver={ undefined }
                           dropdownPosition='right'
                           dropdownDirection='up'
                    >
                        <TableHeader />
                        <TableBody /* onRowClick={rowClick} */ />
                    </Table>
                    {renderPagination()}
                </div>
            </div>
        </>
    );
};

export default SPTable;
