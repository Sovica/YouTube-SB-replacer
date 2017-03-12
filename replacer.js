var jQuery;
var sb_playerId = "test100";

if ( typeof jQuery == 'undefined' ) { ( function () {
	var s = document.createElement('script');
	s.type = 'text/javascript';
	s.onload = scanTags;
	s.onreadystatechange = function ()
	{
		switch ( this.readyState )
		{
			case 'complete':
			case 'loaded':
				scanTags();
			default:
				break;
		}
	}
	
	s.src = ( document.location.protocol == 'https:' ? 'https://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js' : 'http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js' );
	( document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0] ).appendChild( s );
} )(); }
else { scanTags(); }

function scanTags ()
{
	var width, height;
	jQuery( 'iframe' ).each( function ( i, object ) {
		object = jQuery( object );
		if ( typeof object.attr( 'noreplace' ) != 'undefined' ) { return; }
		var url, ytId;
		if ( !( url = object.attr( 'src' ) ) ) { return; }
		if ( url.toLowerCase().indexOf( 'youtube' ) < 0 ) { return; }
		if ( url = url.match( /(https?:\/\/)((?:.+\.)*youtube\.com\/embed\/)([^\?&]+)(.*)/i ) )
		{
			if ( url.length < 4 ) { return; }
			width = object.attr( 'width' ); if ( width == '' ) { width = object.width(); }
			height = object.attr( 'height' ); if ( height == '' ) { height = object.height(); }
			ytId = url[3];
			var html = sbEmbed (sb_playerId, width, height, ytId);
			object.replaceWith( html );
		}
	} );

	jQuery( 'embed' ).each( function ( i, object ) {
		object = jQuery( object );
		if ( typeof object.attr( 'noreplace' ) != 'undefined' ) { return; }
		var url, ytId;
		if ( !( url = object.attr( 'src' ) ) ) { return; }
		if ( url.toLowerCase().indexOf( 'youtube' ) < 0 ) { return; }
		if ( url = url.match( /(https?:\/\/)((?:.+\.)*youtube\.com\/v\/)([^\?&]+)(.*)/i ) )
		{
			if ( url.length < 4 ) { return; }
			width = object.attr( 'width' ); if ( width == '' ) { width = object.width(); }
			height = object.attr( 'height' ); if ( height == '' ) { height = object.height(); }
			ytId = url[3];
			if ( object.parent().is( 'object' ) ) { object = object.parent(); }
			if ( typeof object.attr( 'width' ) != 'undefined' && object.attr( 'width' ) != '' ) { width = object.attr( 'width' ); }
			if ( typeof object.attr( 'height' ) != 'undefined' && object.attr( 'height' ) != '' ) { height = object.attr( 'height' ); }
			if ( typeof object.attr( 'noreplace' ) != 'undefined' ) { return; }
			var html = sbEmbed (sb_playerId, width, height, ytId);
			object.replaceWith( html );
		}
	} );

	jQuery( 'object' ).each( function ( i, object ) {
		object = jQuery( object );
		if ( typeof object.attr( 'noreplace' ) != 'undefined' ) { return; }
		var url, ytId;
		if ( !( url = object.children( 'param[name=src], param[name=movie]' ).attr( 'value' ) ) ) { return; }
		if ( url.toLowerCase().indexOf( 'youtube' ) < 0 ) { return; }
		if ( url = url.match( /(https?:\/\/)((?:.+\.)*youtube\.com\/v\/)([^\?&]+)(.*)/i ) )
		{
			if ( url.length < 4 ) { return; }
			width = object.attr( 'width' ); if ( width == '' ) { width = object.width(); }
			height = object.attr( 'height' ); if ( height == '' ) { height = object.height(); }
			ytId = url[3];
			var html = sbEmbed (sb_playerId, width, height, ytId);
			object.replaceWith( html );
		}
	} );
}

function genRand()
{
	randomNumber = Math.floor(Math.random()*100000000001);
	return randomNumber;
}

function sbEmbed (playerId, width, height, ytId)
{
	var sb_apiUrl = "http://www.springboardplatform.com/mediaplayer/springboard/youtube/";
	var sb_html5Url = "<script language=\"javascript\" type=\"text/javascript\" src=\"http://cdn.springboard.gorillanation.com/storage/js/sb.html5.js\"></script>";
	var embedCode = sb_html5Url +
			'<object id=\"'+playerId+'_'+genRand()+'\" class=\"SpringboardPlayer\" width=\"'+width+'\" height=\"'+height+'\" type=\"application/x-shockwave-flash\" classid=\"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000\">' + 
				'<param name=\"movie\" value=\"'+sb_apiUrl+playerId+'/'+ytId+'/\"></param>' +
				'<param name=\"allowFullScreen\" value=\"true\"></param>' +
				'<param name=\"allowscriptaccess\" value=\"always\"></param>' +
				'<param name=\"wmode\" value=\"transparent\"></param>' +
				'<embed src=\"'+sb_apiUrl+playerId+'/'+ytId+'/\" width=\"'+width+'\" height=\"'+height+'\" name=\"'+playerId+'_'+genRand()+'\" type=\"application/x-shockwave-flash\" allowscriptaccess=\"always\" allowfullscreen=\"true\" wmode=\"transparent\"></embed>' 
			'</object>';
	return embedCode;
}
