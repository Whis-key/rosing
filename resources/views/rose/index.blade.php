<!DOCTYPE html>
<html>
<head>
	<title> Rose Official</title>
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="shortcut icon" type="image/png" href="{{url('/')}}/images/rose.jpg"/>
	<link rel="stylesheet" type="text/css" href="{{url('/')}}/css/rose.css">
</head>
<body>
	<div class="header">
		<img src="{{url('/')}}/images/rose.jpg">
		<span>ROSE <span class="slogan">Life's so ez</span></span>
		<div class="clear-fix"></div>
	</div>

	<div class="container" id="app" v-cloak>
		<div class="loader" v-if="loading">
			<img src="{{url('/')}}/images/loader.gif">
		</div>

		<div class="form">
			<div class="title">
				<h4>Thêm đơn hàng mới</h4>
			</div>

			<div class="form-group">
				<label>Tên:</label>
				<div class="input">
					<input type="text" name="name" placeholder="Nhập tên người nhận hàng"
							v-validate="'required'"
							v-model="newReceiver.name" @keyup.13="saveReceiver">
					<span class="require-maker">*</span>
				</div>
				<span v-show="errors.has('name')" class="form-message error">@{{ errors.first('name') }}</span>
			</div>

			<div class="form-group">
				<label>Điện thoại:</label>
				<div class="input">
					<input type="text" name="phone" class="number" placeholder="Nhập số điện thoại người nhận hàng"
							v-validate="'required'" v-model="newReceiver.phone" @keyup.13="saveReceiver">
					<span class="require-maker">*</span>
				</div>
				<span v-show="errors.has('phone')" class="form-message error">@{{ errors.first('phone') }}</span>
			</div>

			<div class="form-group">
				<label>Địa chỉ:</label>
				<div class="input">
					<input type="text" name="address" placeholder="Nhập địa chỉ nhận hàng"
							v-validate="'required'" v-model="newReceiver.address"  @keyup.13="saveReceiver">
					<span class="require-maker">*</span>
				</div>
				<span v-show="errors.has('address')" class="form-message error">@{{ errors.first('address') }}</span>
			</div>

			<div class="double">
				<div class="form-group">
					<label>Tiền hàng:</label>
					<div class="input">
						<input type="text" name="price"  class="number" placeholder="Chưa tính phí ship"
								v-validate="'required'" v-model="newReceiver.price" @keyup.13="saveReceiver">
						<span class="require-maker">*</span>
					</div>
					<span v-show="errors.has('price')" class="form-message error">@{{ errors.first('price') }}</span>
				</div>

				<div class="form-group">
					<label>Tiền ship:</label>
					<div class="input">
						<input type="text"  class="number" name="ship" placeholder="Nhập phí ship"
								v-validate="'required'" v-model="newReceiver.ship" @keyup.13="saveReceiver">
						<span class="require-maker">*</span>
					</div>
					<span v-show="errors.has('ship')" class="form-message error">@{{ errors.first('ship') }}</span>
				</div>

				<div class="clear-fix"></div>
			</div>

			<div class="actions">
				<a class="r-button" href="javascript:;" @click="saveReceiver">Lưu lại</a>
			</div>
		</div>

		<div class="result" :class="{bg: graph.croute.length > 1}">
			<div class="title">
				<h4>Lộ trình giao hàng
					<span><a href="javascript:;" class="r-button" v-if="graph.croute.length > 1" @click="resetRoute">Lộ trình mới</a></span>
				</h4>
			</div>

			<div class="rose-list">
				<div class="item">
					<span class="name">Vị trí xuất phát</span>
					<span class="address" v-if="graph.croute.length <= 1">Địa chỉ: <input type="text" :value="limitWords(cposition)"
							placeholder="Nhập địa chỉ" :title="cposition" @keyup.13="updateRoute($event)">
							<img src="{{url('/')}}/images/pencil.png" class="editable-icon">
					</span>
					
					<span class="address" v-else><b>@{{limitWords(cposition)}}</b>
					</span>
				</div>
			</div>

			<div class="empty-message" v-if="graph.croute.length <= 1">
				<div class="image">
					<img src="{{url('/')}}/images/empty-state.png">
				</div>

				Bạn chưa nhập đơn hàng nào.
				<br><br>
				Vui lòng thêm các đơn hàng cần giao để hình thành lộ trình giao hàng tiết kiệm thời gian nhất.
			</div>

			<div class="rose-list" v-else>
				<div class="item" v-for="(item, i) in graph.croute">
					<div v-if="i>0">
						<div class="rose-arrow">
							<img src="{{url('/')}}/images/diamond.png">
							<span>@{{item.weight}}</span>
							<div class="clear-fix"></div>
						</div>
						<span class="name">@{{item.extra.name}}</span>
						<span class="address2" :title="item.name"><b>@{{limitWords(item.address)}}</b></span>
						<span>Điện thoại: <b>@{{item.extra.phone}}</b></span>
						<span class="note">Thu tổng cộng <b class="i">@{{parseInt(item.extra.price) + parseInt(item.extra.ship) | number}}đ</b> - (Phí ship: <b>@{{item.extra.ship | number}}đ</b>)</span>
						<div class="actions">
							<a :href="'tel:' + item.extra.phone">Gọi điện</a>
							<a :href="item.dir" target="_blank">Chỉ đường</a>
							<a href="javascript:;" @click="removeNode(item)">Xóa</a>
						</div>
					</div>
				</div>
			</div>

		</div>

		<div class="clear-fix"></div>
	</div>

	<div class="footer">
		<span>Created by Whiskey</span>&nbsp;&nbsp;|&nbsp;&nbsp;<span class="copyright">Copyright @2018 </span>
	</div>

	<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyC8Zp1UtK9l0Qj_UmK8dTPBpYYpMARiTAI"></script>
	<script type="text/javascript" src="{{url('/')}}/js/rose.js"></script>
</body>
</html>