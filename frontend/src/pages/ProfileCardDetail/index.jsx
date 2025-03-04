import React, {
  useState, useCallback, useEffect, useMemo,
} from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Button } from 'antd';

import useAxios from '../../context/hooks/useAxios';

import SingleData from './components/SingleData';
import ListData from './components/ListData';

import './index.scss';

const ProfileCardDetail = (props) => {
  const { profileCardId } = props.match.params;

  const [profileDetail, setProfileDetail] = useState();

  const { request } = useAxios();
  const history = useHistory();

  const fetchProfileCardDetail = useCallback(async (fetchTargetId) => {
    // TODO: Change your api
    const response = await request({
      method: 'GET',
      url: `/api/user/userInfo/${fetchTargetId}`,
    });
    
    if (!response || !response.data) return;

    setProfileDetail(response.data);
  }, []);

  useEffect(() => {
    fetchProfileCardDetail(profileCardId);
  }, [profileCardId]);

  const deleteProfileCard = useCallback(async () => {
    // TODO: Change your api
    const response = await request({
      method: 'POST',
      url: '/api/user/deleteUser',
      data: { profileCardId }
    });
    if (!response) return;

    history.push('/');
  }, [profileCardId]);

  const singleDataProps = useMemo(() => {

    if (!profileDetail || !profileDetail.userStructures) return {};

    const { value, valueStructures: valueStructures } = profileDetail.userStructures;

    const singleDataStructures = valueStructures.filter(({ type, parentDataKey }) => type !== 'list' && !parentDataKey);

    return {
      value,
      structures: singleDataStructures,
    };
  }, [profileDetail]);

  const listDataProps = useMemo(() => {

    
    if (!profileDetail || !profileDetail.cardDataStructures) return {};

    const { valueList, valueStructures: structures } = profileDetail.cardDataStructures;

    return {
      valueList,
      structures,
    };
  }, [profileDetail]);

  const onSaveValue = useCallback(async (newValue, parentDataKey, itemIndex) => {
    const response = await request({
      method: 'POST',
      url: '/api/user/updateUser',
      data: {
        newValue,
        parentDataKey,
        itemIndex,
      },
    });

    if (!response) return;

    fetchProfileCardDetail(profileCardId);
  }, [profileCardId]);

  const onSaveListValue = useCallback(async (newValue) => {
    const response = await request({
      method: 'POST',
      url: '/api/profile/addProfile',
      data: {
        newValue,
        profileCardId
      },
    });

    if (!response) return;
    window.location.reload();
  }, []);

  if (!profileDetail) return null;

  return (
    <div className="profile-card-detail">
      <div className="header">
        <h1>{profileDetail.name}</h1>
        <Button
          type="danger"
          onClick={deleteProfileCard}
        >
          연락처 삭제
        </Button>
      </div>
      <div className="data-section">
        <SingleData
          {...singleDataProps}
          onSaveValue={onSaveValue}
        />
        { <ListData
          {...listDataProps}
          onSaveValue={onSaveValue}
          onSaveListValue={onSaveListValue}
        /> }
      </div>
    </div>
  );
};

ProfileCardDetail.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      profileCardId: PropTypes.string,
    }),
  }),
};

export default ProfileCardDetail;
