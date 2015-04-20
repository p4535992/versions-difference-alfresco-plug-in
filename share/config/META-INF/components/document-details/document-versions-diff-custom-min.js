(function(){var e=YAHOO.util.Dom,m=YAHOO.util.Event,b=YAHOO.util.Selector;var d=Alfresco.util.encodeHTML,l=Alfresco.util.userProfileLink,p=Alfresco.Share.userAvatar;Alfresco.DocumentVersions=function f(q){Alfresco.DocumentVersions.superclass.constructor.call(this,"Alfresco.DocumentVersions",q,["datasource","datatable","paginator","history","animation"]);YAHOO.Bubbling.on("metadataRefresh",this.doRefresh,this);return this};YAHOO.extend(Alfresco.DocumentVersions,Alfresco.component.Base,{options:{nodeRef:null,siteId:"",containerId:null,workingCopyVersion:null,allowNewVersionUpload:false},latestVersion:null,versionCache:null,onReady:function k(){this.widgets.alfrescoDataTable=new Alfresco.util.DataTable({dataSource:{url:Alfresco.constants.PROXY_URI+"api/version?nodeRef="+this.options.nodeRef,doBeforeParseData:this.bind(function(r,q){this.latestVersion=q.splice(0,1)[0];e.get(this.id+"-latestVersion").innerHTML=this.getDocumentVersionMarkup(this.latestVersion);this.versionCache=q;return({data:q})})},dataTable:{container:this.id+"-olderVersions",columnDefinitions:[{key:"version",sortable:false,formatter:this.bind(this.renderCellVersion)}],config:{MSG_EMPTY:this.msg("message.noVersions")}}})},renderCellVersion:function j(r,q,s,t){r.innerHTML=this.getDocumentVersionMarkup(q.getData())},getDocumentVersionMarkup:function g(s){var q=Alfresco.constants.URL_PAGECONTEXT+"site/"+this.options.siteId+"/versions-difference?nodeRef="+this.options.nodeRef+"&amp;versRef="+s.nodeRef;var t=Alfresco.constants.PROXY_URI+"/api/node/content/"+s.nodeRef.replace(":/","")+"/"+s.name+"?a=true",r="";r+='<div class="version-panel-left">';r+='   <span class="document-version">'+d(s.label)+"</span>";r+="</div>";r+='<div class="version-panel-right">';r+='   <h3 class="thin dark">'+d(s.name)+"</h3>";r+='   <span class="actions">';if(this.options.allowNewVersionUpload){r+='   <a href="#" name=".onRevertVersionClick" rel="'+s.label+'" class="'+this.id+' revert" title="'+this.msg("label.revert")+'">&nbsp;</a>'}r+='      <a href="'+t+'" class="download" title="'+this.msg("label.download")+'">&nbsp;</a>';r+='		<a href="#" name=".onViewHistoricPropertiesClick" rel="'+s.nodeRef+'" class="'+this.id+' historicProperties" title="'+this.msg("label.historicProperties")+'">&nbsp;</a>';r+='      <a href="'+q+'" class="'+this.id+' versionsDiff" title="'+this.msg("label.versionsDiff")+'">&nbsp;</a>';r+="   </span>";r+='   <div class="clear"></div>';r+='   <div class="version-details">';r+='      <div class="version-details-left">';r+=p(s.creator.userName,32);r+="      </div>";r+='      <div class="version-details-right">';r+=l(s.creator.userName,s.creator.firstName+" "+s.creator.lastName,'class="theme-color-1"')+" ";r+=Alfresco.util.relativeTime(Alfresco.util.fromISO8601(s.createdDateISO))+"<br />";r+=((s.description||"").length>0)?d(s.description,true):'<span class="faded">('+this.msg("label.noComment")+")</span>";r+="      </div>";r+="   </div>";r+="</div>";r+='<div class="clear"></div>';return r},onRevertVersionClick:function n(q){Alfresco.module.getRevertVersionInstance().show({filename:this.latestVersion.name,nodeRef:this.options.nodeRef,version:q,onRevertVersionComplete:{fn:this.onRevertVersionComplete,scope:this}})},onRevertVersionComplete:function c(){Alfresco.util.PopupManager.displayMessage({text:this.msg("message.revertComplete")});YAHOO.Bubbling.fire("metadataRefresh",{})},onViewHistoricPropertiesClick:function i(q){Alfresco.module.getHistoricPropertiesViewerInstance().show({filename:this.latestVersion.name,currentNodeRef:this.options.nodeRef,latestVersion:this.latestVersion,nodeRef:q})},onUploadNewVersionClick:function a(){if(!this.modules.fileUpload){this.modules.fileUpload=Alfresco.getFileUploadInstance()}var s=this.latestVersion,q=s.name,r="*";if(q&&new RegExp(/[^\.]+\.[^\.]+/).exec(q)){r="*"+q.substring(q.lastIndexOf("."))}this.modules.fileUpload.show({siteId:this.options.siteId,containerId:this.options.containerId,updateNodeRef:this.options.nodeRef,updateFilename:q,updateVersion:this.options.workingCopyVersion||s.label,overwrite:true,filter:[{description:this.msg("label.filter-description",q),extensions:r}],mode:this.modules.fileUpload.MODE_SINGLE_UPDATE,onFileUploadComplete:{fn:this.onNewVersionUploadComplete,scope:this}})},onNewVersionUploadComplete:function o(q){if(q.failed.length==0&&q.successful.length>0){if(this.options.siteId==null||this.options.siteId.length==0){return}try{Alfresco.util.Ajax.jsonPost({url:Alfresco.constants.PROXY_URI+"slingshot/doclib/activity",dataObj:{fileName:q.successful[0].fileName,nodeRef:q.successful[0].nodeRef,site:this.options.siteId,type:"file-updated",page:"document-details"}})}catch(r){}}},doRefresh:function h(){YAHOO.Bubbling.unsubscribe("metadataRefresh",this.doRefresh,this);this.refresh("components/document-details/document-versions?nodeRef={nodeRef}"+(this.options.siteId?"&site={siteId}":""))}})})();