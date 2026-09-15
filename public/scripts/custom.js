/* 당근 SEED Design System — MeshCentral Client Enforcer & Static Translator v3.0 */
(function() {
    function enforceModernUI() {
        try {
            if (typeof localStorage !== 'undefined') {
                localStorage.setItem('uiViewMode', '3');
            }
        } catch (e) {}
    }

    var dict = {
        'Select All': '전체 선택',
        'Group Action': '그룹 작업',
        'Scroll To Top': '맨 위로',
        'Add Agent': '에이전트 추가',
        'Add Device Group': '디바이스 그룹 추가',
        'Add User': '사용자 추가',
        'Actions': '작업',
        'Notes': '메모',
        'Log Event': '이벤트 기록',
        'Settings': '설정',
        'Up': '상위',
        'Rename': '이름 변경',
        'Delete': '삭제',
        'Edit': '편집',
        'New Folder': '새 폴더',
        'New File': '새 파일',
        'Upload': '업로드',
        'Download': '다운로드',
        'Cut': '잘라내기',
        'Copy': '복사',
        'Paste': '붙여넣기',
        'Zip': '압축',
        'Unzip': '압축 해제',
        'Refresh': '새로고침',
        'Find': '찾기',
        'Human Readable': '용량 표기방식',
        'Sort by': '정렬 기준',
        'Day': '날짜',
        '7 Day Power State': '7일간 전원 상태',
        'Individual Devices': '개별 디바이스',
        'UI Settings': 'UI 설정',
        'Toggle night mode': '다크 모드 전환',
        'Browser Full Screen': '전체 화면',
        'Personal Notes': '개인 메모',
        'Logout': '로그아웃',
        'My Devices': '내 디바이스',
        'My Account': '내 계정',
        'My Events': '이벤트 로그',
        'My Files': '내 파일',
        'My Users': '사용자 관리',
        'My Server': '서버 설정',
        'General': '기본 정보',
        'Desktop': '원격 데스크톱',
        'Terminal': '터미널',
        'Files': '내 파일',
        'Registry': '레지스트리',
        'Software': '소프트웨어',
        'Events': '이벤트',
        'Details': '상세 정보',
        'Console': '콘솔',
        'Plugins': '플러그인'
    };

    function translateDOM() {
        var container = document.getElementById('page_content') || document.body;
        var elems = container.querySelectorAll('.nav-link, .sidebar, #page_header, input[type="button"], button, a, option, th, td');
        for (var i = 0; i < elems.length; i++) {
            var el = elems[i];
            
            // Strictly exclude Remote Desktop, canvas, terminal, or video stream containers
            if (el.closest('#p11, #d2canvas, #DeskToolbar, #terminal, .xterm, canvas')) continue;

            if (el.tagName === 'INPUT' && el.value && dict[el.value.trim()]) {
                el.value = dict[el.value.trim()];
            }

            if (el.childNodes.length === 1 && el.childNodes[0].nodeType === 3) {
                var txt = el.childNodes[0].nodeValue.trim();
                if (dict[txt]) {
                    el.childNodes[0].nodeValue = dict[txt];
                } else if (txt.endsWith(' node') || txt.endsWith(' nodes')) {
                    var num = txt.split(' ')[0];
                    el.childNodes[0].nodeValue = num + '개 기기';
                }
            }
        }
    }

    enforceModernUI();

    // Run translation at initial load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', translateDOM);
    } else {
        translateDOM();
    }

    // Run translation on tab/menu clicks without any setInterval loop
    document.addEventListener('click', function(e) {
        if (e.target && (e.target.closest('.nav-link') || e.target.closest('button') || e.target.closest('.btn'))) {
            setTimeout(translateDOM, 100);
        }
    }, true);

    // Enforce brand title: replace any occurrence of "MeshCentral" in document.title
    var BRAND_TITLE = '당근서비스 디바이스 관리 콘솔';
    function fixTitle() {
        if (!document.title || document.title.indexOf('MeshCentral') !== -1 || document.title === '') {
            if (document.title && document.title.indexOf('MeshCentral') !== -1) {
                document.title = document.title.replace(/MeshCentral/g, BRAND_TITLE);
            } else if (!document.title) {
                document.title = BRAND_TITLE;
            }
        }
    }

    function forceKarrotFavicon() {
        try {
            var existingLinks = document.querySelectorAll("link[rel*='icon']");
            for (var i = 0; i < existingLinks.length; i++) {
                if (existingLinks[i].parentNode) {
                    existingLinks[i].parentNode.removeChild(existingLinks[i]);
                }
            }
            var iconLink = document.createElement('link');
            iconLink.rel = 'shortcut icon';
            iconLink.type = 'image/png';
            iconLink.href = 'karrot-favicon.png?v=ratio2026';
            document.getElementsByTagName('head')[0].appendChild(iconLink);

            var iconLink2 = document.createElement('link');
            iconLink2.rel = 'icon';
            iconLink2.type = 'image/png';
            iconLink2.href = 'karrot-favicon.png?v=ratio2026';
            document.getElementsByTagName('head')[0].appendChild(iconLink2);
        } catch (e) {}
    }

    fixTitle();
    forceKarrotFavicon();
    var titleTag = document.querySelector('title');
    if (titleTag) {
        var observer = new MutationObserver(function() { fixTitle(); });
        observer.observe(titleTag, { childList: true, characterData: true, subtree: true });
    }
})();
