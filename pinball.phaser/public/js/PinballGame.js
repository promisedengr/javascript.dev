

// isWebGLAvailable.min.js
function isWebGLAvailable(){if(window.WebGLRenderingContext){for(var e=document.createElement("canvas"),t=["webgl2","webgl","experimental-webgl","moz-webgl","webkit-3d"],n=!1,r=0;r<t.length;r++)try{if((n=e.getContext(t[r]))&&"function"==typeof n.getParameter)return!0}catch(e){}return!1}return!1}

// isMobileDevice.js
function isMobileDevice(){return!!(navigator.userAgent.match(/Android/i)||navigator.userAgent.match(/webOS/i)||navigator.userAgent.match(/iPhone/i)||navigator.userAgent.match(/iPad/i)||navigator.userAgent.match(/iPod/i)||navigator.userAgent.match(/BlackBerry/i)||navigator.userAgent.match(/Windows Phone/i))}

var GAME_SOUND_ENABLED = false;

var Pinball = {showDebug: false};

Pinball.Preloader = function(){};

Pinball.Preloader.prototype = {

	init: function()
		{
		// SETTING THE MAXPOINTERS VALUE
		this.input.maxPointers = 2;

		// SETTING THE ROUNDPIXELS PROPERTY TO TRUE (IMPORTANT, DO NOT MODIFY)
		this.game.renderer.renderSession.roundPixels = true;

		// SCALING THE CANVAS SIZE FOR THE GAME
		var scaleX = window.innerWidth / 320;
		var scaleY = window.innerHeight / 608;
		var scale = Math.min(scaleX, scaleY);
		this.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
		this.scale.setUserScale(scale, scale);
		this.scale.pageAlignHorizontally = true;
		this.scale.pageAlignVertically = true;
		this.scale.refresh();
		},

	preload: function()
		{
		// LOADING THE IMAGES
		this.load.image("imageMenuBackground", 'assets/image/imageMenuBackground.png');
		this.load.image("imageMenuAppIcon", 'assets/image/imageMenuAppIcon.png');
		this.load.image("imageMenuPlay", 'assets/image/imageMenuPlay.png');
		this.load.image("imageMenuSoundOn", 'assets/image/imageMenuSoundOn.png');
		this.load.image("imageMenuSoundOff", 'assets/image/imageMenuSoundOff.png');
		this.load.image("imageMenuButton", 'assets/image/imageMenuButton.png');
		this.load.image("imageMenuButtonDisabled", 'assets/image/imageMenuButtonDisabled.png');
		this.load.image("imageGameBackground", 'assets/image/imageGameBackground.png');
		this.load.image("imageGameBoard", 'assets/image/imageGameBoard.png');
		this.load.image("imageGameBall", 'assets/image/imageGameBall.png');
		this.load.image("imageGameLargeCircle", 'assets/image/imageGameLargeCircle.png');
		this.load.image("imageGameMediumCircle", 'assets/image/imageGameMediumCircle.png');
		this.load.image("imageGameLauncher", 'assets/image/imageGameLauncher.png');
		this.load.image("imageGameHighScore", 'assets/image/imageGameHighScore.png');
		this.load.image("imageGameSoundOn", 'assets/image/imageGameSoundOn.png');
		this.load.image("imageGameSoundOff", 'assets/image/imageGameSoundOff.png');
		this.load.image("imageGameButtonANormal", 'assets/image/imageGameButtonANormal.png');
		this.load.image("imageGameButtonAPressed", 'assets/image/imageGameButtonAPressed.png');
		this.load.image("imageGameButtonBNormal", 'assets/image/imageGameButtonBNormal.png');
		this.load.image("imageGameButtonBPressed", 'assets/image/imageGameButtonBPressed.png');
		this.load.image("imageGameBlock", 'assets/image/imageGameBlock.png');
		this.load.image("imageLogoPart1", 'assets/image/imageLogoPart1.png');
		this.load.image("imageLogoPart2", 'assets/image/imageLogoPart2.png');

		// LOADING THE SOUNDS
		this.load.audio("soundLauncher", 'assets/sound/soundLauncher.mp3');
		this.load.audio("soundFlipper", 'assets/sound/soundFlipper.mp3');
		this.load.audio("soundHit", 'assets/sound/soundHit.mp3');
		this.load.audio("soundSafariFix", 'assets/sound/soundSafariFix.mp3');

		// LOADING THE ARIAL BLACK WHITE BITMAP FONTS
		game.load.bitmapFont("ArialBlackWhite", "assets/font/ArialBlackWhite.png", "assets/font/ArialBlackWhite.xml");
		this.game.load.bitmapFont("ArialBlackWhiteBig", "assets/font/ArialBlackWhiteBig.png", "assets/font/ArialBlackWhiteBig.xml");
		game.load.bitmapFont("ArialBlackShadow", "assets/font/ArialBlackShadow.png", "assets/font/ArialBlackShadow.xml");
		},

	create: function()
		{
		// STARTING THE GAME
		this.state.start("Pinball.Splash");
		}
	};

Pinball.Splash = function(){};

Pinball.Splash.prototype = {

	init: function()
		{
		},

	preload: function()
		{
		this.imageLogoPart1 = null;
		this.imageLogoPart1Handler = null;
		this.imageLogoPart2 = null;
		this.imageLogoPart2Handler = null;
		},

	create: function()
		{
		// SETTING THE LOGO OFFSET
		var logoOffset = 20;

		// SETTING THE BACKGROUND COLOR
		this.stage.backgroundColor = "#FFFFFF";

		// SHOWING THE BACKGROUND IMAGE
		document.getElementsByClassName("background")[0].style.display = "block";

		this.imageLogoPart1 = game.add.sprite(0, 0, "imageLogoPart1");
		this.imageLogoPart1.scale.x = 0.7;
		this.imageLogoPart1.scale.y = 0.7;
		this.imageLogoPart1.position.x = game.width / 2 - this.imageLogoPart1.width / 2;
		this.imageLogoPart1.position.y = game.height / 2 - this.imageLogoPart1.height / 2 - logoOffset;
		this.imageLogoPart1.alpha = 0;

		// ADDING THE LOGO
		this.imageLogoPart2 = game.add.sprite(0, 0, "imageLogoPart2");
		this.imageLogoPart2.scale.x = 0.7;
		this.imageLogoPart2.scale.y = 0.7;
		this.imageLogoPart2.position.x = game.width / 2 - this.imageLogoPart2.width / 2;
		this.imageLogoPart2.position.y = -this.imageLogoPart2.height + 75;

		// WAITING 500 MS
		game.time.events.add(500, function()
			{
			// FADING IN THE URL
			this.imageLogoPart1Handler = game.add.tween(game.state.states["Pinball.Splash"].imageLogoPart1).to({alpha: 1}, 1500, Phaser.Easing.Linear.None, true);
			});

		// WAITING 1500 MS
		game.time.events.add(1500, function()
			{
			// MOVING THE LOGO INTO THE SCENE
			game.add.tween(game.state.states["Pinball.Splash"].imageLogoPart2).to({y: game.height / 2 - game.state.states["Pinball.Splash"].imageLogoPart2.height / 2 - logoOffset}, 2000, Phaser.Easing.Quadratic.InOut, true).onComplete.add(function()
				{
				// WAITING 750 MS
				game.time.events.add(750, function()
					{
					// LOADING THE GAME MENU
					game.state.start("Pinball.Menu", Phaser.Plugin.StateTransition.Out.SlideLeft);
					});
				});
			});
		}
	};

Pinball.Menu = function(){};

