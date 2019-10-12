// import QuickStart from '../view/pages/QuickStart';
// import Cli from '../view/pages/Cli';
// import TutorialBehavior from '../view/pages/Tutorial/Behavior';
// import TutorialDatatype from '../view/pages/Tutorial/Datatype';
// import TutorialForm from '../view/pages/Tutorial/Form';
// import TutorialRequest from '../view/pages/Tutorial/Request';
// import ComponentAuth from '../view/pages/Component/Auth';
// import ComponentBanner from '../view/pages/Component/Banner';
// import ComponentButton from '../view/pages/Component/Button';
// import ComponentChoice from '../view/pages/Component/Choice';
// import ComponentDatePicker from '../view/pages/Component/DatePicker';
// import ComponentForm from '../view/pages/Component/Form';
// import ComponentFormItem from '../view/pages/Component/FormItem';
// import ComponentPicker from '../view/pages/Component/Picker';
// import ComponentView from '../view/pages/Component/View';
import QuickStart from '../pages/QuickStart';
import ComponentContainer from '../pages/Component/Container';
import ComponentIcon from '../pages/Component/Icon';
import ComponentPageStack from '../pages/Component/PageStack';

interface Mneu {
  /** 路由页面 */
  component?: React.ComponentType<any>;
  /** 标题 */
  title: string;
  /** 路径 */
  path?: string;
  /** 副标题 */
  children?: Mneu[];
}

const menus: Mneu[] = [{
  component: QuickStart,
  title: '快速开始',
  path: '/'
}, {
  title: '组件',
  children: [{
    component: ComponentContainer,
    title: 'Container 容器',
    path: '/component/container'
  }, {
    component: ComponentIcon,
    title: 'Icon 图标',
    path: '/component/icon'
  }, {
    component: ComponentPageStack,
    title: 'PageStack 页面栈',
    path: '/component/pagestack'
  }]
  // {
  //   component: ComponentBanner,
  //   title: 'Banner 轮播图',
  //   path: '/component/banner'
  // }, {
  //   component: ComponentButton,
  //   title: 'Button 按钮',
  //   path: '/component/button'
  // }, {
  //   component: ComponentChoice,
  //   title: 'Chocie 选择器',
  //   path: '/component/chocie'
  // }, {
  //   component: ComponentDatePicker,
  //   title: 'DatePicker 日期选择器',
  //   path: '/component/datepicker'
  // }, {
  //   component: ComponentForm,
  //   title: 'Form 表单',
  //   path: '/component/form'
  // }, {
  //   component: ComponentFormItem,
  //   title: 'FormItem 表单项',
  //   path: '/component/formitem'
  // }, {
  //   component: ComponentPicker,
  //   title: 'Picker 弹出式选择器',
  //   path: '/component/picker'
  // }, {
  //   component: ComponentView,
  //   title: 'View 视图',
  //   path: '/component/view'
  // }
// {
//   title: '框架',
//   children: [{
//     component: QuickStart,
//     title: '页面栈',
//     path: '/frame/pageStack'
//   },
  // {
  //   component: TutorialDatatype,
  //   title: '数据类型',
  //   path: '/tutorial/datatype'
  // }, {
  //   component: TutorialForm,
  //   title: '表单',
  //   path: '/tutorial/form'
  // }, {
  //   component: TutorialRequest,
  //   title: '发起请求',
  //   path: '/tutorial/request'
  // }
}];
// },

// ];

export default menus;