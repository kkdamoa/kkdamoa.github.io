let countdown; // 카운트다운 타이머를 전역 변수로 설정
let scrollingInterval; // 스크롤 타이머

window.onload = function() {
  if (!shouldShowPopup()) return;

  let randomDelay = Math.floor(Math.random() * (10000 - 5000 + 1)) + 5000;
  setTimeout(() => {
    showPopup();
    simulateHumanScroll(); // 팝업 이후 스크롤 동작 시작
  }, randomDelay);
};

function showPopup() {
  document.getElementById('overlay').style.display = 'block';
  document.getElementById('popup').style.display = 'block';
  document.body.style.overflow = 'hidden';

  let counter = 5;
  let popupCounter = document.getElementById('popupCounter');
  countdown = setInterval(function() {
    popupCounter.textContent = `${counter}초 후 이동합니다...`;
    counter--;

    if (counter < 0) {
      clearInterval(countdown);
      redirectToRandomPage(); // 카운트다운이 끝나면 랜덤 페이지로 이동
    }
  }, 1000);
}

function closePopup() {
  document.getElementById('overlay').style.display = 'none';
  document.getElementById('popup').style.display = 'none';
  document.body.style.overflow = '';

  clearInterval(countdown); // 카운트다운 중지
  clearInterval(scrollingInterval); // 스크롤 동작 중지
}

function shouldShowPopup() {
  const currentTime = new Date().getTime();
  const ipVisitKey = 'ipVisitData';
  const ONE_DAY = 24 * 60 * 60 * 1000;
  const clientIp = 'user-ip-address'; // 실제 IP는 서버 사이드에서 받아와야 합니다.

  let ipVisitData = JSON.parse(localStorage.getItem(ipVisitKey)) || {};

  function resetData() {
    Object.keys(ipVisitData).forEach(ip => {
      if (currentTime - ipVisitData[ip].lastVisit > ONE_DAY) {
        delete ipVisitData[ip];
      }
    });
    localStorage.setItem(ipVisitKey, JSON.stringify(ipVisitData));
  }

  resetData();

  const visitData = ipVisitData[clientIp] || { count: 0, lastVisit: 0 };
  visitData.lastVisit = currentTime;

  if (visitData.count >= 40) {
    return false; // 40번째 접속 시 팝업 표시하지 않음
  }

  visitData.count += 1;
  ipVisitData[clientIp] = visitData;
  localStorage.setItem(ipVisitKey, JSON.stringify(ipVisitData));

  return true;
}

function redirectToRandomPage() {
  if (postUrls.length > 0) {
    const randomPage = postUrls[Math.floor(Math.random() * postUrls.length)];
    window.location.href = randomPage;
  } else {
    console.error('postUrls 배열이 비어 있습니다.');
  }
}

// 사람처럼 스크롤 시뮬레이션
function simulateHumanScroll() {
  const scrollSpeed = () => Math.floor(Math.random() * (30 - 10 + 1)) + 10; // 랜덤 스크롤 속도
  const scrollPause = () => Math.floor(Math.random() * (2000 - 1000 + 1)) + 1000; // 랜덤 중단 시간

  let maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  let scrollDirection = 1; // 스크롤 방향 (1: 아래, -1: 위)
  let currentPosition = 0;

  scrollingInterval = setInterval(() => {
    currentPosition += scrollDirection * scrollSpeed();

    if (currentPosition >= maxScroll || currentPosition <= 0) {
      scrollDirection *= -1; // 방향 반전
    }

    window.scrollTo({
      top: currentPosition,
      behavior: 'smooth',
    });

    if (Math.random() < 0.2) {
      // 20% 확률로 중단
      clearInterval(scrollingInterval);
      setTimeout(simulateHumanScroll, scrollPause());
    }
  }, 100);
}
