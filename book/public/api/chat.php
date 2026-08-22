<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);
$userMessage = trim($input['message'] ?? '');

if (empty($userMessage)) {
    echo json_encode(['reply' => 'Namaste! How can we help you?']);
    exit;
}

$encodedKeys = [
    'QVEuQWI4Uk42TDA5aVpBSTZHbmhualRCWndweEN0RjRIUUxTVElDMWVRQUZaNTRWTU9acXc=',
    'QVEuQWI4Uk42S3RWaGdLSzNCYXRNNmVmZzNBRWFGemhqU3ZHcGd1TE0tOXdlX3pVMHh4SHc=',
    'QVEuQWI4Uk42S0kzejNOMHNWQ1V0LW93ODJibFRKZ3dqQ2tPZ25HN3o2bWpuX2hraFp3SWc=',
    'QVEuQWI4Uk42SXlyczc1clUtMU9Kdk5sSk5LUGtNZ2Y1SVpPVTdfSDh3MkE4R1BkMnNIT1E=',
    'QVEuQWI4Uk42SU04YTJVbFBQaktwTnZJXzJKaXNob1ltS0ctdHJXVlp5OEh5VG54bk5tUEE=',
    'QVEuQWI4Uk42SzBLVm5UWkV0LWptbHpYT2hCWmpVY2lWTV9zcDRqbHc3eFFMMnBrZmVlZlE=',
    'QVEuQWI4Uk42TE5TS2JQYkY5WUpjLWlQUHhZWUVnSmtYVHk3MUh3MHJfWHhiUUJYTll1LUE=',
    'QVEuQWI4Uk42Si1iZDRhN29GMXBaR1VwWDF0b2YwdWd3TmdSTzZjdXJUblhXa014d1R1Tmc=',
    'QVEuQWI4Uk42SjAteHZGbFBtVVFwU00xVjlwOTU5YXZMWWtYZmpPS1VlZ1lrOTIxRWw5dUE=',
    'QVEuQWI4Uk42Si1hd2piNDRoNXllbVcwdENNbVNuRXlxUVc2QVVodXhaNjFYRmNNSzhiVUE=',
    'QVEuQWI4Uk42TDA5eTJRX3NSeWhSei1wVWtDX3ZlUl9SSGdiNWRCdzhuTzJFTkhvbGVTN1E=',
    'QVEuQWI4Uk42TGF6Zk8wVmRidTlOdXg2aXFpNTE1dE9zb3RCNHpNWjdlOEVDTXN2aUd1ZFE='
];

$keys = array_map('base64_decode', $encodedKeys);
$models = ['gemini-3.6-flash', 'gemini-flash-lite-latest'];

$systemPrompt = "You are a real human customer support & sales executive from the Simpex Media team for 5,00,000+ Premium eBooks + 500GB Audiobooks Bundle.
RULES:
1. TALK LIKE A REAL HUMAN: Warm, helpful, super conversational (1-2 sentences). Never sound like an AI robot or write long essays.
2. DISCOUNT TRIGGER: If user asks for discount, says price is high, or hesitates on ₹199, say: 'Sir/Ma'am, you are our special customer! 🎁 For the next 10 minutes only, we have unlocked our VIP ₹149 offer for you.'
3. DELIVERY: Assure that Google Drive permanent link arrives on WhatsApp & Email within 60 seconds of payment with lifetime access.
4. LANGUAGE: Always reply in the exact language the user wrote (Hindi/Hinglish/English/etc.).";

$reply = null;
$selectedKey = $keys[array_rand($keys)];

foreach ($models as $model) {
    $url = "https://generativelanguage.googleapis.com/v1beta/models/{$model}:generateContent?key={$selectedKey}";
    $payload = [
        'contents' => [
            [
                'role' => 'user',
                'parts' => [
                    ['text' => "{$systemPrompt}\n\nUser Question: {$userMessage}\n\nReply in 1-2 natural human sentences:"]
                ]
            ]
        ],
        'generationConfig' => [
            'maxOutputTokens' => 800,
            'temperature' => 0.65
        ]
    ];

    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
    curl_setopt($ch, CURLOPT_TIMEOUT, 8);
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($httpCode === 200 && $response) {
        $data = json_decode($response, true);
        $text = $data['candidates'][0]['content']['parts'][0]['text'] ?? '';
        if (!empty($text)) {
            $reply = trim($text);
            break;
        }
    }
}

if (!$reply) {
    $reply = "Haan ji! Payment hote hi WhatsApp aur Email dono par 60 seconds mein instant Google Drive lifetime access link mil jata hai. 📚";
}

echo json_encode(['reply' => $reply]);
