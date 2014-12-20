var currLoaded = 0 ;
var allLoaded = 5 ;

function inc_cur() {
    currLoaded ++ ;
}

var basepath = "/assets/demos/177/" ; //     :-)
var cocoarts = new image(basepath +'cocoarts.png');
var logo = new image(basepath +'dcs-logo.png');
var gfx1 = new image(basepath +'gfx1.png');
var gfx2 = new image(basepath +'gfx2.png');
var font = new image(basepath +'font.png');

cocoarts.img.onload = function() { inc_cur() ; }
logo.img.onload = function() { inc_cur() ; }
gfx1.img.onload = function() { inc_cur() ; }
gfx2.img.onload = function() { inc_cur() ; }
font.img.onload = function() { inc_cur() ; }


var player = new music("FLOD");
player.stereo(true);

var cocoanim=[{y:600}];
var logoanim=[{alpha:0}];
var cubeanim=[{y:-300}];
var bganim=[{alpha:1}];
var mycanvas;
var my3d;

var myobj = new Array();
var myobjvert = new Array();
myobjvert=[
        {x:-100, y: 100, z: 100},
        {x:-100, y:-100, z: 100},
        {x: 100, y:-100, z: 100},
        {x: 100, y: 100, z: 100}, 
        {x: 100, y: 100, z:-100},
        {x: 100, y:-100, z:-100},
        {x:-100, y:-100, z:-100},
        {x:-100, y: 100, z:-100}, 
       ];

var col1=0xbb4466;
var opa1=1;
var boxpos=20;
var incr=5;


myobj=[ 
    {p1:0, p2:1, p3:2, p4:3, params:new MeshLambertMaterial({ color: col1, opacity:opa1, shading: FlatShading})},
	{p1:3, p2:2, p3:5, p4:4, params:new MeshLambertMaterial({ color: col1, opacity:opa1, shading: FlatShading})},
	{p1:7, p2:6, p3:1, p4:0, params:new MeshLambertMaterial({ color: col1, opacity:opa1, shading: FlatShading})},
	{p1:7, p2:0, p3:3, p4:4, params:new MeshLambertMaterial({ color: col1, opacity:opa1, shading: FlatShading})},
	{p1:1, p2:6, p3:5, p4:2, params:new MeshLambertMaterial({ color: col1, opacity:opa1, shading: FlatShading})},	
	{p1:4, p2:5, p3:6, p4:7, params:new MeshLambertMaterial({ color: col1, opacity:opa1, shading: FlatShading})},	

      ];

var realfontw = new Array(8,8,10,14,14,0,0,8,10,10, 14,10,8,12,8,0,14,10,12,12, 14,12,14,12,14,14,6,0,0,10, 0,14,0,14,14,14,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,15 ,11,16,14,14,14,14,14,12,14,14, 10,14,14,8,10,14,8,14,14,14, 14,14,10,12,10,14,14,14,14,14, 14,14,12,14);


var mypage=new Array();

mypage[0]=
"[\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\]/@"+
"/@"+
"forestill/@"+
"deg en cube!/@"+
"/@"+
"co.co.arts of/@"+
"dual crew - shining/@"+
"(or dcs if u like)/@"+
"presents: {|}/@"+
"/@"+
"[\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\]/@";

mypage[1]=
"[\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\]/@"+
"/@"+
"kefrens: shut up!/@"+
"/@"+
"co.co.arts is/@"+
"another way of/@"+
"saying 'dcs norway'!/@"+
"or perhaps 'codeman/@"+
"and corny'!/@"+
"/@"+
"[\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\]/@";

mypage[2]=
"[\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\]/@"+
"/@"+
"the responsibles:/@"+
"/@"+
"code: code(!)man/@"+
"art + design: corny/@"+
"tune: soul/@"+
"/@"+
"corny on board!/@"+
"/@"+
"[\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\]/@";

mypage[3]=
"[\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\]/@"+
"/@"+
"get in touch at:/@"+
"(eat fish!)/@"+
"/@"+
"co.co.arts*dcs/@"+
"p.o.box 79 - bygd_y/@"+
"n-0211 oslo 2/@"+
"norway/@"+
"/@"+
"[\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\]/@";

mypage[4]=
"[\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\]/@"+
"/@"+
"/@"+
"pampers/@"+
"den t_rreste bleien/@"+
"/@"+
"pr_v selv/@"+
"(uuuuh!)/@"+
"/@"+
"/@"+
"[\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\]/@";

mypage[5]=
"[\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\]/@"+
"/@"+
"corny's/@"+
"massagetime/@"+
"/@"+
"the pride (lemon.)/@"+
"and *jannie* ofcoz:/@"+
"yes!! how about a/@"+
"trip to dk? wheeeee!/@"+
"/@"+
"[\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\]/@";

mypage[6]=
"[\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\]/@"+
"/@"+
"solnova:/@"+
"din lille grimme/@"+
"julefluemand i mitt/@"+
"brusebad! oh, scene/@"+
"sucks! mange davser/@"+
"til slammer ogs`!/@"+
"(and *marie* ogs`!)/@"+
"/@"+
"[\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\]/@";

