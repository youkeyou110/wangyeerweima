console.log('二维码扩展: content script 已加载');

// 创建二维码容器
function createQRContainer() {
  console.log('二维码扩展: 开始创建容器');
  const container = document.createElement('div');
  container.className = 'qr-container';
  
  const favicon = document.createElement('img');
  favicon.className = 'qr-favicon';
  favicon.src = document.querySelector('link[rel="icon"]')?.href || 
                document.querySelector('link[rel="shortcut icon"]')?.href || 
                `${window.location.origin}/favicon.ico`;
  
  console.log('二维码扩展: favicon地址', favicon.src);
  
  const qrWrapper = document.createElement('div');
  qrWrapper.className = 'qr-wrapper';
  
  const qrCode = document.createElement('div');
  qrCode.id = 'qrcode';
  
  const siteName = document.createElement('div');
  siteName.className = 'site-name';
  siteName.textContent = document.title;
  
  qrWrapper.appendChild(qrCode);
  qrWrapper.appendChild(siteName);
  
  container.appendChild(favicon);
  container.appendChild(qrWrapper);
  
  console.log('二维码扩展: 容器创建完成');
  return container;
}

// 初始化二维码
function initQRCode() {
  console.log('二维码扩展: 开始初始化');
  try {
    const container = createQRContainer();
    document.body.appendChild(container);
    
    const qrcode = new QRCode(document.getElementById('qrcode'), {
      text: window.location.href,
      width: 200,
      height: 200,
      colorDark: '#000000',
      colorLight: '#ffffff',
      correctLevel: QRCode.CorrectLevel.H
    });
    
    // 点击 favicon 时切换二维码显示
    const favicon = container.querySelector('.qr-favicon');
    const qrWrapper = container.querySelector('.qr-wrapper');
    
    favicon.addEventListener('click', () => {
      qrWrapper.classList.toggle('show');
    });
    
    console.log('二维码扩展: 初始化完成');
  } catch (error) {
    console.error('二维码扩展: 初始化失败', error);
  }
}

// 确保 DOM 加载完成后再初始化
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initQRCode);
} else {
  initQRCode();
} 