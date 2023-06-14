import React from 'react';
import PropTypes from 'prop-types';
import {
  Input,
  DatePicker,
} from 'antd';

import moment from 'moment';

const DataBinder = (props) => {
  const { type, ...rest } = props;


  switch (type) {
    case 'DATE':
      rest.value = moment(rest.value, 'YYYY-MM-DD').isValid() ? moment(rest.value, 'YYYY-MM-DD') : null;
      return (<DatePicker format="YYYY-MM-DD" {...rest} />);
    case 'phone':
    case 'email':
    case 'text':
    default:
      return (<Input {...rest} />);
  }
};

DataBinder.propTypes = {
  type: PropTypes.string,
  disabled: PropTypes.bool,
};

export default DataBinder;
