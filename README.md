# WxPush Skin (微信消息推送皮肤)

这是一个配合 **WxPush** 项目使用的消息推送皮肤项目。它提供了美观的 UI 界面，用于展示微信推送的消息内容。

本项目包含三个核心文件，分别适用于不同的部署环境：

## 文件说明

### 1. `index.js` (适用于 Cloudflare Workers)
- **用途**: 专为 Cloudflare Workers 设计。
- **使用方法**:
  1. 在 Cloudflare 创建一个新的 Worker。
  2. 将 `index.js` 的内容完全复制并粘贴到 Worker 的编辑器中。
  3. 保存并部署。
  4. 使用 Worker 的 URL 并在后面拼接参数即可访问。

### 2. `index_vps.js` (适用于 VPS / Node.js 环境)
- **用途**: 适用于拥有独立 VPS 或服务器，且支持 Node.js 的环境。
- **使用方法**:
  1. 确保服务器已安装 Node.js 环境。
  2. 安装依赖（如需）：`npm install express marked`。
  3. 运行服务：`node index_vps.js`。
  4. 默认监听端口（通常为 3000），可通过反向代理（如 Nginx）暴露到外网。

### 3. `index.html` (适用于 静态托管 / 代码托管平台)
- **用途**: 适用于支持静态网页托管的平台（如 GitHub Pages, Vercel 等）或任何简单的 Web 服务器。
- **使用方法**:
  1. 将 `index.html` 上传到你的托管平台。
  2. 直接访问该文件的 URL。
  3. 该文件通过前端 JavaScript 解析 URL 参数并渲染页面，无需后端支持。

## 参数说明

无论使用哪种部署方式，都支持通过 URL 参数传递显示内容：

- `title`: 消息标题 (默认为 "消息推送")
- `message`: 消息内容 (支持 Markdown 格式)
- `date`: 时间信息

**示例 URL**:
```
https://your-domain.com/?title=报警通知&message=服务器CPU负载过高&date=2023-10-27 10:00:00
```

## 分享你的皮肤 
如果你觉得你的皮肤很好，想分享出来，可以给我提PR，根目录上新建一个目录，命名为：皮肤的名称-你的名称。  
例如我的是： 静谧的夜空-饭奇骏  
里面需要包含至少2种格式文件，静态文件html(index.html)版本和workers（index.js）版本。  
