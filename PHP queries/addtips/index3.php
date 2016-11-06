<?php   

if (get_magic_quotes_gpc())   

{   

  function stripslashes_deep($value)   

  {   

    $value = is_array($value) ?   

        array_map('stripslashes_deep', $value) :   

        stripslashes($value);   

   

    return $value;   

  }   

   

  $_POST = array_map('stripslashes_deep', $_POST);   

  $_GET = array_map('stripslashes_deep', $_GET);   

  $_COOKIE = array_map('stripslashes_deep', $_COOKIE);   

  $_REQUEST = array_map('stripslashes_deep', $_REQUEST);   

}   

   

if (isset($_GET['addtip']))   

{   

  include 'form.html.php';   

  exit();   

}   

   

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

  $error = 'Unable to locate the tips database.';   

  include 'error.html.php';   

  exit();   

}   

   

if (isset($_POST['dailytips']))   

{   

  $dailytips = mysqli_real_escape_string($link, $_POST['dailytips']);   

  $sql = 'INSERT INTO tips SET   

      dailytips="' . $dailytips . '",   

      dailytips=CURDATE()';   

  if (!mysqli_query($link, $sql))   

  {   

    $error = 'Error adding submitted tip: ' . mysqli_error($link);   

    include 'error.html.php';   

    exit();   

  }   

   

  header('Location: .');   

  exit();   

}   

   

$result = mysqli_query($link, 'SELECT dailytips FROM tips');   

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