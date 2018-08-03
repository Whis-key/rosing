<!DOCTYPE html>
<html>
<head>
	<title> Rose </title>
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="shortcut icon" type="image/png" href="{{url('/')}}/images/rose.png"/>
	<link rel="stylesheet" type="text/css" href="{{url('/')}}/css/rose.css">
</head>
<body>
	<div id="app">
		<div class="loader" v-if="loading">
			<img src="{{url('/')}}/images/loader.gif">
		</div>
	</div>

	<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyC8Zp1UtK9l0Qj_UmK8dTPBpYYpMARiTAI"></script>
	<script type="text/javascript" src="{{url('/')}}/js/rose.js"></script>
</body>
</html>