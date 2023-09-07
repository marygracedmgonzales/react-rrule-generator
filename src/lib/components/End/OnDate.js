import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import 'moment/min/locales';

import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';


import { DATE_TIME_FORMAT } from '../../constants/index';
import translateLabel from '../../utils/translateLabel';


const EndOnDate = ({
  id,
  onDate: {
    date,
    options,
  },
  handleChange,
  translations,
}) => {
  const CustomCalendar = options.calendarComponent;

  const locale = options.weekStartsOnSunday ? 'en-ca' : 'en-gb';
  const calendarAttributes = {
    'aria-label': translateLabel(translations, 'end.tooltip'),
    value: date,
    dateFormat: DATE_TIME_FORMAT,
    locale,
    readOnly: true,
  };

  return (
    <div className="col-6 col-sm-3">
      {
        CustomCalendar
          ? <CustomCalendar
            key={`${id}-calendar`}
            {...calendarAttributes}
            onChange={(event) => {
              const editedEvent = {
                target: {
                  value: event.target.value,
                  name: 'end.onDate.date',
                },
              };

              handleChange(editedEvent);
            }}
          />
          :
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
              required
              variant="inline"
              inputVariant="outlined"
              label="Select start date"
              name="startDate"
              format="dd/MM/yyyy"
              autoOk="true"
              value={calendarAttributes.value}
              inputProps={
            {
              id: `${id}-datetime`,
              name: 'end.onDate.date',
              readOnly: true,
            }
          }
              onChange={(inputDate) => {
            const editedEvent = {
              target: {
                value: moment(inputDate).format(DATE_TIME_FORMAT),
                name: 'end.onDate.date',
              },
            };

            handleChange(editedEvent);
          }}
            />
          </MuiPickersUtilsProvider>
      }
    </div>
  );
};

EndOnDate.propTypes = {
  id: PropTypes.string.isRequired,
  onDate: PropTypes.shape({
    date: PropTypes.string.isRequired,
    options: PropTypes.shape({
      weekStartsOnSunday: PropTypes.bool,
      calendarComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    }).isRequired,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  translations: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
};

export default EndOnDate;
