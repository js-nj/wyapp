$(document).ready(function() {
  /*调起大图 S*/
  var mySwiper = new Swiper('.swiper-container2', {
    loop: false,
    pagination: '.swiper-pagination2',
  });
  $("#app").on("click", ".post img", function() {
    var imgBox = $(this).parents(".post").find("img");
    var i = $(imgBox).index(this);
    $(".big_img .swiper-wrapper").html("")

    for (var j = 0, c = imgBox.length; j < c; j++) {
      $(".big_img .swiper-wrapper").append('<div class="swiper-slide"><div class="cell"><img src="' + imgBox.eq(j).attr("src") + '" / ></div></div>');
    }
    mySwiper.updateSlidesSize();
    mySwiper.updatePagination();
    $(".big_img").css({
      "z-index": 1001,
      "opacity": "1"
    });
    mySwiper.slideTo(i, 0, false);
    return false;
  });
  $(".big_img").on("click", function() {
    $(this).css({
      "z-index": "-1",
      "opacity": "0"
    });
  });
});

function changepic(obj, className) {
  //console.log(obj.files[0]);//这里可以获取上传文件的name
  // var last = className + ' '
  for (var i = 0; i < obj.files.length; i++) {
    var fileItem = obj.files[i];
    var newsrc = getObjectURL(obj.files[i]);
    var tmpImg = document.createElement('img');
    tmpImg.src = newsrc;
    tmpImg.style.display = "inline-block";
    tmpImg.style.height = '60px';
    tmpImg.style.width = '60px';

    var tmpDiv = document.createElement('div');
    tmpDiv.style.display = "inline-block";
    tmpDiv.style.marginRight = "6px";
    tmpDiv.style.position = "relative";
    tmpDiv.style.height = '60px';
    tmpDiv.style.width = '60px';

    var tmpSpan = document.createElement('span');
    tmpSpan.className = "close";
    tmpSpan.setAttribute('index', i);
    // tmpSpan.index = i;
    // tmpSpan.style.display = "inline-block";
    // tmpSpan.style.position = "absolute";
    // tmpSpan.style.top = '0px';
    // tmpSpan.style.right = '0px';
    // tmpSpan.innerHTML = 'x';

    tmpDiv.appendChild(tmpImg);
    tmpDiv.appendChild(tmpSpan);

    document.getElementById('wy-imgs-upload').appendChild(tmpDiv);

    $('.close').on('click', function(e) {
      var index = $(this).parent().index();
      // console.log('$(this).parents(className)', $(this).parents(className).find('input')[0].files)
      // debugger;
      if (index >= 0) {
        $(this).parents(className).find('input')[index].remove();
        $(this).parent().remove();
      } else {
        console.log('找不到元素~~');
      }
      // if (originDel) {
      //   originDel = originDel + ',' + index;
      // } else {
      //   originDel = index;
      // }
      // $(this).parents(className).find('input').attr('del', originDel);

    });
  }
}
//建立一個可存取到該file的url
function getObjectURL(file) {
  var url = null;
  // 下面函数执行的效果是一样的，只是需要针对不同的浏览器执行不同的 js 函数而已
  if (window.createObjectURL != undefined) { // basic
    url = window.createObjectURL(file);
  } else if (window.URL != undefined) { // mozilla(firefox)
    url = window.URL.createObjectURL(file);
  } else if (window.webkitURL != undefined) { // webkit or chrome
    url = window.webkitURL.createObjectURL(file);
  }
  return url;
}
Date.prototype.Format = function(fmt) { //author: meizz
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}

function sendMoreRequest(id, callback) {
  var imageFile = $(id).find('input');
  // var imageFile = $("#" + id)[0].files;
  // console.log('imageFile', imageFile)
  // console.log('imageFile.length', imageFile.length)
  var funArr = [];
  for (var i = 0; i < imageFile.length; i++) {
    //判断是否已经删除
    // var del = $("#" + id).attr('del');
    // if (del && del.indexOf(String(i)) > -1) {
    //   console.log('第' + i + '张照片被删了！');
    //   continue;
    // }
    funArr.push(
      new Promise((resolve, reject) => {
        var formData = new FormData();
        formData.append("file", imageFile[i].files[0]);
        $.ajax({
          url: window.hostPath + "/app/upload/img",
          type: "post",
          data: formData,
          dataType: "json",
          processData: false,
          contentType: false,
          beforeSend: function() {
            console.log("正在进行，请稍候");
          },
          success: function(data) {
            // console.log('img data',data);
            if (data.code == 0) {
              resolve(data.imgUrl);
            } else {
              reject(data.msg);
            }
          }
        })
      })
    )
  }
  Promise.all(funArr).then(res => {
    callback(res);
  })
}
