// import yj from 'yuejia/typings';
// import * as React from 'react';
// import * as style from './index.scss';
// import * as classNames from 'classnames';
// import config from '../../../config';
// import Container from 'yuejia/component/Container';
// import Icon from 'yuejia/component/Icon';
// import Link from 'yuejia/component/Link';

// interface Props extends yj.PageProps<any> {
// }

// interface State {
//   open: Map<string, boolean>;
//   lastPathname: string;
// }

// interface ItemProps {
//   title: string;
//   arrow: boolean;
//   active: boolean;
//   open: boolean;
//   path?: string;
//   onClick: (title: string) => void;
// }

// interface SubProps {
//   children: any;
//   active: boolean;
//   path?: string;
// }

// function link(path?: string): void {
//   if (path) {
//     Link.go(path);
//   }
// }

// const Title = (props: ItemProps) => {
//   const { active, title, arrow, open, onClick, path } = props;

//   return (
//     <Container
//       className={classNames(style.title, {
//         [style.active]: active,
//         [style.open]: open
//       })}
//       justifyContent="space-between"
//       onClick={() => {
//         if (path) {
//           link(path);
//         } else {
//           onClick(title);
//         }
//       }}
//     >
//       <div>{title}</div>
//       {arrow && <Icon className={style.titleArrow} src={config.svgFiles.triangular} />}
//     </Container>
//   );
// };

// const Sub = (props: SubProps) => (
//   <div
//     className={classNames(style.sub, {
//       [style.active]: props.active
//     })}
//     onClick={() => link(props.path)}
//   >{props.children}</div>
// );

// class Menu extends React.Component<Props, State> {

//   public state: State = {
//     open: new Map(),
//     lastPathname: this.props.location.pathname
//   };

//   public static getDerivedStateFromProps(nextProps: Props, prevState: State): State | null {
//     config.menus.forEach((item) => {
//       if (item.children) {
//         for (let i = 0; i < item.children.length; i++) {
//           const sub = item.children[i];

//           if (sub.path === nextProps.location.pathname) {
//             prevState.open.set(item.title, true);
//             break;
//           }
//         }
//       } else {
//         if (item.path === nextProps.location.pathname) {
//           prevState.open.set(item.title, true);
//         }
//       }

//       if (prevState.open.get((item.title)) === undefined) {
//         prevState.open.set(item.title, false);
//       }
//     });

//     return {
//       open: prevState.open,
//       lastPathname: nextProps.location.pathname
//     };
//   }

//   private toggleOpen = (title: string) => {
//     const menu = this.state.open.get(title);

//     if (menu !== undefined) {
//       this.state.open.set(title, !menu);
//     }

//     this.setState({
//       open: this.state.open
//     });
//   }

//   public render(): JSX.Element {
//     const pathname = this.props.location.pathname;
//     return (
//       <div className={style.component}>
//         <Container className={style.head} alignItems="center">
//           <img className={style.logo} src={config.imgFiles.logo} />
//         </Container>
//         {config.menus.map((item, i) => {
//           const isOpen = !!(this.state.open.get(item.title) && item.children);
//           return (
//             <React.Fragment key={i}>
//               <Title
//                 title={item.title}
//                 path={item.path}
//                 arrow={!!item.children}
//                 active={item.children ? false : pathname === item.path}
//                 open={isOpen}
//                 onClick={this.toggleOpen}
//               />
//               {isOpen && item.children && item.children.map((subtitle, l) => (
//                 <Sub
//                   key={l}
//                   active={subtitle.path === pathname}
//                   path={subtitle.path}
//                 >{subtitle.title}</Sub>
//               ))}
//             </React.Fragment>
//           );
//         })}
//       </div>
//     );
//   }
// }

// export default Menu;
