export default {
    async fetch(request, env, ctx) {
      // 从URL参数中获取数据
      const url = new URL(request.url);
      const title = url.searchParams.get('title') || '消息推送';
      const message = url.searchParams.get('message') || '无告警信息';
      const date = url.searchParams.get('date') || '无时间信息';
      const html = `
  <!DOCTYPE html>
  <html lang="zh-CN">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${title}</title>
      <style>
          * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
              font-family: 'Segoe UI', 'Microsoft YaHei', sans-serif;
          }
         
          body {
              background: linear-gradient(135deg, #0c0c2e 0%, #1a1a3e 100%);
              color: #e0f7fa;
              min-height: 100vh;
              display: flex;
              justify-content: center;
              align-items: center;
              padding: 20px;
              overflow-x: hidden;
              position: relative;
          }
         
          /* 动态背景效果 */
          body::before {
              content: '';
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              background:
                  radial-gradient(circle at 20% 30%, rgba(0, 150, 136, 0.15) 0%, transparent 50%),
                  radial-gradient(circle at 80% 70%, rgba(0, 188, 212, 0.15) 0%, transparent 50%);
              z-index: -1;
          }
         
          .container {
              max-width: 800px;
              width: 100%;
              background: rgba(18, 18, 40, 0.85);
              backdrop-filter: blur(10px);
              border-radius: 16px;
              padding: 40px;
              box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5),
                          0 0 0 1px rgba(0, 150, 136, 0.2),
                          0 0 20px rgba(0, 188, 212, 0.3);
              position: relative;
              overflow: hidden;
              transition: transform 0.3s ease, box-shadow 0.3s ease;
          }
         
          .container:hover {
              transform: translateY(-5px);
              box-shadow: 0 15px 35px rgba(0, 0, 0, 0.6),
                          0 0 0 1px rgba(0, 150, 136, 0.4),
                          0 0 30px rgba(0, 188, 212, 0.5);
          }
         
          .container::before {
              content: '';
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 4px;
              background: linear-gradient(90deg, #00bcd4, #009688);
          }
         
          .title {
              text-align: center;
              margin-bottom: 40px;
              font-size: 2.2rem;
              font-weight: 300;
              letter-spacing: 2px;
              color: #00bcd4;
              position: relative;
              padding-bottom: 15px;
          }
         
          .title::after {
              content: '';
              position: absolute;
              bottom: 0;
              left: 50%;
              transform: translateX(-50%);
              width: 100px;
              height: 2px;
              background: linear-gradient(90deg, transparent, #00bcd4, transparent);
          }
         
          .info-card {
              background: rgba(30, 30, 60, 0.7);
              border-radius: 12px;
              padding: 25px;
              margin-bottom: 25px;
              border-left: 4px solid #00bcd4;
              transition: all 0.3s ease;
              box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
          }
         
          .info-card:hover {
              transform: translateX(5px);
              background: rgba(40, 40, 70, 0.8);
              box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
          }
         
          .info-label {
              font-size: 1.3rem;
              color: #80deea;
              margin-bottom: 10px;
              display: flex;
              align-items: center;
          }
         
          .info-label::before {
              content: '';
              display: inline-block;
              width: 8px;
              height: 8px;
              border-radius: 50%;
              background: #00bcd4;
              margin-right: 10px;
          }
         
          .info-content {
              font-size: 1.2rem;
              color: #e0f7fa;
              font-weight: 500;
              word-break: break-word;
              line-height: 1.6; /* 增大行高，让软换行更清晰 */
              white-space: pre-line; /* 保留单\n作为硬换行 */
          }
         
          .pulse {
              animation: pulse 2s infinite;
          }
         
          @keyframes pulse {
              0% {
                  box-shadow: 0 0 0 0 rgba(0, 188, 212, 0.4);
              }
              70% {
                  box-shadow: 0 0 0 10px rgba(0, 188, 212, 0);
              }
              100% {
                  box-shadow: 0 0 0 0 rgba(0, 188, 212, 0);
              }
          }
         
          /* Markdown 样式覆盖，确保与主题一致 */
          .info-content h1, .info-content h2, .info-content h3, .info-content h4, .info-content h5, .info-content h6 {
              color: #00bcd4;
              margin-top: 1em;
              margin-bottom: 0.5em;
              font-weight: 400;
          }
          .info-content p {
              margin-bottom: 1em;
              line-height: 1.6;
          }
          .info-content strong {
              color: #e0f7fa;
              font-weight: 600;
          }
          .info-content em {
              color: #80deea;
              font-style: italic;
          }
          .info-content code {
              background: rgba(0, 0, 0, 0.3);
              color: #00bcd4;
              padding: 2px 4px;
              border-radius: 4px;
              font-family: 'Courier New', monospace;
          }
          .info-content pre {
              background: rgba(0, 0, 0, 0.4);
              color: #e0f7fa;
              padding: 1em;
              border-radius: 8px;
              overflow-x: auto;
              margin-bottom: 1em;
          }
          .info-content blockquote {
              border-left: 4px solid #009688;
              margin: 1em 0;
              padding-left: 1em;
              color: #80deea;
              font-style: italic;
          }
          .info-content ul, .info-content ol {
              margin-bottom: 1em;
              padding-left: 2em;
          }
          .info-content li {
              margin-bottom: 0.5em;
          }
          .info-content a {
              color: #00bcd4;
              text-decoration: none;
          }
          .info-content a:hover {
              text-decoration: underline;
          }
          .info-content table {
              width: 100%;
              border-collapse: collapse;
              margin-bottom: 1em;
              background: rgba(0, 0, 0, 0.2);
              border-radius: 8px;
              overflow: hidden;
          }
          .info-content th, .info-content td {
              padding: 0.75em;
              text-align: left;
              border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          }
          .info-content th {
              background: rgba(0, 188, 212, 0.2);
              color: #00bcd4;
          }
         
          /* 响应式设计 */
          @media (max-width: 768px) {
              .container {
                  padding: 25px;
              }
             
              .title {
                  font-size: 1.9rem;
              }
             
              .info-content {
                  font-size: 1.1rem;
              }
             
              .info-label {
                  font-size: 1.2rem;
              }
          }
         
          @media (max-width: 480px) {
              .container {
                  padding: 20px;
              }
             
              .title {
                  font-size: 1.6rem;
              }
             
              .info-content {
                  font-size: 1rem;
              }
             
              .info-card {
                  padding: 20px;
              }
             
              .info-label {
                  font-size: 1.1rem;
              }
          }
         
          /* 动态粒子背景 */
          .particles {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              z-index: -1;
              overflow: hidden;
          }
         
          .particle {
              position: absolute;
              background: rgba(0, 188, 212, 0.3);
              border-radius: 50%;
              animation: float 15s infinite linear;
          }
         
          @keyframes float {
              0% {
                  transform: translateY(0) translateX(0);
                  opacity: 0;
              }
              10% {
                  opacity: 1;
              }
              90% {
                  opacity: 1;
              }
              100% {
                  transform: translateY(-100vh) translateX(100px);
                  opacity: 0;
              }
          }
      </style>
  </head>
  <body>
      <div class="particles" id="particles"></div>
     
      <div class="container pulse">
          <!-- 标题位置，显示URL参数中的title -->
          <div class="title" id="title">${title}</div>
         
          <div class="info-card">
              <div class="info-label">通知内容</div>
              <div class="info-content" id="message">${message}</div>
          </div>
         
          <div class="info-card">
              <div class="info-label">时间</div>
              <div class="info-content" id="date">${date}</div>
          </div>
      </div>
      <script src="https://cdn.jsdelivr.net/npm/marked/lib/marked.umd.js"></script>
      <script>
          // 创建动态粒子背景
          function createParticles() {
              const particlesContainer = document.getElementById('particles');
              const particleCount = 25;
              const colors = [
                  'rgba(0, 188, 212, 0.2)',
                  'rgba(0, 150, 136, 0.2)',
                  'rgba(77, 182, 172, 0.15)'
              ];
             
              for (let i = 0; i < particleCount; i++) {
                  const particle = document.createElement('div');
                  particle.classList.add('particle');
                 
                  // 随机大小
                  const size = Math.random() * 3 + 1;
                  particle.style.width = \`\${size}px\`;
                  particle.style.height = \`\${size}px\`;
                 
                  // 随机颜色
                  const randomColor = colors[Math.floor(Math.random() * colors.length)];
                  particle.style.background = randomColor;
                 
                  // 随机位置
                  particle.style.left = \`\${Math.random() * 100}%\`;
                  particle.style.top = \`\${Math.random() * 100}%\`;
                 
                  // 随机动画延迟和持续时间
                  particle.style.animationDelay = \`\${Math.random() * 20}s\`;
                  particle.style.animationDuration = \`\${20 + Math.random() * 15}s\`;
                 
                  particlesContainer.appendChild(particle);
              }
          }
  
          // 处理 Markdown 渲染
          function renderMarkdown() {
              const messageEl = document.getElementById('message');
              if (messageEl && typeof marked !== 'undefined') {
                  const markdownText = messageEl.textContent || messageEl.innerText;
                  messageEl.innerHTML = marked.parse(markdownText);
              }
          }
  
          // 页面加载时调用
          window.onload = function() {
              createParticles();
              renderMarkdown();
          };
      </script>
  </body>
  </html>
      `;
      return new Response(html, {
        headers: {
          'content-type': 'text/html;charset=UTF-8',
        },
      });
    },
  };