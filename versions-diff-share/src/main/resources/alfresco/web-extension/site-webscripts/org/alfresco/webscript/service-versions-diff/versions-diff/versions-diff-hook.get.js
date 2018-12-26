
	var connector = remote.connect("alfresco");
	var data = null;
	if(null == page.url.args.nodeRef || null == page.url.args.versRef)
	{
		data = null;
	}else{
		data = connector.get("/versions-diff.json?nodeRef=" + page.url.args.nodeRef + "&versRef=" + page.url.args.versRef);	
	}
	// Create a json object from data variable
	if(null == data)
	{
		model.result = jsonUtils.toObject({'msg' : 'Cannot resolve versions-diff-hook passed url'});
	}else{		
		//var array = jsonUtils.toObject(data);
		//model.result = array["message"];
		//var array = JSON.parse(JSON.stringify(data));
		var array = jsonUtils.toObject(data);
		if(array !== null && array["message"] !== null){
			model.result = array["message"];	
			logger.warn("Data 2:" + data + ", Array:" + array);
		}else{
			logger.warn("Data 3:" + data);
			//model.result = jsonUtils.toObject({'msg' : 'Cannot resolve versions-diff-hook passed data:'+ data});
			model.result = null;
		}		
	}
