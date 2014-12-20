var basepath = "/assets/demos/165/";

var mycanvas;
var myscrollcanvas;
var myflcanvas;


var raster1 = new image(basepath + "ras_factory1.png") ;
var raster2 = new image(basepath + "ras_factory2.png") ;
var myfont = new image(basepath + 'factory_fonts.png');

var mylogo = new image(basepath + 'factory.png') ;
var mylogo2 = new image(basepath + 'factory_dead.png') ;
var mylogo3 = new image(basepath + 'factory_end.png') ;
var offset=0;

var mystarfield;
var mytempo=0;

var myscrolltext;
var myfx;
var myfxparam=[
		{value: 10, amp: 80, inc:0.002, offset: -0.03	},
    ];

/*Music YM ou MOD*/
var player = new music("MOD");

function init(){
  player.LoadAndRun(basepath + 'street_j.mod');
	
	mycanvas=new canvas(720,460,"demo_main");
	myscrollcanvas= new canvas(720,32);

  mystarfield=new starfield3D(mycanvas, 400, 2, 720,450, 720/2, 450/2,'#FFFFFF', 100,0,0);
	
	myfont.initTile(64,34,32);
	myscrolltext = new scrolltext_horizontal();
	myscrolltext.scrtxt="       HERE IS THE LATEST PRODUCTION FROM FACTORY ! YEP,THE LATEST AS WE LEFT THE SCENE TONIGHT. THE REASON IS SIMPLE: A FUCKING ARSEHOLE GAVE OUR NAME TO SEVERAL FRENCH SOFTWARE COMPANIES... CONSEQUENTLY WE MUST LEAVE THE ST CRACKING SCENE. HIS NAME IS YFM OR LEX OF JORDAN CORPORATION YOU CAN WAKE HIM UP AT THIS PHONE NUMBER: IN FRANCE 21.37.66.98 ASK JEREMY ! THANKS TO ALL PEOPLE THAT SUPPORTED US... ALL OUR FRIENDS,SWAPPERS AND FANATICS... FACTORY MADE 69 CRACKS , 9 MENUS , 7 INTROS , 48 FILE VERSIONS , 2 CONVENTIONS , 60 HOURS WATCHING X MOVIES , 20L CURACAO , 70L BEER , 120L COKE , 132 DAYS OF ACTIVITY , AND ONLY 2 UGLY VOMITING DUED TO HOT BEERS AND LAME SONGS.               GREETINGS TO : ACF ALLIANCE AMNESIA ANARCHY ARMADA ART OF CODE AVENGERS AXXIS BAD BOYS COBRA CONCEPTOR CYBERNETIC CYNIX DNT CREW DBA DBUG ECLYPSIS ELITE EQUINOX ESC FASHION FLATLINERS FMCC FUN VISION FUZION GALTAN 6 GENESIS GENESIS INC HAC HMD HYSTERIA ICS IMPACT INNER CIRCLE LOST BOYS MAD VISION MANIAC MASTERS MYSTIC NAOS NEXT ORION OXYGENE PULSION REPLICANTS RIPPED OFF ST CNX STORM BROTHERS SUPERIOR SYNDICATE TYKEE TBE TDS TBO TBS TPN UNDEAD ALL THE UNION VECTRONIX VMAX VORTEX XTC AND LAST AND LEAST ZUUL SPECIAL THANKS TO ALL OUR ORIGINAL SUPLIERS BAD BOYS,GANDALS,GANGSTER,HIGHLANDER,KARL MARX,LAURENT,MATHIEU,PROPHANATOR,ST WAIKIKI,TURBO SWAP,THUNDER FORCE. CODE BY HOOKER OF FACTORY AND GFX BY MAD VISION WE HAVE DECIDED TO SPLIT UP THE TEAM , OTHERS DECIDED TO CONTINUE... FUTURE WILL TELL US WHO IS RIGHT... WHO HAS REALLY BEEN FUCKED UP... AN OTHER POINT IS THAT ALL OF US ( EXCEPT ZORVACK ) MUST PASS A FUCKING EXAM PRETTY SOON. GANDALS ( MISSING IN ACTION ) , HIGHLANDER ( KILLED BY THE REFEREE ) , HOOKER ( KILLED BY THE BEAST ) , MC REGGIE ( SODOMISED ) , RADIAL ( CRUNCHED BY A PUSSY ) , ZORVACK ( HARDWIRED BY ADEBUG ). SEE YOU ON THE EUROPEAN BEACHES THIS SUMMER.                                                                      ";
	myscrolltext.init(myscrollcanvas,myfont,6);
	myfx=new FX(myscrollcanvas,mycanvas,myfxparam);
	go();
}

var u=0;
function go(){
  
	requestAnimFrame( go );

  mycanvas.fill('#000000') ;
  
  /*Rasters Haut et Bas*/
  raster1.drawPart(mycanvas,0,0,+offset,0,720,1) ;
  raster2.drawPart(mycanvas,0,2,1415-offset,0,720,1) ;
  raster1.drawPart(mycanvas,0,452,+offset,0,720,1) ;
	raster2.drawPart(mycanvas,0,454,1415-offset,0,720,1) ;
	
	offset = offset +10 ; 
	if (offset >= 1415) { offset = 0 ; }


  /*Logo Présentation*/
  if( (mytempo >1) && (mytempo <400)){
   
    mylogo.draw(mycanvas, 00, 50) ;

  }
  /*Scroll et Stars*/
  if( (mytempo >401) && (mytempo <7750)){
  
  myscrollcanvas.clear();
  mystarfield.draw();
  myscrolltext.draw(0);
  
  myfx.siny(0,200);
 
  }
  /*Logo Dead*/
  if( (mytempo >7751) && (mytempo <8200)){
  myscrollcanvas.clear();
  if (u<15)	{mylogo2.draw(mycanvas,00,50);}
	if (u>15) {u=0;}
	u++;
  }
  /*Scroll et Stars / Greetings*/
  if( (mytempo >8201) && (mytempo <21000)){
  
  myscrollcanvas.clear();
  mystarfield.draw();
  myscrolltext.draw(0);
  
  myfx.siny(0,200);
  
 
  }
  
  /*Last Logo avec cible*/
  if (mytempo >21001) {
  myscrollcanvas.clear();
  mylogo3.draw(mycanvas, 00, 50) ;

  }
 	/*Compteur++*/
	mytempo++; 
 

}
