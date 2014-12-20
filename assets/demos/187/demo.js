 
// Hi Guys...
// Here is a Little Remake of an intro of "Scoopex" a famous Amiga Team 
// this piece of code has been done using Codef "Canvas Oldskool Demo Effect Framework"
// By the way this framework is very powerful, nice and easy to learn thanks to "Antoine Santo Aka NoNameNo" !!!!!
// thanks too to the Codef FaceBook Group for the Help !! 
//
// I'm an old sceners , inactive for a while but with the discovery of codef and what is possible in HTML 5 , I take
// again pleasure to code ,so watch out for some Remake from Me (Gandalf / Outlaws).
//
// A few Words about me : I begin on C64 scene and follow next on the Amiga Scene joining group like AFL - LSD (Belgian section Leader) - 
// Dragons (Belgian section leader) - AXIS - TDT - ... and finally create with Toxic & Felix "the outlaws" .
// i'am one of the 3 originals founders and leaders .
//
// Anyway I'm Glad to participate with this little remake to The WWW.WAB.COM Project 
//
//Gandalf - OuTLaWs

var basepath = "/assets/demos/187/" ; //     :-)
var player = new music("MOD");
player.stereo(true);
player.LoadAndRun(basepath +'scoopex.xm');


var mycanvas;
var Parallax1;
var Parallax2;
var Parallax3;
var Parallax4;
var Parallax5;
var Parallax6;
var mycanvasscr;
var myscroll1cvs;
var myscroll1cvsrv;
var myscrolltext;

// Media Loading

var plx1 = new image(basepath +'scoopex_plx1.png');
var plx2 = new image(basepath +'scoopex_plx2.png');
var plx3 = new image(basepath +'scoopex_plx3.png');
var plx4 = new image(basepath +'scoopex_plx4.png');
var plx5 = new image(basepath +'scoopex_plx5.png');
var plx6 = new image(basepath +'scoopex_plx6.png');

var sky = new image(basepath +'scoopex_bg2.png');
var myfont = new image(basepath +'mh_font3b.png');
var mylogo = new image(basepath +'scoopex_logo2.png');

 
function init(){
	mycanvas=new canvas(640,420,"demo_main");
	
	Parallax1=new canvas(640*3,118);
	plx1.draw(Parallax1,0,0);plx1.draw(Parallax1,640,0);plx1.draw(Parallax1,1280,0);
	
	Parallax2=new canvas(640*3,118);
	plx2.draw(Parallax2,0,0);plx2.draw(Parallax2,640,0);plx2.draw(Parallax2,1280,0);
	
	Parallax3=new canvas(640*3,118);
	plx3.draw(Parallax3,0,0);plx3.draw(Parallax3,640,0);plx3.draw(Parallax3,1280,0);
	
	Parallax4=new canvas(640*3,118);
	plx4.draw(Parallax4,0,0);plx4.draw(Parallax4,640,0);plx4.draw(Parallax4,1280,0);
	
	Parallax5=new canvas(640*3,146);
	plx5.draw(Parallax5,0,0);plx5.draw(Parallax5,640,0);plx5.draw(Parallax5,1280,0);

	Parallax6=new canvas(640*3,146);
	plx6.draw(Parallax6,0,0);plx6.draw(Parallax6,640,0);plx6.draw(Parallax6,1280,0);
	
	mycanvasscr=new canvas(32,38*80);
	mycanvasscr.initTile(32,1,0);
//mycanvasscr.initTile(16,12,32);
	myscroll1cvs = new canvas(640,38*3);
	myscroll1cvsdeg = new canvas(640,38*3);
	myscroll1cvsrv = new canvas(640,38*3);
	myscroll1cvsrvdeg = new canvas(640,38*3);


	myfont.initTile(32,28,32);
	//myfont.initTile(16,14,32);  // Setting for little font
	myscrolltext = new scrolltext_horizontal();
	myscrolltext.scrtxt="SCOOPEX PRESENTS       BERLIN 1948     ^P9 @@  PREVIEW FROM RAINBOW ARTS !!!     CALL OUR WHQ     INVOLUNTARY DEATH  ^P9 "
	+ "@    708 599 1537    ^P9  @@   TO GET OUR LATEST WAREZ WRITE TO :       PO.BOX 60      ^P9  @@   4060 LEONDING     ^P9@@      AUSTRIA        ^P9 @  TO GET IN TOUCH WITH OUR SYSOP WRITE TO : "
	+ "    PO.BOX 2221        ^P9 @  BRIDGEVIEW       ^P9 @  IL 60455 USA     ^P9 @  ........      PLEASE CHOOSE ONLY THE INTRO PART CAUSE AS I SAID BEFORE ... THIS IS ONLY A PREVIEW !!!!" 
	+ " WELL OUR MEMBERSLIST WENT DOWN A LITTLE BIT CAUSE THERE ARE NO LONGER SECTIONS IN ...... ENGLAND AND SWEDEN !!!!   HERE'S A SMALL LIST INCLUDING THE PEOPLE WHO " 
	+ "LEFT SCOOPEX TO START THEIR CARRIER IN ANOTHER GROUP : PENNYWISE .. UNCLE TOM .. JESUS .. ZARK .. ALL IN SHARE AND ENJOY .. MERRYMAN AND PANTHER !!!!     " 
	+ "I WISH YA GOOD LOOK WHERE EVER YOU MAY BE !!!      I WANT TO SMASH SOME HELLOS TO OUR FRIENDS ...... SUBWAY .. FAIRLIGHT .. PIRANHAS .. QUARTEX .. RED SECTOR .. QUICKSILVER .. THRUST .. "
	+ "M.A.D .. SHARE AND ENJOY ..  ORACLE .. DOPE .. VISION FACTORY AND ALL OTHERS WHICH ARE WORTH TO MENTION !!!!      WAIT 4 MORE UPCOMING RELEASES FROM"
	+ "SCOOPEX .........           SIGNED RANGER  8.2.1990          END OF LINE !!!    ^P9 @    #$#$#$#$#$#$@@@@ "
	+ " ";
 
	myscrolltext.init(mycanvas,myfont,4);

	go();
}

