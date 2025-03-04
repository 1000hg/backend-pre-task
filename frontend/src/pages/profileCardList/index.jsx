import React, {
  useEffect, useCallback, useState,
} from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Pagination,
} from 'antd';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

import useAxios from '../../context/hooks/useAxios'
import { DEFAULT_COLUMN_DEFINITIONS, SIDE_BAR_SETTING } from './constants';

import CreateProfileCardModal from './components/CreateProfileCardModal';

import './index.scss';

const DetailPageLink = React.memo((props) => {
  const { data: { idx, name } } = props;
  if (!idx) return null;

  return (
    <Link to={`/${idx}`}>
      {name}
    </Link>
  );
});

const ProfileCardList = () => {
  const [rowData, setRowData] = useState([]);
  const [columnDefs, setColumnDefs] = useState([
    
  ]);
  const [paginationInfo, setPaginationInfo] = useState({
    current: 1,
    total: 0,
    pageSize: 10,
    locale: { items_per_page: '명' },
  });
  const [orderInfo, setOrderInfo] = useState(['name', 'asc']);
  const [visibleCreateProfileCardModal, setVisibleCreateProfileCardModal] = useState(false);

  const openCreateProfileCardModal = useCallback(() => setVisibleCreateProfileCardModal(true), []);
  const closeCreateProfileCardModal = useCallback(() => setVisibleCreateProfileCardModal(false), []);

  const { request } = useAxios();

  const listFetchDependencies = [paginationInfo, orderInfo, columnDefs];
  const fetchProfileList = useCallback(async (
    targetPage, sort = ['name', 'asc'],
  ) => {
    // TODO: Change your api
    const response = await request({
      method: 'GET',
      url: '/api/user/userList',
      params: {
        current: targetPage || paginationInfo.current,
        columns: columnDefs.map(({ field }) => field),
        pageSize: paginationInfo.pageSize,
        sort: sort || orderInfo,
      },
    });


    if (!response || !response.data) return;
    

    setRowData(response.data.rows);
    
    setPaginationInfo(prev => ({
      ...prev,
      current: targetPage || prev.current,
      total: response.data.count,
    }));


    setOrderInfo(sort);
  }, listFetchDependencies);

  const fetchAvailableColumns = useCallback(async () => {
    // TODO: Change your api
    const response = await request({
      method: 'GET',
      url: '/api/user/userColumnList',
    });
    
    if (!response || !response.data) return;

    setColumnDefs([
      {
        headerName: '이름',
        field: 'name',
        cellClass: 'default-cell',
        comparator: () => 0,
        cellRenderer: DetailPageLink,
      },
      ...response.data.map(({ label, dataKey, parentDataKey }) => ({
        headerName: label,
        field: parentDataKey ? `${parentDataKey}_${dataKey}_0` : dataKey,
        cellClass: 'default-cell',
        comparator: () => 0,
      })),
    ]);

  }, []);

  useEffect(() => {
    fetchProfileList();
    fetchAvailableColumns();
  }, []);

  const onCreateProfileCard = useCallback(async (createTargetName) => {
    // TODO: Change your api
    const response = await request({
      method: 'POST',
      url: '/api/user/addUser',
      data: { createTargetName }
    });
    if (!response || !response.success) return;

    await fetchProfileList(paginationInfo.current);
    closeCreateProfileCardModal();
  }, [paginationInfo, orderInfo]);

  const handleSortChange = useCallback((e) => {
    const columnState = e.columnApi.getColumnState();
    const sortedColumn = columnState.find(({ sort }) => !!sort);
    if (!sortedColumn) {
      fetchProfileList();
      return;
    }
    const { colId, sort } = sortedColumn;
    console.log(paginationInfo.current)

    setPaginationInfo(prevPaginationInfo => ({
      ...prevPaginationInfo,
      current: prevPaginationInfo.current,
    }));

    fetchProfileList(undefined, [colId, sort]);
  }, []);

  const handlePageChange = useCallback(
    (page, pageSize) => {
      
      const sort = orderInfo;
      fetchProfileList(page, sort);
    },
    [fetchProfileList, orderInfo]
  );

  return (
    <div className="profile-card-list">
      <div className="header">
        <h1>연락처 목록</h1>
        <Button
          type="primary"
          onClick={openCreateProfileCardModal}
        >
          새로운 연락처 추가
        </Button>
      </div>
      <div className="ag-theme-alpine">
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={DEFAULT_COLUMN_DEFINITIONS}
          onSortChanged={handleSortChange}

          suppressContextMenu
          sideBar={SIDE_BAR_SETTING}
          enableRangeSelection
          rowSelection="multiple"
          domLayout="autoHeight"
        />
      </div>
      <Pagination
        className="pagination"
        {...paginationInfo}
        onChange={handlePageChange}
      />

      <CreateProfileCardModal
        visible={visibleCreateProfileCardModal}
        onClose={closeCreateProfileCardModal}
        onCreate={onCreateProfileCard}
      />
    </div>
  );
};

export default ProfileCardList;
