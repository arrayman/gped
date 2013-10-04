
	
	
	var soapHelloWorld = 'http://test.arrayman.com/gped/ws/webservice1.asmx?op=HelloWorld'; 
    //var soapMessage = '<soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope"><soap12:Body><GetAllCategoryFamilies xmlns="http://tempuri.org/" /></soap12:Body></soap12:Envelope>';
	
	soapMessage = '<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><HelloWorld xmlns="http://arrayman.com/" xmlns:a="http://schemas.datacontract.org/2004/07/gped_cli.gped_ws" xmlns:i="http://www.w3.org/2001/XMLSchema-instance"/></s:Body></s:Envelope>';
	
    function CallService()
    {
		jQuery.support.cors = true;
		webServiceURL = soapHelloWorld; 
        $.ajax({
            url: webServiceURL,
            type: "POST",
            dataType: "xml",
            data: soapMessage,
            contentType: "text/xml; charset=utf-8",
            success: OnSuccess,
            error: OnError
        });
 
        return false;
    };
 
    function OnSuccess(data, status)
    {
        alert(data.d);
    };
 
    function OnError(request, status, error)
    {
        alert('error p1.js');
    };
 
    // $(document).ready(function() {
        // jQuery.support.cors = true;
    // });
