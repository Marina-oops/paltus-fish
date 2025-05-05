<?php
// Настройки
$to = "nhgft123@mail.ru";
$subject = "Новая заявка с сайта";

// Получаем данные из формы
$name = trim($_POST["name"]);
$phone = trim($_POST["phone"]);
$email = trim($_POST["email"]);
$message = trim($_POST["message"]);

// Проверка заполненности
if ($name && $phone && $email && $message) {
    $emailMessage = "Имя: $name\nТелефон: $phone\nEmail: $email\nСообщение: $message";

    // Отправка письма
    $success = mail($to, $subject, $emailMessage, "From: <$email>");

    if ($success) {
        echo "success";
    } else {
        echo "error";
    }
} else {
    echo "incomplete";
}
?>
