/**
 * @Date: 2022-11-29 15:38:30
 * @LastEditors: zhaogang 156606672@qq.com
 * @LastEditTime: 2022-11-29 16:24:09
 * @FilePath: /learn-node-20221114/src/system_module/npm/1.js
 * @name: filename
 * @description: description
 */
import {basicSetup, EditorView} from "codemirror"
import {javascript} from "@codemirror/lang-javascript"
// const {basicSetup, EditorView} = require('codemirror')
// const {javascript} = require('@codemirror/lang-javascript')

const editor = new EditorView({
  doc: "console.log('hello')\n",
  extensions: [basicSetup, javascript()],
  parent: document.body
})
console.log(editor,'eee')