export default {
    async fetch(request, env, ctx) {
      // 从URL参数中获取数据
      const url = new URL(request.url);
      const title = url.searchParams.get('title') || '消息推送';
      const message = url.searchParams.get('message') || '无告警信息';
      const date = url.searchParams.get('date') || '无时间信息';
      const html = `
<!DOCTYPE html>
<html lang="zh-CN" dir="ltr">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>消息推送</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: "Courier New", monospace;
            background: #000; color: #00ff00; min-height: 100vh;
            overflow-x: hidden; position: relative;
            display: flex; justify-content: center; align-items: center;
        }
        .matrix-bg { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: #000; z-index: -1; }
        .matrix-text { position: fixed; top: 20px; right: 20px; color: #00ff00; font-family: "Courier New", monospace; font-size: 0.8rem; opacity: 0.6; }

        .terminal {
            width: 90%; max-width: 800px; height: 500px;
            background: rgba(0, 0, 0, 0.9); border: 2px solid #00ff00;
            border-radius: 8px; box-shadow: 0 0 30px rgba(0, 255, 0, 0.5);
            position: relative; z-index: 1; overflow: hidden;
        }

        .terminal-header {
            background: rgba(0, 20, 0, 0.8); padding: 10px 15px;
            border-bottom: 1px solid #00ff00; display: flex; align-items: center;
        }

        .terminal-buttons {
            display: flex; gap: 8px;
        }

        .terminal-button {
            width: 12px; height: 12px; border-radius: 50%;
            background: #ff5f57; border: none;
        }
        .terminal-button:nth-child(2) { background: #ffbd2e; }
        .terminal-button:nth-child(3) { background: #28ca42; }

        .terminal-title {
            margin-left: 15px; color: #00ff00; font-size: 14px; font-weight: bold;
        }

        .terminal-body {
            padding: 20px; height: calc(100% - 50px);
            overflow-y: auto; font-size: 14px; line-height: 1.4;
        }

        .terminal-line {
            margin-bottom: 8px; display: flex; align-items: center;
        }

        .terminal-prompt {
            color: #00ff00; margin-right: 10px;
            font-weight: bold;
        }

        .terminal-output {
            color: #00aa00; margin: 5px 0;
        }

        .terminal-error {
            color: #ff4444; margin: 5px 0;
        }

        .terminal-success {
            color: #44ff44; margin: 5px 0;
        }

        /* 适配中间的通知内容 */
        .info-card {
            background: rgba(0, 30, 30, 0.85); 
            border-radius: 12px;
            padding: 25px;
            margin-bottom: 25px;
            border-left: 4px solid #00ff00;
            transition: all 0.3s ease;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        }

        .info-card:hover {
            transform: translateX(5px);
            background: rgba(0, 128, 0, 0.9); 
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
            line-height: 1.6;
            white-space: pre-line;
        }

        /* 响应式设计 */
        @media (max-width: 768px) {
            .terminal {
                width: 100%; max-width: 100%;
                height: auto;
            }
        }
    </style>
</head>
<body>
    <div class="matrix-bg"></div>
    <div class="matrix-text">WeiXin</div>

    <div class="terminal">
        <div class="terminal-header">
            <div class="terminal-buttons">
                <div class="terminal-button"></div>
                <div class="terminal-button"></div>
                <div class="terminal-button"></div>
            </div>
            <div class="terminal-title">消息推送</div>
        </div>
        <div class="terminal-body">
            <div class="info-card">
                <div class="info-label">通知内容</div>
                <div class="info-content" id="message">无告警信息</div>
            </div>
            <div class="info-card">
                <div class="info-label">时间</div>
                <div class="info-content" id="date">无时间信息</div>
            </div>
        </div>
    </div>

    <script>
        function getUrlParams() {
            const urlParams = new URLSearchParams(window.location.search);
            return {
                title: urlParams.get('title') || '消息推送',
                message: urlParams.get('message') || '无告警信息',
                date: urlParams.get('date') || '无时间信息'
            };
        }

        function fillContent() {
            const params = getUrlParams();
            document.getElementById('message').textContent = params.message;
            document.getElementById('date').textContent = params.date;
        }

        window.onload = function() {
            fillContent();
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