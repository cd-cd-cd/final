# work-final

## 运行方式
安装依赖: `npm install`

运行项目: `npm start`

关于扫码部分配置： 
- whistle安装。`npm install -g whistle`
- 执行。`w2 start`
- 下载switchOmega。在把包引入的时候显示包无效,报错无效:“CRX_HEADER_INVALID”，可以把文件.crx改为rar，然后再解压.rar文件即可。
- switchOmega新建一个代理， Server为w2 start执行后生成的主机号，端口为8899
- whistle中写入inconfig中查到的 IPv4 地址以及程序运行的端口号和重新定义的域名 本次项目可以输入 `10.227.9.145:3001 test.wps.cn`
- 手机wifi设置手动修改代理，填入IPv4 地址和端口号8899

## 模块划分

- 登录注册退出模块
   - `注册` 接收用户输入的用户名，密码，以及确认密码。对用户输入的数据进行校验。用户名只能由数字、字母和汉字组成，长度为1到20位。密码在6-16位。且在前端判断密码和确认密码是否一致。注册成功跳转到登录页面。
   
   - `登录` 接收用户输入的用户名和密码，同样进行和在注册页面一样的检验。登录成功跳转到表单管理页面。如果没有注册过，可以通过点击 `尚未注册` 链接跳转到注册页面。
   
   - `退出` 点击退出，弹出 `modal` 弹窗确认是否要退出。
  
- 表单列表页面
   - 提供入口进入 `新建表单`页面， `个人中心` 页面，提供 `退出` 功能。
   
   -  提供分页器分页加载数据。
   
   -  每次操作数据后会有刷新功能，重新加载数据。
   
   - 渲染登录用户建立过的表单。每份表单都会展示 `表单名称`, `创建时间`, `状态`以及会有 `是否标星`, `删除` 功能。表单分别有三个状态。分别为 `草稿`, `收集`, `结束`。
      - `草稿` 提供 `发布`功能，将草稿状态表单更新为发布状态表单 ，提供`编辑`入口进入草稿编辑页面。
      
      - `收集` 提供 `停止`功能，将收集状态表单更新为结束收集状态表单。提供 `分享`，`查看问题`入口。
      
      - `结束`， 提供 `查看问题入口`。  
  
- 新建表单页面
   - 新建表单页面可以分为三个部分，分别为左侧按钮部分，中间题目编辑部分，右侧表单保存，创建页面。
     - 左侧按钮部分基本按钮，模板按钮，常用题型由数据请求得到。基本模板悬浮会有气泡卡片展示题型格式。
    
     - 中间题目编辑部分，点击题目可以显示 `切换题型`, `复制`, `必填`, `删除`, `添加为常用题`功能。
    
     - 右侧提供 `预览表单`, `保存为草稿`, `完成创建` 功能。
  
  - 点击header的回退图标，会检测是否操作了内容，如果操作了并且没有保存为草稿，则会出现 `modal` 弹窗题型是否保存草稿。

- 数据详情页面
   - `表单统计` 提供分页查看收集到的表单。
   
   - `表单问题页面` 提供表单的预览以及 `填写表单` 页面入口。当表单已经停止收集，会提醒无法填写。
   
   - `分享页面` 提供二维码，下载二维码，复制二维码功能。当表单处于收集状态，扫描二维码可以跳转到填写表单页面。如果表单处于结束状态。扫描二维码内容为 ‘表单已停止收集’ 。
  
- 个人主页页面
   - 会给用户加上默认头像。
   
   - 渲染用户信息。
   
   - 提供修改密码，修改头像， 修改用户名功能。

## 路由设计

- 项目最深是二级路由
   - 一级路由包括 `/login` 标识登录页面，`/register` 标识注册页面， `/home` 标识表单管理页面，`/form` 标识新建表单页面, `/preview` 标识表单预览页面, `/detail` 标识填写详情页面, `/fill` 标识填写表单页面, `/person` 标识个人信息页面。
   - 二级路由包括 `/detail/analysis` , `/detail/question` , `/detail/share` 分别标识数据统计页面，问题页面，分享页面。

## 编码风格
- 为项目配置了eslint。编码风格使用Standard: https://github.com/standard/standard。 没有添加额外配置


