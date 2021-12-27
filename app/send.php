<?php

    $phone = $_POST['phone'];
    
    mail('Oknaio-metrika@yandex.ru', 'Заявка с сайта: СПЕКТР', "Телефон: {$phone}");

    header("Location: /");
    die();