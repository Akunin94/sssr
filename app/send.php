<?php

    $phone = $_POST['phone'];
    
    mail('Oknaio-metrika@yandex.ru', 'Заявка с сайта: Тихвинский квартал', "Телефон: {$phone}");

    header("Location: /");
    die();