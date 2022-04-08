$session = New-Object Microsoft.PowerShell.Commands.WebRequestSession
$cookie = New-Object System.Net.Cookie
$cookie.Name = 'foo'
$cookie.Value = 'bar'
$cookie.Domain = 'mockbin.com'
$session.Cookies.Add($cookie)
$cookie = New-Object System.Net.Cookie
$cookie.Name = 'bar'
$cookie.Value = 'baz'
$cookie.Domain = 'mockbin.com'
$session.Cookies.Add($cookie)
$response = Invoke-WebRequest -Uri 'http://mockbin.com/har' -Method POST -WebSession $session