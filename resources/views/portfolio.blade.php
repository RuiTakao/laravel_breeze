<!DOCTYPE html>
<html lang="ja">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="{{ asset('/css/style.css') }}">
    <style>
        .fv_bg {
            background-image: url("{{ asset('/storage/' . $layout->fv_image) }}");
            background-position: 50% 50%;
        }
    </style>
    <title>Document</title>
</head>

<body>
    <main class="main">
        <div class="fv">
            <div class="fv_bg"></div>
            <div class="fv_container">
                <div class="fv_user_icon">
                    <img src="{{ asset('/storage/' . $profile->image_path) }}" alt="">
                </div>
            </div>
        </div>
        <div class="container">
            <p class="fv_user_name">{{ $profile->name }}</p>
            <p class="fv_user_works">{{ $profile->work }}</p>
        </div>
        <div class="pr">
            <div class="container">
                <div class="pr_content js-parse_text">{{ $profile->profile_text }}</div>
            </div>
        </div>

        <div class="works section">
            <div class="container">
                @foreach ($items as $item)
                    <h2 class="section_title">{{ $item->item_name }}</h2>

                    @foreach ($item->sub_item as $sub_item)
                        <li class="works_content_item">
                            <h3 class="content_title">{{ $sub_item->sub_item_name }}</h3>
                            @if (!empty($sub_item->sub_item_image))
                                <div class="works_content_image">
                                    <img src="{{ asset('/storage/' . $sub_item->sub_item_image) }}" alt="">
                                </div>
                            @endif
                            <div class="js-parse_text">
                                {{ $sub_item->sub_item_text }}
                            </div>
                        </li>
                    @endforeach
                @endforeach
            </div>
        </div>

    </main>
    <script src="{{ asset('/js/main.js') }}"></script>
</body>

</html>
