import React, { useMemo, useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'antd';

import getParsedValue from '../utils/getParsedValue';
import DataBinder from './DataBinder';

import { MODE } from '../constants';

import './SingleData.scss';

const HeaderButtons = React.memo(({ mode, handeMode, onSave, onReset }) => {
  if (!mode) return null;

  let buttons;
  switch (mode) {
    case MODE.VIEW:
      buttons = (
        <Button
          size="small"
          onClick={handeMode}
        >
          수정하기
        </Button>
      );
      break;
    case MODE.EDIT:
      buttons = (
        <Button.Group>
          <Button
            size="small"
            type="danger"
            onClick={() => {
              handeMode();
              onReset();
            }}
          >
            취소
          </Button>
          <Button
            size="small"
            type="primary"
            onClick={onSave}
          >
            저장
          </Button>
        </Button.Group>
      );
      break;
    default:
      buttons = null;
  }

  return (
    <div className="header-buttons">
      {buttons}
    </div>
  );
});

const SingleData = (props) => {
  const {
    isListItem,
    value,
    structures,
    onSaveValue,
  } = props;

  const [mode, setMode] = useState(MODE.VIEW);
  const handleMode = useCallback(() => {
    if (mode === MODE.VIEW) {
      setMode(MODE.EDIT);
      return;
    }
    if (mode === MODE.EDIT) {
      setMode(MODE.VIEW);
      return;
    }
    return null;
  }, [mode]);

  const [form] = Form.useForm();

  const parsedValue = useMemo(() => getParsedValue(value, structures), [value, structures]);

  return (
    <div className={`single-data ${isListItem ? 'as-list-item' : ''}`}>
      <HeaderButtons
        mode={mode}
        handeMode={handleMode}
        onSave={() => {
          const newValues = form.getFieldsValue();
          newValues.idx = parsedValue.idx
          onSaveValue(newValues);
        }}
        onReset={() => form.resetFields()}
      />
      <Form
        form={form}
        initialValues={parsedValue}
      >

        {structures.map(({ label, dataKey, type }) => {
          if (dataKey === 'idx') {
            return null;
          }

          return (
            <Form.Item key={dataKey} name={dataKey} label={label}>
              <DataBinder type={type} disabled={mode === MODE.VIEW} />
            </Form.Item>
          );
        })}
      </Form>
    </div>
  );
};

SingleData.propTypes = {
  isListItem: PropTypes.bool,
  value: PropTypes.shape({
    [PropTypes.string]: PropTypes.string,
  }),
  structures: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    dataKey: PropTypes.string,
    type: PropTypes.string,
  })),
  onSaveValue:PropTypes.func,
};

export default SingleData;
