$headers=@{}
$headers.Add("accept", "application/json")
$headers.Add("content-type", "application/x-www-form-urlencoded")
$session = New-Object Microsoft.PowerShell.Commands.WebRequestSession
$cookie = New-Object System.Net.Cookie
$cookie.Name = 'foo'
$cookie.Value = 'bar'
$cookie.Domain = 'httpbin.org'
$session.Cookies.Add($cookie)
$cookie = New-Object System.Net.Cookie
$cookie.Name = 'bar'
$cookie.Value = 'baz'
$cookie.Domain = 'httpbin.org'
$session.Cookies.Add($cookie)
$response = Invoke-WebRequest -Uri 'https://httpbin.org/anything?foo=bar&foo=baz&baz=abc&key=value' -Method POST -Headers $headers -WebSession $session -ContentType 'application/x-www-form-urlencoded' -Body 'foo=bar'