Pinball.Menu.prototype = {

	init: function()
		{
		this.menuMainBackgroundImage = null;
		this.menuMainBackgroundImageGrayLayer = null;
		this.menuMainAppIconShadow = null;
		this.menuMainAppIcon = null;
		this.menuMainAppTitleShadow = null;
		this.menuMainAppTitle = null;
		this.menuMainAppVersionShadow = null;
		this.menuMainAppVersion = null;
		this.menuMainPlayButton = null;
		this.menuMainPlayButtonIcon = null;
		this.menuMainSoundButton = null;
		this.menuMainSoundButtonIcon = null;
		this.safariAudioFixPlayer = null;
		this.clickTimestamp = null;
		this.clickPositionX = null;
		this.clickPositionY = null;
		},

	create: function()
		{
		// GETTING THE SOUND PREFERENCE
		GAME_SOUND_ENABLED = this.getBooleanSetting("GAME_SOUND_ENABLED");

		// ADDING THE BACKGROUND IMAGE
		this.menuMainBackgroundImage = game.add.sprite(0, 0, "imageMenuBackground");

		// ADDING THE BACKGROUND GRAY LAYER
		this.menuMainBackgroundImageGrayLayer = game.add.graphics(0, 0);
		this.menuMainBackgroundImageGrayLayer.beginFill(0x000000, 0.5);
		this.menuMainBackgroundImageGrayLayer.drawRect(0, 0, game.width, game.height);
		this.menuMainBackgroundImageGrayLayer.endFill();

		// ADDING THE APP ICON SHADOW
		this.menuMainAppIconShadow = game.add.sprite(0, 51, "imageMenuAppIcon");
		this.menuMainAppIconShadow.scale.x = 0.7;
		this.menuMainAppIconShadow.scale.y = 0.7;
		this.menuMainAppIconShadow.tint = 0x000000;
		this.menuMainAppIconShadow.alpha = 0.7;
		this.menuMainAppIconShadow.position.x = game.width / 2 - this.menuMainAppIconShadow.width / 2 + 1;

		// ADDING THE APP ICON
		this.menuMainAppIcon = game.add.sprite(0, 50, "imageMenuAppIcon");
		this.menuMainAppIcon.scale.x = 0.7;
		this.menuMainAppIcon.scale.y = 0.7;
		this.menuMainAppIcon.position.x = game.width / 2 - this.menuMainAppIcon.width / 2;

		// ADDING THE APP TITLE SHADOW
		this.menuMainAppTitleShadow = game.add.bitmapText(0, 207, "ArialBlackWhiteBig", "Pinball", 35);
		this.menuMainAppTitleShadow.height = 37;
		this.menuMainAppTitleShadow.position.x = game.width / 2 - this.menuMainAppTitleShadow.width / 2 + 2;
		this.menuMainAppTitleShadow.tint = 0x000000;

		// ADDING THE APP TITLE
		this.menuMainAppTitle = game.add.bitmapText(0, 205, "ArialBlackWhiteBig", "Pinball", 35);
		this.menuMainAppTitle.height = 37;
		this.menuMainAppTitle.position.x = game.width / 2 - this.menuMainAppTitle.width / 2;

		// ADDING THE APP VERSION SHADOW
		this.menuMainAppVersionShadow = game.add.bitmapText(0, 256, "ArialBlackShadow", "ver 1.2", 18);
		this.menuMainAppVersionShadow.height = 21;
		this.menuMainAppVersionShadow.tint = 0x000000;
		this.menuMainAppVersionShadow.position.x = game.width / 2 - this.menuMainAppVersionShadow.width / 2 + 1;

		// ADDING THE APP VERSION
		this.menuMainAppVersion = game.add.bitmapText(0, 255, "ArialBlackShadow", "ver 1.2", 18);
		this.menuMainAppVersion.height = 21;
		this.menuMainAppVersion.position.x = game.width / 2 - this.menuMainAppVersion.width / 2;

		// ADDING THE PLAY BUTTON
		this.menuMainPlayButton = game.add.button(0, 470, "imageMenuButton", null, this, 2, 1, 0);
		this.menuMainPlayButton.position.x = game.width / 2 - this.menuMainPlayButton.width - 20;
		this.menuMainPlayButton.onInputDown.add(function(){if(this.clickTimestamp==null){this.clickTimestamp=this.getCurrentTime();this.clickPositionX=this.game.input.activePointer.position.x;this.clickPositionY=this.game.input.activePointer.position.y;}},this);
		this.menuMainPlayButton.onInputUp.add(this.playGame, this);

		// ADDING THE PLAY BUTTON ICON
		this.menuMainPlayButtonIcon = game.add.button(0, this.menuMainPlayButton.position.y + 19, "imageMenuPlay", null, this, 2, 1, 0);
		this.menuMainPlayButtonIcon.position.x = this.menuMainPlayButton.position.x + this.menuMainPlayButton.width / 2 - this.menuMainPlayButtonIcon.width / 2 + 2;
		this.menuMainPlayButtonIcon.onInputDown.add(function(){if(this.clickTimestamp==null){this.clickTimestamp=this.getCurrentTime();this.clickPositionX=this.game.input.activePointer.position.x;this.clickPositionY=this.game.input.activePointer.position.y;}},this);
		this.menuMainPlayButtonIcon.onInputUp.add(this.playGame, this);

		// ADDING THE SOUND BUTTON
		this.menuMainSoundButton = game.add.button(0, 470, "imageMenuButton", null, this, 2, 1, 0);
		this.menuMainSoundButton.position.x = game.width / 2 + 20;
		this.menuMainSoundButton.onInputDown.add(function(){if(this.clickTimestamp==null){this.clickTimestamp=this.getCurrentTime();this.clickPositionX=this.game.input.activePointer.position.x;this.clickPositionY=this.game.input.activePointer.position.y;}},this);
		this.menuMainSoundButton.onInputUp.add(this.toggleSound, this);

		// ADDING THE SOUND BUTTON ICON
		this.menuMainSoundButtonIcon = game.add.button(0, this.menuMainSoundButton.position.y + 19, "imageMenuSoundOn", null, this, 2, 1, 0);
		this.menuMainSoundButtonIcon.position.x = this.menuMainSoundButton.position.x + this.menuMainSoundButton.width / 2 - this.menuMainSoundButtonIcon.width / 2 + 2;
		this.menuMainSoundButtonIcon.onInputDown.add(function(){if(this.clickTimestamp==null){this.clickTimestamp=this.getCurrentTime();this.clickPositionX=this.game.input.activePointer.position.x;this.clickPositionY=this.game.input.activePointer.position.y;}},this);
		this.menuMainSoundButtonIcon.onInputUp.add(this.toggleSound, this);

		// CHECKING IF THE SOUND IS DISABLED
		if (GAME_SOUND_ENABLED==false)
			{
			// SHOWING THE SOUND DISABLED IMAGES
			this.menuMainSoundButton.loadTexture("imageMenuButtonDisabled");
			this.menuMainSoundButtonIcon.loadTexture("imageMenuSoundOff");
			}
		else
			{
			// SHOWING THE SOUND ENABLED IMAGES
			this.menuMainSoundButton.loadTexture("imageMenuButton");
			this.menuMainSoundButtonIcon.loadTexture("imageMenuSoundOn");
			}
		},

	getBooleanSetting: function(settingName)
		{
		try
			{
			var name = "pinball" + settingName;
			var nameEQ = name + "=";
			var ca = document.cookie.split(";");

			for(var i=0;i < ca.length;i++)
				{
				var c = ca[i];
				while (c.charAt(0)==" ")
					{
					c = c.substring(1,c.length);
					}
				if (c.indexOf(nameEQ) == 0)
					{
					if (c.substring(nameEQ.length,c.length)=="true")
						{
						return true;
						}
						else
						{
						return false;
						}
					}
				}
			}
		catch(err)
			{
			}

		return true;
		},

	setBooleanSetting: function(settingName, settingValue)
		{
		try
			{
			var name = "pinball" + settingName;
			var value = String(settingValue);
			var days = 999;
			var expires = "";
			if (days)
				{
				var date = new Date();
				date.setTime(date.getTime() + (days*24*60*60*1000));
				expires = "; expires=" + date.toUTCString() + "; SameSite=Lax";
				}
			document.cookie = name + "=" + (value || "")  + expires + "; Secure; path=/";
			}
			catch(err)
			{
			}
		},

	toggleSound: function()
		{
		// REJECTING ANY SLIDE AND LONG PRESS EVENT - BUGFIX FOR SAFARI ON IOS FOR ENABLING THE AUDIO CONTEXT
		if (Math.abs(this.game.input.activePointer.position.x-this.clickPositionX)>=25){this.clickTimestamp=null;return;}
		if (Math.abs(this.game.input.activePointer.position.y-this.clickPositionY)>=25){this.clickTimestamp=null;return;}
		if (this.getCurrentTime()-this.clickTimestamp>=500){this.clickTimestamp=null;return;}

		// CHECKING IF THE SOUND IS ENABLED
		if (GAME_SOUND_ENABLED==true)
			{
			// DISABLING THE SOUND
			GAME_SOUND_ENABLED = false;

			// SAVING THE SOUND PREFERENCE
			this.setBooleanSetting("GAME_SOUND_ENABLED", false);

			// SHOWING THE SOUND DISABLED IMAGES
			this.menuMainSoundButton.loadTexture("imageMenuButtonDisabled")
			this.menuMainSoundButtonIcon.loadTexture("imageMenuSoundOff");
			}
			else
			{
			// ENABLING THE SOUND
			GAME_SOUND_ENABLED = true;

			// SAVING THE SOUND PREFERENCE
			this.setBooleanSetting("GAME_SOUND_ENABLED", true);

			// SHOWING THE SOUND ENABLED IMAGES
			this.menuMainSoundButton.loadTexture("imageMenuButton")
			this.menuMainSoundButtonIcon.loadTexture("imageMenuSoundOn");
			}

		// CLEARING THE CLICK TIMESTAMP VALUE
		this.clickTimestamp = null;
		},

	playGame: function()
		{
		// REJECTING ANY SLIDE AND LONG PRESS EVENT - BUGFIX FOR SAFARI ON IOS FOR ENABLING THE AUDIO CONTEXT
		if (Math.abs(this.game.input.activePointer.position.x-this.clickPositionX)>=25){this.clickTimestamp=null;return;}
		if (Math.abs(this.game.input.activePointer.position.y-this.clickPositionY)>=25){this.clickTimestamp=null;return;}
		if (this.getCurrentTime()-this.clickTimestamp>=500){this.clickTimestamp=null;return;}

		// CHECKING IF THE SOUND IS ENABLED
		if (GAME_SOUND_ENABLED==true)
			{
			// SAFARI ON IOS REQUIRES THAT AN AUDIO FILE MUST BE PLAYED IN THE SAME FUNCTION THAT WAS CALLED
			// ON THAT TAP EVENT IN ORDER TO ENABLE THE AUDIO CONTEXT FOR OTHER SOUNDS TO BE PLAYED.
			// BECAUSE OF THIS, AN EMPTY 0.1 SEC SOUND IS PLAYED.

			// CREATING THE SAFARI AUDIO FIX PLAYER
			this.safariAudioFixPlayer = this.add.audio("soundSafariFix");

			// MUTING THE SAFARI AUDIO FIX PLAYER
			this.safariAudioFixPlayer.volume = 0;

			// PLAYING THE SAFARI AUDIO FIX PLAYER
			this.safariAudioFixPlayer.play();
			}

		// LAUNCHING THE GAME
		game.state.start("Pinball.Game", Phaser.Plugin.StateTransition.Out.SlideLeft);
		},

	getCurrentTime: function()
		{
		return window.performance && window.performance.now && window.performance.timing && window.performance.timing.navigationStart ? window.performance.now() + window.performance.timing.navigationStart : Date.now();
		}
	};

