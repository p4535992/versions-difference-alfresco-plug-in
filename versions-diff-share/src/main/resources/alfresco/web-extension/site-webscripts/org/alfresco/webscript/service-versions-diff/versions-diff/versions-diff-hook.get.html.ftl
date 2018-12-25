<br />
<br />

<#if result??>
    <#list result as res>
            <span class="${res.operation?html}">${res.content?html}</span>
    </#list>
</#if>
