function setProductGroup(id) {
	$('#product_list').html('');
	$.ajax({
		method: 'post',
		url: BASE_URL + 'products/index/',
		data: {id: id},
		complete: function (data) {
			console.log(data);
			var products=eval(data.responseText);
			console.log(products);
			var group_name = products[0];
			var group_name = group_name['group_name'];
			var group_description = products[0];
			var group_description = group_description['group_description'];
			$('#product_list').show().append('<h2 id="group_' + id + '">' + group_name + '</h2>'+
			'<p class="product_group_description" id="description_group_' + id + '">' + group_description + '</p>');
			for (var key in products){
				var product = products[key];
				var code = product['code'];
				var description = product['description'];
				var group_id = product['group_id'];
				var group_name = product['group_name'];
				var image_id = product['image_id'];
				var info = product['info'];
				var name = product['name'];
				var position = product['position'];
				var price = product['price'];
				var product_id = product['product_id'];
				var url = product['url'];
				if (price===null){
					price = 'hind puudub'
				}
				$('#product_list').append('<div class="product_box product_title group_class_' + group_id + '" id="box_' + product_id + '">' +
					'<h3><a href="/routerboard/products/view/' + product_id + '">' +
					''+name+'</a></h3><a>' +
					'<div style="background: url('+BASE_URL+'assets/img/'+url+') no-repeat; background-position: '+position+'px"' +
					' class="productBoxImg" id="pbox_img_'+product_id+'" >' +
					'</div>'+
					'<div class="product_box_info"><ul><li>'+info+'</li></ul></div>'+
					'<span title="recommended price at distributors" class="price_label">$'+price+'</span></a>'+
					'<img class="compare_icon" src="'+BASE_URL+'assets/img/balance-plus.png" id="comp_balance_ico_'+product_id+'" onclick="setCompareProduct('+product_id+')" title="Compare">'+
					'</div>')
			}
		showFilters(id);
		applyFilters();
		}
	});
}
function showFilters(id) {
	$(".filterClass").hide();
	if (id == 1 || id == 2) {
		$("#routerBoardClass").show();
	} else if (id == 3) {
		$("#enclosuresClass").show();
	} else if (id == 4) {
		$("#interfacesClass").show();
	}
}
$('#compare_box').ready(function () {
	var cookie = $.cookie('compareProducts');
	if (cookie) {
		$(cookie.split('||||')).each(function (index, value) {
			if (value) {
				setCompareProduct(value);
			}
		});
	}
});
$(document).ready(function () {
	setSlider();
	document.createElement('nav');
	document.createElement('header');
	document.createElement('footer');
	$("#prduslider").anythingSlider({height: 280, width: 920, resizeContents: false, autoPlay: true, buildStartStop: false, startStopped: true, buildNavigation: false, easing: "swing", delay: 6000, animationTime: 600});
});


