import QuickStart from '../pages/QuickStart';
import ComponentCarousel from '../pages/Component/Carousel';
import ComponentChoice from '../pages/Component/Choice';
import ComponentContainer from '../pages/Component/Container';
import ComponentCountdown from '../pages/Component/Countdown';
import ComponentDatePicker from '../pages/Component/DatePicker';
import ComponentDownload from '../pages/Component/Download';
import ComponentForm from '../pages/Component/Form';
import ComponentIcon from '../pages/Component/Icon';
import ComponentImage from '../pages/Component/Image';
import ComponentInput from '../pages/Component/Input';
import ComponentLink from '../pages/Component/Link';
import ComponentMask from '../pages/Component/Mask';
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
    component: ComponentCarousel,
    title: 'Carousel 走马灯',
    path: '/component/carousel'
  }, {
    component: ComponentChoice,
    title: 'Choice 选择',
    path: '/component/choice'
  }, {
    component: ComponentContainer,
    title: 'Container 容器',
    path: '/component/container'
  }, {
    component: ComponentCountdown,
    title: 'Countdown 倒计时',
    path: '/component/countdown'
  }, {
    component: ComponentDatePicker,
    title: 'DatePicker 日期选择器',
    path: '/component/datepicker'
  }, {
    component: ComponentDownload,
    title: 'Download 下载',
    path: '/component/download'
  }, {
    component: ComponentForm,
    title: 'Form 表单',
    path: '/component/form'
  }, {
    component: ComponentIcon,
    title: 'Icon 图标',
    path: '/component/icon'
  }, {
    component: ComponentImage,
    title: 'Image 图片',
    path: '/component/image'
  }, {
    component: ComponentInput,
    title: 'Input 输入框',
    path: '/component/intpu'
  }, {
    component: ComponentLink,
    title: 'Link 链接',
    path: '/component/link'
  }, {
    component: ComponentMask,
    title: 'Mask 遮罩层',
    path: '/component/mask'
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