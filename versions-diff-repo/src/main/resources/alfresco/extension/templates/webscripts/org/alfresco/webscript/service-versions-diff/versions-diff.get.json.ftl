{
"message" : [
    <#if result??>
        <#list result as res>
            {   
                "operation" : "${res[0]}" ,
      
                "content" : "${res[1]}"
            }
            <#if res_has_next>, </#if>
        </#list>
    <#else>
            {   
                "operation" : "EQUAL" ,
      
                "content" : "ERROR"
            }
    </#if>
    ]
<#if text1??>
,"text1" : ${text1}
</#if>
<#if text2??>
,"text2" : ${text2}
</#if>
}