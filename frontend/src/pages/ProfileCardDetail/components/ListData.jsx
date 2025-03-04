import {React, useState} from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';


import SingleData from './SingleData';

import './ListData.scss';

const ListData = (props) => {
  const {
    valueList,
    structures,
    onSaveValue,
    onSaveListValue
  } = props;

  const [formData, setFormData] = useState(null);

  const handleSaveValue = (values) => {
    setFormData(values);
  };


  return structures.map(({ label, dataKey, childrenStructures }, index) => {

    const matchingValue = valueList.find(item => dataKey in item);
    const childrenValues = matchingValue ? Object.values(matchingValue)[0] : null;

    return (
      <div
        key={dataKey}
        className="list-data"
      >
        <div className="list-data-header">
          <h3>{label}</h3>
        </div>
        <div className="list-items">
        {childrenValues ? (
            childrenValues.map(childrenValue => (
                <SingleData
                  key={JSON.stringify(childrenValue)}
                  isListItem
                  value={childrenValue}
                  structures={childrenStructures}
                  onSaveValue={onSaveValue}
                />
            ))
        ) : <SingleData
              isListItem
              structures={childrenStructures}
              getDataKey = "data0"
              handleSaveValue = {handleSaveValue}
            />
          }

          {dataKey == "data0" ? <Button
            className="add-new-list-item"
            block
            onClick={() => onSaveListValue(formData)}
          >
            새로운 항목 추가하기
          </Button> : ""

          }
          
        </div>
      </div>
    );
  });

};

ListData.propTypes = {
  valueList: PropTypes.shape({
    [PropTypes.string]: PropTypes.string,
  }),
  structures: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    dataKey: PropTypes.string,
    type: PropTypes.string,
  })),
  onSaveValue:PropTypes.func,
  onSaveListValue:PropTypes.func,
};

export default ListData;