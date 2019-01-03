<!-- Requires jQuery -->
<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>

<!-- Requires CodeMirror -->
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.32.0/codemirror.min.js"></script>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.32.0/addon/search/searchcursor.min.js"></script>
<link type="text/css" rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.32.0/codemirror.min.css" />

<@markup id="css" >  
	<#-- 
    <@link type="text/css" rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.32.0/codemirror.min.css" /> 
	-->
	<@link type="text/css" rel="stylesheet" href="${url.context}/res/service-versions-diff/mergely/mergely.css" />
</@>
   
<@markup id="js">
	<#--
	<@script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></@script>  	
	<@script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.32.0/codemirror.min.js"></@script>
	<@script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.32.0/addon/search/searchcursor.min.js"></@script>
	-->
	<@script type="text/javascript" src="${url.context}/res/service-versions-diff/mergely/mergely.js"></@script>
		
	<#-- <@script type="text/javascript" src="${url.context}/res/service-versions-diff/mergely/Timer.js"></@script>   --> 
</@>

<script type="text/javascript">//<![CDATA[

$(document).ready(function() {
    var comp = $('#mergely');
    
    function downloadJSON(url, callback) {
        $.get(url, function(data) {
            var json = JSON.parse(data);
            var formattedText = JSON.stringify(json, null, 2);
            callback(formattedText);
        });
    }

    comp.mergely({
    	license: 'lgpl',
        cmsettings: {
            readOnly: true,
            lineWrapping: true
        },
        wrap_lines: true,
        
        //Doesn't do anything?
        //autoresize: true,
        
        editor_width: 'calc(50% - 25px)',
        editor_height: '100%',
        
        lhs: function(setValue) {
            //downloadJSON($("#file1").attr('href'), setValue);
            setValue(${text1});
        },
        rhs: function(setValue) {
            //downloadJSON($("#file2").attr('href'), setValue);
            setValue(${text2});
        }
    });
    
    function changeOptions(changer) {
        var options = comp.mergely('options');
        changer(options);
        
        comp.mergely('options', options);
        //comp.mergely('update');
    }
    
    $('#prev').click(function() { comp.mergely('scrollToDiff', 'prev'); });
    $('#next').click(function() { comp.mergely('scrollToDiff', 'next'); });
    $('#wrap').click(function() { changeOptions(function(x) { x.wrap_lines = !x.wrap_lines; }); });
});

//]]></script>


<br />
<br />

<div class="container">

    <div class="diffs">
    	<!--
        <header>           
            <button id="prev" title="Previous diff">▲</button>
            <button id="next" title="Next diff">▼</button>
            <button id="wrap" title="Toggle line wrapping">
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 10 10"><path d="M1 2h8M1 4.5h6A1 1 0 0 1 7 7H5v-.3l-.3.3.3.3V7M1 7h1.5" stroke-width="1.1" fill="none" stroke="#000"/></svg>
            </button>
        </header>
        -->
        <div class="compare-wrapper mergely-full-screen-8">
        	<div class="mergely-resizer">
            	<div id="mergely">
            	</div>
            </div>
        </div>
    </div>
        
	<!--
    <div class="sources">
        <h1>Source files</h1>
        <ul>
            <li><a id="file1" href="https://gist.githubusercontent.com/quotient/c426a69bfa550d1a43a0/raw/645d996d8d23e48dc9b691a10238d690df845f4f/gistfile1.txt">File 1</a></li>
            <li><a id="file2" href="https://gist.githubusercontent.com/quotient/a9baf2c58972aa22c621/raw/c8f6caf22d330cb34fc6f70ece44699312b2b7b4/gistfile1.txt">File 2</a></li>       
        </ul>
    </div>
	-->
</div>
