let IP;
const IP_Box = document.querySelector('.IP');
const copy_hint = document.querySelector('.copy_hint');
const Cloudflare = document.querySelector('.Cloudflare');
const Fast = document.querySelector('.Fast');
const Speedtest = document.querySelector('.Speedtest');
const NTU = document.querySelector('.NTU');
const DNS_Speed_Test = document.querySelector('.DNS_Speed_Test');
const Whois = document.querySelector('.Whois');
const IPSHU = document.querySelector('.IPSHU');
const AbuseIPDB = document.querySelector('.AbuseIPDB');

function sweetalert_OK(params) {
    Swal.fire({
        icon: 'success',
        title: params,
        showConfirmButton: false,
        timer: 2000
    });
}
function sweetalert_error(params) {
    Swal.fire({
        icon: 'error',
        title: params,
        showConfirmButton: false,
        timer: 2000
    });
}
function get_time() {
    let now = new Date();
    return now.getFullYear().toString() +
        (now.getMonth() + 1).toString().padStart(2, '0') +
        now.getDate().toString().padStart(2, '0') + ' ' +
        now.getHours().toString().padStart(2, '0') + ':' +
        now.getMinutes().toString().padStart(2, '0') + ':' +
        now.getSeconds().toString().padStart(2, '0');
}
function get_IP() {
    fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            IP = data.ip;
            IP_Box.innerHTML = IP;
        })
        .catch(error => {
            IP_Box.innerHTML = '127.0.0.1';
            console.error('無法取得 IP 地址: ', error);
            sweetalert_error('無法取得 IP 地址');
        });
}

// 設置懸浮視窗位置
function positionTooltip(event) {
    const tooltip = document.querySelector('.copy_hint'); // 獲取懸浮視窗的元素
    const pageWidth = document.documentElement.clientWidth; // 獲取頁面的寬度
    const pageHeight = document.documentElement.clientHeight; // 獲取頁面的高度
    const tooltipWidth = tooltip.offsetWidth; // 獲取懸浮視窗的寬度
    const tooltipHeight = tooltip.offsetHeight; // 獲取懸浮視窗的高度
    const offsetX = 20; // 懸浮視窗相對於滑鼠位置的水平偏移量
    const offsetY = 30; // 懸浮視窗相對於滑鼠位置的垂直偏移量
    // 計算懸浮視窗的初始位置
    let left = event.pageX + offsetX;
    let top = event.pageY + offsetY;
    // 調整懸浮視窗位置以避免超出右邊界
    if (left + tooltipWidth > pageWidth) {
        left = event.pageX - tooltipWidth - offsetX;
    }
    // 調整懸浮視窗位置以避免超出下邊界
    if (top + tooltipHeight > pageHeight) {
        top = event.pageY - tooltipHeight - offsetY;
    }
    // 調整懸浮視窗位置以避免超出左邊界
    if (left < 0) {
        left = 0;
    }
    // 調整懸浮視窗位置以避免超出上邊界
    if (top < 0) {
        top = 0;
    }
    // 設置懸浮視窗的左、上位置
    tooltip.style.left = `${left}px`;
    tooltip.style.top = `${top}px`;
}

function setupEvents() {
    // 在滑鼠進入時顯示懸浮視窗 並計算懸浮視窗位置
    IP_Box.addEventListener('mouseover', (e) => {
        copy_hint.style.display = 'block';
        positionTooltip(e);
    });
    // 滑鼠移動時 計算懸浮視窗位置
    IP_Box.addEventListener('mousemove', positionTooltip);
    // 在滑鼠離開時隱藏懸浮視窗
    IP_Box.addEventListener('mouseout', () => {
        copy_hint.style.display = 'none';
    });

    // 點擊時複製
    IP_Box.addEventListener('click', () => {
        navigator.clipboard.writeText(IP_Box.textContent)
            .then(() => {
                console.log(`${get_time()}\n已複製: ${IP_Box.textContent}`);
                sweetalert_OK(`已複製: ${IP_Box.textContent}`);
            })
            .catch(error => {
                console.error(`${get_time()} 複製失敗:`, error);
                sweetalert_error('複製失敗');
            });
    });

    // 連結按鈕
    Cloudflare.addEventListener('click', () => window.open('https://speed.cloudflare.com/', '_blank'));
    Fast.addEventListener('click', () => window.open('https://fast.com/zh/tw/', '_blank'));
    Speedtest.addEventListener('click', () => window.open('https://www.speedtest.net/zh-Hant', '_blank'));
    NTU.addEventListener('click', () => window.open('http://speed5.ntu.edu.tw/', '_blank'));
    DNS_Speed_Test.addEventListener('click', () => window.open('https://zz22558822.github.io/DNS_Speed_Test/', '_blank'));
    Whois.addEventListener('click', () => window.open(`https://www.whois365.com/tw/ip/${IP}`, '_blank'));
    IPSHU.addEventListener('click', () => window.open(`https://zh-hant.ipshu.com/whois_ipv4/${IP}`, '_blank'));
    AbuseIPDB.addEventListener('click', () => window.open(`https://www.abuseipdb.com/check/${IP}`, '_blank'));
}

// 初始化
get_IP();
setupEvents();
