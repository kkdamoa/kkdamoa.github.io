---
layout: default
---

{% if page.header.overlay_color or page.header.overlay_image or page.header.image %}
  {% include page__hero.html %}
{% elsif page.header.video.id and page.header.video.provider %}
  {% include page__hero_video.html %}
{% endif %}

{% assign breadcrumbs_enabled = site.breadcrumbs %}
{% if page.breadcrumbs != null %}
  {% assign breadcrumbs_enabled = page.breadcrumbs %}
{% endif %}
{% if page.url != "/" and breadcrumbs_enabled %}
  {% unless paginator %}
    {% include breadcrumbs.html %}
  {% endunless %}
{% endif %}

<div id="main" role="main">
  {% include sidebar.html %}

  <article class="page" itemscope itemtype="https://schema.org/CreativeWork"{% if page.locale %} lang="{{ page.locale }}"{% endif %}>
    {% if page.title %}<meta itemprop="headline" content="{{ page.title | replace: '|', '&#124;' | markdownify | strip_html | strip_newlines | escape_once }}">{% endif %}
    {% if page.excerpt %}<meta itemprop="description" content="{{ page.excerpt | markdownify | strip_html | strip_newlines | escape_once }}">{% endif %}
    {% if page.date %}<meta itemprop="datePublished" content="{{ page.date | date_to_xmlschema }}">{% endif %}
    {% if page.last_modified_at %}<meta itemprop="dateModified" content="{{ page.last_modified_at | date_to_xmlschema }}">{% endif %}

    <div class="page__inner-wrap">
      {% unless page.header.overlay_color or page.header.overlay_image %}
        <header>
          {% if page.title -%}
          <h1 id="page-title" class="page__title" itemprop="headline">
            <a href="{{ page.url | absolute_url }}" itemprop="url">{{ page.title | markdownify | remove: "<p>" | remove: "</p>" }}</a>
          </h1>
          {%- endif %}
          {% include page__meta.html %}
        </header>
      {% endunless %}

      <section class="page__content" itemprop="text">
        {% if page.toc %}
          <aside class="sidebar__right {% if page.toc_sticky %}sticky{% endif %}">
            <nav class="toc">
              <header><h4 class="nav__title"><i class="fas fa-{{ page.toc_icon | default: 'file-alt' }}"></i> {{ page.toc_label | default: site.data.ui-text[site.locale].toc_label | default: "On this page" }}</h4></header>
              {% include toc.html sanitize=true html=content h_min=1 h_max=6 class="toc__menu" skip_no_ids=true %}
            </nav>
          </aside>
        {% endif %}
        {{ content }}

        {% if page.link %}<div><a href="{{ page.link }}" class="btn btn--primary">{{ site.data.ui-text[site.locale].ext_link_label | default: "Direct Link" }}</a></div>{% endif %}
      </section>

      <footer class="page__meta">
        {% if site.data.ui-text[site.locale].meta_label %}
          <h4 class="page__meta-title">{{ site.data.ui-text[site.locale].meta_label }}</h4>
        {% endif %}
        {% include page__taxonomy.html %}
        {% include page__date.html %}
      </footer>

      {% if page.share %}{% include social-share.html %}{% endif %}
      {% include post_pagination.html %}
    </div>

    {% if jekyll.environment == 'production' and site.comments.provider and page.comments %}
      {% include comments.html %}
    {% endif %}
  </article>

  {% if page.id and page.related and site.related_posts.size > 0 %}
    {% include page__related.html posts=site.related_posts %}
  {% elsif page.id and page.related %}
    {% include page__related.html posts=site.posts %}
  {% endif %}
</div>




<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>광고 팝업 예제</title>
    <style>
        /* 전체 화면을 덮는 오버레이 */
        #overlay {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            z-index: 999;
        }

        /* 팝업 스타일 */
        #popup {
            display: none;
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 80%; /* 화면 너비의 80% */
            max-width: 400px; /* 최대 너비 */
            background-color: #fff;
            padding: 20px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            border-radius: 10px;
            z-index: 1000;
            text-align: center;
        }

        #adContainer {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: #fff;
            z-index: 1001;
            overflow: auto;
            text-align: center;
            padding-top: 50px;
        }

        .ad-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px;
            background-color: #f1f1f1;
            border-bottom: 1px solid #ddd;
        }

        .ad-header span {
            font-size: 14px;
        }

        .close-btn {
            cursor: pointer;
            font-size: 18px;
            font-weight: bold;
            background: none;
            border: none;
        }

        #closeAdButton {
            display: none;
            margin-top: 20px;
            padding: 10px 20px;
            border: none;
            background-color: #007BFF;
            color: white;
            border-radius: 5px;
            cursor: pointer;
        }

        #closeAdButton:hover {
            background-color: #0056b3;
        }
    </style>
