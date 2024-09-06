<!DOCTYPE html>
<html lang="en" style="">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Technical Exam</title>
    @vite('resources/css/app.css')  <!-- If using CSS -->
</head>
<body style="background: red">
    <div id="app"></div>
    @viteReactRefresh
    @vite('resources/js/app.js')
</body>

<script>
    window.env = {
        API_BASE_URL : '{{ env("API_BASE_URL") }}'
    }
</script>
</html>
