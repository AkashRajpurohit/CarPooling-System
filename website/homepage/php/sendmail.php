<?php
$name = trim($_POST['name']);
$email = trim($_POST['email']);
$company = trim($_POST['company']);
$subject = trim($_POST['subject']);
$message = trim($_POST['message']);
if( isset($name) && isset($email) ) {
	$pattern = "/(content-type|bcc:|cc:|to:)/i";
	if( preg_match($pattern, $name) || preg_match($pattern, $email) || preg_match($pattern, $message) ) {
		exit;
	}
	// Email will be send
	$to = "sanchitsingh0409@gmail.com"; 
	$sub = "$GoRide Has Received Your Mail"; 
	$body = <<<EOD
	<strong>Name:</strong> $namSe <br>
	<strong>Email:</strong> <a href="mailto:$email?subject=feedback" "email me">$email</a> <br> <br>
	<strong>Company:</strong> $company <br>
	<strong>Message:</strong> $message <br>
EOD;
	$headers = "From: $name <$email>\r\n";
	$headers .= 'MIME-Version: 1.0' . "\r\n";
	$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
	$headers .= 'Access-Control-Allow-Origin: *' . "\r\n";
	$headers .= "Access-Control-Allow-Credentials: true" . "\r\n";
	$headers .= 'Access-Control-Allow-Methods: GET, POST' . "\r\n";
	$headers .= 'Access-Control-Max-Age: 8000' . "\r\n";
	$headers .= "Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, Accept, Accept-Encoding" . "\r\n";
	mail($to, $sub, $body, $headers);
}
?>
