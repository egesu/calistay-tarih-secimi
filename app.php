<?php

$db = json_decode(file_get_contents('db.json'), true);

if(!empty($_POST) and !empty($_POST['selectedId'])) {
    $selectedId = $_POST['selectedId'];

    if(!isset($db['items']['item-' . $selectedId])) {
        $selector = $_POST['name'];
        $db['items']['item-' . $selectedId] = $selector;
        file_put_contents('db.json', json_encode($db));
        http_response_code(204);
    } else {
        http_response_code(403);
    }
} else {
    header('Content-type: application/json');
    http_response_code(200);
    echo json_encode($db['items']);
}
