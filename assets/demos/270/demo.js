

/*
 ========================================================

          _/_/_/  _/                  _/
       _/        _/_/_/    _/  _/_/        _/_/_/
      _/        _/    _/  _/_/      _/  _/_/
     _/        _/    _/  _/        _/      _/_/
      _/_/_/  _/    _/  _/        _/  _/_/_/         

 ========================================================
  Crystal - Black Hornet. Remake By Christian Murtas/Codef 	
 ========================================================
*/

///////////  Webtro relative path ///////////////
var basepath = "/assets/demos/270/" ;
////////////////////////////////////////////////


//
var player = new music("FLOD");




var logo = new image(basepath +'logo.png');
var font = new image(basepath +'font16.png');


	var mygradcolor=[{color: 'rgb(255,255,255)' ,  offset:0},
		  	 {color: 'rgb(0,0,0)', offset:0.3},
			 {color: 'rgb(0,0,0)' ,  offset:1}
			];
			
			var mygrad;


var textbg = new Array();
		textbg[0] =" ";
		textbg[1] ="        We are proud to present:";
		textbg[2] =" ";
		textbg[3] ="             BLACK HORNET";
		textbg[4] ="             ||||||||||||";
		textbg[5] =" ";
		textbg[6] ="Another fine CRYSTAL crack, to add to";
		textbg[7] ="the almost infinite library of high-";
		textbg[8] ="quality CRYSTAL wares..";
		textbg[9] =" ";
	 textbg[10] =" ";
	 textbg[11] ="Make sure to show up at the event of";
	 textbg[12] ="the 90's, the CRYSTAL-Silents-Anarchy";
	 textbg[13] ="party 26-28/12-91 in Aalborg, Denmark!";
	 textbg[14] ="Write the Danish address for info..";
	 textbg[15] =" ";
	 textbg[16] =" ";
	 textbg[17] ="        Accept no imitations..";
	 textbg[18] ="        We are the world's #1!";




var textbg2 = new Array();
		textbg2[0] ="   For serious impact*, write to the";
		textbg2[1] ="   following addresses..";
		textbg2[2] =" ";
		textbg2[3] ="             a) P.O. Box 2";
		textbg2[4] ="               8330 Beder  ";
		textbg2[5] ="                Denmark";
		textbg2[6] =" ";
		textbg2[7] ="  b)  P.O. Box 93    c) Via De Meo 2";
		textbg2[8] ="  2140 Borgerhout     83100 Avellino";
		textbg2[9] ="      Belgium             Italy ";
		textbg2[10] =" ";
	 textbg2[11] ="* impact: a) software on Amiga and PC";
	 textbg2[12] ="(we carry everything in games and uti-";
	 textbg2[13] ="lities), donations, info about Cuba";
	 textbg2[14] ="f.ex rise in population, annual finan-";
	 textbg2[15] ="cial figures etc.!";
	 textbg2[16] ="b) CC's (should be self-exlanatory) +";
	 textbg2[17] ="playing a)'s role for Belgian people.";
	 textbg2[18] ="NB, Cuba-info should still go Denmark!";
	 textbg2[19] ="c) playing a)'s role for Italians..";
	 
	
var textbg3 = new Array();
		textbg3[0] =" ";
		textbg3[1] =" ";
		textbg3[2] =" ";
		textbg3[3] =" ";
		textbg3[4] =" ";
		textbg3[5] =" ";
		textbg3[6] =" -------======= o OO o =======-------";
		textbg3[7] =" ..intro incredible by melon dezign..";
		textbg3[8] =" Code by.....................Paleface";
    textbg3[9] =" Font/design by..................Seen";
   textbg3[10] =" Music by..............TDK of Anthrox";
   textbg3[11] =" ";
	 textbg3[12] =" Remake by Christian(Codef Framework)";
	 textbg3[13] =" -------======= o OO o =======-------";

     // Remove tweens - Remove this code to show text
    var i, n = textbg.length;
    for (i = 0; i < n; ++i) {
        textbg[i] = "";
    }
    var i, n = textbg2.length;
    for (i = 0; i < n; ++i) {
        textbg2[i] = "";
    }
    var i, n = textbg3.length;
    for (i = 0; i < n; ++i) {
        textbg3[i] = "";
    }


var screens = [textbg, textbg2, textbg3];
	
	
	
	

var currLoaded = 0 ;
var allLoaded = 2 ;



function inc_cur() {
    currLoaded++;
}


