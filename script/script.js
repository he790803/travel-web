(function () {
  const information = document.querySelector('.information');
  const informationCard = document.querySelector('.information-card');
  const cancelBtn = document.querySelector('.cancel-btn');
  const cardContent = document.querySelector('.card-content');
  const viewPointGroup = document.querySelector('.view-point-group');
  const headerLink = document.querySelector('.header-links');
  const headerLinks = document.querySelectorAll('.header-links .headerBtn');
  const sectionTitle = document.querySelector('.view-point > .title');
  const hamburgerBar = document.querySelector('.hamburger-bar');
  const faDown = document.querySelector('.fa-angle-down');
  const area = document.querySelector('.banner-search .area');
  const areaList = document.querySelectorAll('.area-list');
  const areaItem = document.querySelector('.area-item');
  // const areaAllItem = document.querySelectorAll('.area-item');
  const areaTitle = document.querySelector('.banner-search .area .title p');
  // 選取器

  let resData = null;
  let type = 'ScenicSpot';
  // 預設API欄位type
  let location = '';
  // 預設API欄位location
  let skip = 0;
  // 預設API欄位skip
  let view = '';
  // 預設之後要塞入div的位置
  sectionTitle.innerHTML = '熱門景點';
  // 預設標題
  let cities = [];
  // 塞選完縣市的容器
  let city = [
    { area: '北部', name: '臺北市', value: 'Taipei' },
    { area: '北部', name: '新北市', value: 'NewTaipei' },
    { area: '北部', name: '桃園市', value: 'Taoyuan' },
    { area: '中部', name: '臺中市', value: 'Taichung' },
    { area: '中部', name: '臺南市', value: 'Tainan' },
    { area: '南部', name: '高雄市', value: 'Kaohsiung' },
    { area: '北部', name: '基隆市', value: 'Keelung' },
    { area: '北部', name: '新竹市', value: 'Hsinchu' },
    { area: '北部', name: '新竹縣', value: 'HsinchuCounty' },
    { area: '中部', name: '苗栗縣', value: 'MiaoliCounty' },
    { area: '中部', name: '彰化縣', value: 'ChanghuaCounty' },
    { area: '中部', name: '南投縣', value: 'NantouCounty' },
    { area: '中部', name: '雲林縣', value: 'YunlinCounty' },
    { area: '南部', name: '嘉義縣', value: 'ChiayiCounty' },
    { area: '南部', name: '嘉義市', value: 'Chiayi' },
    { area: '南部', name: '屏東縣', value: 'PingtungCounty' },
    { area: '北部', name: '宜蘭縣', value: 'YilanCounty' },
    { area: '東部', name: '花蓮縣', value: 'HualienCounty' },
    { area: '東部', name: '臺東縣', value: 'TaitungCounty' },
    { area: '外島', name: '金門縣', value: 'KinmenCounty' },
    { area: '外島', name: '澎湖縣', value: 'PenghuCounty' },
    { area: '外島', name: '連江縣', value: 'LienchiangCounty' },
  ];
  // 所有縣市的資料
  let cardData = [];
  // 暫存API抓取回來的所有資料
  let scrollY = 0;
  let card = ``;
  let getApiContent = function () {
    axios
      .get(`https://ptx.transportdata.tw/MOTC/v2/Tourism/${type}${location}?$top=10&$skip=${skip}&$format=JSON`, {
        headers: getAuthorizationHeader(),
      })
      .then(function (response) {
        resData = response.data;

        resData.forEach((item, index) => {
          cardData.push(item);
          if (!item.Picture.PictureUrl1) {
            item.Picture.PictureUrl1 = `https://raw.githubusercontent.com/he798003/travel-web/master/style/images/istockphoto-1354776450-170667a.jpg`;
          }
          if (!item.Address) {
            item.Address = '無地址資訊';
          }
          if (type === 'ScenicSpot') {
            sectionTitle.innerHTML = '熱門景點';
            view += `
            <div class="view-point-card ${item.ID}">
              <div class="pic">
                <img src="${item.Picture.PictureUrl1}" />
              </div>
              <div class="txt">
                <h3 class="card-title">${item.ScenicSpotName}</h3>
                <div class="address">${item.Address}</div>
              </div>
            </div>
            `;
          } else if (type === 'Restaurant') {
            sectionTitle.innerHTML = '探索美食';
            view += `
            <div class="view-point-card ${item.ID}">
              <div class="pic">
                <img src="${item.Picture.PictureUrl1}" />
              </div>
              <div class="txt">
                <h3 class="card-title">${item.RestaurantName}</h3>
                <div class="address">${item.Address}</div>
              </div>
            </div>
            `;
          } else if (type === 'Hotel') {
            sectionTitle.innerHTML = '住宿飯店';
            view += `
            <div class="view-point-card ${item.ID}">
              <div class="pic">
                <img src="${item.Picture.PictureUrl1}" />
              </div>
              <div class="txt">
                <h3 class="card-title">${item.HotelName}</h3>
                <div class="address">${item.Address}</div>
              </div>
            </div>
            `;
          }
        });
        viewPointGroup.innerHTML = view;

        // console.log(resData[0].ID);
        const cards = document.querySelectorAll('.view-point-card');
        cards.forEach((card, index) => {
          card.addEventListener('click', function () {
            // if (!cardData[index].Picture.PictureUrl1) {
            //   cardData[index].Picture.PictureUrl1 = `https://picsum.photos/280/280/?random=${index}`;
            // }
            if (!cardData[index].OpenTime) {
              cardData[index].OpenTime = '無營業時間資訊';
            }
            if (!cardData[index].Address) {
              cardData[index].Address = '無地址資訊';
            }
            if (cardData[index].TicketInfo === '免費') {
              cardData[index].TicketInfo = '免費入場';
            } else if (!cardData[index].TicketInfo) {
              cardData[index].TicketInfo = '未提供票價';
            }

            if (type === 'ScenicSpot') {
              card = `
              <h3>${cardData[index].ScenicSpotName}</h3>
              <p><i class="fas fa-map-marker-alt"></i>${cardData[index].Address}</p>
              <p>
                ${cardData[index].DescriptionDetail || cardData[index].Description || '未提供詳細資訊'}
              </p>
              <div class="card-img">
                <img src="${cardData[index].Picture.PictureUrl1}" />
              </div>
              <div class="card-tag-group">
                <span><i class="far fa-clock"></i>${cardData[index].OpenTime}</span>
                <span><i class="far fa-money-bill-alt"></i>${cardData[index].TicketInfo}</span>
                <span><i class="fas fa-phone"></i>${cardData[index].Phone}</span>
              </div>`;
            } else if (type === 'Restaurant') {
              card = `
              <h3>${cardData[index].RestaurantName}</h3>
              <p><i class="fas fa-map-marker-alt"></i>${cardData[index].Address}</p>
              <p>
                ${cardData[index].DescriptionDetail || cardData[index].Description || '未提供詳細資訊'}
              </p>
              <div class="card-img">
                <img src="${cardData[index].Picture.PictureUrl1}" />
              </div>
              <div class="card-tag-group">
                <span><i class="far fa-clock"></i>${cardData[index].OpenTime}</span>
                <span><i class="far fa-money-bill-alt"></i>${cardData[index].TicketInfo}</span>
                <span><i class="fas fa-phone"></i>${cardData[index].Phone}</span>
              </div>`;
            } else if (type === 'Hotel') {
              card = `
              <h3>${cardData[index].HotelName}</h3>
              <p><i class="fas fa-map-marker-alt"></i>${cardData[index].Address}</p>
              <p>
                ${cardData[index].DescriptionDetail || cardData[index].Description || '未提供詳細資訊'}
              </p>
              <div class="card-img">
                <img src="${cardData[index].Picture.PictureUrl1}" />
              </div>
              <div class="card-tag-group">
                <span><i class="far fa-clock"></i>${cardData[index].OpenTime}</span>
                <span><i class="far fa-money-bill-alt"></i>${cardData[index].TicketInfo}</span>
                <span><i class="fas fa-phone"></i>${cardData[index].Phone}</span>
              </div>`;
            }

            cardContent.innerHTML = card;
            if (document.body.className === 'active') {
              // document.body.classList.remove('active');
              information.classList.remove('active');
              informationCard.classList.remove('active');
              document.documentElement.style.overflow = 'auto';
            } else {
              scrollY = window.scrollY;
              // document.body.style.top = `-${scrollY}px`;
              document.documentElement.style.overflow = 'hidden';
              // document.body.classList.add('active');
              information.classList.add('active');
              informationCard.classList.add('active');
            }
          });
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  // API載入與顯示在畫面上
  getApiContent();

  cancelBtn.addEventListener('click', function () {
    informationCard.classList.remove('active');
    information.classList.remove('active');
    document.documentElement.style.overflow = 'auto';
  });
  information.addEventListener('click', function (e) {
    if (e.target.nodeName !== 'DIV') {
      return;
    }
    informationCard.classList.remove('active');
    information.classList.remove('active');
    document.documentElement.style.overflow = 'auto';
    console.log(e.target);
  });
  // 取消詳細資料頁面

  let linkApiHandler = function (e) {
    type = e.target.dataset.type;
    view = '';
    skip = 0;
    cardData = [];
    cities = [];
    location = '';
    // cardData = [];
    areaTitle.innerHTML = '全台';
    areaItem.innerHTML = '';
    headerLink.classList.remove('active');
    removeBtnClass();
    e.target.classList.add('active');
    getApiContent();
  };
  // 切換標題及對應的API

  headerLinks.forEach((btn) => {
    btn.addEventListener('click', linkApiHandler);
    console.log(btn);
  });
  // 替所有headerLinks添加點擊事件

  window.addEventListener('scroll', function () {
    let windowHight = window.scrollY + window.screen.height;
    let documentHeight = document.body.offsetHeight;
    if (windowHight > documentHeight) {
      skip += 10;
      getApiContent();
    }
  });
  // 往下滑時載入新的item

  hamburgerBar.addEventListener('click', function () {
    headerLink.classList.toggle('active');
  });
  // 漢堡選單切換

  faDown.addEventListener('click', function () {
    area.classList.toggle('active');
  });
  // 縣市選取上下箭頭切換

  areaList.forEach((item) => {
    item.addEventListener('click', function (e) {
      areaTitle.innerHTML = e.target.innerHTML;
      area.classList.remove('active');

      switch (areaTitle.innerHTML) {
        case '全台':
          cities = [];
          cardData = [];
          areaItem.innerHTML = '';
          view = '';
          skip = 0;
          location = '';
          getApiContent();
          break;
        case '北部':
          cities = [];
          areaItem.innerHTML = '';
          cities = city.filter((item) => {
            return item.area === '北部';
          });
          cities.forEach((item) => {
            areaItem.innerHTML += `<div class='city' data-city='${item.value}'>${item.name}</div>`;
          });
          selectCityHandler();
          break;
        case '中部':
          cities = [];
          areaItem.innerHTML = '';
          cities = city.filter((item) => {
            return item.area === '中部';
          });
          cities.forEach((item) => {
            areaItem.innerHTML += `<div class='city' data-city='${item.value}'>${item.name}</div>`;
          });
          selectCityHandler();
          break;
        case '南部':
          cities = [];
          areaItem.innerHTML = '';
          cities = city.filter((item) => {
            return item.area === '南部';
          });
          cities.forEach((item) => {
            areaItem.innerHTML += `<div class='city' data-city='${item.value}'>${item.name}</div>`;
          });
          selectCityHandler();
          break;
        case '東部':
          cities = [];
          areaItem.innerHTML = '';
          cities = city.filter((item) => {
            return item.area === '東部';
          });
          cities.forEach((item) => {
            areaItem.innerHTML += `<div class='city' data-city='${item.value}'>${item.name}</div>`;
          });
          selectCityHandler();
          break;
        case '西部':
          cities = [];
          areaItem.innerHTML = '';
          cities = city.filter((item) => {
            return item.area === '西部';
          });
          cities.forEach((item) => {
            areaItem.innerHTML += `<div class='city' data-city='${item.value}'>${item.name}</div>`;
          });
          selectCityHandler();
          break;
        case '外島':
          cities = [];
          areaItem.innerHTML = '';
          cities = city.filter((item) => {
            return item.area === '外島';
          });
          cities.forEach((item) => {
            areaItem.innerHTML += `<div class='city' data-city='${item.value}'>${item.name}</div>`;
          });
          selectCityHandler();
          break;
        default:
          cities = [];
          cardData = [];
          areaItem.innerHTML = '';
          getApiContent();
          break;
      }
    });
  });
  // 顯示各地區縣市

  let selectCityHandler = function () {
    document.querySelectorAll('.city').forEach((item) => {
      item.addEventListener('click', function (e) {
        view = '';
        skip = 0;
        cardData = [];
        location = `/${e.target.dataset.city}`;
        getApiContent();
        removeCityClass();
        e.target.classList.add('active');
      });
    });
  };
  // 選取指定縣市

  let removeCityClass = function () {
    document.querySelectorAll('.city').forEach((item) => {
      if (item.classList.contains('active')) {
        item.classList.remove('active');
      }
    });
  };
  // 移除其餘active的class

  let removeBtnClass = function () {
    document.querySelectorAll('.header-links button').forEach((item) => {
      if (item.classList.contains('active')) {
        item.classList.remove('active');
      }
    });
  };

  function getAuthorizationHeader() {
    //  填入自己 ID、KEY 開始
    let AppID = '046dfceae3a2440c9950c15946d03b68';
    let AppKey = 'IZ6U5ZvFPtThnMj-LP8Lc1N_6uw';
    //  填入自己 ID、KEY 結束
    let GMTString = new Date().toGMTString();
    let ShaObj = new jsSHA('SHA-1', 'TEXT');
    ShaObj.setHMACKey(AppKey, 'TEXT');
    ShaObj.update('x-date: ' + GMTString);
    let HMAC = ShaObj.getHMAC('B64');
    let Authorization =
      'hmac username="' + AppID + '", algorithm="hmac-sha1", headers="x-date", signature="' + HMAC + '"';
    return { Authorization: Authorization, 'X-Date': GMTString };
  }
})();