Pinball.Game = function(game)
	{
	this.outlineVertices = [1440,-3687,1023,-2194,1365,-1961,1365,-663,638,-480,160,-154,150,971,-330,970,-335,-153,-800,-480,-1540,-619,-1540,-1988,-1147,-2175,-1429,-3152,-1500,-3195,-1492,-3399,-1438,-3867,-1309,-4132,-1112,-4351,-787,-4540,-389,-4670,139,-4778,655,-4846,872,-4837,1067,-4792,1236,-4700,1374,-4584,1480,-4440,1557,-4271,1601,-3992,1601,-3712,1600,-171,1442,-169,1440,-3687];
	this.launcherVertices = [1401,-500,1631,-500];
	this.guide1Vertices = [-825,-746,-771,-853,-1280,-1120,-1280,-1759,-1360,-1759,-1360,-959,-825,-746];
	this.guide2Vertices = [663,-743,614,-855,1119,-1121,1123,-1760,1200,-1759,1200,-959,663,-743];
	this.guide3Vertices = [-1116,-1753,-1118,-1277,-838,-1110,-1116,-1753];
	this.guide4Vertices = [671,-1110,956,-1282,956,-1762,671,-1110];
	this.gutterVertices1 = [-480,650,293,650];
	this.gutterVertices2 = [-480,750,293,750];
	this.smallCircles = [-1320,-1759,1160,-1759];
	this.mediumCircles = [-1500,-3132,-866,-3163,-290,-3074,187,-3415,614,-3074,-451,-2232,396,-2242];
	this.largeCircles = [-446,-3704,309,-4133,990,-3750];
	this.leftFlipperVertices = [560,32,560,-32,0,-40,0,94];
	this.rightFlipperVertices = [0,94,0,-40,-560,-32,-560,32];
	this.ballStart = [15.2016, -30];
	this.PTM = 100; // CONVERSION RATIO FOR VALUES IN ARRAYS ABOVE

	this.pinballBoard = null;
	this.pinballBoardMask = null;

	this.gutterFixture1 = null;
	this.gutterFixture2 = null;
	this.launcherSprite = null;
	this.launcherFixture = null;
	this.launcherIsMoving = null;
	this.launcherGoingUp = null;
	this.launcherContainer = null;
	this.launcherContainerMask = null;

	this.leftBorderMask = null;
	this.leftBorderSprite = null;
	this.leftBorderLine = null;
	this.leftFlipper = null;
	this.leftBounceMask = null;
	this.leftBounceSprite = null;
	this.leftBounceLine = null;

	this.rightBorderMask = null;
	this.rightBorderSprite = null;
	this.rightBorderLine = null;
	this.rightFlipper = null;
	this.rightBounceMask = null;
	this.rightBounceSprite = null;
	this.rightBounceLine = null;

	this.cursors = null;

	this.scoreBackground = null;
	this.scoreValue = null;
	this.scoreLabel = null;
	this.scoreLabelShadow = null;

	this.highScoreBackground = null;
	this.highScoreIcon = null;
	this.highScoreIconShadow = null;
	this.highScoreLabel = null;
	this.highScoreLabelShadow = null;

	this.soundHandlerOnBackground = null;
	this.soundHandlerOnSprite = null;
	this.soundHandlerOffBackground = null;
	this.soundHandlerOffSprite = null;

	this.ballBody = null;
	this.ballSprite = null;
	this.gameOver = false;
	this.flipperJoints = [];
	this.mediumCirclesList = [];
	this.mediumCirclesHitList = [];
	this.mediumCirclesGlowList = [];
	this.largeCirclesList = [];
	this.largeCirclesHitList = [];
	this.largeCirclesGlowList = [];

	this.keyA = null;
	this.keyD = null;
	this.buttonANormal = null;
	this.buttonAPressed = null;
	this.buttonAHandler = null;
	this.buttonBNormal = null;
	this.buttonBPressed = null;
	this.buttonBHandler = null;

	this.isMobileDevice = null;

	this.audioPlayer = null;

	// SCALING THE CANVAS SIZE FOR THE GAME
	function resizeF()
		{
		var scaleX = window.innerWidth / 320;
		var scaleY = window.innerHeight / 608;
		var scale = Math.min(scaleX, scaleY);
		game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
		game.scale.setUserScale(scale, scale);
		game.scale.pageAlignHorizontally = true;
		game.scale.pageAlignVertically = true;
		game.scale.refresh();
		}

	window.addEventListener("resize", resizeF);
	};