mypage[7]=
"[\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\]/@"+
"/@"+
"toastmaster/@"+
"(movement):/@"+
"# vi ruller! $/@"+
"$ og ruller! #/@"+
"ho ho! enda en lille/@"+
"julemand! send more/@"+
"salmiakk pastiller!!/@"+
"/@"+
"[\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\]/@";

mypage[8]=
"[\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\]/@"+
"/@"+
"/@"+
"dan + nuke (lemon.):/@"+
"ey ey lads! so where/@"+
"is that bloody demo/@"+
"with those bloody/@"+
"phonecalls? w_tt?/@"+
"/@"+
"/@"+
"[\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\]/@";

mypage[9]=
"[\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\]/@"+
"/@"+
"tfg (majic 12):/@"+
"stay cooool!/@"+
"we * top secret!/@"+
"/@"+
"lord helmet/@"+
"(spaceballs):/@"+
"ring (#$)./@"+
"/@"+
"[\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\]/@";

mypage[10]=
"[\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\]/@"+
"/@"+
"retep (mirage):/@"+
"things are gettin' a/@"+
"bit sloooow with chit/@"+
"chat, don't they?/@"+
"/@"+
"duel (lemon.):/@"+
"fy skam deg!/@"+
"/@"+
"[\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\]/@";

mypage[11]=
"[\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\]/@"+
"/@"+
"facet (lemon.):/@"+
"it's still a very/@"+
"small world..../@"+
"so, how is life??/@"+
"/@"+
"trix (hm):/@"+
"hello? anybody?/@"+
"/@"+
"[\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\]/@";

mypage[12]=
"[\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\]/@"+
"/@"+
"/@"+
"hannibal (lemon.):/@"+
"do you still have/@"+
"that video you told/@"+
"me about on the/@"+
"phone, eller hvad?/@"+
"/@"+
"/@"+
"[\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\]/@";

mypage[12]=
"[\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\]/@"+
"/@"+
"jean:/@"+
"kommer du en tur i/@"+
"august, eller/@"+
"forst`r du ingenting/@"+
"av det jeg skriver?/@"+
"....men hvor er n`/@"+
"soveposen????/@"+
"/@"+
"[\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\]/@";

mypage[13]=
"[\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\]/@"+
"/@"+
"this was boring./@"+
"some more hellos/@"+
"to these dudes too:/@"+
"conquest (scx)/@"+
"hithansen/@"+
"(funky buddhas)/@"+
"darkwalker (pmc)/@"+
"/@"+
"[\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\]/@";

mypage[14]=
"[\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\]/@"+
"/@"+
"colin (delicious)/@"+
"w.o.t.w. (silents)/@"+
"rahiem (wizzcat)/@"+
"cone (trsi)/@"+
"control (alcatraz)/@"+
"archibal (absolute)/@"+
"julemanden!/@"+
"and so on and on..../@"+
"[\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\]/@";

mypage[15]=
"[\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\]/@"+
"/@"+
"and ofcourse a huge/@"+
"kiss to *line* who is/@"+
"18 years old while/@"+
"this trentmo is/@"+
"released: 25.6.93!/@"+
"/@"+
"# happy birthday $/@"+
"$ to yoooooooou! #/@"+
"[\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\]/@";

mypage[16]=
"[\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\]/@"+
"/@"+
"for playbyting:/@"+
"/@"+
"stefan scherling/@"+
"h_gklintav^gen 19/@"+
"s-172 38/@"+
"sundbyberg/@"+
"sweden/@"+
"/@"+
"[\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\]/@";

mypage[17]=
"[\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\]/@"+
"/@"+
"so..../@"+
"tired of dots?/@"+
"/@"+
"watch out for more!/@"+
"coming soon from us!/@"+
"have a nice day, and/@"+
"don't drunk drive./@"+
"/@"+
"[\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\]/@";

mypage[18]=
"[\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\]/@"+
"/@"+
"/@"+
"/@"+
"{|} (c)1993/@"+
"co.co.arts/@"+
"dual crew * shining/@"+
"/@"+
"ok. it's over./@"+
"/@"+
"[\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\]/@";

mypage[19]=
"[\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\]/@"+
"/@"+
"/@"+
"/@"+
"/@"+
"so go then!/@"+
"/@"+
"/@"+
"/@"+
"/@"+
"[\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\]/@";
// the fucking tweens ^^	  


	tweencube=new createjs.Tween.get(cubeanim[0]).setPaused(true).to({y:62},1400,createjs.Ease.bounceOut)
	.wait(1000)
	.call(go);
	
	tweenlogo=new createjs.Tween.get(logoanim[0]).setPaused(true).to({alpha:1},800,createjs.Ease.none)
	.wait(4500)
	.play(tweencube);
	
	tweencocoart=new createjs.Tween.get(cocoanim[0]).to({y:395},800,createjs.Ease.quadOut)
	.wait(5000).play(tweenlogo)
	.to({y:600},600,createjs.Ease.quadIn);
	
	tweenbg=new createjs.Tween.get(bganim[0]).to({alpha:0},500,createjs.Ease.none);