var Parallax1posx=-640;
var Parallax1speed=3;

var Parallax2posx=-640;
var Parallax2speed=3;

var Parallax3posx=-640;
var Parallax3speed=2;

var Parallax4posx=-640;
var Parallax4speed=2;

var Parallax5posx=-640;
var Parallax5speed=1;

var Parallax6posx=-640;
var Parallax6speed=1;

function go(){
	mycanvas.fill('#000000');
	mycanvasscr.clear();
	myscroll1cvs.clear();
	myscroll1cvsrv.clear();

	sky.draw(mycanvas,0,170);
	
	Parallax6.draw(mycanvas,Parallax4posx,200);
	Parallax5.draw(mycanvas,Parallax4posx,205);
	Parallax4.draw(mycanvas,Parallax4posx,210);
	
	Parallax3.draw(mycanvas,Parallax3posx,215);
	Parallax2.draw(mycanvas,Parallax2posx,220);
	Parallax1.draw(mycanvas,Parallax1posx,225);

	
	Parallax1posx-=Parallax1speed;
	if(Parallax1posx <= -1280) Parallax1posx=-640;
	if(Parallax1posx >= 0) Parallax1posx=-640;
	
	Parallax2posx-=Parallax2speed;
	if(Parallax2posx <= -1280) Parallax2posx=-640;
	if(Parallax2posx >= 0) Parallax2posx=-640;
	
	Parallax3posx-=Parallax3speed;
	if(Parallax3posx <= -1280) Parallax3posx=-640;
	if(Parallax3posx >= 0) Parallax3posx=-640;
	
	Parallax4posx-=Parallax4speed;
	if(Parallax4posx <= -1280) Parallax4posx=-640;
	if(Parallax4posx >= 0) Parallax4posx=-640;
	
	Parallax5posx-=Parallax5speed;
	if(Parallax5posx <= -1280) Parallax5posx=-640;
	if(Parallax5posx >= 0) Parallax5posx=-640;
	
	Parallax6posx-=Parallax6speed;
	if(Parallax6posx <= -1280) Parallax6posx=-640;
	if(Parallax6posx >= 0) Parallax6posx=-640;

	mylogo.draw(mycanvas,22,50);
	myscrolltext.draw(332-16);
	requestAnimFrame( go );
}
 

