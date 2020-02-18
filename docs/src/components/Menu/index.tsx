import BSL from '../../../../typings';
import * as React from 'react';
import * as styles from './index.scss';
import * as classNames from 'classnames';

import menus from '../../config/menus';
import variable from '../../../../utils/system/variable';
import Container from '../../../../components/Container';
import Icon from '../../../../components/Icon';
import Link from '../../../../components/Link';

interface Props extends BSL.PageProps<any> {
}

interface ItemProps {
  title: string;
  arrow: boolean;
  active: boolean;
  open: boolean;
  path?: string;
  onClick: (title: string) => void;
}

interface SubProps {
  children: any;
  active: boolean;
  path?: string;
}

const triangularSvg = variable.svgRootPath + require('./triangular.svg').id;
const logoPng = require('./logo.png');

function link(path?: string): void {
  if (path) {
    Link.go({ url: path });
  }
}

const Title = (props: ItemProps) => {
  const { active, title, arrow, open, onClick, path } = props;

  return (
    <Container
      className={classNames(styles.title, {
        [styles.active]: active,
        [styles.open]: open
      })}
      justifyContent="space-between"
      onClick={() => {
        if (path) {
          link(path);
        } else {
          onClick(title);
        }
      }}
    >
      <div>{title}</div>
      {arrow && <Icon className={styles.titleArrow} src={triangularSvg} />}
    </Container>
  );
};

const Sub = (props: SubProps) => (
  <div
    className={classNames(styles.sub, {
      [styles.active]: props.active
    })}
    onClick={() => link(props.path)}
  >{props.children}</div>
);

function Menu(props: Props) {
  const pathname = props.location.pathname;
  const open = React.useMemo(() => new Map(), []);
  const [, setUpdateId] = React.useState(0);
  const toggleOpen = (title: string) => {
    const menu = open.get(title);

    if (menu !== undefined) {
      open.set(title, !menu);
    }

    setUpdateId(Date.now());
  };

  React.useEffect(() => {
    menus.forEach((item) => {
      if (item.children) {
        for (let i = 0; i < item.children.length; i++) {
          const sub = item.children[i];

          if (sub.path === pathname) {
            open.set(item.title, true);
            break;
          }
        }
      } else {
        if (item.path === pathname) {
          open.set(item.title, true);
        }
      }

      if (open.get((item.title)) === undefined) {
        open.set(item.title, false);
      }
    });
    setUpdateId(Date.now());
  }, []);


  return (
    <div className={styles.component}>
      <Container className={styles.head} alignItems="center">
        <img className={styles.logo} src={logoPng} />
      </Container>
      {menus.map((item, i) => {
        const isOpen = !!(open.get(item.title) && item.children);
        return (
          <React.Fragment key={i}>
            <Title
              title={item.title}
              path={item.path}
              arrow={!!item.children}
              active={item.children ? false : pathname === item.path}
              open={isOpen}
              onClick={toggleOpen}
            />
            {isOpen && item.children && item.children.map((subtitle, l) => (
              <Sub
                key={l}
                active={subtitle.path === pathname}
                path={subtitle.path}
              >{subtitle.title}</Sub>
            ))}
          </React.Fragment>
        );
      })}
    </div>
  );
}

export default Menu;
