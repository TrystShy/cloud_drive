<?php
$username=$_POST["username"];
$password=$_POST["password"];
echo $username;
echo $password;


// 链接数据库
$conn=mysqli_connect("localhost","root","","member");
if(!$conn){
	die("数据库链接失败");
}
$sql="select * from mem where 用户名=$username and 密码=$password";
$result=mysqli_query($conn,$sql);
if($result){
				echo "<script>alert('登陆成功');</script>";
				echo "<script>
					  setTimeout(function(){ window.location.href='./register.html';},100);
				</script>";
				}
			else{
				echo "<script>alert('登陆失败');</script>";
				}
?>