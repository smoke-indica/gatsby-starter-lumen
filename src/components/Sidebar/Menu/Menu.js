// @flow strict
import React from 'react';
import { Link } from 'gatsby';
import styles from './Menu.module.scss';

type Props = {
  menu: {
    label: string,
    path: string
  }[]
};

const buttonCSS = {
  'background-color': '#4CAF50',
  'border': 'none',
  'color': 'white',
  'padding': '10px',
  'textAlign': 'center',
  'textDecoration': 'none',
  'display': 'inline-block',
  'fontSize': '16px',
  'margin': '4px 2px',
  'borderRadius': '2px',
  'boxShadow': '2px 2px 2px 2px #8DB98A'
}

const Menu = ({ menu }: Props) => (
  <nav className={styles['menu']}>
    <ul className={styles['menu__list']}>
      {menu.map((item) => (
        <li className={styles['menu__list-item']} key={item.path}>
          <Link
            to={item.path}
            className={styles['menu__list-item-link']}
            activeClassName={styles['menu__list-item-link--active']}
          >
            <button style={buttonCSS}>
              {item.label}
            </button>
          </Link>
        </li>
      ))}
    </ul>
  </nav>
);

export default Menu;
