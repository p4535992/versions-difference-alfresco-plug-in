var connector = remote.connect("alfresco");
if(null == page.url.args.nodeRef || null == page.url.args.versRef)
{
	var data = null;
}else{
	var data = connector.get("/versions-diff.json?nodeRef=" + page.url.args.nodeRef + "&versRef=" + page.url.args.versRef);	
}
// Create a json object from data variable
if(null == data)
{
	model.result = jsonUtils.toObject({'msg' : 'Cannot resolve versions-diff-hook passed url'});
}else{
	var array = jsonUtils.toObject(data);
	model.result = array["message"];
}