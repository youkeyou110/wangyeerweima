document.addEventListener('DOMContentLoaded', async () => {
  // 获取当前标签页信息
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const url = tab.url;
  const title = tab.title;
  
  // 设置网站名称
  document.getElementById('siteName').textContent = title;
  
  // 设置网站图标
  const favicon = document.getElementById('favicon');
  favicon.src = tab.favIconUrl || 'default-favicon.png';
  
  // 生成二维码
  const qrcode = new QRCode(document.getElementById('qrcode'), {
    text: url,
    width: 200,
    height: 200,
    colorDark: '#000000',
    colorLight: '#ffffff',
    correctLevel: QRCode.CorrectLevel.H
  });
  
  // 错误处理
  favicon.onerror = () => {
    favicon.src = 'default-favicon.png';
  };
}); 