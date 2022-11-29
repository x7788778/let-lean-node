/**
 * @Date: 2022-11-29 15:38:30
 * @LastEditors: zhaogang 156606672@qq.com
 * @LastEditTime: 2022-11-29 15:44:14
 * @FilePath: /learn-node-20221114/src/system_module/npm/1.js
 * @name: filename
 * @description: description
 */
import {basicSetup, EditorView} from "codemirror"
import {javascript} from "@codemirror/lang-javascript"

new EditorView({
  doc: "console.log('hello')\n",
  extensions: [basicSetup, javascript()],
  parent: document.body
})