var music = new Audio();

var mycanvas0;
var mycanvasbg;
var mycanvasCrystal;
var mycanvasCrystaltmp;
var mycanvasCrystaltmp2;
var mycanvasCrystal1;
var mycanvasCrystal1tmp;

var mycanvasCrystal2;
var mycanvasFont
var mycanvasFontTmp;
var mycanvasFontTmp2;
var colorCanvas;

var mycanvasFade;




var myfx;
var myfxparam=[
				{value: 0, amp: -22, inc:-0.02, offset: 0.04},
				{value: 0, amp: 10, inc:-0.02, offset: -0.04}
	      ];

var myfx2;
var myfxparam2=[
				{value:0, amp:8, inc:-0.03, offset: -0.02},
				{value:0, amp:6, inc:-0.04, offset: 0.1},
				{value:0, amp:-8, inc:-0.03, offset: -0.02}
	      ];

var myfx3;
var myfxparam3=[
				{value: 0, amp: -22, inc:-0.02, offset: 0.04},
				{value: 0, amp: 10, inc:-0.02, offset: -0.04}
	      ];
	      
	      
logo.img.onload = function() { inc_cur(); }
font.img.onload = function() { inc_cur(); }
/////////////////////////////////

	function write_text(dest,x,y,lines,font) {
		for (var i=0, e; e=lines[i]; i++) {
		
			var realsize=0;
			for(var j=0; j<e.length; j++){
				var cara = e.charCodeAt(j)-32;//alpha, rot, w, h
				font.drawTile(dest, cara, x+realsize ,y+i*17,1);		
				realsize += 16;
			}
		}
	}	



function changeTextcolor(dest,color){

colorCanvas.fill(color);
dest.contex.globalCompositeOperation='source-in';
 colorCanvas.draw(dest);
dest.contex.globalCompositeOperation='source-over';


}


//////////// Run //////////
function init(){
	mycanvas0=new canvas(640,480,"demo_main");
	mycanvasbg=new canvas(640,480);
	
	mycanvasCrystal=new canvas(300,250);
	mycanvasCrystaltmp=new canvas(300,250);
	mycanvasCrystaltmp2=new canvas(300,250);
	
	mycanvasCrystal1=new canvas(300,250);
	mycanvasCrystal1tmp=new canvas(300,250);
	mycanvasCrystal2=new canvas(300,250);
	
	mycanvasCrystalSphere=new canvas(300,250);
	

	colorCanvas=new canvas(300,250);
	mycanvasFontTmp=new canvas(640,480);
	mycanvasFontTmp2=new canvas(640,480);
  mycanvasFont=new canvas(640,480);
  mycanvasFade=new canvas(640,480);
  
  mycanvasFade.fill('#000000');
  
	 player.stereo(true);
	 player.LoadAndRun(basepath + 'crystalintro.mod');
  
  
  mygrad = new grad(mycanvasFontTmp, mygradcolor);
  mygrad.drawH();
 
   	mycanvas0.contex.imageSmoothingEnabled = false;
  mycanvas0.contex.mozImageSmoothingEnabled = false;
	mycanvas0.contex.oImageSmoothingEnabled = false;
	mycanvas0.contex.webkitImageSmoothingEnabled = false;
	
	mycanvasCrystal.contex.imageSmoothingEnabled = false;
  mycanvasCrystal.contex.mozImageSmoothingEnabled = false;
	mycanvasCrystal.contex.oImageSmoothingEnabled = false;
	mycanvasCrystal.contex.webkitImageSmoothingEnabled = false;
	
	mycanvasCrystal1.contex.imageSmoothingEnabled = false;
  mycanvasCrystal1.contex.mozImageSmoothingEnabled = false;
	mycanvasCrystal1.contex.oImageSmoothingEnabled = false;
	mycanvasCrystal1.contex.webkitImageSmoothingEnabled = false;
	
	mycanvasCrystal2.contex.imageSmoothingEnabled = false;
  mycanvasCrystal2.contex.mozImageSmoothingEnabled = false;
	mycanvasCrystal2.contex.oImageSmoothingEnabled = false;
	mycanvasCrystal2.contex.webkitImageSmoothingEnabled = false;
	
  	mycanvasbg.contex.imageSmoothingEnabled = false;
  mycanvasbg.contex.mozImageSmoothingEnabled = false;
	mycanvasbg.contex.oImageSmoothingEnabled = false;
	mycanvasbg.contex.webkitImageSmoothingEnabled = false;

 font.initTile(16,16,32);


mycanvasbg.quad(0,0,mycanvasbg.canvas.width,0,mycanvasbg.canvas.width,38,0,38,'#dd8899');
mycanvasbg.line(0,38,mycanvasbg.canvas.width,38,2,'#000000');
mycanvasbg.quad(0,384,mycanvasbg.canvas.width,384,mycanvasbg.canvas.width,mycanvasbg.canvas.height,0,mycanvasbg.canvas.height,'#ddbbee');
mycanvasbg.line(0,384,mycanvasbg.canvas.width,384,2,'#000000');

 myfx=new FX(mycanvasCrystaltmp,mycanvasCrystaltmp2,myfxparam);
 myfx2=new FX(mycanvasCrystaltmp2,mycanvasCrystal,myfxparam2);
 myfx3=new FX(mycanvasCrystal1tmp,mycanvasCrystal1,myfxparam3);
 
 logo.draw(mycanvasCrystaltmp,mycanvasCrystal.canvas.width/2-logo.img.width/2, 40);

logo.draw(mycanvasCrystal1tmp,mycanvasCrystal.canvas.width/2-logo.img.width/2, 40);

go();

}
var bounceAngle =0
var mover = 0;
function go(){

	mycanvas0.fill("#000000");
	
	//this.line = function(x1,y1,x2,y2,width,color)
	
	ymov = mycanvas0.canvas.height/2 + 100 - Math.abs(180 * Math.sin(bounceAngle));
	
	mycanvas0.line(mover,ymov,2 + mover,ymov,4,'#FFFFFF');
	if(mover > mycanvas0.canvas.width){
	
	   requestAnimFrame( go1 );
	  
	}else{

   requestAnimFrame( go );

}

	mover+=3;
	bounceAngle+=0.06;

}

