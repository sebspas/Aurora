<div id="bg-login" class="bg"></div>
<div class="g2"></div>
<div class="cols8">
	<img src="<?= Config::$path['images']?>aurora.png" alt="">	
</div>
<div class="g4"></div>
<div id="login-box t-white" class="cols4">
	<!--<h1 class="title3">AURORA</h1>-->
	<div class="row frame1 t-black">
		<div class="frame-content">
			<form class="login-form" method="GET" action="<?= Config::$path['model'] ?>login.php" class="center">
				<div class="field">
					<label for="pseudo" class="field-label">Login</label>
					<input type="text" name="pseudo" id="pseudo" class="field-input" autofocus />
				</div>
				<div class="field">
					<label for="password" class="field-label">Password</label>
					<input type="password" name="password" id="password" class="field-input" >
				</div>
				<div class="line3">
					<a  class="txt-dec-none c-white js-to-signup">Sign Up</a>
					<a  class="txt-dec-none c-white js-to-forgot">Forgot password ?</a>
					<input class="btn blue3 right" type="submit" value="Play" name="login" id="send2" />
				</div>
			</form><!-- .login-form -->
			<form class="signup-form" method="GET" action="<?= Config::$path['model'] ?>inscription.php" class="center">
				<div class="field">
					<label for="pseudo" class="field-label">Pseudo</label>
					<input type="text" name="pseudo" id="pseudo1" class="field-input" autofocus />
				</div>
				<div class="field">
					<label for="email" class="field-label">Email</label>
					<input type="email" name="email" id="email1" class="field-input" />
				</div>
				<div class="field">
					<label for="email2" class="field-label">Email confirmation</label>
					<input type="email" name="email2" id="email2" class="field-input" />
				</div>
				<div class="field">
					<label for="password" class="field-label">Password</label>
					<input type="password" name="password" id="password1" class="field-input" />
				</div>
				<div class="field">
					<label for="password2" class="field-label">Password confirmation</label>
					<input type="password" name="password2" id="password2" class="field-input" />
				</div>
				<div class="line3">
					<a  class="txt-dec-none c-white js-to-login">Login</a>
					<a  class="txt-dec-none c-white js-to-forgot">Forgot password ?</a>
					<input class="btn blue3 right" type="submit" value="signup" name="signup" id="send1" />
				</div>
			</form><!-- .signup-form -->
			<form class="forgot-form" method="GET" action="<?= Config::$path['model'] ?>forgot-pass.php" class="center">
				<div class="field">
					<label for="email" class="field-label">Email</label>
					<input type="email" name="email" id="email3" class="field-input" autofocus />
				</div>
				<div class="line3">
					<a  class="txt-dec-none c-white js-to-login">Login</a>
					<a  class="txt-dec-none c-white js-to-signup">Sign Up</a>
					<input class="btn blue3 right" type="submit" value="forgot" name="forgot" id="send3" />
				</div>
			</form><!-- .forgot-form -->
		</div><!-- .frame-content -->
	</div>
</div>