function init() {
	player.LoadAndRun( basepath +'ocean club.mod');
  init_intro() ;
}
	
	
function init_intro(){
    if ( ( currLoaded == allLoaded ) ) {
        if (player) if (player.loader) if (player.loader.player) { player.loader.player.play(); }
        init2() ;
    } else {
        if (player) if (player.loader) if (player.loader.player) { player.loader.player.stop(); }

        requestAnimFrame( init_intro );
    }
}
	
function init2(){
	mycanvas=new canvas(720,568,"demo_main");
	mycanvaswhite=new canvas(720,568);
	mycanvastxt=new canvas(720,568);
	mycanvaswhite.fill('#fff');

	vcanvas=new canvas(360,284);
    hcanvas=new canvas(360,568);

	my3d=new codef3D(vcanvas, 750, 40, 1, 50000 );
  	my3d.faces4(myobjvert,myobj, false, true );
  	my3d.addAmbiLight(0xffffff); // 2f3450
  	my3d.addDirLight(0,0,0.1,0xffffff);
	
		font.initTile(16,22,32);
    lignes = mypage[0].split("@");
	
	intro();
//	go();
}
var st=0;
function intro() {
	mycanvas.fill('#228877');
	vcanvas.clear();
	
	var cocoy = cocoanim[0].y;
	var alpha = logoanim[0].alpha;
	var cubey = cubeanim[0].y;
	tweencocoart.tick(20);
	tweenlogo.tick(20);
	tweencube.tick(20);
	
	cocoarts.draw(mycanvas,312,cocoy);
	logo.draw(mycanvas,0,0,alpha);
	
	my3d.group.rotation.x+=0.02;
    my3d.group.rotation.y+=0.03;
    my3d.group.rotation.z+=0.04;
    my3d.draw();
	//vcanvas.draw(mycanvas,272,cubey);
	vcanvas.draw(mycanvas,140,cubey);
	
	if (st==0) requestAnimFrame( intro );
}

var sizeit=1;
var accel = 0;
var vy=0;

var mk=0;
var lignes=0;
var fx=0;
var realsize=0;
var letter;
var timing=0;
var page = 0;
var wait=460;
var wait2=200;
function go(){
	st=1;
	
	var alpha2 = bganim[0].alpha;
	tweenbg.tick(20);
	mycanvas.fill('#660099');

	my3d.group.rotation.x+=0.02;
    my3d.group.rotation.y+=0.03;
    my3d.group.rotation.z+=0.04;
    my3d.draw();
	if (wait==0) {
	sizeit += accel;
	accel+=0.0022;
	} else wait--;

	if	(sizeit>150) { sizeit=0; accel=0; }

	for (var i=0;i<284;i+=2){
        vcanvas.drawPart(hcanvas,0,(204+i*sizeit)-sizeit*142,0,i,360,2,1,0,1,1); // 264
	}
	
    for (var i=0;i<360;i+=2){
	    hcanvas.drawPart(mycanvas,(320+i*sizeit)-sizeit*180,0,i,0,2,568,1,0,1,1);	// 360
	}	

	vcanvas.clear();
	hcanvas.clear();

		mycanvas.quad(616,0,720,0,720,568,616,568,'#007766');
		gfx2.draw(mycanvas,-30,vy-64);
		vy = (vy+1.5) % 65;
		gfx1.draw(mycanvas,0,330);
		realsize=0;
if ( wait2==0 ) {
if ( mk< lignes.length-1) {
		if (letter == '/') {
			mk++;  fx=0; letter=0;
			} else {
			e=lignes[mk];
			var tline = 30 - (lignes[mk].length - 1);  // nbre de caractere par ligne.
			tline = tline *5;		
			
			var n=e.substr(0,fx);
			letter=e.substr(fx,1);
			
				for(var i=0; i<n.length; i++){
					font.drawTile(mycanvastxt, n[i].charCodeAt(0)-font.tilestart,tline+realsize,10+mk*(font.tileh+2),1);
					var cara = n[i].charCodeAt(0)-font.tilestart;
					realsize += realfontw[cara]+1;
	
				}
			
		fx++;
		}
		} else {
		if (timing == 200) erase()
		if (timing == 250) { page++; lignes = mypage[page].split("@"); fx=0; mk=0; if (page == 19) page=-1; }
		timing=(timing+1) % 300;
		
	} 		
} else wait2--;
	if ( py == 0 ) mycanvastxt.draw(mycanvas,350,270); else mycanvastxt.draw(mycanvas,350+py,270);
	
		mycanvaswhite.draw(mycanvas,0,0,alpha2);	
	requestAnimFrame( go );
}

var py=0;
function erase() {
	py+=15;
	if (py < 400) { requestAnimFrame( erase ); } else { py=0; mycanvastxt.clear(); }
}