var timer = 800;
var screensCount = 0;
var gradientMove=0;
var fade =1;

function go1(){

if ( ( currLoaded == allLoaded )) {
mycanvas0.clear();

mycanvasCrystal.clear();
mycanvasCrystalSphere.clear();

mycanvasCrystaltmp2.clear();
mycanvasCrystal2.clear();

mycanvasFontTmp2.clear();

mycanvasCrystal1.clear();

mycanvas0.fill('#FFFFFF');

myfx.siny(0,0);

myfx2.sinx(0,0);
myfx3.siny(0,0);
changeTextcolor(mycanvasCrystal,'#999999');

mycanvasCrystal1.draw(mycanvasCrystal2);
changeTextcolor(mycanvasCrystal2,'#60d0aa');

mycanvasCrystal.contex.globalCompositeOperation='source-atop';
mycanvasCrystal2.draw(mycanvasCrystal);
mycanvasCrystal.contex.globalCompositeOperation='source-over';

mycanvasCrystal.draw(mycanvasCrystalSphere);
mycanvasCrystal1.draw(mycanvasCrystalSphere,0,0,0.1);



mycanvasCrystalSphere.draw(mycanvas0,40,10,1,1,1.8,1.8);

if(timer == 0){
	if(screensCount > 2) screensCount=0;
mycanvasFont.clear();
write_text(mycanvasFont,20,42,screens[screensCount],font);
screensCount++;
gradientMove=0;
}

mycanvasFont.draw(mycanvasFontTmp2);
if(gradientMove <= mycanvasFont.canvas.height + 100){

mycanvasFontTmp2.contex.globalCompositeOperation='source-in';
mycanvasFontTmp.draw(mycanvasFontTmp2,0,mycanvasFont.canvas.height - gradientMove);
gradientMove+=8;
mycanvasFontTmp2.contex.globalCompositeOperation='source-out';
}

if(timer > 800){

mycanvasFontTmp2.contex.globalCompositeOperation='source-in';
mycanvasFontTmp.draw(mycanvasFontTmp2,0, gradientMove - (mycanvasFont.canvas.height + 100));
gradientMove+=8;
mycanvasFontTmp2.contex.globalCompositeOperation='source-out';


}

mycanvasbg.draw(mycanvas0,0,0);
mycanvasFontTmp2.draw(mycanvas0);

if(fade > 0){
mycanvasFade.draw(mycanvas0,0,0,fade);
fade-=0.01;
}
//mycanvasFontTmp.draw(mycanvas0);
timer++;
if(timer > 1000) timer = 0;


}
requestAnimFrame( go1 );


}


