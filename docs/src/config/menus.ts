import * as React from 'react';

import QuickStart from '../pages/QuickStart';
// 教程
import TutorialChangeStyle from '../pages/Tutorial/修改组件样式';
import TutorialLink from '../pages/Tutorial/路由跳转';
// 组件
import ComponentBackTop from '../pages/Component/BackTop';
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
import ComponentModal from '../pages/Component/Modal';
import ComponentPicker from '../pages/Component/Picker';
import ComponentPopup from '../pages/Component/Popup';
import ComponentPageStack from '../pages/Component/PageStack';
import ComponentRadio from '../pages/Component/Radio';
import ComponentRequestView from '../pages/Component/RequestView';
import ComponentScroll from '../pages/Component/Scroll';
import ComponentScrollLoader from '../pages/Component/ScrollLoader';
import ComponentStateView from '../pages/Component/StateView';
import ComponentTab from '../pages/Component/Tab';
import ComponentTabBar from '../pages/Component/TabBar';
import ComponentText from '../pages/Component/Text';
import ComponentTextarea from '../pages/Component/Textarea';
import ComponentToast from '../pages/Component/Toast';
import ComponentUpload from '../pages/Component/Upload';

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
  title: '教程',
  children: [{
    component: TutorialChangeStyle,
    title: '修改组件样式',
    path: '/tutorial/changestyle'
  }, {
    component: TutorialLink,
    title: '修改组件样式',
    path: '/tutorial/link'
  }]
}, {
  title: '组件',
  children: [{
    component: ComponentBackTop,
    title: 'BackTop 回到顶部',
    path: '/component/backtop'
  },{
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
    path: '/component/input'
  }, {
    component: ComponentLink,
    title: 'Link 链接',
    path: '/component/link'
  }, {
    component: ComponentMask,
    title: 'Mask 遮罩层',
    path: '/component/mask'
  }, {
    component: ComponentModal,
    title: 'Modal 模态框',
    path: '/component/modal'
  }, {
    component: ComponentPicker,
    title: 'Picker 选择框',
    path: '/component/picker'
  }, {
    component: ComponentPopup,
    title: 'Popup 弹出层',
    path: '/component/popup'
  }, {
    component: ComponentPageStack,
    title: 'PageStack 页面栈',
    path: '/component/pagestack'
  }, {
    component: ComponentRadio,
    title: 'Radio 单选框',
    path: '/component/radio'
  }, {
    component: ComponentRequestView,
    title: 'RequestView 请求视图',
    path: '/component/requestview'
  }, {
    component: ComponentScroll,
    title: 'Scroll 滚动条',
    path: '/component/scroll'
  }, {
    component: ComponentScrollLoader,
    title: 'ScrollLoader 滚动加载器',
    path: '/component/scrollloader'
  }, {
    component: ComponentStateView,
    title: 'StateView 状态视图',
    path: '/component/stateview'
  }, {
    component: ComponentTab,
    title: 'Tab 选项卡',
    path: '/component/tab'
  }, {
    component: ComponentTabBar,
    title: 'TabBar 底部导航条',
    path: '/component/tabbar'
  }, {
    component: ComponentText,
    title: 'Text 文本',
    path: '/component/text'
  }, {
    component: ComponentTextarea,
    title: 'Textarea 文本域',
    path: '/component/textarea'
  }, {
    component: ComponentToast,
    title: 'Toast 提示',
    path: '/component/toast'
  }, {
    component: ComponentUpload,
    title: 'Upload 上传',
    path: '/component/upload'
  }]
}];

export default menus;