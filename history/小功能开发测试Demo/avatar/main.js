/* js */
window.onload = function() {
    // 获取元素
    var file = document.querySelector("#file");
    var addImg = document.querySelector(".btn");    
    var main = document.querySelector(".main");
    // 封装上传图片操作
    function upload(img) {
        // 实例化一个图片对象
        var imgFile = new FileReader();
        // 获取图片的路径
        imgFile.readAsDataURL(img);
        imgFile.onload = function(e) {
            console.log(e)
            // 将上传图标设置为当前图片
            addImg.src = e.target.result;
        }
    }
    /* 1.点击上传图片 */
    file.onchange = function(e) {
        // 获取上传图片里面的信息
        var img = e.target.files[0];
        console.log(Object.prototype.toString.call(img))
        upload(img);
    }
    /* 2、拖拽上传 */
    main.ondragover = function() {
        return false;
    }
    main.ondrop = function(e) {
        upload(e.dataTransfer.files[0]);
        return false;
    }
}

