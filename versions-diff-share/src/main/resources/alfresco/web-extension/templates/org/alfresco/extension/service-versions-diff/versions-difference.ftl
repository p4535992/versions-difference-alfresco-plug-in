<#-- <#include "include/alfresco-template.ftl" /> -->
<#include "/org/alfresco/include/alfresco-template.ftl" />
<@templateHeader>

   <@markup id="js" >
   		<@script type="text/javascript" src="${url.context}/res/modules/documentlibrary/doclib-actions.js"></@script>
   </@>
   
   <@markup id="css" >
   		<@link rel="stylesheet" type="text/css" href="${page.url.context}/res/components/document-details/document-details-panel.css" />
   		<@link rel="diff_stylesheet" type="text/css" href="${page.url.context}/res/service-versions-diff/document-details/versions-diff-page.css" />
	</@>

</@>

<@templateBody>
   <@markup id="alf-hd">
   <div id="alf-hd">
      <@region scope="global" id="share-header" chromeless="true"/>
   </div>
   </@>
   <@markup id="bd">
   <div id="bd">
      <div class="yui-g">
         <div class="yui-u first" id="left-column" rel="diff_stylesheet">
            <@region id="left-node-header" scope="page"/>
            <@region id="left-column" class="left-column" rel="diff_stylesheet" scope="page"/>
         </div>
         <div class="yui-u" id="right-column" rel="diff_stylesheet">
            <@region id="right-node-header" scope="page"/>
            <@region id="right-column" class="right-column" rel="diff_stylesheet" scope="page"/>
         </div>
      </div>
   </div>
   </@>
</@>

<@templateFooter>
   <@markup id="alf-ft">
   <div id="alf-ft">
      <@region id="footer" scope="global" />
   </div>
   </@>
</@>

