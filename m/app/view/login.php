<!-- <div id="login-box"> -->
	<div data-role="page" id="LoginForm" data-theme="b">
		<div data-role="header">
			<h1>AURORA : Login</h1>
		</div><!-- /header -->
		<div role="main" class="ui-content">
			<form class="login-form" method="GET" action="<?= Config::$path['model'] ?>login.php">
				<label for="pseudo">Login</label>
				<input type="text" name="pseudo" id="pseudo" />
	
				<label for="password">Password</label>
				<input type="password" name="password" id="password" />
				
				<input type="submit" value="Play" name="login" id="send2" />

				<a  class="js-to-signup ui-btn ui-btn-inline ui-btn-e ui-corner-all" data-role="button" href="#SignupForm">Sign Up</a>
				<a  class="js-to-forgot ui-btn ui-btn-inline ui-corner-all"  data-role="button" href="#ForgotForm" >Forgot password ?</a>	
			</form><!-- .login-form -->
		</div><!-- /content -->
	</div><!-- /page -->

	<div id="SignupForm" data-role="page" data-theme="b">
		<div data-role="header">
			<h1>AURORA : Signup</h1>
		</div><!-- /header -->
		<div role="main" class="ui-content">
			<form class="signup-form" method="GET" action="<?= Config::$path['model'] ?>inscription.php">
					<label for="pseudo" >Pseudo</label>
					<input type="text" name="pseudo" id="pseudo1" />
				
					<label for="email" >Email</label>
					<input type="email" name="email" id="email1" />
				
					<label for="email2">Email confirmation</label>
					<input type="email" name="email2" id="email2" />
				
					<label for="password">Password</label>
					<input type="password" name="password" id="password1" />
				
					<label for="password2" class="field-label">Password confirmation</label>
					<input type="password" name="password2" id="password2" />
				
					<input type="submit" value="signup" name="signup" id="send1" />

					<a  class="js-to-login ui-btn ui-btn-inline" href="#LoginForm">Login</a>
					<a  class="js-to-forgot ui-btn ui-btn-inline" href="#ForgotForm">Forgot password ?</a>
			</form><!-- .signup-form -->
		</div><!-- /content -->
	</div><!-- /page -->

	<div id="ForgotForm"  data-role="page" data-theme="b">
		<div data-role="header">
			<h1>AURORA : Forgot</h1>
		</div><!-- /header -->
		<div role="main" class="ui-content">
			<form class="forgot-form" method="GET" action="<?= Config::$path['model'] ?>forgot-pass.php">
				<label for="email">Email</label>
				<input type="email" name="email" id="email3" class="field-input" />
				
				<input type="submit" value="forgot" name="forgot" id="send3" />
				
				<a  class="js-to-login ui-btn ui-btn-inline" href="#LoginForm">Login</a>
				<a  class="js-to-signup ui-btn ui-btn-inline" href="#SignupForm">Sign Up</a>
			</form><!-- .forgot-form -->
		</div><!-- /content -->
	</div><!-- /page -->
<!-- </div> -->