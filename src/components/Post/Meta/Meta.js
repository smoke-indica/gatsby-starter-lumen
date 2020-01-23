// @flow strict
import React from 'react';
import moment from 'moment';
import styles from './Meta.module.scss';

type Props = {
  date: string
};

const Meta = ({ date }: Props) => (
  <div className={styles['meta']}>
    <h4 className={styles['meta__date']}>Published {moment(date).format('D MMM YYYY')}</h4>
  </div>
);

export default Meta;
