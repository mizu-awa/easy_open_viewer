var eo_view_close_flag = true;

function eo_view_open(){
	var eoView = document.getElementById("eo_view");

	if(eoView.style.display === "none"){//一回開いたことがある場合
		eoView.style.display = "block";
		return 0;
	}

	window.addEventListener("resize", eo_view_onResize, false);
	for(var i=0; i < eo_view_img.length; i++){
		var newImg = document.createElement("img");
		newImg.src = eo_view_img[i];
		newImg.onclick = function(){
			eo_view_close_flag = false;
			eoView.style.display = "block";
		}
		var newDiv = document.createElement("div");
		newDiv.className = "page";
		newDiv.appendChild(newImg);
		eoView.getElementsByClassName("page_list")[0].appendChild(newDiv);
	}
	eoView.getElementsByClassName("page_slider")[0].max = eo_view_img.length;
	eoView.getElementsByClassName("page_counter")[0].innerText = "1/" + eo_view_img.length;
	eoView.style.display = "block";
	eo_view_onResize();

}

function eo_view_close(){
	if(eo_view_close_flag){
		document.getElementById("eo_view").style.display = "none";
	}
	eo_view_close_flag = true;

}

var eo_view_timeoutId;
function eo_view_onScroll(){
	var eoView = document.getElementById("eo_view");
	if(eoView.style.display !== "block"){//要素表示中
		return 0;
	}

	clearTimeout( eo_view_timeoutId ) ;

	eo_view_timeoutId = setTimeout( function () {
		var pageCount = Math.round(eoView.scrollLeft/window.innerWidth);
		var pageWidth = eoView.getElementsByClassName("page_slider")[0].step;

		var pageNumber = (pageCount*pageWidth + 1);
		if(pageNumber>eo_view_img.length){ pageNumber =  eo_view_img.length }

		eoView.scrollLeft= (window.innerWidth * pageCount);
		eoView.getElementsByClassName("page_counter")[0].innerText = pageNumber + "/" + eo_view_img.length;
		eoView.getElementsByClassName("page_slider")[0].value = pageNumber;
	}, 50) ;
	
}

var eo_view_timeoutId_resize;
function eo_view_onResize(){
	var eoView = document.getElementById("eo_view");
	if(eoView.style.display !== "block"){//要素表示中
		return 0;
	}

	console.log("りさいず");

	clearTimeout( eo_view_timeoutId_resize );
	eo_view_timeoutId_resize = setTimeout( function () {
		if(window.innerWidth < 480){
			eoView.getElementsByClassName("page_slider")[0].step = 1;
		}
		else{
			eoView.getElementsByClassName("page_slider")[0].step = 2;
		}
	}, 50);
}

function eo_view_onSlide(){
	var eoView = document.getElementById("eo_view");
	var slideNumber = eoView.getElementsByClassName("page_slider")[0].value;

	var pageScroll = eoView.getElementsByClassName("page")[1].clientWidth * (slideNumber - 1);
	eoView.scrollLeft = pageScroll;
	eoView.getElementsByClassName("page_counter")[0].innerText = slideNumber + "/" + eo_view_img.length;
}

function eo_view_scroll_right(){
	var obj = document.getElementById("eo_view");
	obj.scrollLeft= (window.innerWidth + obj.scrollLeft);
}

function eo_view_scroll_left(){
	var obj = document.getElementById("eo_view");
	obj.scrollLeft = (obj.scrollLeft - window.innerWidth);
}