## 项目组成
```|-- undefined
    |-- .env
    |-- .eslintrc.js
    |-- .gitignore
    |-- package-lock.json
    |-- package.json
    |-- README.md
    |-- tsconfig.json
    |-- public
    |-- src
        |-- App.css
        |-- App.tsx  //配置了路由
        |-- index.css
        |-- index.tsx
        |-- logo.svg
        |-- react-app-env.d.ts
        |-- reportWebVitals.ts
        |-- setupTests.ts
        |-- api
        |   |-- auth.ts     // 登录注册退出等接口
        |   |-- form.ts     // 关于表单的接口
        |   |-- problem.ts  // 关于问题的接口
        |   |-- user.ts     // 关于用户信息接口
        |-- assets
        |   |-- imgs
        |-- components
        |   |-- Btn
        |   |   |-- BaseBtn       // 基本题按钮
        |   |   |-- StarBtn       // 常用题按钮
        |   |   |-- TemplateBtn   // 模板按钮
        |   |-- Form
        |   |   |-- AddOptionBtn   // 可以增加选项的功能组件
        |   |   |-- BaseInput      // 填空题、日期题、时间题、打分题组件
        |   |   |-- BaseMultiInput  // 下拉题、多选题、单选题组件
        |   |   |-- FilledItem       // 表单填写完后的问题组件
        |   |   |-- FillQuestion     // 填写时的问题组件
        |   |   |-- PreviewQuestion  // 预览时的题目组件           
        |   |-- HeaderForm         // 新建表单header
        |   |-- HeaderUser         // header右侧用户信息入口
        |   |-- LoginHeader        // 登录header
        |   |-- PreviewForm        // 预览表单组件
        |   |-- QuestionFunc       // 点击题目出现底部功能组件
        |   |-- ResForm            // 填写后的题目组件
        |-- hooks 
        |   |-- store.ts           // context
        |   |-- useBasicProblem.ts  // 用于获得基础题目
        |   |-- useBtnType.ts       // 获得题目类型
        |   |-- useForm.ts          // 关于表单的功能
        |   |-- useListStar.ts      // 获得常用题
        |   |-- useLocal.ts         // 用于state持久化
        |   |-- useQuesRes.ts       // 填写表单题目
        |   |-- useQuestions.ts     // 新建表单题目功能
        |   |-- useStar.ts          // 关于常用题
        |   |-- useTemplateQuestion.ts  // 关于生成模板题目
        |   |-- useType.ts          // 题目类型分类   
        |-- libs
        |   |-- model.ts         // 定义类型
        |-- pages
        |   |-- FillDetail       
        |   |   |-- Analysis     // 表单详情页面
        |   |   |-- Question     // 问题页面
        |   |   |-- Share        // 分享页面
        |   |-- FillForm       // 填写表单页面
        |   |-- Home           // 主页面
        |   |-- Login          // 登录页面
        |   |-- NewForm        // 新建表单页面
        |   |   |-- CreateLeft
        |   |   |-- CreateMiddle
        |   |   |-- CreateRight
        |   |-- PerCenter      // 个人中心页面
        |   |-- Preview        // 预览页面
        |   |-- Register       // 登录页面
        |-- utils
            |-- request.ts     // 封装axios
  ```
## 遇到的问题
1. 阻止事件冒泡
   在创建表单页面创建题目后，点击题目出现题目底部的功能区域，点击题目外部，题目底部功能部分消失。我是通过保存点击的题目的id，来判断是否渲染题目底部功能。点击题目外部，id设为‘’。由于点击题目最终会因为冒泡事件，触发到外部，将id设为''，因此要阻止冒泡事件。在事件中添加 `e.stopPropagation()`。

2. tooltip改变样式
   无法修改tooltip的文字颜色和大小。最终使用Popover气泡卡片代替。

3. 嵌套路由子路由内容无法显示
   - 原因大概是因为父路由内容覆盖了子路由。所以需要 <Outlet />用来占位。

4. 关闭modalform清空
  - 当我们关闭 `modal` 时希望modal的数据进行清除，可以使用 `destroyOnClose` 属性。
  - 当 `modal` 中嵌套了 `Form` 的时候，同样希望form的数据可以清除，可以使用 `form.resetFields()`。

5. 复制链接
  - 复制链接使用了库`copy-to-clipboard`，
  - `import copy from 'copy-to-clipboard'`
  - `copy('放入想要复制的内容')`

6. 二维码传参
  - 扫二维码的时候发现无法渲染内容，后来发现原来的填写表单页面的表单id是通过state传值得到的，但是由于state刷新数据就会消失，所以是将数据存在了localStorage中。而二维码扫出来的页面无法取到本地的数据，所以造成了数据无法请求。最终利用query传值解决。本来想要useHistory()这个钩子，但是好像发现这个钩子废弃掉了。目前可以使用useSearchParams()取出参数。
  - `const { searchParams } = useSearchParams()`
  - `const id = searchParams.get('id')`

7. 路由传参，页面刷新丢失。
     ```js
      const getState = (state?: IState) => {
                let currentState: IState
                if (state) {
                  currentState = state
                  localStorage.setItem('state', JSON.stringify(state))
                } else {
                  currentState = JSON.parse(localStorage.getItem('state') as string)
                }
                return currentState
              }
      ```
使用state传递参数，刷新参数就会丢失。最后结合localStorage解决。进入页面，如果state不为空则将state存起来，否则就从local取出。

8. 下载二维码

      ```js
            const clickDownload = () => {
                      const Qr = document.getElementById('qrCode')! as HTMLCanvasElement
                      const a = document.createElement('a')
                      a.download = '二维码'// 设置下载的文件名
                      a.href = Qr.toDataURL('image/png')
                      document.body.appendChild(a)
                      a.click()
                      a.remove()// 下载之后把创建的元素删除
                    }
      ```
- 可以创建一个节点，给其附上链接和文件名，然后再将这个节点放在body中，点击这个节点然后再移除这个节点。