Pinball.Game.prototype = {

	init: function()
		{
		this.pinballBoard = null;
		this.pinballBoardMask = null;

		this.gutterFixture1 = null;
		this.gutterFixture2 = null;
		this.launcherSprite = null;
		this.launcherFixture = null;
		this.launcherIsMoving = false;
		this.launcherGoingUp = null;
		this.launcherContainer = null;
		this.launcherContainerMask = null;

		this.leftBorderMask = null;
		this.leftBorderSprite = null;
		this.leftBorderLine = null;
		this.leftFlipper = null;
		this.leftBounceMask = null;
		this.leftBounceSprite = null;
		this.leftBounceLine = null;

		this.rightBorderMask = null;
		this.rightBorderSprite = null;
		this.rightBorderLine = null;
		this.rightFlipper = null;
		this.rightBounceMask = null;
		this.rightBounceSprite = null;
		this.rightBounceLine = null;

		this.cursors = null;
		this.scoreBackground = null;
		this.scoreValue = 0;
		this.scoreLabel = null;
		this.scoreLabelShadow = 0;

		this.highScoreBackground = null;
		this.highScoreIcon = null;
		this.highScoreIconShadow = null;
		this.highScoreLabel = null;
		this.highScoreLabelShadow = null;

		this.soundHandlerOnBackground = null;
		this.soundHandlerOnSprite = null;
		this.soundHandlerOffBackground = null;
		this.soundHandlerOffSprite = null;

		this.ballBody = null;
		this.ballSprite = null;
		this.gameOver = false;
		this.flipperJoints = [];
		this.mediumCirclesList = [];
		this.mediumCirclesHitList = [];
		this.mediumCirclesGlowList = [];
		this.largeCirclesList = [];
		this.largeCirclesHitList = [];
		this.largeCirclesGlowList = [];

		this.keyA = null;
		this.keyD = null;
		this.buttonANormal = null;
		this.buttonAPressed = null;
		this.buttonAHandler = null;
		this.buttonBNormal = null;
		this.buttonBPressed = null;
		this.buttonBHandler = null;

		this.isMobileDevice = null;

		this.audioPlayer = null;
		},

	create: function()
		{
		// CHECKING IS THE GAME IS RUNNING IN A MOBILE DEVICE
		this.isMobileDevice = isMobileDevice();

		// SETTING THE GAME BOUNDS
		game.world.setBounds(-435, -540, 600, 335);

		// ADDING THE BACKGROUND IMAGE
		this.add.tileSprite(-170, -555, 600, 835, "imageGameBackground");

		// SCALING THE PINBALL BOARD TO FIT THE SCREEN
		for(var i = 0; i < this.outlineVertices.length; i++){this.outlineVertices[i] = this.outlineVertices[i] * 0.95;}
		for(var i = 0; i < this.launcherVertices.length; i++){this.launcherVertices[i] = this.launcherVertices[i] * 0.95;}
		for(var i = 0; i < this.guide1Vertices.length; i++){this.guide1Vertices[i] = this.guide1Vertices[i] * 0.95;}
		for(var i = 0; i < this.guide2Vertices.length; i++){this.guide2Vertices[i] = this.guide2Vertices[i] * 0.95;}
		for(var i = 0; i < this.guide3Vertices.length; i++){this.guide3Vertices[i] = this.guide3Vertices[i] * 0.95;}
		for(var i = 0; i < this.guide4Vertices.length; i++){this.guide4Vertices[i] = this.guide4Vertices[i] * 0.95;}
		for(var i = 0; i < this.gutterVertices1.length; i++){this.gutterVertices1[i] = this.gutterVertices1[i] * 0.95;}
		for(var i = 0; i < this.gutterVertices2.length; i++){this.gutterVertices2[i] = this.gutterVertices2[i] * 0.95;}
		for(var i = 0; i < this.smallCircles.length; i++){this.smallCircles[i] = this.smallCircles[i] * 0.95;}
		for(var i = 0; i < this.mediumCircles.length; i++){this.mediumCircles[i] = this.mediumCircles[i] * 0.95;}
		for(var i = 0; i < this.largeCircles.length; i++){this.largeCircles[i] = this.largeCircles[i] * 0.95;}
		for(var i = 0; i < this.leftFlipperVertices.length; i++){this.leftFlipperVertices[i] = this.leftFlipperVertices[i] * 0.95;}
		for(var i = 0; i < this.rightFlipperVertices.length; i++){this.rightFlipperVertices[i] = this.rightFlipperVertices[i] * 0.95;}
		for(var i = 0; i < this.ballStart.length; i++){this.ballStart[i] = this.ballStart[i] * 0.95;}

		// CREATING THE PINBALL BOARD BACKGROUND MASK
		this.pinballBoardMask = game.add.graphics(0, 0);
		this.pinballBoardMask.beginFill(0x000000);
		for(var i = 0; i < this.outlineVertices.length; i=i+2)
			{
			if (i==0)
				{
				this.pinballBoardMask.moveTo(this.outlineVertices[i] * 0.10 - 0.0000001, this.outlineVertices[i + 1] * 0.10 - 0.0000001);
				}
			this.pinballBoardMask.lineTo(this.outlineVertices[i] * 0.10, this.outlineVertices[i +1] * 0.10);
			}
		this.pinballBoardMask.endFill();

		// ADDING THE PINBALL BOARD BACKGROUND IMAGE
		this.pinballBoardImage = this.add.sprite(-150, -530, "imageGameBoard");
		this.pinballBoardImage.mask = this.pinballBoardMask;

		// ADDING THE PINBALL BOARD BACKGROUND LINE
		this.pinballBoardLine = game.add.graphics(0, 0);
		this.pinballBoardLine.lineStyle(2.05, 0x343434, 1);
		for(var i = 0; i < this.outlineVertices.length; i=i+2)
			{
			if (i==0)
				{
				this.pinballBoardLine.moveTo(this.outlineVertices[i] * 0.10 - 0.0000001, this.outlineVertices[i + 1] * 0.10 - 0.0000001);
				}
			this.pinballBoardLine.lineTo(this.outlineVertices[i] * 0.10, this.outlineVertices[i +1] * 0.10);
			}
		this.pinballBoardLine.endFill();

		// CREATING THE LEFT BORDER MASK
		this.leftBorderMask = game.add.graphics(0, 0);
		this.leftBorderMask.beginFill(0xFFFFFF);
		for(var i = 0; i < this.guide1Vertices.length; i=i+2)
			{
			if (i==0)
				{
				this.leftBorderMask.moveTo(this.guide1Vertices[i] * 0.10 - 0.0000001, this.guide1Vertices[i + 1] * 0.10 - 0.0000001);
				}
			this.leftBorderMask.lineTo(this.guide1Vertices[i] * 0.10, this.guide1Vertices[i +1] * 0.10);
			}
		this.leftBorderMask.endFill();

		// ADDING THE LEFT BORDER SPRITE
		this.leftBorderSprite = this.add.sprite(-143, -178, "imageGameBackground");
		this.leftBorderSprite.mask = this.leftBorderMask;

		// ADDING THE LEFT BORDER LINE
		this.leftBorderLine = game.add.graphics(0, 0);
		this.leftBorderLine.lineStyle(2, 0x343434, 1);
		for(var i = 0; i < this.guide1Vertices.length; i=i+2)
			{
			if (i==0)
				{
				this.leftBorderLine.moveTo(this.guide1Vertices[i] * 0.10 - 0.0000001, this.guide1Vertices[i + 1] * 0.10 - 0.0000001);
				}
			this.leftBorderLine.lineTo(this.guide1Vertices[i] * 0.10, this.guide1Vertices[i +1] * 0.10);
			}

		// CREATING THE RIGHT BORDER MASK
		this.rightBorderMask = game.add.graphics(0, 0);
		this.rightBorderMask.beginFill(0xFFFFFF);
		for(var i = 0; i < this.guide2Vertices.length; i=i+2)
			{
			if (i==0)
				{
				this.rightBorderMask.moveTo(this.guide2Vertices[i] * 0.10 - 0.0000001, this.guide2Vertices[i + 1] * 0.10 - 0.0000001);
				}
			this.rightBorderMask.lineTo(this.guide2Vertices[i] * 0.10, this.guide2Vertices[i +1] * 0.10);
			}
		this.rightBorderMask.endFill();

		// ADDING THE RIGHT BORDER SPRITE
		this.rightBorderSprite = this.add.sprite(-3, -179, "imageGameBackground");
		this.rightBorderSprite.mask = this.rightBorderMask;

		// ADDING THE RIGHT BORDER LINE
		this.rightBorderLine = game.add.graphics(0, 0);
		this.rightBorderLine.lineStyle(2, 0x343434, 1);
		for(var i = 0; i < this.guide2Vertices.length; i=i+2)
			{
			if (i==0)
				{
				this.rightBorderLine.moveTo(this.guide2Vertices[i] * 0.10 - 0.0000001, this.guide2Vertices[i + 1] * 0.10 - 0.0000001);
				}
			this.rightBorderLine.lineTo(this.guide2Vertices[i] * 0.10, this.guide2Vertices[i +1] * 0.10);
			}

		// CREATING THE LEFT BOUNCE MASK
		this.leftBounceMask = game.add.graphics(0, 0);
		this.leftBounceMask.beginFill(0xFFFFFF);
		for(var i = 0; i < this.guide3Vertices.length; i=i+2)
			{
			if (i==0)
				{
				this.leftBounceMask.moveTo(this.guide3Vertices[i] * 0.10 - 0.0000001, this.guide3Vertices[i + 1] * 0.10 - 0.0000001);
				}
			this.leftBounceMask.lineTo(this.guide3Vertices[i] * 0.10, this.guide3Vertices[i +1] * 0.10);
			}
		this.leftBounceMask.endFill();

		// ADDING THE LEFT BOUNCE SPRITE
		this.leftBounceSprite = this.add.sprite(-153, -174, "imageGameBackground");
		this.leftBounceSprite.mask = this.leftBounceMask;

		// ADDING THE LEFT BOUNCE LINE
		this.leftBounceLine = game.add.graphics(0, 0);
		this.leftBounceLine.lineStyle(2, 0x343434, 1);
		for(var i = 0; i < this.guide3Vertices.length; i=i+2)
			{
			if (i==0)
				{
				this.leftBounceLine.moveTo(this.guide3Vertices[i] * 0.10 - 0.0000001, this.guide3Vertices[i + 1] * 0.10 - 0.0000001);
				}
			this.leftBounceLine.lineTo(this.guide3Vertices[i] * 0.10, this.guide3Vertices[i +1] * 0.10);
			}

		// CREATING THE RIGHT BOUNCE MASK
		this.rightBounceMask = game.add.graphics(0, 0);
		this.rightBounceMask.beginFill(0xFFFFFF);
		for(var i = 0; i < this.guide4Vertices.length; i=i+2)
			{
			if (i==0)
				{
				this.rightBounceMask.moveTo(this.guide4Vertices[i] * 0.10 - 0.0000001, this.guide4Vertices[i + 1] * 0.10 - 0.0000001);
				}
			this.rightBounceMask.lineTo(this.guide4Vertices[i] * 0.10, this.guide4Vertices[i +1] * 0.10);
			}
		this.rightBounceMask.endFill();

		// ADDING THE RIGHT BOUNCE SPRITE
		this.rightBounceSprite = this.add.sprite(5, -174, "imageGameBackground");
		this.rightBounceSprite.mask = this.rightBounceMask;

		// ADDING THE RIGHT BOUNCE LINE
		this.rightBounceLine = game.add.graphics(0, 0);
		this.rightBounceLine.lineStyle(2, 0x343434, 1);
		for(var i = 0; i < this.guide4Vertices.length; i=i+2)
			{
			if (i==0)
				{
				this.rightBounceLine.moveTo(this.guide4Vertices[i] * 0.10 - 0.0000001, this.guide4Vertices[i + 1] * 0.10 - 0.0000001);
				}
			this.rightBounceLine.lineTo(this.guide4Vertices[i] * 0.10, this.guide4Vertices[i +1] * 0.10);
			}

		// ENABLING THE BOX2D PHYSICS
		game.physics.startSystem(Phaser.Physics.BOX2D);
		game.physics.box2d.ptmRatio = 500;
		game.physics.box2d.gravity.y = 5000; // LARGE GRAVITY TO MAKE SCENE FEEL SMALLER
		game.physics.box2d.friction = 0.1;

		// CREATING THE PINBALL BOARD
		this.pinballBoard = new Phaser.Physics.Box2D.Body(this.game, null, 0, 0, 0);

		// ADDING BOUNCE-LESS FIXTURES
		game.physics.box2d.restitution = 0.1;
		this.pinballBoard.addLoop(this.outlineVertices);
		this.pinballBoard.addLoop(this.guide1Vertices);
		this.pinballBoard.addLoop(this.guide2Vertices);
		this.pinballBoard.addChain(this.guide3Vertices);
		this.pinballBoard.addChain(this.guide4Vertices);

		// SETTING THE RESTITUTION THAT THE CIRCLES WILL HAVE
		game.physics.box2d.restitution = 1;

		// ADDING THE SMALL CIRCLES
		for(var i = 0; i < this.smallCircles.length / 2; i++)
			{
			// ADDING THE SMALL CIRCLE
			this.pinballBoard.addCircle(0.35 * this.PTM, this.smallCircles[2 * i + 0], this.smallCircles[2 * i + 1]);
			}

		// ADDING THE MEDIUM CIRCLES
		for(var i = 0; i < this.mediumCircles.length / 2; i++)
			{
			var mediumCircleX = Math.floor(this.mediumCircles[2 * i + 0] * 0.10 - 11.75);
			var mediumCircleY = Math.floor(this.mediumCircles[2 * i + 1] * 0.10 - 11.75);

			// ADDING THE CIRCLE TO THE MEDIUM CIRCLE LIST
			this.mediumCirclesList[i] = this.pinballBoard.addCircle(1 * this.PTM, this.mediumCircles[2 * i + 0], this.mediumCircles[2 * i + 1]);
			this.mediumCirclesList[i].circleIndex = i;

			// ADDING THE MEDIUM CIRCLE SHADOW
			var tempCircleShadow = this.add.sprite(mediumCircleX + 1,mediumCircleY + 1, "imageGameMediumCircle");
			tempCircleShadow.tint = 0x343434;
			tempCircleShadow.alpha = 0.8;

			// ADDING THE MEDIUM CIRCLE HIT SPRITE
			this.mediumCirclesHitList[i] = game.add.graphics(mediumCircleX, mediumCircleY);
			this.mediumCirclesHitList[i].beginFill(0xFFFF00, 0.5);
			this.mediumCirclesHitList[i].drawCircle(12, 12, 27);
			this.mediumCirclesHitList[i].visible = false;

			// ADDING THE MEDIUM CIRCLE SPRITE
			this.add.sprite(mediumCircleX,mediumCircleY, "imageGameMediumCircle");

			// ADDING THE MEDIUM CIRCLE GLOW SPRITE
			this.mediumCirclesGlowList[i] = game.add.graphics(mediumCircleX, mediumCircleY);
			this.mediumCirclesGlowList[i].beginFill(0xFFFFFF, 0.4);
			this.mediumCirclesGlowList[i].drawCircle(12, 12, 24);
			this.mediumCirclesGlowList[i].visible = false;
			}

		// ADDING THE LARGE CIRCLES
		for(var i = 0; i < this.largeCircles.length / 2; i++)
			{
			var largeCircleX = Math.floor(this.largeCircles[2 * i + 0] * 0.10 - 26.45);
			var largeCircleY = Math.floor(this.largeCircles[2 * i + 1] * 0.10 - 26.45);

			// ADDING THE CIRCLE TO THE LARGE CIRCLE LIST
			this.largeCirclesList[i] = this.pinballBoard.addCircle(2.8 * this.PTM, this.largeCircles[2 * i + 0], this.largeCircles[2 * i + 1]);
			this.largeCirclesList[i].circleIndex = i;

			// ADDING THE LARGE CIRCLE SHADOW
			var tempCircleShadow = this.add.sprite(largeCircleX + 1,largeCircleY + 1,"imageGameLargeCircle");
			tempCircleShadow.tint = 0x343434;

			// ADDING THE LARGE CIRCLE HIT SPRITE
			this.largeCirclesHitList[i] = game.add.graphics(largeCircleX, largeCircleY);
			this.largeCirclesHitList[i].beginFill(0xFFFF00, 0.4);
			this.largeCirclesHitList[i].drawCircle(27.5, 27.5, 58);
			this.largeCirclesHitList[i].visible = false;

			// ADDING THE LARGE CIRCLE SPRITE
			this.add.sprite(largeCircleX,largeCircleY,"imageGameLargeCircle");

			// ADDING THE LARGE CIRCLE GLOW SPRITE
			this.largeCirclesGlowList[i] = game.add.graphics(largeCircleX, largeCircleY);
			this.largeCirclesGlowList[i].beginFill(0xFFFFFF, 0.5);
			this.largeCirclesGlowList[i].drawCircle(27, 27, 54);
			this.largeCirclesGlowList[i].visible = false;
			}

		// ADDING THE FIRST GUTTER FIXTURE
		this.gutterFixture1 = this.pinballBoard.addEdge(this.gutterVertices1[0], this.gutterVertices1[1], this.gutterVertices1[2], this.gutterVertices1[3]);
		this.gutterFixture1.SetSensor(true);

		// ADDING THE SECOND GUTTER FIXTURE (FAILSAFE)
		this.gutterFixture2 = this.pinballBoard.addEdge(this.gutterVertices2[0], this.gutterVertices2[1], this.gutterVertices2[2], this.gutterVertices2[3]);
		this.gutterFixture2.SetSensor(true);

		// SETTING THE RESTITUTION FOR LAUNCHER
		game.physics.box2d.restitution = 2.5;
		this.launcherFixture = this.pinballBoard.addEdge(this.launcherVertices[0], this.launcherVertices[1], this.launcherVertices[2], this.launcherVertices[3]);

		// ADDING THE BOX 2D BALL BODY
		game.physics.box2d.restitution = 0.1;
		this.ballBody = new Phaser.Physics.Box2D.Body(this.game, null, this.ballStart[0] * this.PTM, this.ballStart[1] * this.PTM);
		this.ballBody.setCircle(0.64 * this.PTM);
		this.ballBody.bullet = true;

		// SETTING A CALLBACK WHEN THE BALL HITS THE FIRST GUTTER
		this.ballBody.setFixtureContactCallback(this.gutterFixture1, function()
			{
			// CLEARING THE SCORE
			this.updateScore(0);

			// SETTING THAT THE GAME IS OVER
			this.gameOver = true;
			}, this);

		// SETTING A CALLBACK WHEN THE BALL HITS THE SECOND GUTTER (FAILSAFE)
		this.ballBody.setFixtureContactCallback(this.gutterFixture2, function()
			{
			// CLEARING THE SCORE
			this.updateScore(0);

			// SETTING THAT THE GAME IS OVER
			this.gameOver = true;
			}, this);

		// SETTING A CALLBACK WHEN THE BALL HITS THE LAUNCHER
		this.ballBody.setFixtureContactCallback(this.launcherFixture, function()
			{
			// SETTING THAT THE LAUNCHER WILL BE MOVING
			this.launcherIsMoving = true;

			// SETTING THAT THE LAUNCHER WILL BE GOING UP
			this.launcherGoingUp = true;

			// CHECKING IF THE SOUND IS ENABLED
			if (GAME_SOUND_ENABLED==true)
				{
				// PLAYING THE LAUNCHER SOUND
				this.audioPlayer = this.add.audio("soundLauncher");
				this.audioPlayer.play();
				}
			}, this);

		// ADDING THE BALL LAUNCHER CONTAINER
		this.launcherContainer = game.add.sprite(140, 51, "imageGameBlock");

		// ADDING THE BALL LAUNCHER CONTAINER MASK
		this.launcherContainerMask = game.add.graphics();
		this.launcherContainerMask.beginFill(0xFFFFFF, 1)
		this.launcherContainerMask.drawRect(-5, -150, 16, 82);
		this.launcherContainer.addChild(this.launcherContainerMask);
		this.launcherContainer.mask = this.launcherContainerMask;

		// ADDING THE BALL LAUNCHER SPRITE
		this.launcherSprite = this.add.sprite(0,-100,"imageGameLauncher");
		this.launcherContainer.addChild(this.launcherSprite);

		// ADDING THE BALL SPRITE
		this.ballSprite = this.add.sprite(0,0,"imageGameBall");

		// THE BALL SPRITE MUST ALWAYS FOLLOW THE BOX2D BALL BODY
		this.ballSprite.position.x = this.ballBody.x * 0.10 - 6;
		this.ballSprite.position.y = this.ballBody.y * 0.10 - 6;

		// LOOPING ALL THE MEDIUM CIRCLES IN ORDER TO SET A CALLBACK WHEN THE BALL HITS A MEDIUM CIRCLE
		for(var i = 0; i < this.mediumCirclesList.length; i++)
			{
			// SETTING THE CALLBACK AND WHAT WILL HAPPEN WHEN THE BALL HITS A MEDIUM CIRCLE
			this.ballBody.setFixtureContactCallback(this.mediumCirclesList[i], function (a,b,c,d,e)
				{
				// CHECKING IF THE SOUND IS ENABLED
				if (GAME_SOUND_ENABLED==true)
					{
					// PLAYING THE HIT SOUND
					this.audioPlayer = this.add.audio("soundHit");
					this.audioPlayer.play();
					}

				// SHOWING THE MEDIUM CIRCLE HIT SPRITE
				this.mediumCirclesHitList[d.circleIndex].visible = true;

				// SHOWING THE MEDIUM CIRCLE GLOW SPRITE
				this.mediumCirclesGlowList[d.circleIndex].visible = true;

				// ADDING 10 POINTS TO THE SCORE
				this.updateScore(this.scoreValue + 10);

				// WAITING 200 MS
				game.time.events.add(200, function()
					{
					// HIDING THE MEDIUM CIRCLE HIT SPRITE
					game.state.states["Pinball.Game"].mediumCirclesHitList[d.circleIndex].visible = false;

					// HIDING THE MEDIUM CIRCLE GLOW SPRITE
					game.state.states["Pinball.Game"].mediumCirclesGlowList[d.circleIndex].visible = false;
					});
				}
			,this);
			}

		// LOOPING ALL THE LARGE CIRCLES IN ORDER TO SET A CALLBACK WHEN THE BALL HITS A LARGE CIRCLE
		for(var i = 0; i < this.largeCirclesList.length; i++)
			{
			// SETTING THE CALLBACK AND WHAT WILL HAPPEN WHEN THE BALL HITS A LARGE CIRCLE
			this.ballBody.setFixtureContactCallback(this.largeCirclesList[i], function (a,b,c,d,e)
				{
				// CHECKING IF THE SOUND IS ENABLED
				if (GAME_SOUND_ENABLED==true)
					{
					// PLAYING THE HIT SOUND
					this.audioPlayer = this.add.audio("soundHit");
					this.audioPlayer.play();
					}

				// SHOWING THE LARGE CIRCLE HIT SPRITE
				this.largeCirclesHitList[d.circleIndex].visible = true;

				// SHOWING THE LARGE CIRCLE GLOW SPRITE
				this.largeCirclesGlowList[d.circleIndex].visible = true;

				// ADDING 20 POINTS TO THE SCORE
				this.updateScore(this.scoreValue + 20);

				// WAITING 200 MS
				game.time.events.add(200, function()
					{
					// HIDING THE LARGE CIRCLE HIT SPRITE
					game.state.states["Pinball.Game"].largeCirclesHitList[d.circleIndex].visible = false;

					// HIDING THE LARGE CIRCLE GLOW SPRITE
					game.state.states["Pinball.Game"].largeCirclesGlowList[d.circleIndex].visible = false;
					});
				}
			,this);
			}

		// SETTING THE RESTITUTION FOR THE FLIPPERS
		game.physics.box2d.restitution = 0.1;

		// ADDING THE LEFT FLIPPER
		this.leftFlipper = new Phaser.Physics.Box2D.Body(this.game, null, -8 * this.PTM, -7.99956 * this.PTM, 2);
		this.leftFlipper.addPolygon(this.leftFlipperVertices);

		// ADDING THE LEFT FLIPPER SPRITE
		this.leftFlipperSprite = game.add.graphics(0, 0);
		this.leftFlipperSprite.beginFill(0xFFFFFF);
		this.leftFlipperSprite.lineStyle(2, 0x343434, 1);
		for(var i = 0; i < this.leftFlipperVertices.length; i=i+2)
			{
			if (i==0)
				{
				this.leftFlipperSprite.moveTo(this.leftFlipperVertices[i] * 0.10 - 0.0000001, this.leftFlipperVertices[i + 1] * 0.10 - 0.0000001);
				}
			this.leftFlipperSprite.lineTo(this.leftFlipperVertices[i] * 0.10, this.leftFlipperVertices[i +1] * 0.10);
			}
		this.leftFlipperSprite.endFill();
		this.leftFlipperSprite.position.x = this.leftFlipper.x * 0.10;
		this.leftFlipperSprite.position.y = this.leftFlipper.y * 0.10;

		// ADDING THE RIGHT FLIPPER
		this.rightFlipper = new Phaser.Physics.Box2D.Body(this.game, null, 6.4 * this.PTM, -7.99956 * this.PTM, 2);
		this.rightFlipper.addPolygon(this.rightFlipperVertices);

		// ADDING THE RIGHT FLIPPER SPRITE
		this.rightFlipperSprite = game.add.graphics(0, 0);
		this.rightFlipperSprite.beginFill(0xFFFFFF);
		this.rightFlipperSprite.lineStyle(2, 0x343434, 1);
		for(var i = 0; i < this.rightFlipperVertices.length; i=i+2)
			{
			if (i==0)
				{
				this.rightFlipperSprite.moveTo(this.rightFlipperVertices[i] * 0.10 - 0.0000001, this.rightFlipperVertices[i + 1] * 0.10 - 0.0000001);
				}
			this.rightFlipperSprite.lineTo(this.rightFlipperVertices[i] * 0.10, this.rightFlipperVertices[i +1] * 0.10);
			}
		this.rightFlipperSprite.endFill();
		this.rightFlipperSprite.position.x = this.rightFlipper.x * 0.10;
		this.rightFlipperSprite.position.y = this.rightFlipper.y * 0.10;

		// SETTING THE FLIPPER JOINTS							(BODYA, BODYB, AX, AY, BX, BY, MOTORSPEED, MOTORTORQUE, MOTORENABLED, LOWERLIMIT, UPPERLIMIT, LIMITENABLED)
		this.flipperJoints[0] = game.physics.box2d.revoluteJoint(this.pinballBoard, this.leftFlipper,   -8 * this.PTM, -7.99956 * this.PTM, 0, 0, 2, 100, false, -25, 25, true);
		this.flipperJoints[1] = game.physics.box2d.revoluteJoint(this.pinballBoard, this.rightFlipper, 6.4 * this.PTM, -7.99956 * this.PTM, 0, 0, 2, 100, false, -25, 25, true);

		// LOWERING THE LEFT FLIPPER
		this.leftFlipper.angle = 27;

		// LOWERING THE RIGHT FLIPPER
		this.rightFlipper.angle = -27;

		// ADDING THE SCORE BACKGROUND
		this.scoreBackground = game.add.graphics();
		this.scoreBackground.beginFill(0x000000, 0.7);
		this.scoreBackground.lineStyle(2, 0x383838, 1);
		this.scoreBackground.drawRoundedRect(-145, -530, 104, 40, 10);

		// ADDING THE SCORE LABEL SHADOW
		this.scoreLabelShadow = game.add.bitmapText(-135, -521.25, "ArialBlackWhite", "0", 27);
		this.scoreLabelShadow.height = 32;
		this.scoreLabelShadow.tint = 0x000000;

		// ADDING THE SCORE LABEL
		this.scoreLabel = game.add.bitmapText(-138, -523.25, "ArialBlackWhite", "0", 27);
		this.scoreLabel.height = 32;

		// ADDING THE HIGH SCORE BACKGROUND
		this.highScoreBackground = game.add.graphics();
		this.highScoreBackground.beginFill(0x022C5C, 1);
		this.highScoreBackground.lineStyle(2, 0x0046A9, 1);
		this.highScoreBackground.drawRoundedRect(30.5, -530, 124, 40, 10);

		// ADDING THE HIGH SCORE ICON SHADOW
		this.highScoreIconShadow = game.add.sprite(39, -521, "imageGameHighScore");
		this.highScoreIconShadow.tint = 0x000000;

		// ADDING THE HIGH SCORE ICON
		this.highScoreIcon = game.add.sprite(37, -523, "imageGameHighScore");

		// ADDING THE HIGH SCORE LABEL SHADOW
		this.highScoreLabelShadow = game.add.bitmapText(69, -521.25, "ArialBlackWhite", this.getHighscore(), 27);
		this.highScoreLabelShadow.height = 32;
		this.highScoreLabelShadow.tint = 0x000000;

		// ADDING THE HIGH SCORE LABEL
		this.highScoreLabel = game.add.bitmapText(66, -523.25, "ArialBlackWhite", this.getHighscore(), 27);
		this.highScoreLabel.height = 32;

		// ADDING THE SOUND HANDLER ON BACKGROUND
		this.soundHandlerOnBackground = game.add.graphics();
		this.soundHandlerOnBackground.beginFill(0x022C5C, 1);
		this.soundHandlerOnBackground.lineStyle(2, 0x0046A9, 1);
		this.soundHandlerOnBackground.drawRoundedRect(-28, -530, 45, 40, 10);
		this.soundHandlerOnBackground.inputEnabled = true;
		this.soundHandlerOnBackground.input.useHandCursor = true;
		this.soundHandlerOnBackground.events.onInputUp.add(function()
			{
			// SHOWING THE SOUND HANDLER OFF BACKGROUND AND ICON
			this.soundHandlerOffBackground.visible = true;
			this.soundHandlerOffSprite.visible = true;

			// HIDING THE SOUND HANDLER ON BACKGROUND AND ICON
			this.soundHandlerOnBackground.visible = false;
			this.soundHandlerOnSprite.visible = false;

			// SETTING THAT THE SOUND IS DISABLED
			GAME_SOUND_ENABLED = false;

			// SAVING THE SOUND PREFERENCE
			this.setBooleanSetting("GAME_SOUND_ENABLED", false);
			},this);

		// ADDING THE SOUND HANDLER ON SPRITE
		this.soundHandlerOnSprite = game.add.sprite(-19, -521.25, "imageGameSoundOn");

		// ADDING THE SOUND HANDLER OFF BACKGROUND
		this.soundHandlerOffBackground = game.add.graphics();
		this.soundHandlerOffBackground.beginFill(0x383838, 1);
		this.soundHandlerOffBackground.lineStyle(2, 0x707070, 1);
		this.soundHandlerOffBackground.drawRoundedRect(-28, -530, 45, 40, 10);
		this.soundHandlerOffBackground.inputEnabled = true;
		this.soundHandlerOffBackground.input.useHandCursor = true;
		this.soundHandlerOffBackground.events.onInputUp.add(function()
			{
			// SHOWING THE SOUND HANDLER ON BACKGROUND AND ICON
			this.soundHandlerOnBackground.visible = true;
			this.soundHandlerOnSprite.visible = true;

			// HIDING THE SOUND HANDLER OFF BACKGROUND AND ICON
			this.soundHandlerOffBackground.visible = false;
			this.soundHandlerOffSprite.visible = false;

			// SETTING THAT THE SOUND IS ENABLED
			GAME_SOUND_ENABLED = true;

			// SAVING THE SOUND PREFERENCE
			this.setBooleanSetting("GAME_SOUND_ENABLED", true);
			},this);

		// ADDING THE SOUND HANDLER ON SPRITE
		this.soundHandlerOffSprite = game.add.sprite(-19, -521.25, "imageGameSoundOff");

		// CHECKING IF THE SOUND IS ENABLED
		if (GAME_SOUND_ENABLED==true)
			{
			// SHOWING THE SOUND ON BUTTON
			this.soundHandlerOnBackground.visible = true;
			this.soundHandlerOnSprite.visible = true;

			// HIDING THE SOUND OFF BUTTON
			this.soundHandlerOffBackground.visible = false;
			this.soundHandlerOffSprite.visible = false;
			}
		else
			{
			// SHOWING THE SOUND OFF BUTTON
			this.soundHandlerOffBackground.visible = true;
			this.soundHandlerOffSprite.visible = true;

			// SHOWING THE SOUND ON BUTTON
			this.soundHandlerOnBackground.visible = true;
			this.soundHandlerOnSprite.visible = true;
			}

		// ADDING THE NORMAL BUTTON A
		this.buttonANormal = game.add.sprite(-10, 497, "imageGameButtonANormal");
		this.buttonANormal.fixedToCamera = true;
		this.buttonANormal.tint = 0xAFAFAF;
		this.buttonANormal.scale.set(0.8);

		// ADDING THE PRESSED BUTTON A
		this.buttonAPressed = game.add.sprite(-10, 497, "imageGameButtonAPressed");
		this.buttonAPressed.fixedToCamera = true;
		this.buttonAPressed.tint = 0xAFAFAF;
		this.buttonAPressed.scale.set(0.8);
		this.buttonAPressed.visible = false;

		// ADDING THE BUTTON A HANDLER
		this.buttonAHandler = game.add.graphics();
		this.buttonAHandler.beginFill(0x000000, 0);
		this.buttonAHandler.drawRect(-10, 497, 120, 120, 10);
		this.buttonAHandler.isDown = false;
		this.buttonAHandler.inputEnabled = true;
		this.buttonAHandler.fixedToCamera = true;
		this.buttonAHandler.events.onInputDown.add(function(){this.buttonAHandler.isDown=true;this.buttonANormal.visible=false;this.buttonAPressed.visible=true;this.update();},this);
		this.buttonAHandler.events.onInputUp.add(function(){this.buttonAHandler.isDown=false;this.buttonANormal.visible=true;this.buttonAPressed.visible=false;},this);

		// ADDING THE NORMAL BUTTON B
		this.buttonBNormal = game.add.sprite(210, 497, "imageGameButtonBNormal");
		this.buttonBNormal.fixedToCamera = true;
		this.buttonBNormal.tint = 0xAFAFAF;
		this.buttonBNormal.scale.set(0.8);

		// ADDING THE PRESSED BUTTON B
		this.buttonBPressed = game.add.sprite(210, 497, "imageGameButtonBPressed");
		this.buttonBPressed.fixedToCamera = true;
		this.buttonBPressed.tint = 0xAFAFAF;
		this.buttonBPressed.scale.set(0.8);
		this.buttonBPressed.visible = false;

		// ADDING THE BUTTON B HANDLER
		this.buttonBHandler = game.add.graphics();
		this.buttonBHandler.beginFill(0x000000, 0);
		this.buttonBHandler.drawRect(210, 497, 120, 120, 10);
		this.buttonBHandler.isDown = false;
		this.buttonBHandler.inputEnabled = true;
		this.buttonBHandler.fixedToCamera = true;
		this.buttonBHandler.events.onInputDown.add(function(){this.buttonBHandler.isDown=true;this.buttonBNormal.visible=false;this.buttonBPressed.visible=true;this.update();},this);
		this.buttonBHandler.events.onInputUp.add(function(){this.buttonBHandler.isDown=false;this.buttonBNormal.visible=true;this.buttonBPressed.visible=false;},this);

		// CHECKING IF IT IS A MOBILE DEVICE
		if (this.isMobileDevice==false)
			{
			// HIDING THE BUTTON A
			this.buttonANormal.visible = false;
			this.buttonAPressed.visible = false;
			this.buttonAHandler.visible = false;

			// HIDING THE BUTTON B
			this.buttonBNormal.visible = false;
			this.buttonBPressed.visible = false;
			this.buttonBHandler.visible = false;
			}

		// GETTING THE CURSOR KEY INPUTS
		this.cursors = game.input.keyboard.createCursorKeys();

		// REGISTERING THE 'A' AND 'D' KEYS
		this.keyA = game.input.keyboard.addKey(Phaser.Keyboard.A);
		this.keyD = game.input.keyboard.addKey(Phaser.Keyboard.D);

		// PAUSING THE BOX2D PHYSICS
		game.physics.box2d.pause();

		// WAITING 500 MS
		game.time.events.add(500, function()
			{
			// RESUMING THE BOX2D PHYSICS
			game.physics.box2d.resume();
			});
		},

	update: function()
		{
		// CHECKING IF THE GAME IS OVER
		if(this.gameOver==true)
			{
			// RESTORING THE BALL THE STARTING POSITION
			this.ballBody.x = this.ballStart[0]*this.PTM;
			this.ballBody.y = this.ballStart[1]*this.PTM;

			// CLEARING THE BALL VELOCITY
			this.ballBody.velocity.x = 0;
			this.ballBody.velocity.y = 0;
			this.ballBody.angularVelocity = 0;

			// SETTING THAT THE GAME IS NOT OVER
			this.gameOver = false;
			}

		// THE BALL SPRITE MUST ALWAYS FOLLOW THE BOX2D BALL BODY
		this.ballSprite.position.x = this.ballBody.x * 0.10 - 6;
		this.ballSprite.position.y = this.ballBody.y * 0.10 - 6;

		// THE LEFT FLIPPER SPRITE MUST ALWAYS FOLLOW THE BOX2D LEFT FLIPPER
		this.leftFlipperSprite.angle = this.leftFlipper.angle;

		// THE RIGHT FLIPPER SPRITE MUST ALWAYS FOLLOW THE BOX2D RIGHT FLIPPER
		this.rightFlipperSprite.angle = this.rightFlipper.angle;

		// CHECKING IF PRESSING THE LEFT OR 'A' KEY
		if(this.cursors.left.isDown==true || this.keyA.isDown==true || this.buttonAHandler.isDown==true)
			{
			// CHECKING IF THE SOUND IS ENABLED
			if (GAME_SOUND_ENABLED==true)
				{
				// CHECKING IF THE LEFT FLIPPER IS DOWN
				if (this.flipperJoints[0].m_motorSpeed!=-15)
					{
					// PLAYING THE FLIPPER SOUND
					this.audioPlayer = this.add.audio("soundFlipper");
					this.audioPlayer.play();
					}
				}

			// ENABLING THE LEFT FLIPPER
			this.flipperJoints[0].m_enableMotor = true;

			// RAISING THE LEFT FLIPPER
			this.flipperJoints[0].SetMotorSpeed(-15);
			}
			else
			{
			// CHECKING IF THE LEFT FLIPPER MUST BE LOWERING
			if (-25>this.leftFlipper.angle)
				{
				// LOWERING THE LEFT FLIPPER
				this.flipperJoints[0].SetMotorSpeed(15);
				}
			}

		// CHECKING IF PRESSING THE RIGHT OR 'D' KEY
		if(this.cursors.right.isDown==true || this.keyD.isDown==true || this.buttonBHandler.isDown==true)
			{
			// CHECKING IF THE SOUND IS ENABLED
			if (GAME_SOUND_ENABLED==true)
				{
				// CHECKING IF THE RIGHT FLIPPER IS DOWN
				if (this.flipperJoints[1].m_motorSpeed!=15)
					{
					// PLAYING THE FLIPPER SOUND
					this.audioPlayer = this.add.audio("soundFlipper");
					this.audioPlayer.play();
					}
				}

			// ENABLING THE RIGHT FLIPPER
			this.flipperJoints[1].m_enableMotor = true;

			// RAISING THE RIGHT FLIPPER
			this.flipperJoints[1].SetMotorSpeed(15);
			}
			else
			{
			// CHECKING IF THE RIGHT FLIPPER MUST BE LOWERING
			if (25<this.rightFlipper.angle)
				{
				// LOWERING THE RIGHT FLIPPER
				this.flipperJoints[1].SetMotorSpeed(-15);
				}
			}

		// CHECKING IF THE LAUNCHER IS MOVING
		if (this.launcherIsMoving==true)
			{
			// CHECKING IF THE LAUNCHER IS GOING UP
			if (this.launcherGoingUp==true)
				{
				// MOVING UP THE LAUNCHER
				this.launcherSprite.position.y = this.launcherSprite.position.y - 10;
				}
				else
				{
				// MOVING DOWN THE LAUNCHER
				this.launcherSprite.position.y = this.launcherSprite.position.y + 10;
				}

			// CHECKING IF THE LAUNCHER HITS THE TOP LIMIT
			if (this.launcherSprite.position.y<=-160)
				{
				// SETTING THAT THE LAUNCHER WILL BE GOING DOWN
				this.launcherGoingUp = false;
				}
			// CHECKING IF THE LAUNCHER HITS THE BOTTOM LIMIT
			else if (this.launcherSprite.position.y>=-100)
				{
				// SETTING THAT THE LAUNCHER WILL NOT BE MOVING ANY MORE
				this.launcherIsMoving = false;
				}
			}
		},

	render: function()
		{
		// CHECKING IF THE GAME IS RUNNING IN DEBUG MODE
		if (Pinball.showDebug==true)
			{
			// SHOWING THE DEBUG LAYOUT
			game.debug.box2dWorld();
			}
		},

	updateScore: function(newScore)
		{
		// CHECKING IF THE USER HITS THE MAXIMUM SCORE POSSIBLE
		if (newScore>9999)
			{
			// UPDATING THE USER SCORE
			newScore = 9999;
			}

		// UPDATING THE SCORE WITH THE NEW VALUE
		this.scoreValue = newScore;

		// UPDATING THE SCORE WITH THE NEW VALUE
		this.scoreLabel.setText(newScore);

		// UPDATING THE SCORE SHADOW WITH THE NEW VALUE
		this.scoreLabelShadow.setText(newScore);

		// CHECKING IF THE CURRENT SCORE HITS THE HIGH SCORE
		if (this.scoreValue>this.getHighscore())
			{
			// SETTING THE NEW HIGHSCORE
			this.setHighscore(this.scoreValue);

			// UPDATING THE HIGHSCORE WITH THE NEW VALUE
			this.highScoreLabel.setText(newScore);

			// UPDATING THE HIGHSCORE SHADOW WITH THE NEW VALUE
			this.highScoreLabelShadow.setText(newScore);
			}
		},

	getHighscore: function()
		{
		try
			{
			var name = "highscorepinball";
			var nameEQ = name + "=";
			var ca = document.cookie.split(";");

			for(var i=0;i < ca.length;i++)
				{
				var c = ca[i];
				while (c.charAt(0)==" ")
					{
					c = c.substring(1,c.length);
					}
				if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
				}
			}
		catch(err)
			{
			}

		return "0";
		},

	setHighscore: function(newHighscore)
		{
		try
			{
			var name = "highscorepinball";
			var value = newHighscore;
			var days = 999;
			var expires = "";
			if (days)
				{
				var date = new Date();
				date.setTime(date.getTime() + (days*24*60*60*1000));
				expires = "; expires=" + date.toUTCString() + "; SameSite=Lax";
				}
			document.cookie = name + "=" + (value || "")  + expires + "; Secure; path=/";
			}
			catch(err)
			{
			}
		},

	setBooleanSetting: function(settingName, settingValue)
		{
		try
			{
			var name = "pinball" + settingName;
			var value = String(settingValue);
			var days = 999;
			var expires = "";
			if (days)
				{
				var date = new Date();
				date.setTime(date.getTime() + (days*24*60*60*1000));
				expires = "; expires=" + date.toUTCString() + "; SameSite=Lax";
				}
			document.cookie = name + "=" + (value || "")  + expires + "; Secure; path=/";
			}
			catch(err)
			{
			}
		},

	getCurrentTime: function()
		{
		return window.performance && window.performance.now && window.performance.timing && window.performance.timing.navigationStart ? window.performance.now() + window.performance.timing.navigationStart : Date.now();
		}
	};

// SETTING THE DEFAULT RENDERER MODE
var rendererMode = Phaser.WEBGL;

// CHECKING IF THE WEBGL RENDERER MODE IS NOT AVAILABLE
if (isWebGLAvailable()==false)
	{
	// CHANGING THE RENDERER MODE
	rendererMode = Phaser.CANVAS;
	}

// CREATING THE GAME INSTANCE
var config = {width: 320, height: 608, renderer: rendererMode, parent: "content", disableVisibilityChange: false};
var game = new Phaser.Game(config);

// CREATING THE STATES
game.state.add("Pinball.Preloader", Pinball.Preloader);
game.state.add("Pinball.Splash", Pinball.Splash);
game.state.add("Pinball.Menu", Pinball.Menu);
game.state.add("Pinball.Game", Pinball.Game);

// STARTING THE GAME PRELOADER
game.state.start("Pinball.Preloader");