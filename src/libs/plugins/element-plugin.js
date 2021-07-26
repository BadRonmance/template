/*
 * @Description:
 * @Version: 1.0.0
 * @Author: 张泽锋
 * @LastEditors: 张泽锋
 * @Date: 2020-07-07 14:32:01
 */
import Vue from "vue";

import {
  Button,
  Tabs,
  TabPane,
  Select,
  Input,
  Row,
  Col,
  Card,
  Image,
  Menu,
  MenuItem,
  MenuItemGroup,
  Submenu,
  Dialog,
  Tooltip,
  Form,
  FormItem,
  RadioGroup,
  Radio,
  Loading,
  MessageBox,
  Notification,
  Message,
  Breadcrumb,
  BreadcrumbItem,
  Table,
  TableColumn,
  Pagination,
  Option,
  DatePicker,
  Switch,
  Cascader,
  Checkbox,
  InputNumber,
  TimePicker,
  Tree,
  Link,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  TimeSelect,
  Upload,
  Progress,
} from "element-ui";

Vue.prototype.$loading = Loading.service;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;

const components = [
  Button,
  Select,
  Input,
  Tabs,
  TabPane,
  Row,
  Col,
  Card,
  Image,
  Menu,
  MenuItem,
  MenuItemGroup,
  Submenu,
  Dialog,
  Tooltip,
  Form,
  FormItem,
  RadioGroup,
  Radio,
  Breadcrumb,
  BreadcrumbItem,
  Table,
  TableColumn,
  Loading,
  Pagination,
  Option,
  DatePicker,
  Switch,
  Cascader,
  Checkbox,
  InputNumber,
  TimePicker,
  Tree,
  Link,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  TimeSelect,
  Upload,
  Progress,
];

register(components);

function register(cmpList) {
  cmpList.forEach((cmp) => {
    Vue.use(cmp);
  });
}
