$(document).ready(function () {

	// ****************************************************************
	// Variable 
	// ****************************************************************
	// jQuery Object
	var $Phone 				= $('#Phone');							// Phone
	var $Searchbtn		= $('#search-btn');					// Search button
	var $Catapage 		= $('#Catalog');						// Catalog page
	var $iPad 				= $('#iPad');								// iPad filter button
	var $iPhone 			= $('#iPhone');							// iPhone filter button
	var $iWatch				= $('#iWatch');							// iWatch filter button
	var $Products 		= $('#Products');						// Products container
	var $Card					= $Products.find('.card');	// Product card
	var $Heart				= $Card.find('i.fa-heart');	// Heart button
	var $Plus					= $Card.find('i.fa-plus');	// Plus button
	var $Cart 				= $('#Cart');								// Cart Pate
	var $ShoppingCart	= $('#ShoppingCart');				// Shopping-Cart Page 
	var $CartTitle		= $ShoppingCart.find(
		'.page-title > span');											// Cart title bar
	var $Quantity			= $Cart.find('.cart-count');// Cart Count
	var $CartArrow 		= $Cart.find('#ArrowUp');		// Cart arrow
	var $CheckoutBtn	= $('#Checkout-btn');
	var $CartLogo 		= $('#CartLogo');						// ShoppingCart Logo

	var $CreditPage 	= $('#CreditCard');					// Credit Card page
	var $BuyBtn				= $('#BuyNow');							// Buy Button 

	// Dynamic Generate
	var $CartImage;
	var $DeleteBtn;
	var $CounterPlus;
	var $CounterMinus;
	var $ItemQuantity;

	var $ArrowLeft 		= $CreditPage.find('#ArrowLeft');

	const e 		= 'click'					// click event
	// CSS parameter 
	const l 		= 'left';					// CSS left
	const	b 		= 'bottom';				// CSS bottom
	const c 		= 'color';				// CSS color
	const d 		= 'display';			// CSS display
	const h 		= 'height';				// CSS height
	const tf		= 'transform';		// CSS transform
	const op 		= 'opacity';			// CSS opacity


	var item_row_template = 
		`<div class="item-row">
			<div class="delete-btn">
				<i class="fas fa-trash-alt"></i>
			</div>
			<img src="PRODUCTIMG" alt="PRODUCTNAME">
			<div class="product">PRODUCTNAME</div>
			<div class="counter">
				<i class="fas fa-plus"></i>
				<span class="quantity">PRODUCTCOUNT</span>
				<i class="fas fa-minus"></i>
			</div>
			<div class="price">PRODUCTPRICE</div>
		</div>`;

	var Cart_Object = {
		'AppleId': 		'',
		'Name': 			'',
		'CardNumber': '',
		'CardExpDt': 	'',
		'CardCVV': 		'',
		'Shopping_List': []
	};

	// ****************************************************************
	// Function 
	// ****************************************************************
	// <summary> Switch Products Page </summary>
	var switchCata 	= function() {
		target = 'card';

		// get filter id
		var cata 	= $(this).attr('id');
		var left 	= 0;

		// chage products container left 
		switch(cata) {
			case 'iPad':
				left = 0;
				break;
			case 'iPhone':
				left = -100;
				break;
			case 'iWatch':
				left = -200;
				break;
		}

		$Products.css(l, `${left}%`);
		$Phone.find('.filter .shadow').not(this).removeClass('active');
		$(this).addClass('active');
	};

	// <summary> Add product to shopping cart </summary>
	var addCart = function () {

		var $Product 		= 
			$(this).attr('class') != undefined ? 
			$(this) : undefined;

		var img 				= $Product.find('img').attr('src');
		var product 		= $Product.find('.product').text();
		var price 			= parseInt($Product.find('.price')
											.text().replace('$', ''));

		// move Catalog page
		$Catapage.css(h, '92%');
		$Catapage.css(tf, 'translateY(-1rem)');

		var idx = Cart_Object.Shopping_List.findIndex(
			e => e.Product	== product && e.Price == price);

		if (idx > -1) {
			var cnt = Cart_Object.Shopping_List[idx].Quantity;
			cnt++;
			Cart_Object.Shopping_List[idx].Quantity = cnt;
			alert(idx);
		} else {
			// Data Update
			Cart_Object.Shopping_List.push({
				'Image': 		img,
				'Product': 	product,
				'Price': 		price,
				'Quantity': 1
			});
		}

		$Quantity.text(Cart_Object.Shopping_List.length);

		buildObject();
		showLogo();
	};

	// Dynamic generate item row object 
	var buildObject = function () {
		$ShoppingCart.find('.container').empty();

		// Add new product item
		$.each(Cart_Object.Shopping_List, function (index, item) {
			var temp = item_row_template
				.replace('PRODUCTIMG', item.Image)
				.replaceAll('PRODUCTNAME', item.Product)
				.replace('PRODUCTCOUNT', item.Quantity)
				.replace('PRODUCTPRICE', `$${item.Price}`);
			$ShoppingCart.find('.container').append(temp);
		});

		$DeleteBtn 		= $ShoppingCart.find('i.fa-trash-alt');
		$CounterPlus	= $ShoppingCart.find('i.fa-plus');
		$CounterMinus = $ShoppingCart.find('i.fa-minus');
		$ItemQuantity	= $ShoppingCart.find('.quantity');
	  $CartImage  	= $Cart.find('img');
		
		$DeleteBtn.on(e, deleteProduct);
		$CartImage.on(e, showDelet);
		$CounterPlus.on(e, counterPlus);
		$CounterMinus.on(e, counterMinus);
		$ItemQuantity.on(e, modifyCounter);
	};

	// <summary> Like </summary>
	var like = function () {
		var $this = $(this);

		$this.toggleClass('far');
		$this.toggleClass('fas');
		$this.hasClass('far') ? 
			$this.css(c, '') : 
			$this.css(c, 'red');

		return false;
	};

	// <summary> Add product into cart </summary>
	var plus = function () {
		addCart();
	}

	// <summary> Continue Shopping </summary>
	var goShopping 		= function () {
		var src = $(this).attr('id');

		if (src == 'ArrowUp') {
			$Catapage.css(b, '');
			$Cart.css(b, '');

			$CartArrow.css(op, '0');

			setTimeout(function () {
				$Quantity.css(d, '');
				$Quantity.css(op, '');
			}, 800);
		} 

		$Catapage.css(h, '100%');
		$Catapage.css(tf, 'translateY(0)');

		return false;
	};

	// <summary> Goto shopping cart </summary>
	var goCart 				= function () {
		var src = $(this).attr('id');

		if(src == 'ArrowLeft') {
			$Cart.css(l, '');
		} else {
			$Catapage.css(b, '80%');
			$Cart.css(b, '80%');

			$Quantity.css(op, '0');
			$Quantity.css(d, 'none');

			$CartArrow.css(op, '1');
		} 

		return false;
	};

	// <summary> Add product qauntity </summary>
	var counterPlus 	= function () {
		var $count 			= $(this).next('.quantity');
		var $counter 		= $count.parent();
		var quantity 		= parseInt($count.text());

		if(quantity < 999) quantity++;
		$count.text(quantity);

		updateQuantity($counter, quantity);
	};

	// <summary> Reduce product qantity </summary>
	var counterMinus 	= function () {
		var $count 			= $(this).prev('.quantity');
		var $counter 		= $count.parent();
		var quantity 		= parseInt($count.text());

		if (quantity > 1) quantity--;
		$count.text(quantity);

		updateQuantity($counter, quantity);
	};

	// <summary> Modify product quantity </summary>
	var modifyCounter = function () {
		var num 			= $(this).text();
		var $counter 	= $(this).parent();

		var product 	= $counter.prev('.product').text();
		Swal.fire({
			title: product,
			width: 300,
			heightAuto: false,
			input: 'text',
			inputValue: num,
			showCancelButton: true,
			inputValidator: (value) => {
				if (value <= 999 && value >= 1) {
					$(this).text(value);
					updateQuantity($counter, value);
				} else
					return '1 < number < 999';
			}
		});
	};

	var updateQuantity = function ($Src, quantity) {
		var product 		= $Src.prev().text();
		var price 			= parseInt($Src.next().text().replace('$', ''));

		var idx = Cart_Object.Shopping_List.findIndex(
			i => i.Product == product && i.Price == price);
		Cart_Object.Shopping_List[idx].Quantity = parseInt(quantity);

		console.log(Cart_Object.Shopping_List);
	};

	// <summary> Show delete bottom </summary>
	var showDelet 		= function () {
		var $itemRow = $(this).parent('.item-row');
		$itemRow.toggleClass('showdel');
		$itemRow.hasClass('showdel') ? 
			$itemRow.css(l, '20%') :
			$itemRow.css(l, '');
	};

	// <summary> Delete Product </summary>
	var deleteProduct = function () {
		var $Prodcut;

		Swal.fire({
			icon: 'warning',
			title: 'Are Your Sure？',
			showCancelButton: true,
		}).then((result) => {
			if (result.isConfirmed) {
				$Prodcut = $(this).parent();

				var product = $Prodcut.find('.product').text();
				var price 	= parseInt($Prodcut.find('.price')
					.text().replace('$', ''));
				var idx 		= Cart_Object.Shopping_List.findIndex(
					e => e.Product == product && e.Price == price);

				Cart_Object.Shopping_List.splice(idx, 1);

				$Quantity.text(Cart_Object.Shopping_List.length);

				buildObject();
				showLogo();

				Swal.fire('Deleted!', '', 'success');
			} else {
				Swal.fire('Cancelled', '', 'error');
			}
		});
	};

	// <summary> Goto Credit page </summary>
	var goCredit 	= function () {
		$Cart.css(l, '-100%');
	};

	// <summary> Pay on credit card </summary>
	var buy 			= function () {
		const patternName 	= /^[A-Za-z ]+$/i;
		const patternNumber = /^[0-9]{16}$/;
		const patternDate		= /^[0-9]{2}\/[0-9]{4}$/;
		const patternCVV		= /^[0-9]{3}$/;

		var $CardName 	= $('#CardName');
		var $CardNumber = $('#CardNumber');
		var $ExpDt 			= $('#ExpDt');
		var $CVV				= $('#CVV');

		var name 		= $CardName.val();
		var number 	= $CardNumber.val();
		var expdt		= $ExpDt.val();
		var cvv 		= $CVV.val();
		console.log(
			`Name = ${name}\n Number = ${number}\n ExpDt = ${expdt}\n CVV = ${cvv}`);

		if (patternName.test(name) && 
				patternNumber.test(number) && 
				patternDate.test(expdt) &&
				patternCVV.test(cvv)) {
			Swal.fire({
				title: 'Loading......',
				timer: 2000,
				width: 300,
				didOpen: () => {
					Swal.showLoading()
				}
			}).then((result) => {
				if(result.dismiss === Swal.DismissReason.timer)
					window.location.reload();
			});
		} else {
			var msg = '';
			switch(msg == '') {
				case patternName.test(name) == false:
					msg += `CardName invalid\n`;
					$CardName.focus();
					break;
				case patternNumber.test(number) == false:
					msg += `CardNumber invalidn\n`;
					$CardNumber.focus();
					break;
				case patternDate.test(expdt) == false:
					msg += `Expiration Date invalid\n`;
					$ExpDt.focus();
					break;
				case patternCVV.test(cvv) == false:
					msg += `CVV invalid\n`;
					$CVV.focus();
					break;
			}

			Swal.fire({
				width: 300,
				icon: 'error',
				title: 'Error',
				text: msg
			});
		}
	};

	// <summary> Show shopping cart logo </summary>
	var showLogo 	= function () {
		if ($Quantity.text() == '0') {
			$CartLogo.css(d, 'inline-block');
			$CheckoutBtn.css(d, 'none');
		} else {
			$CartLogo.css(d, 'none');
			$CheckoutBtn.css(d, 'inline-block');
		}
	};

	// ****************************************************************
	// Event
	// ****************************************************************	
	$iPad.on(e, switchCata);
	$iPhone.on(e, switchCata);
	$iWatch.on(e, switchCata);
	$Card.on(e, addCart);
	$Searchbtn.on(e, goShopping);
	$Heart.on(e, like);
	$Plus.on(e, plus);
	$CartTitle.on(e, goCart);
	$CartArrow.on(e, goShopping);

	$CheckoutBtn.on(e, goCredit);
	$ArrowLeft.on(e, goCart);
	$BuyBtn.on(e, buy);
	showLogo();
});