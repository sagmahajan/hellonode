// JavaScript Document
$(document).ready(function(e) {
    $.ajax({
		url:base_url+"api/get_categories",
		dataType:"json",
		cache:false,
		success: function(data)
		{
			$("#categories").empty();
			$.each(data,function(i,element){
				$("#categories").append('<li><a href="'+base_url+'category/buy/'+element.category_id+'">'+element.cat_name+'</a></li>');
			});
		}
		});	
		
});


function load_special_products()
{
	 $.ajax({
		url:base_url+"api/get_special_products",
		dataType:"json",
		cache:false,
		success: function(data)
		{
			
			$("#featured").empty();
			$.each(data.featured,function(i,element){
				var product_html='<div class="col-md-3 col-xs-6 product_tab">';
				product_html+='<img src="'+element.image_src+'" class="img-responsive img-thumbnail">';
				product_html+='<p class="product_name">'+element.menu+'</p>';				
				product_html+='<p><span class="product_price">Rs.'+element.price+'</span>';
				product_html+='<a onclick="add_to_cart('+element.menu_id+')" href="javascript:;" class="btn btn-warning pull-right">Add to Cart</a>';
				product_html+='</div>';
				$("#featured").append(product_html);
			});
			
			$("#top_selling").empty();
			$.each(data.top_selling,function(i,element){
				var product_html='<div class="col-md-3 col-xs-6 product_tab">';
				product_html+='<img src="'+element.image_src+'" class="img-responsive img-thumbnail">';
				product_html+='<p class="product_name">'+element.menu+'</p>';				
				product_html+='<p><span class="product_price">Rs.'+element.price+'</span>';
				product_html+='<a onclick="add_to_cart('+element.menu_id+')" href="javascript:;" class="btn btn-warning pull-right">Add to Cart</a>';
				product_html+='</div>';
				$("#top_selling").append(product_html);
			});
			
			$("#new_arrivals").empty();
			$.each(data.new_arrivals,function(i,element){
				var product_html='<div class="col-md-3 col-xs-6 product_tab">';
				product_html+='<img src="'+element.image_src+'" class="img-responsive img-thumbnail">';
				product_html+='<p class="product_name">'+element.menu+'</p>';				
				product_html+='<p><span class="product_price">Rs.'+element.price+'</span>';
				product_html+='<a onclick="add_to_cart('+element.menu_id+')" href="javascript:;" class="btn btn-warning pull-right">Add to Cart</a>';
				product_html+='</div>';
				$("#new_arrivals").append(product_html);
			});
			
		}
		});	
}

function load_cat_products(category_id)
{
	 $.ajax({
		url:base_url+"api/get_category_products/"+category_id,
		dataType:"json",
		cache:false,
		success: function(data)
		{
			
			$("#cat_title").text(data.cat_name);
			$("#products").empty();
			
			$.each(data.products,function(i,element){
				var product_html='<div class="col-md-3 col-xs-6 product_tab">';
				product_html+='<img src="'+element.image_src+'" class="img-responsive img-thumbnail">';
				product_html+='<p class="product_name">'+element.menu+'</p>';				
				product_html+='<p><span class="product_price">Rs.'+element.price+'</span>';
				product_html+='<a onclick="add_to_cart('+element.menu_id+')" href="javascript:;"class="btn btn-warning pull-right">Add to Cart</a>';
				product_html+='</div>';
				$("#products").append(product_html);
			});
			
		}
		});	
}

function register_user()
{
	$("#error").empty();
	$("#success").empty();
	
	$.ajax({
		url:base_url+'api/register_user/',
		data:$("#frmRegister").serialize(),
		dataType:"json",
		type:'POST',
		success: function(data)
		{
			if(data.type=="success")
			{
				show_modal(data.message);
				$("#frmRegister input").val("");
			}
			else
			{
				show_modal_message('Error',data.message);
			}
		}
	});
}

function authenticate_user()
{
	$("#error").empty();
	$("#success").empty();
	$.ajax({
		url:base_url+'api/authenticate_user/',
		data:$("#frmLogin").serialize(),
		dataType:"json",
		type:'POST',
		success: function(data)
		{
			if(data.type=="success")
			{
				location.href=base_url+'login/start_session/'+data.user_id+"/"+data.first_name+"/"+$("#redirect").val();
				$("#frmRegister input").val("");
			}
			else
			{
				show_modal_message('Error',data.message);
			}
		}
	});
	
}

function place_orders()
{
	$("#error").empty();
	$("#success").empty();
	$.ajax({
		url:base_url+'api/place_order/',
		data:$("#frmCarts").serialize(),
		dataType:"json",
		type:'POST',
		success: function(data)
		{
			if(data.type=="success")
			{
				location.href=base_url+'checkout/thank_you/'+data.order_id;
			}
			else
			{
				show_modal_message('Error',data.message);
			}
		}
	});		
}

function add_to_cart(menu_id)
{
	$.ajax({
		url:base_url+'cart/add/'+menu_id,
		success: function(data)
		{
			$("#cart_count").text(data);
			alert("Item added to cart");
		}
	});	
}

function load_my_orders(user_id)
{
	$("#error").empty();
	$("#success").empty();
	$.ajax({
		url:base_url+'api/my_orders/',
		dataType:"json",
		data:{user_id:user_id},
		type:'GET',		
		cache:false,
		success: function(data)
		{
			$.each(data,function(index,element){				
				var tr='<tr>';
				tr+='<td>'+element.order_id+'</td>';
				tr+='<td>'+element.order_date+'</td>';
				tr+='<td>'+element.total_items+'</td>';
				tr+='<td>'+element.total_quantities+'</td>';
				tr+='<td>'+element.delivery_date+'</td>';
				tr+='<td>'+element.delivery_address+'</td>';
				tr+='<td>Rs.'+element.total+'</td>';
				tr+='<td><a href="javascript:;" onclick="view_order(\''+element.order_id+'\')">View</a></td>';
				tr+='</tr>';
						$("#order_table_body").append(tr);
			});
		}
	});	
}

function view_order(order_id)
{
	show_modal(base_url+"my_orders/view");
	$.ajax({
		url:base_url+'api/view_order',
		cache:false,
		dataType:"json",
		data:{order_id:order_id},
		type:'GET',
		success:function(data)
		{
			$("#order_id").text("#"+data.order.order_id);
			$("#order_date").text(data.order.order_date);
			$("#delivery_address").text(data.order.delivery_address);
			$("#delivery_date").text(data.order.delivery_date);
			
			$("#payment_method").text(data.order.payment_method);
			var i=0;
			$.each(data.order_items,function(index,element)
			{
				var tr='<tr>';
				tr+='<td>'+i+'</td>';
				tr+='<td>'+element.menu+'</td>';
				tr+='<td>'+element.quantity+'</td>';
				tr+='<td>'+element.price+'</td>';
				tr+='</tr>';
						$("#item_table").append(tr);
				i++;		
			});
			
		},
		error:function()
		{
			alert("An error occured.");
		}
	});
}

function show_modal_message(title,message)
{
	$("#my_modal_title").html(title);
	$("#my_modal_body").html(message);
	$("#my_modal").modal("show");
}

function show_modal(ajax_url)
{
	$.ajax({
		url:ajax_url,
		cache:false,
		dataType:"json",
		async:false,
		success:function(data)
		{
			$("#my_modal_title").html(data.title);
			$("#my_modal_body").html(data.body);
			$("#my_modal").modal("show");
		},
		error:function()
		{
			alert("An error occured.");
		}
	});
}