</head>
<body>

<div id="overlay" onclick="closePopup()"></div>

<div id="popup">
    <h2>kkdamoa에 오신 것을 환영합니다</h2>
    <p>더 많은 콘텐츠를 보려면 아래 버튼을 클릭해 광고를 시청하세요.</p>
    <button onclick="showAd()">광고 보기</button>
</div>

<div id="adContainer">
    <div class="ad-header">
        <span id="adCounter">광고가 5초 후에 닫힐 수 있습니다...</span>
        <button class="close-btn" onclick="closeAd()">&times;</button>
    </div>
    <h2>광고</h2>
    <ins class="adsbygoogle"
         style="display:block; margin: auto;"
         data-ad-client="ca-pub-9374368296307755"
         data-ad-slot="9952845435"
         data-ad-format="auto"
         data-full-width-responsive="true"></ins>
</div>

<script>
  window.onload = function() {
      if (!shouldShowPopup()) return;
      showPopup();
  };

  function showPopup() {
      document.getElementById('overlay').style.display = 'block';
      document.getElementById('popup').style.display = 'block';
      document.body.style.overflow = 'hidden'; // 스크롤 비활성화
  }

  function closePopup() {
      document.getElementById('overlay').style.display = 'none';
      document.getElementById('popup').style.display = 'none';
      document.body.style.overflow = ''; // 스크롤 활성화
  }

  function showAd() {
      closePopup(); // 팝업을 닫음
      document.getElementById('adContainer').style.display = 'block'; // 광고 컨테이너 표시
      document.body.style.overflow = 'hidden'; // 스크롤 비활성화

      // 광고 송출 코드 실행
      (adsbygoogle = window.adsbygoogle || []).push({});

      // 5초 카운터 후 닫기 버튼 활성화
      let counter = 5;
      let adCounter = document.getElementById('adCounter');
      let closeButton = document.querySelector('.close-btn');
      closeButton.style.display = 'none'; // 초기에는 닫기 버튼 숨김

      let countdown = setInterval(function() {
          counter--;
          adCounter.textContent = `광고가 ${counter}초 후에 닫힐 수 있습니다...`;
          if (counter <= 0) {
              clearInterval(countdown);
              adCounter.textContent = "광고를 닫을 수 있습니다.";
              closeButton.style.display = 'inline'; // 닫기 버튼 표시
          }
      }, 1000);
  }

  function closeAd() {
      document.getElementById('adContainer').style.display = 'none'; // 광고 컨테이너 숨김
      document.body.style.overflow = ''; // 스크롤 활성화
      alert('광고 시청이 완료되었습니다.');

      // 클릭 횟수 증가
      incrementClickCount();
  }

  function incrementClickCount() {
      let currentDate = new Date().toISOString().split('T')[0]; // 현재 날짜 (YYYY-MM-DD)
      let clickData = JSON.parse(localStorage.getItem('clickData')) || { date: currentDate, count: 0 };

      // 날짜가 변경되면 클릭 수를 초기화
      if (clickData.date !== currentDate) {
          clickData = { date: currentDate, count: 0 };
      }

      // 클릭 횟수 증가 및 저장
      clickData.count++;
      localStorage.setItem('clickData', JSON.stringify(clickData));
  }

  function shouldShowPopup() {
      let currentDate = new Date().toISOString().split('T')[0];
      let clickData = JSON.parse(localStorage.getItem('clickData')) || { date: currentDate, count: 0 };

      // 클릭 횟수가 2번 이상이면 팝업 표시하지 않음
      return clickData.count < 2;
  }
</script>


<!-- 광고 스크립트 -->
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9374368296307755"
     crossorigin="anonymous"></script>

</body>
</html>
