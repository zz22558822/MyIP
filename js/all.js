let IP
let IP_Box = document.querySelector('.IP')
let copy_hint = document.querySelector('.copy_hint')
let Cloudflare = document.querySelector('.Cloudflare')
let Fast = document.querySelector('.Fast')
let Speedtest = document.querySelector('.Speedtest')
let NTU = document.querySelector('.NTU')
let DNS_Speed_Test = document.querySelector('.DNS_Speed_Test')
let Whois = document.querySelector('.Whois')
let IPSHU = document.querySelector('.IPSHU')
let AbuseIPDB = document.querySelector('.AbuseIPDB')

function sweetalert_OK(params) {
    Swal.fire({
        icon: 'success',
        title: params,
        showConfirmButton: false,
        timer: 2000
    })
}
function sweetalert_error(params) {
    Swal.fire({
        icon: 'error',
        title: params,
        showConfirmButton: false,
        timer: 2000
    })
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
    fetch('https://api.ipify.org')
        .then(response => response.text())
        .then(ip => {
            window.IP = ip
            document.querySelector('.IP').innerHTML = window.IP; // 確保在取得 IP 後執行
            return ip
        })
        .then(ip => {
            document.querySelector('.IP').innerHTML = ip
        })
        .catch(error => {
            document.querySelector('.IP').innerHTML = '127.0.0.1'
            console.error('無法取得 IP 地址: ', error);
            sweetalert_error('無法取得 IP 地址')
            return null
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



// 取得IP位置
get_IP()

// 在滑鼠進入時
IP_Box.addEventListener('mouseover', (e) => {
    copy_hint.style.display = 'block'; // 顯示提示框
    positionTooltip(e); // 調整提示框位置
});
// 在滑鼠移動時更新位置
IP_Box.addEventListener('mousemove', positionTooltip);
// 在滑鼠離開時
IP_Box.addEventListener('mouseout', () => {
    copy_hint.style.display = 'none';
});

IP_Box.addEventListener('click', () => {
    navigator.clipboard.writeText(IP_Box.textContent)
        .then(() => {
            console.log(get_time() + ' 已複製: ' + IP_Box.textContent);
        })
        .catch(error => {
            console.error(get_time() + '複製失敗:', error);
        });
});




// 設定每個按鈕的點擊事件
Cloudflare.addEventListener('click', () => {
    window.open('https://speed.cloudflare.com/', '_blank');

});
Fast.addEventListener('click', () => {
    window.open('https://fast.com/zh/tw/', '_blank');
});
Speedtest.addEventListener('click', () => {
    window.open('https://www.speedtest.net/zh-Hant', '_blank');
});
NTU.addEventListener('click', () => {
    window.open('http://speed5.ntu.edu.tw/', '_blank');
});

DNS_Speed_Test.addEventListener('click', () => {
    window.open('https://zz22558822.github.io/DNS_Speed_Test/', '_blank');

});
Whois.addEventListener('click', () => {
    window.open(`https://www.whois365.com/tw/ip/${window.IP}`, '_blank');
});
IPSHU.addEventListener('click', () => {
    window.open(`https://zh-hant.ipshu.com/whois_ipv4/${window.IP}`, '_blank');
});
AbuseIPDB.addEventListener('click', () => {
    window.open(`https://www.abuseipdb.com/check/${window.IP}`, '_blank');
});