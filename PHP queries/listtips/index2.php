<?php  

$link = mysqli_connect('localhost', 'root', '');  

if (!$link)  

{  

  $error = 'Unable to connect to the database server.';  

  include 'error.html.php';  

  exit();  

}  

  

if (!mysqli_set_charset($link, 'utf8'))  

{  

  $output = 'Unable to set database connection encoding.';  

  include 'output.html.php';  

  exit();  

}  

  

if (!mysqli_select_db($link, 'echacks'))  

{  

  $error = 'Unable to locate the echacks database.';  

  include 'error.html.php';  

  exit();  

}  

  

$result = mysqli_query($link, 'SELECT dailytips FROM tip');  

if (!$result)  

{  

  $error = 'Error fetching tips: ' . mysqli_error($link);  

  include 'error.html.php';  

  exit();  

}  

  

while ($row = mysqli_fetch_array($result))  

{  

  $tips[] = $row['dailytips'];  

}  

  

include 'tips.html.php';  

?>