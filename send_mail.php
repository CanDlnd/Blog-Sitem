<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header('Content-Type: application/json');

// CORS ayarları
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

// Gmail SMTP kullanımı için PHPMailer konfigürasyonu
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Form verilerini al
    $data = json_decode(file_get_contents("php://input"), true);
    
    $name = strip_tags(trim($data["name"]));
    $email = filter_var(trim($data["email"]), FILTER_SANITIZE_EMAIL);
    $message = strip_tags(trim($data["message"]));

    // Hata kontrolü
    if (empty($name) || empty($message) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Lütfen tüm alanları doğru doldurun."]);
        exit;
    }

    $mail = new PHPMailer(true);

    try {
        // Sunucu ayarları
        $mail->SMTPDebug = SMTP::DEBUG_OFF;
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'candulundu@gmail.com'; // Gmail adresiniz
        $mail->Password = 'dtii imdg ivrt fvmq'; // Gmail uygulama şifreniz
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;
        $mail->CharSet = 'UTF-8';

        // Alıcı ayarları
        $mail->setFrom($email, $name);
        $mail->addAddress('candulundu@gmail.com', 'Can Dulundu');
        $mail->addReplyTo($email, $name);

        // İçerik
        $mail->isHTML(true);
        $mail->Subject = "Yeni İletişim Formu Mesajı: $name";
        $mail->Body = "
<!DOCTYPE html>
<html>
<head>
    <meta charset='UTF-8'>
    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
</head>
<body style='margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;'>
    <table role='presentation' style='width: 100%; border-collapse: collapse;'>
        <tr>
            <td style='padding: 20px 0; text-align: center; background-color: #4169E1;'>
                <h1 style='color: #ffffff; margin: 0; font-size: 24px;'>Can Dulundu Blog</h1>
                <p style='color: #ffffff; margin: 5px 0 0 0; font-size: 16px;'>Frontend Developer & Web Tasarımcı</p>
            </td>
        </tr>
    </table>
    
    <table role='presentation' style='max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);'>
        <tr>
            <td style='padding: 30px;'>
                <table role='presentation' style='width: 100%;'>
                    <tr>
                        <td style='padding: 10px 0;'>
                            <h2 style='color: #4169E1; margin: 0; font-size: 18px;'>Gönderen Bilgileri</h2>
                        </td>
                    </tr>
                    <tr>
                        <td style='padding: 10px 0;'>
                            <p style='margin: 0; color: #666666;'><strong style='color: #333333;'>İsim:</strong> $name</p>
                        </td>
                    </tr>
                    <tr>
                        <td style='padding: 10px 0;'>
                            <p style='margin: 0; color: #666666;'><strong style='color: #333333;'>E-posta:</strong> $email</p>
                        </td>
                    </tr>
                    <tr>
                        <td style='padding: 20px 0 10px 0;'>
                            <h2 style='color: #4169E1; margin: 0; font-size: 18px;'>Mesaj</h2>
                        </td>
                    </tr>
                    <tr>
                        <td style='padding: 10px 0;'>
                            <p style='margin: 0; color: #666666; line-height: 1.6;'>$message</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
    
    <table role='presentation' style='max-width: 600px; margin: 0 auto; border-collapse: collapse;'>
        <tr>
            <td style='padding: 20px 0; text-align: center;'>
                <p style='margin: 0 0 10px 0; color: #999999; font-size: 14px;'>candulundu.com üzerinden gönderilmiştir</p>
                <div style='margin-top: 15px;'>
                    <a href='https://github.com/candulundu' style='text-decoration: none; margin: 0 10px; display: inline-block;'>
                        <img src='https://cdn-icons-png.flaticon.com/512/25/25231.png' alt='GitHub' style='width: 24px; height: 24px;'>
                    </a>
                    <a href='https://linkedin.com/in/candulundu' style='text-decoration: none; margin: 0 10px; display: inline-block;'>
                        <img src='https://cdn-icons-png.flaticon.com/512/174/174857.png' alt='LinkedIn' style='width: 24px; height: 24px;'>
                    </a>
                    <a href='https://twitter.com/candulundu' style='text-decoration: none; margin: 0 10px; display: inline-block;'>
                        <img src='https://cdn-icons-png.flaticon.com/512/3670/3670151.png' alt='Twitter' style='width: 24px; height: 24px;'>
                    </a>
                </div>
            </td>
        </tr>
    </table>
</body>
</html>
        ";
        
        $mail->AltBody = "İsim: $name\nE-posta: $email\n\nMesaj:\n$message\n\nBu mesaj candulundu.com üzerinden gönderilmiştir.";

        $mail->send();
        http_response_code(200);
        echo json_encode(["status" => "success", "message" => "Mesajınız başarıyla gönderildi."]);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(["status" => "error", "message" => "Mesaj gönderilirken bir hata oluştu: " . $mail->ErrorInfo]);
    }
} else {
    http_response_code(403);
    echo json_encode(["status" => "error", "message" => "Bu metoda izin verilmiyor."]);
}
?> 