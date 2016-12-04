var test = [
    {"Что вдохновляет тебя на работу?":{
            "Деньги": 5,
            "Желание сделать мир лучше": 10,
            "Ничего не вдохновляет": 3,
            "Какая работа?! Я ж ещё учусь": 0
        }
    },
    {"Ты оказался на необитаемом острове с Геннадием Русских.<br> Что будешь делать?":
        {
            "Пойду своим путём": 10,
            "Попытаюсь подружиться": 5,
            "Съем его": 3,
            "Кто такой Геннадий Русских?":0
        }
    },
    {"Что ты делаешь,<br>когда въезжаешь в яму?":
        {
            "Говорю «Спасибо» мэру за дороги": 0,
            "Выхожу из машины<br>и засыпаю щебнем": 3,
            "Ну, ё-моё!": 5,
            "Смиренно молчу и еду дальше": 10
        }
    },
    {"Чем займёшься в выходные?":
        {
            "Буду «разлагаться» на диване": 0,
            "Как всегда: друзья, клубы, вечеринки…": 3,
            "Уделю время родным и близким": 5,
            "Буду бороздить снежные вершины<br>на горных лыжах": 10
        }
    },
    {"По городу гуляют коровы!<br>Что делать?":
        {
            "Ну пусть себе гуляют, травку жуют": 5,
            "Хозяевам нужно лучше следить<br>за своими животными!": 10,
            "Здорово! Люблю коров ^_^": 0,
            "Что-то делать надо,<br>но что — не понятно": 3
        }
    },
    {"Какая музыка играет<br>в твоих наушниках? ":
        {
            "Классическая":5,
            "Что-то жутко популярное": 0,
            "У меня особый вкус": 3,
            "У меня нет наушников":10
        }
    },
    {"Кто виноват в провале капремонта дорог?":
        {
            "Заказчик":3,
            "Подрядчик":10,
            "Оба «хороши»":5,
            "Масоны":0
        }
    },
    {"Если бы у тебя был камин,<br>какой газетой ты бы его растопил?":
        {
            "Качканарский Рабочий":5,
            "Качканарское время":0,
            "Качканарский четверг":10,
            "Новый Качканар":3
        }
    },
    {"Что будет с Качканаром<br>через десять лет?":
        {
            "Превратится в город-курорт":10,
            "Станет населённым пунктом<br>для обслуживания комбината":0,
            "Да ничего особо не изменится":3,
            "Не знаю. Всякое может быть…":5
        }
    },
    {"Как ты передвигаешься по городу в темное время суток?":
        {
            "Пробираюсь в кромешной тьме,<br>как ниндзя":5,
            "Не бывает у нас темного времени,<br>всегда фонари светят":3,
            "Исключительно с фонариком":0,
            "Не выхожу из дома ночью,<br>мало ли что…":10
        }
    }
];

var specials = {
    // вопрос с нуля — процент
    "1-3":function(){
        $('main').hide();
        $('.special-text').html('ХММ…<br>А ПОЧЕМУ БЫ<br>И НЕТ?..');
        $('.face').attr('src', 'img/faces/why-not.png');
        $('.special').show();
    },
    "6-0": function(){
        $('main').hide();
        $('.face').attr('src', 'img/faces/facepalm.png');
        $('.special-text').html('БОООЖЕ…<br>КАКИЕ МАСОНЫ?!..');
        $('.special').show();
    }
};

var question = 0; // 1 потому что первый вопрос в html прописан
var result = 0;
var isSpecial = false;

// Заполняем прогресс
for (var i = 0; i < test.length; i++) {
    $('.progress').append('<li>'+(i+1)+'</li>');
}
$('.progress li').eq(0).addClass('active');

setTimeout(function(){
    $('.loading').hide();
    $('.face').show();
    $('body').addClass('whitehouse');
    $('main').show();
}, 3000);

