import React from 'react'
import ReactDOM from 'react-dom'
import hello from './hello'
import NameInput from './NameInput.jsx';
// 引入样式文件
import 'antd/dist/antd.less';
// import "mytheme.less"; 
// import './style.css'
//调用这个方法
// hello()
// document.write('大傻逼')



ReactDOM.render(
  <NameInput />,
  document.getElementById('container')
);