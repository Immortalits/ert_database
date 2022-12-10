<?php
$conn = new mysqli("localhost", "root", "", "user_manager");
$conn->set_charset("utf8");
$sql="SELECT * FROM kpi_kat ORDER BY nev;";
$result = $conn -> query($sql);
$kpi_kat=[];

if(mysqli_num_rows($result)>0){
    while($row=mysqli_fetch_assoc($result)){
                $seged=[
                    'id'=>$row['id'],
                    'nev'=>$row['nev'],
                ];
                array_push($kpi_kat, $seged);
    }
}
echo "<script> let kpi_kat=".json_encode($kpi_kat,JSON_UNESCAPED_UNICODE)."</script>";

if(isset($_POST['nev'])){

            $sql ="INSERT INTO `dolgozo`(`nev`, `munkakor`, `tsz`, `ert_vez`) VALUES ('{$_POST['nev']}','{$_POST['munkakor']}','{$_POST['tsz']}','{$_POST['vezeto']}')";
            $result = $conn -> query($sql);
            
            $sql="SELECT id FROM dolgozo ORDER BY 1 DESC LIMIT 1;";
            $result = $conn -> query($sql);
            $row=mysqli_fetch_assoc($result);
            $userid=$row['id'];

            for($i=1; $i<=10;++$i){
            
                if(isset($_POST['tul'.$i])){
                    $sql ="INSERT INTO `eredmenyek`(`dolgozo_id`, `kpi_id`, `prioritas`, `eredmeny`) VALUES ('{$userid}', '{$_POST['tul'.$i]}','{$_POST['p'.$i]}','{$_POST['e'.$i]}');";
                    $result = $conn -> query($sql);
                }
            }
        }
?>

<!DOCTYPE html>
<html lang="hu">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dolgozói Értékelő</title>
    <link rel="stylesheet" href="./style.css">
</head>
<body>
    <div id="content">
        <form action="index.php" method="post" id="myForm">
            <div id="alapadat">
                <div class="inputcontainer">
                    <label>Név:</label><br>
                    <input type="text" name="nev" placeholder="Dolgozó Neve" required><br>
                    <label>Munkakör:</label><br>
                    <input type="text" name="munkakor" placeholder="Munkakör Neve" required>
                </div><br>
                <div class="inputcontainer">
                    <label>Törzsszám:</label><br>
                    <input type="text" minlength= "5" maxlength="5" name="tsz" placeholder="törzsszám" required><br>
                    <label>Vezető:</label><br>
                    <select name="vezeto" id="vezetolista" required>
                        <option value>Kérem válasszon!</option>
                    <?php
                    $sql ="SELECT id, nev FROM vezeto ORDER BY 2;";
                    $result = $conn -> query($sql);
                    if(mysqli_num_rows($result)>0){
                        while($row=mysqli_fetch_assoc($result)){
                            echo "<option value='".$row['id']."'>".$row['nev']."</option>";
                        }
                    }
                    ?>
                    </select><br>
                </div>
            </div>
            <label>Értékelés:</label>
            <div id="ertekeles"></div>
            <div onclick="Hozzaad()" class="button" id="add"><img src="./plus.png" alt="Hozzáadás" class="icon"></div>
            <div id="submithely" >
            <input type="submit" id="submit">
        </div>
        </form>
    </div>
    <h1>
        <?php
        if(isset($_POST['nev'])){
            $osszertek=0;
            $sumprio=0;
             for($i=1; $i<=10;++$i){
        
                    if(isset($_POST['tul'.$i])){
                        $aktertek=0;
                        if($_POST['e'.$i]=="Kiváló"){
                            $aktertek=100;
                        }
                        else if($_POST['e'.$i]=="Jó"){
                            $aktertek=80;
                        }
                        else if($_POST['e'.$i]=="Változó"){
                            $aktertek=60;
                        }
                        else if($_POST['e'.$i]=="Fejlesztendő"){
                            $aktertek=40;
                        }
                        else if($_POST['e'.$i]=="Erősen fejlesztendő"){
                            $aktertek=20;
                        }
                        $osszertek+=$_POST['p'.$i]*$aktertek;
                        $sumprio+=$_POST['p'.$i];
                    }
                }
                echo "Előző adatbevitel végeredménye: ".$osszertek/$sumprio."%";
        }
        ?>
    </h1>
</body>
<script src="script.js"></script>
</html>