// Действие по клику на ответ
$('.answers').on('click', 'li', function(e) {
    e.preventDefault();

    var percent = $(this).data('p');

    // Прибавляем баллы за ответ
    result += percent;

    // Если это был последний вопрос — выведем результат
    if (question == test.length-1) {
        showResult();
        return;
    }

    var nextQuestion = question+1;

    if(typeof specials[question + "-" + percent] == "function"){
        isSpecial = true;
        specials[question + "-" + percent]();
        setTimeout(function(){
            $('.special').hide();
            $('main').show();
                $('.face').attr('src', 'img/faces/' + (question+1) + '.png');
        },3000);
    } else {
        isSpecial = false;
    }

    // Анимация
    $('main').fadeOut(function(){
        $('.progress li').removeClass('active');
        //$('.progress li').eq(question).addClass('archive');

        // Next question
        $('.progress li').eq(nextQuestion).addClass('active');

        $('.question').html(Object.keys(test[nextQuestion]));




        $('.answers li').remove();
        $.each(test[nextQuestion][ Object.keys(test[nextQuestion]) ], function(index, val) {
            $('.answers').append('<li data-p="'+val+'">'+ index +'</li>');
        });

        if(!isSpecial){
            $('.face').attr('src', 'img/faces/'+(nextQuestion+1)+'.png');
            $('main').fadeIn();
        }
    });


    question = nextQuestion;
});


function showResult(){
    $explanation = $('.result-explanation');
    if(result <= 35) {
        $explanation.html('Твой внутренний Набоких очень мал, его и твои взгляды на жизнь диаметрально противоположны. <br>Вероятней всего, ты считаешь Сергея Набоких плохим управленцем и во всех городских проблемах винишь только его. ');
        $('.face').attr('src', 'img/35.png?1');
    } else if (result <= 70) {
        $explanation.html('Твой внутренний Сергей Набоких на среднем уровне. Это означает, что между тобой и главой города есть что-то общее: в мировоззрении, культурных предпочтениях и не только. Но нельзя забывать и о разногласиях.<br>Разбираясь в городских проблемах, ты не спешишь кого-то обвинять, а стараешься подойти к вопросу максимально объективно. ');
        $('.face').attr('src', 'img/70.png?1');
    } else if (result <= 100) {
        $('.face').attr('src', 'img/100.png?1');
        $explanation.html('Твой внутренний Сергей Набоких необычайно велик. Если бы выборы мэра не отменили, твой внутренний голос обязательно заставил тебя поставить галочку напротив его имени. Может и неосознанно, но тем не менее ты поддерживаешь действующего главу почти во всех вопросах. Ты искренне веришь в его честность и непогрешимость. Именно такие люди как ты и являются электоратом и опорой местной власти.');
    }
    $('main').hide();
    $('.face').hide();
    $('body').removeClass('whitehouse');
    $('.percentage').text(result);
    $('.loading').show();
    setTimeout(function(){
        $('.loading').hide();
        $('.face').show();
        $('.result').show();

        if(typeof VK !== 'undefined') {
            VK.api('wall.post', {
                message: 'Во мне '+result+'% Набоких. А сколько в тебе?\n\nУзнай в приложении https://vk.com/app5280761',
                attachments: 'photo-24624203_400699395',
                v:'5.45'
            },function(data) {
                if (data.response) {
                // data.response is object
                }
            });
        }
    }, 3000);
}


// Прелоад
for (var i = 1; i <= test.length; i++) {
    $("<img />").attr("src", 'img/faces/' + i + '.png');
}
$("<img />").attr("src", 'img/faces/why-not.png');
$("<img />").attr("src", 'img/faces/facepalm.png');
$("<img />").attr("src", 'img/35.png?1');
$("<img />").attr("src", 'img/70.png?1');
$("<img />").attr("src", 'img/100.png?1');
$("<img />").attr("src", 'img/loading.gif');
$("<img />").attr("src", 'img/bg.png');
