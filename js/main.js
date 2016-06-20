var canvas = CE.defines('canvas_id').
		extend(Scrolling).
		extend(Spritesheet).
		extend(Tiled).
		extend(Animation).
		extend(Input).
		ready(function() {
			canvas.Scene.call('MyScene');
		});


canvas.Scene.new({
	name: 'MyScene',
	materials: {
		images: {
			minimonk_64: 'images/minimonk_64.png',
			Map_11:'images/Map_11.png',
			wolf:'images/hero.png'
		}
	},
	ready: function(stage) {
		var sprite, map, tiled;
		this.scrolling = canvas.Scrolling.new(this, 64, 64);

		var player = this.player = this.createElement();
		this.player.x = 100;
		this.player.y = 700;

		sprite = canvas.Spritesheet.new(
			'minimonk_64',
			[[0,0,74,137,0,37,126],[202,0,72,136,0,35,126],[274,0,64,137,0,27,123],[338,0,64,142,0,26,125],[402,0,74,141,0,40,129],[0,142,61,139,0,32,126],[61,142,67,141,0,33,129],[128,142,65,140,0,33,127],[193,142,77,142,0,43,126],[270,142,48,143,0,26,125],[318,142,53,143,0,29,125],[371,142,64,135,0,32,126],[435,142,66,134,0,33,125],[0,285,51,136,0,26,123],[51,285,68,134,0,36,125],[119,285,66,136,0,39,123],[185,285,67,138,0,34,128],[252,285,64,140,0,30,126],[316,285,67,138,0,34,128],[383,285,64,140,0,33,126],[0,425,66,134,0,32,125],[66,425,51,136,0,24,123],[117,425,68,134,0,31,125],[185,425,66,136,0,26,123],[251,425,77,142,0,32,126],[328,425,48,143,0,20,125],[376,425,53,143,0,22,125],[429,425,64,135,0,30,126],[0,568,74,137,0,37,126],[74,568,74,138,0,41,116],[148,568,69,134,0,34,113],[217,568,73,144,0,40,100],[74,0,64,142,0,36,125],[290,568,48,142,0,43,124],[338,568,77,144,0,80,126],[415,568,91,135,0,108,116],[0,712,64,137,0,35,123],[64,712,68,139,0,38,126],[132,712,52,142,0,41,131],[184,712,45,139,0,46,130],[229,712,72,136,0,35,126],[301,712,64,137,0,30,136],[365,712,67,138,0,34,142],[432,712,61,138,0,34,144],[0,854,64,137,0,27,123],[64,854,68,139,0,28,126],[132,854,52,142,0,9,131],[184,854,45,139,0,-2,130],[338,0,64,142,0,26,125],[229,854,47,142,0,33,124],[276,854,77,144,0,-4,126],[353,854,91,135,0,-18,116]]
		);
		var wolf = this.wolf = this.createElement(),
		wolf_dx=0,
		wolf_dy=0,
		wolf_anim = canvas.Animation.new({
                images: "wolf",
                animations: {
                    walk_bottom: {
											frames: [
												[{"pattern":1}],
												[{"pattern":2}],
												[{"pattern":3}]
											],
                        size: {
                            width: 288/3,
                            height: 384/4
                        },
                        frequence: 2
                    },
										walk_left: {
											frames: [
												[{"pattern":4}],
												[{"pattern":5}],
												[{"pattern":6}]
											],
												size: {
														width: 288/3,
														height: 384/4
												},
												frequence: 2
										},
										walk_right: {
												frames: [
													[{"pattern":7}],
													[{"pattern":8}],
													[{"pattern":9}]
												],
												size: {
														width: 288/3,
														height: 384/4
												},
												frequence: 2
										},
										walk_top: {
												frames: [
													[{"pattern":10}],
	                        [{"pattern":11}],
	                        [{"pattern":12}]
												],
												size: {
														width: 288/3,
														height: 384/4
												},
												frequence: 5
										}
                }
            });

		sprite.draw(this.player, '0');
		wolf_anim.add(wolf);
   wolf_anim.play("walk_top", "loop");

		this.scrolling.setMainElement(wolf);
		//клавиатураd
		window.onmousemove = function(e){
			//console.log(e)
			var rotate = get_deg(wolf.real_x,wolf.real_y,e.pageX,e.pageY);
	/*		if (rotate>-40 && rotate<=40){
				wolf_anim.play("walk_top", "stop");
			}else if (rotate>40 && rotate<=45){
				wolf_anim.play("walk_right", "stop");
			}else if (rotate>45 && rotate<=90){
				wolf_anim.play("walk_right", "stop");
			}else if (rotate>90 && rotate<=135){
				wolf_anim.play("walk_right", "stop");
			}else if (rotate>135 && rotate<=180){
				wolf_anim.play("walk_bottom", "stop");
			}else if (rotate>-135 && rotate>=-180){
				wolf_anim.play("walk_left", "stop");
			}else if (rotate>-90 && rotate>=-135){
				wolf_anim.play("walk_left", "stop");
			}else if (rotate>-45 && rotate>=-90){
				wolf_anim.play("walk_left", "stop");
			}else if (rotate>-40 && rotate>=-45){
				wolf_anim.play("walk_left", "stop");
			}*/
			wolf.rotateTo(rotate)
		}
		window.onkeydown = function(e) {
			var key = e.keyCode ? e.keyCode : e.which;
			switch(key){
				case 68://D
					 //wolf_anim.play("walk_right", "stop");
					 //wolf.x +=10;
					 wolf_dx = 10;
				break;
				case 65://D
				 //wolf_anim.play("walk_left", "stop");
				  //wolf.x -=10;
					wolf_dx = -10;
				break;
				case 87://w
				 //wolf_anim.play("walk_top", "stop");
				  //wolf.y -=10;
					wolf_dy = -10;
				break;
				case 83://s
				 //wolf_anim.play("walk_bottom", "stop");
				 //wolf.y +=10;
				 wolf_dy = 10;
				break;
				default:break;
			}

	 }
			 window.onkeyup = function(e) {
			   var key = e.keyCode ? e.keyCode : e.which;
				 switch(key){
					 case 68://D
					 		//wolf_anim.play("walk_right", "stop");
							wolf_dx = 0;
					 break;
					 case 65://D
					 	//wolf_anim.play("walk_left", "stop");
						wolf_dx = 0;
					 break;
					 case 87://w
					 	//wolf_anim.play("walk_top", "stop");
						wolf_dy = 0;
					 break;
					 case 83://s
					  //wolf_anim.play("walk_bottom", "stop");
						wolf_dy = 0;
					 break;
					 default:break;
				 }

			}


		map = this.createElement();
		tiled = canvas.Tiled.new();
		this.scrolling.addScroll({
           element: map,
           speed: 6,
           block: true,
           width: 1440,
           height: 864
        });

		tiled.load(this, map, 'assets/map_2.json');
		tiled.ready(function() {

			map.append(wolf);
		});

		stage.append(map);
		console.log(stage)
	//	stage.refresh();



},
	render: function(stage) {
		//this.player.x += 1;
		//this.wolf.x +=10;
		//this.wolf.y +=10;
		this.scrolling.update();
		stage.refresh();
	}
});


function get_deg(x1,y1,x2,y2){
	var objCenter=[x1+32, y1+32];
	var angle = Math.atan2(x2- objCenter[0], - (y2- objCenter[1]) )*(180/Math.PI);
	//var A = Math.atan2(y1 - y2, x1 - x2) / Math.PI * 90
	//A = (A < 0) ? A + 360 : A;
	//console.log(angle)
	return angle
}
